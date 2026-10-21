import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {JSDOM} from 'jsdom';
import {mountRevisions} from '../src/revision-ui.js';import {HISTORY_KEY} from '../src/revisions.js';

test('revision UI: recorded example, literal evidence, swapping, storage restore, export and proof downgrade',async()=>{
  const dom=new JSDOM(fs.readFileSync('index.html','utf8'),{url:'https://example.test/patchdebt/'});
  global.document=dom.window.document;global.window=dom.window;
  const $=id=>document.getElementById(id),m=new Map(),storage={getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,v),removeItem:k=>m.delete(k)};
  global.fetch=async url=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(String(url).replace('./',''),'utf8'))});
  let exported=null;global.URL.createObjectURL=blob=>{exported=blob;return 'blob:test';};global.URL.revokeObjectURL=()=>{};
  dom.window.HTMLAnchorElement.prototype.click=function(){};
  const wait=async()=>{for(let i=0;i<100&&$('load-revision-example').disabled;i++)await new Promise(r=>setTimeout(r,5));};
  await mountRevisions({getDossier:()=>null,getDesk:()=>null,storage});
  $('save-snapshot').click();await wait();assert.match($('revision-notice').textContent,/first/);
  $('load-revision-example').click();await wait();
  assert.match($('revision-results').textContent,/1 resolved/);assert.match($('revision-results').textContent,/NOT|need fresh/);
  assert.equal(document.querySelectorAll('.revision-guide mark').length,3);
  assert.equal(JSON.parse(m.get(HISTORY_KEY)).length,2);
  $('export-comparison').click();await wait();const report=JSON.parse(await exported.text());
  assert.equal(report.verification.before,null);assert.equal(report.rows[1].transition,'RESOLVED');
  const a=$('before-revision').value,b=$('after-revision').value;$('before-revision').value=b;$('after-revision').value=a;
  $('after-revision').dispatchEvent(new dom.window.Event('change'));assert.match($('revision-results').textContent,/1 regressed/);
  $('verify-revisions').click();await wait();assert.match($('revision-notice').textContent,/VERIFY SOURCE/);
  await mountRevisions({getDossier:()=>null,getDesk:()=>null,storage});assert.match($('revision-notice').textContent,/restored/);
  let edited=null;
  const records=JSON.parse(m.get(HISTORY_KEY));
  const desk={bound:records[0].evidence.address,expectedHash:'a'.repeat(64),manifest:{},
    read:async(owner,id)=>records.find(s=>s.evidence.record.request_id===id).evidence.record};
  await mountRevisions({getDossier:()=>null,getDesk:()=>desk,editBaseline:d=>{edited=d;},storage});
  $('edit-baseline').click();await wait();assert.equal(edited.guide,records[0].input.guide);
  $('verify-revisions').click();await wait();assert.match($('revision-results').textContent,/Both snapshots checked this session/);
  $('export-comparison').click();await wait();const checked=JSON.parse(await exported.text());
  assert.equal(checked.verification.before.level,'FINALIZED RECORD READ');
  // Import a self-contained report. Its alleged live checks must not be inherited.
  await mountRevisions({getDossier:()=>null,getDesk:()=>null,storage});
  Object.defineProperty($('import-revision'),'files',{configurable:true,value:[{size:100,text:async()=>JSON.stringify(checked)}]});
  $('import-revision').dispatchEvent(new dom.window.Event('change'));await wait();
  assert.match($('revision-results').textContent,/need fresh onchain verification/);
  assert.match($('revision-notice').textContent,/not been inherited/);
  $('clear-revisions').click();assert.equal(m.has(HISTORY_KEY),false);assert.equal($('revision-results').textContent,'');assert.equal($('export-comparison').disabled,true);
});
