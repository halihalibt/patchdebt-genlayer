import {snapshot, compareRevisions, highlightedText, verifySnapshot, HISTORY_KEY, MAX_REVISIONS} from './revisions.js';

export function downloadJSON(value, filename) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(value, (_,v) => typeof v === 'bigint' ? String(v) : v, 2)], {type:'application/json'}));
  const a = document.createElement('a'); a.href=url; a.download=filename;
  document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url),1000);
}

export async function mountRevisions({getDossier, getDesk, editBaseline, storage=globalThis.localStorage}) {
  const $ = id => document.getElementById(id);
  const Option = document.defaultView.Option;
  let history=[], busy=false, report=null;
  const verified = new Map();
  const say = text => { $('revision-notice').textContent=text; };
  const node = (tag,text,className) => {
    const e=document.createElement(tag); e.textContent=text; if(className)e.className=className; return e;
  };
  function fillSelects(before=$('before-revision').value, after=$('after-revision').value) {
    for (const id of ['before-revision','after-revision']) {
      const select=$(id); select.replaceChildren(new Option('Choose a saved snapshot…',''));
      history.forEach((s,i) => select.append(new Option(`${i+1}. ${s.input.package} · ${s.state} · ${s.evidence?.record.request_id || 'offline'} · ${s.input_sha256.slice(0,8)}`,s.id)));
    }
    $('before-revision').value=before; $('after-revision').value=after;
    $('history-count').textContent=`${history.length} / ${MAX_REVISIONS} saved locally`;
  }
  function save() { try { storage.setItem(HISTORY_KEY,JSON.stringify(history)); } catch { say('Browser storage is unavailable or full. Export the comparison before leaving.'); } }
  function add(s) {
    const existing=history.find(x=>x.id===s.id);
    if (!existing) {
      if(history.length>=MAX_REVISIONS)throw Error('Snapshot shelf is full (12). Export your work, then use Clear saved snapshots.');
      history.push(s);
    }
    return s.id;
  }
  function guide(s, title) {
    const box=node('section','', 'revision-guide');box.append(node('h3',title),node('p',`${s.state} · ${s.input_sha256.slice(0,12)}…`,'hint'));
    const pre=node('pre','');
    highlightedText(s.input.guide,s.assessment.items.map(x=>x.quote)).forEach(p=>pre.append(p.mark?node('mark',p.text):document.createTextNode(p.text)));
    box.append(pre);
    if(s.evidence)box.append(node('p',`Record: ${s.evidence.record.request_id} · ${s.evidence.record.owner}`,'hint'));
    return box;
  }
  function show() {
    report=null; $('revision-results').replaceChildren(); $('export-comparison').disabled=true;
    const before=history.find(s=>s.id===$('before-revision').value),after=history.find(s=>s.id===$('after-revision').value);
    if(!before||!after)return;
    try {
      if(before.id===after.id)throw Error('Select two different snapshots.');
      report=compareRevisions(before,after);
      const root=$('revision-results'), c=report.counts;
      root.append(node('p',`${c.resolved} resolved · ${c.regressed} regressed · ${c.open} still open · ${c.covered}/${report.rows.length} covered after revision`,'comparison-summary'));
      const checks=[verified.get(before.id),verified.get(after.id)];
      const trust=checks.every(Boolean)?`Both snapshots checked this session: ${checks.map(x=>x.level).join(' / ')}.`
        : before.evidence?'Saved record comparison. Both snapshots need fresh onchain verification; imported labels are not proof.'
        :'Authored offline comparison. No AI assessment or blockchain execution.';
      root.append(node('p',trust,'boundary'));
      if(!report.guide_changed)root.append(node('p','The guide text is identical. Different judgments are not evidence of a documentation fix.','boundary'));
      const guides=node('div','', 'revision-guides'); guides.append(guide(before,'Before / baseline'),guide(after,'After / revised'));root.append(guides);
      const rows=node('div','', 'comparison-rows');
      report.rows.forEach(row=>{
        const card=node('article','', 'comparison-row');card.append(node('h3',row.change),node('span',row.transition,'badge '+(row.transition==='RESOLVED'?'COVERED':row.transition==='REGRESSED'?'CONFLICT':'UNKNOWN')));
        const pair=node('div','', 'revision-guides');
        for(const [label,item] of [['Before',row.before],['After',row.after]]) {
          const cell=node('section','');cell.append(node('h4',`${label} · ${item.status}`));
          if(item.quote)cell.append(node('blockquote',item.quote));
          else cell.append(node('p','No quoted evidence for this finding.','hint'));
          cell.append(node('p',item.reason));pair.append(cell);
        }
        card.append(pair);rows.append(card);
      });root.append(rows);$('export-comparison').disabled=false;
    } catch(e) { say(e.message); }
  }
  async function run(fn) {
    if(busy)return; busy=true;
    document.querySelectorAll('[data-revision-action]').forEach(b=>b.disabled=true);
    try { await fn(); }catch(e){say(e.message);}finally{
      busy=false;document.querySelectorAll('[data-revision-action]').forEach(b=>b.disabled=false);
      $('export-comparison').disabled=!report;
    }
  }
  $('save-snapshot').onclick=()=>run(async()=>{
    const d=getDossier();if(!d)throw Error('Inspect a fixture or load a finalized assessment in Migration desk first.');
    const s=await snapshot(d),first=history.length===0,id=add(s);save();
    fillSelects(first?id:$('before-revision').value,first?'':id);show();
    say('Snapshot saved with its input hash. Edit and assess the revised guide separately, then save it for comparison.');
  });
  $('load-revision-example').onclick=()=>run(async()=>{
    say('Loading archived Pydantic assessments…');
    const pair=[];
    for(const file of ['before','after']){
      const response=await fetch(`./examples/revisions/${file}.json`);
      if(!response.ok)throw Error('Recorded example is unavailable.');pair.push(await snapshot(await response.json()));
    }
    // Validate the entire pair before modifying history.
    compareRevisions(...pair);
    if(history.length+pair.filter(s=>!history.some(x=>x.id===s.id)).length>MAX_REVISIONS)throw Error('Snapshot shelf is full. Export before clearing it.');
    const ids=pair.map(add);save();fillSelects(...ids);show();
    say('Loaded two historical assessments of the same Pydantic obligations. This reconstructs a comparison, not a newly submitted revision or new transactions. Use Verify selected pair to read both records now.');
  });
  for(const id of ['before-revision','after-revision'])$(id).onchange=()=>{say('Comparing the selected snapshots.');show();};
  $('edit-baseline').onclick=()=>run(async()=>{
    const s=history.find(x=>x.id===$('before-revision').value);
    if(!s)throw Error('Select a baseline snapshot first.');
    if(!editBaseline)throw Error('The editor is not ready.');
    editBaseline(structuredClone(s.input));
    say('Baseline copied to the editor with a fresh request ID. Change only the guide, assess it through Chain desk, then save the new result.');
  });
  $('import-revision').onchange=()=>run(async()=>{
    const file=$('import-revision').files?.[0];if(!file)return;
    try {
      if(file.size>2000000)throw Error('Import a JSON dossier or comparison smaller than 2 MB.');
      const json=JSON.parse(await file.text());
      const pair=json.protocol==='patchdebt-revision-comparison-v1'?[json.before,json.after]:[json];
      const validated=[];for(const d of pair)validated.push(await snapshot(d));
      if(validated.length===2)compareRevisions(...validated);
      if(history.length+validated.filter(s=>!history.some(x=>x.id===s.id)).length>MAX_REVISIONS)throw Error('Snapshot shelf is full.');
      const ids=validated.map(add);save();fillSelects(ids.length===2?ids[0]:$('before-revision').value,ids.at(-1));show();
      say('Imported and checked hashes, findings and embedded records. Live chain verification has not been inherited from the file.');
    } finally {$('import-revision').value='';}
  });
  $('verify-revisions').onclick=()=>run(async()=>{
    if(!report||!report.before.evidence)throw Error('Select two saved record snapshots first.');
    const pair=[report.before,report.after],desk=getDesk();
    if(!desk?.bound)throw Error('Use VERIFY SOURCE in Chain desk first. No wallet is needed.');
    pair.forEach(s=>verified.delete(s.id));show();say('Reading both finalized records and any linked transactions…');
    const checks=[];for(const s of pair)checks.push(await verifySnapshot(s,desk));
    pair.forEach((s,i)=>verified.set(s.id,checks[i]));show();say('Both selected snapshots match finalized state. Verification is read-only; no transaction was submitted.');
  });
  $('export-comparison').onclick=()=>run(async()=>{
    if(!report)throw Error('Select a valid comparison first.');
    const checks={before:verified.get(report.before.id)||null,after:verified.get(report.after.id)||null};
    downloadJSON({...report,exported_at:new Date().toISOString(),verification:checks},'patchdebt-revision-comparison.json');
    say('Comparison exported with both snapshots, per-obligation changes, hashes and this session’s verification scope.');
  });
  $('clear-revisions').onclick=()=>{
    history=[];verified.clear();try{storage.removeItem(HISTORY_KEY);}catch{}
    fillSelects();show();say('Local snapshots cleared. Previously exported files and onchain records are unaffected.');
  };
  try {
    const saved=JSON.parse(storage.getItem(HISTORY_KEY)||'[]');
    if(!Array.isArray(saved)||saved.length>MAX_REVISIONS)throw Error('Invalid snapshot shelf.');
    for(const d of saved)history.push(await snapshot(d));
    fillSelects(history[0]?.id||'',history.at(-1)?.id||'');show();
    if(history.length)say('Saved snapshots restored. Reverify records for a fresh chain check.');
  } catch {history=[];fillSelects();say('Saved snapshots could not be restored. Import an exported dossier or clear the local shelf.');}
}
