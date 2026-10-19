"""Ordinary CPython unit harness; GenLayer/storage/LLM are substituted. Not GenVM."""
import importlib.util,sys,types,json,unittest
from pathlib import Path
class Decorator:
    def __call__(self,fn): return fn
class Return:
    def __init__(self,value): self.calldata=value
sender='0x'+'a'*40
class TreeMap(dict):
    @classmethod
    def __class_getitem__(cls,x): return cls
prompts=[]
responses=[]
def prompt(text):
    prompts.append(text)
    return responses.pop(0)
def consensus(leader,validator):
    result=leader()
    if not validator(Return(result)): raise ValueError('validator rejected')
    return result
sdk=types.ModuleType('genlayer');sdk.__all__=['gl','TreeMap','u256'];sdk.TreeMap=TreeMap;sdk.u256=int
sdk.gl=types.SimpleNamespace(Contract=object,public=types.SimpleNamespace(write=Decorator(),view=Decorator()),message=types.SimpleNamespace(sender_address=sender),vm=types.SimpleNamespace(Return=Return,run_nondet_unsafe=consensus),nondet=types.SimpleNamespace(exec_prompt=prompt))
sys.modules['genlayer']=sdk
spec=importlib.util.spec_from_file_location('contract',Path(__file__).parents[1]/'contracts/migration_coverage.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
class Tests(unittest.TestCase):
    def setUp(self):
        prompts.clear();responses.clear();sdk.gl.message.sender_address=sender
        self.c=m.MigrationCoverage();self.c.records=TreeMap();self.c.counts=TreeMap()
        self.d={'package':'SDK','from_version':'1','to_version':'2','source_url':'https://example.com','changes':['apiKey is replaced by token.'],'guide':'Replace apiKey with token.'}
        self.r={'items':[{'index':0,'status':'COVERED','quote':self.d['guide'],'reason':'The replacement is explicitly specified.'}]}
    def run_good(self,r=None,req='a'):
        responses.extend([json.dumps(r or self.r),'ACCEPT']);return json.loads(self.c.assess(req,json.dumps(self.d)))
    def test_store_and_get(self):
        r=self.run_good();self.assertEqual(r['state'],'COVERED');self.assertEqual(self.c.get_count(sender),1);self.assertEqual(json.loads(self.c.get_record(sender,'a')),r)
    def test_idempotence(self):
        r=self.run_good();self.assertEqual(json.loads(self.c.assess('a',json.dumps(self.d))),r);self.assertEqual(len(prompts),2)
    def test_rebind_rejected(self):
        self.run_good();self.d['guide']='Another guide';self.assertRaises(ValueError,self.c.assess,'a',json.dumps(self.d))
    def test_validator_rejection_no_write(self):
        responses.extend([json.dumps(self.r),'REJECT']);self.assertRaises(ValueError,self.c.assess,'a',json.dumps(self.d));self.assertEqual(self.c.records,{})
    def test_fabricated_quote_no_write(self):
        self.r['items'][0]['quote']='fabricated';responses.append(json.dumps(self.r));self.assertRaises(ValueError,self.c.assess,'a',json.dumps(self.d));self.assertEqual(self.c.records,{})
    def test_unknown_retained(self):
        self.r['items'][0].update(status='UNKNOWN',quote='');self.assertEqual(self.run_good()['state'],'REVIEW')
    def test_missing_is_debt(self):
        self.r['items'][0].update(status='MISSING',quote='');self.assertEqual(self.run_good()['state'],'DEBT')
    def test_conflict_blocks(self):
        self.r['items'][0]['status']='CONFLICT';self.assertEqual(self.run_good()['state'],'BLOCKED')
    def test_owner_isolation(self):
        self.run_good();sdk.gl.message.sender_address='0x'+'b'*40;self.run_good();self.assertEqual(len(self.c.records),2)
    def test_quota_before_model(self):
        self.c.counts[sender]=64;self.assertRaises(ValueError,self.c.assess,'a',json.dumps(self.d));self.assertEqual(prompts,[])
    def test_missing_row(self):
        self.assertRaises(ValueError,m.validate_result,json.dumps({'items':[]}),self.d)
    def test_bool_index(self):
        self.r['items'][0]['index']=False;self.assertRaises(ValueError,m.validate_result,json.dumps(self.r),self.d)
    def test_duplicate_changes(self):
        self.d['changes']*=2;self.assertRaises(ValueError,m.parse_input,json.dumps(self.d))
    def test_bad_version_and_url(self):
        self.d['to_version']='1';self.assertRaises(ValueError,m.parse_input,json.dumps(self.d));self.d['to_version']='2';self.d['source_url']='http://x';self.assertRaises(ValueError,m.parse_input,json.dumps(self.d))
    def test_uncertain_validator_no_write(self):
        responses.extend([json.dumps(self.r),'ACCEPT maybe']);self.assertRaises(ValueError,self.c.assess,'a',json.dumps(self.d));self.assertEqual(self.c.records,{})
if __name__=='__main__': unittest.main()
