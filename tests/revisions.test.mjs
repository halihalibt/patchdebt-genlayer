import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {snapshot,compareRevisions,highlightedText,verifySnapshot} from '../src/revisions.js';

const read=name=>JSON.parse(fs.readFileSync(`examples/revisions/${name}.json`,'utf8'));
test('historical Pydantic pair resolves exactly the missing obligation, preserving record binding',async()=>{
  const a=await snapshot(read('before')),b=await snapshot(read('after')),r=compareRevisions(a,b);
  assert.deepEqual(r.counts,{resolved:1,regressed:0,open:0,covered:2});
  assert.equal(r.rows[1].transition,'RESOLVED');assert.equal(r.guide_changed,true);
  assert.equal(compareRevisions(b,a).counts.regressed,1);
  assert.equal(a.origin,'SAVED RECORD / NOT LIVE-VERIFIED');
  assert.deepEqual(await snapshot(a),a);
});
test('reject altered hashes, quotes, state, dossier-record mismatches and claimed proof without records',async()=>{
  for(const mutate of [d=>d.input.guide+='tampered',d=>d.input_sha256='a'.repeat(64),
    d=>d.assessment.items[0].quote='<script>fabricated</script>',d=>d.state='COVERED',
    d=>d.assessment.items[0].reason='A different explanation not in the saved record.',
    d=>d.evidence.chain_id=1,d=>d.evidence.address='bad',d=>delete d.evidence.record]){
    const d=read('before');mutate(d);await assert.rejects(snapshot(d));
  }
});
test('imports discard alleged verification and transaction labels',async()=>{
  const d=read('before');d.verified=true;d.verification={level:'FINALIZED TRANSACTION + RECORD'};
  d.origin='LIVE VERIFIED';d.evidence.hash='javascript:alert(1)';
  const s=await snapshot(d);assert.equal(s.verified,undefined);assert.equal(s.verification,undefined);
  assert.equal(s.evidence.hash,undefined);assert.match(s.origin,/NOT LIVE/);
});
test('changed obligations, packages, versions, sources, contracts or mixed origins cannot claim progress',async()=>{
  const a=await snapshot(read('before')),b=await snapshot(read('after'));
  for(const mutate of [s=>s.input.changes.pop(),s=>s.input.package='Other',s=>s.input.to_version='3',
    s=>s.input.source_url='https://other.test',s=>s.evidence.address='0x'+'a'.repeat(40),s=>s.evidence=null]){
    const s=structuredClone(b);mutate(s);assert.throws(()=>compareRevisions(a,s));
  }
  const reordered=structuredClone(b);reordered.input.changes.reverse();reordered.assessment.items.reverse();
  reordered.assessment.items.forEach((x,i)=>x.index=i);
  assert.deepEqual(compareRevisions(a,reordered).counts,compareRevisions(a,b).counts);
});
test('unknowns and unresolved status changes remain open; identical guides cannot masquerade as text fixes',async()=>{
  const a=await snapshot(read('before')),b=structuredClone(a);
  b.assessment.items[1].status='UNKNOWN';assert.equal(compareRevisions(a,b).rows[1].transition,'CHANGED / OPEN');
  assert.equal(compareRevisions(a,b).counts.open,1);assert.equal(compareRevisions(a,b).guide_changed,false);
});
test('highlighting merges repeated overlapping quotations and preserves hostile text literally',()=>{
  const text='<script>alert(1)</script> token token';
  const pieces=highlightedText(text,['token','token token','<script>']);
  assert.equal(pieces.map(x=>x.text).join(''),text);assert.equal(pieces.filter(x=>x.mark).length,2);
  assert.deepEqual(highlightedText('plain',[]),[{text:'plain',mark:false}]);
});
test('fresh verification checks contract, exact finalized record and linked transaction before granting proof',async()=>{
  const s=await snapshot(read('before')),record=s.evidence.record;
  const desk={bound:s.evidence.address,expectedHash:'a'.repeat(64),manifest:{},read:async()=>record};
  assert.equal((await verifySnapshot(s,desk)).level,'FINALIZED RECORD READ');
  await assert.rejects(verifySnapshot(s,{...desk,bound:'0x'+'b'.repeat(40)}));
  await assert.rejects(verifySnapshot(s,{...desk,read:async()=>null}));
  await assert.rejects(verifySnapshot(s,{...desk,read:async()=>({...record,owner:'0x'+'b'.repeat(40)})}));
  const txDesk={...desk,manifest:{owner:record.owner,assessments:[{request_id:record.request_id,transaction:'0x'+'a'.repeat(64)}]},verifyTransaction:async()=>({record})};
  assert.equal((await verifySnapshot(s,txDesk)).level,'FINALIZED TRANSACTION + RECORD');
  await assert.rejects(verifySnapshot(s,{...txDesk,verifyTransaction:async()=>({})}));
});
