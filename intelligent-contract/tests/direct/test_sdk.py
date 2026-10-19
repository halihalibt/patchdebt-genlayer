"""Official SDK/storage in native Direct Mode, NOT WASM/GenVM execution."""
import json,hashlib
from pathlib import Path
import pytest
DATA=json.loads(Path('examples/assess-input.json').read_text())
RESULT={'items':[{'index':i,'status':'COVERED','quote':q,'reason':'This exact guide passage provides the migration action.'} for i,q in enumerate(['replace apiKey with token','Create the client with the endpoint option set to your service URL.'])]}
def setup(direct_vm,direct_deploy,direct_alice):
    c=direct_deploy('contracts/migration_coverage.py',sdk_version='v0.2.16')
    direct_vm.sender=direct_alice
    direct_vm.mock_llm('INPUT_JSON',json.dumps(RESULT))
    r=json.loads(c.assess('sdk-001',json.dumps(DATA)))
    direct_vm.clear_mocks()
    return c,r

def audit(vm,status='COVERED',evidence=True,reason=True):
    vm.mock_llm('VALIDATOR AUDIT',json.dumps({'items':[{'index':i,'status':status,'evidence_valid':evidence,'reason_valid':reason} for i in range(2)]}))

def test_sdk_storage_hash_idempotence(direct_vm,direct_deploy,direct_alice):
    c,r=setup(direct_vm,direct_deploy,direct_alice)
    owner='0x'+direct_alice.hex()
    assert r['owner']==owner and c.get_count(owner)==1
    assert r['input_sha256']==hashlib.sha256(json.dumps(DATA,sort_keys=True,separators=(',',':')).encode()).hexdigest()
    assert c.assess('sdk-001',json.dumps(DATA))==c.get_record(owner,'sdk-001')
    assert len(direct_vm._captured_validators)==1

def test_real_sdk_validator_accepts(direct_vm,direct_deploy,direct_alice):
    setup(direct_vm,direct_deploy,direct_alice);audit(direct_vm)
    assert direct_vm.run_validator() is True

@pytest.mark.parametrize('status,evidence,reason',[('MISSING',True,True),('COVERED',False,True),('COVERED',True,False),('UNKNOWN',True,True)])
def test_real_sdk_validator_rejects(direct_vm,direct_deploy,direct_alice,status,evidence,reason):
    setup(direct_vm,direct_deploy,direct_alice);audit(direct_vm,status,evidence,reason)
    assert direct_vm.run_validator() is False

def test_bad_leader_and_error(direct_vm,direct_deploy,direct_alice):
    setup(direct_vm,direct_deploy,direct_alice)
    assert direct_vm.run_validator(leader_result='{}') is False
    assert direct_vm.run_validator(leader_error=ValueError('error')) is False

def test_closure_serialization(direct_vm,direct_deploy,direct_alice):
    setup(direct_vm,direct_deploy,direct_alice)
    import cloudpickle
    _,leader,validator=direct_vm._captured_validators[-1]
    # Explicitly serialize both production closures; direct-mode unsafe skips this itself.
    for fn in (leader,validator): assert callable(cloudpickle.loads(cloudpickle.dumps(fn)))

def test_owner_change(direct_vm,direct_deploy,direct_alice,direct_bob):
    c,r=setup(direct_vm,direct_deploy,direct_alice)
    direct_vm.sender=direct_bob
    assert c.get_count('0x'+direct_bob.hex())==0
    assert c.get_record('0x'+direct_bob.hex(),'sdk-001')==''

def test_invalid_input_no_model(direct_vm,direct_deploy):
    c=direct_deploy('contracts/migration_coverage.py',sdk_version='v0.2.16')
    with pytest.raises(Exception): c.assess('bad','{"bad":true}')
    assert len(direct_vm._captured_validators)==0
