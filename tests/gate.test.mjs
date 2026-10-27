import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {checkMigration,markdown} from '../cli/gate.js';
const read=n=>JSON.parse(fs.readFileSync(`examples/revisions/${n}.json`));
const a=read('before'),b=read('after');
const desk={bound:a.evidence.address.toLowerCase(),expectedHash:'pinned',manifest:JSON.parse(fs.readFileSync('deployment.json')),
 read:async(owner,id)=>[a,b].find(d=>d.evidence.record.request_id===id)?.evidence.record,
 verifyTransaction:async p=>({record:[a,b].find(d=>d.evidence.record.request_id===p.requestId)?.evidence.record})};
const run=(d,extra={})=>checkMigration({input:d.input,dossier:d,commit:'a'.repeat(40),repository:'halihalibt/patchdebt-genlayer',desk,...extra});
test('verified missing guide fails and corrected guide passes with one resolved obligation',async()=>{
 const fail=await run(a);assert.equal(fail.exit_code,1);assert.equal(fail.status,'DEBT');
 const pass=await run(b,{baseline:a});assert.equal(pass.exit_code,0);assert.equal(pass.comparison.counts.resolved,1);
 assert.equal(pass.commit,'a'.repeat(40));assert.match(markdown(pass),/PASS/);
});
test('reversed guide produces a real regression and failure',async()=>{const r=await run(a,{baseline:b});assert.equal(r.exit_code,1);assert.equal(r.comparison.counts.regressed,1);});
test('missing dossier remains pending, never passing',async()=>{const r=await run(a,{dossier:null});assert.equal(r.exit_code,3);});
test('changed guide, obligations or package cannot borrow old assessment',async()=>{
 for(const key of ['guide','package']){const input=structuredClone(b.input);input[key]+=' changed';await assert.rejects(run(b,{input}),/does not match/);}
 const input=structuredClone(b.input);input.changes.reverse();await assert.rejects(run(b,{input}),/does not match/);
});
test('forged labels, unknown transaction, wrong source and changed scope never pass',async()=>{
 await assert.rejects(run(b,{desk:{...desk,bound:'0x'+'b'.repeat(40)}}));
 await assert.rejects(run(b,{desk:{...desk,verifyTransaction:async()=>({})}}));
 const d=structuredClone(b);d.evidence.record.input.guide+='forged';await assert.rejects(run(d));
 const baseline=structuredClone(a);baseline.input.package='another';await assert.rejects(run(b,{baseline}));
});
test('record-only and authored fixture evidence cannot authorize CI',async()=>{
 const manifest={};await assert.rejects(run(b,{desk:{...desk,manifest}}),/transaction/);
 const fixture={...b,origin:'AUTHORED OFFLINE FIXTURE',evidence:null};await assert.rejects(run(fixture),/Offline/);
});
test('RPC failure propagates and markdown neutralizes injected table markup',async()=>{
 await assert.rejects(run(b,{desk:{...desk,read:async()=>{throw Error('RPC unavailable');}}}),/RPC unavailable/);
 assert.doesNotMatch(markdown({status:'ERROR',message:'<script>|`\n',provenance:'boundary'}),/<script>/);
});
