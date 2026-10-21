import {canonical, sha256, validateInput, validateAssessment, validateRecord, summarize} from './core.js';

export const HISTORY_KEY = 'patchdebt.revisions.v1';
export const MAX_REVISIONS = 12;

// File labels and saved receipts are claims, not a replacement for fresh chain reads.
export async function snapshot(dossier) {
  const d = structuredClone(dossier);
  validateInput(d.input);
  validateAssessment(d.assessment, d.input);
  const digest = await sha256(canonical(d.input));
  if (d.input_sha256 && d.input_sha256 !== digest) throw Error('Snapshot input hash mismatch.');
  if (d.state !== summarize(d.assessment)) throw Error('Snapshot assessment state mismatch.');
  const record = d.evidence?.record;
  if (record) {
    await validateRecord(record, {digest});
    if (canonical(record.input) !== canonical(d.input) || canonical(record.assessment) !== canonical(d.assessment)) {
      throw Error('Dossier and embedded record disagree.');
    }
    if (d.evidence.chain_id !== 61999 || !/^0x[\da-fA-F]{40}$/.test(d.evidence.address || '')) {
      throw Error('Record needs its Studionet contract address.');
    }
  } else if (d.origin !== 'AUTHORED OFFLINE FIXTURE') {
    throw Error('Import an exported PatchDebt dossier with an embedded record.');
  }
  // Whitelist saved fields; imports cannot inject UI verification state.
  return {
    id: await sha256(canonical({digest, assessment:d.assessment, address:d.evidence?.address?.toLowerCase() || '',
      owner:record?.owner || '', request:record?.request_id || ''})),
    origin: record ? 'SAVED RECORD / NOT LIVE-VERIFIED' : 'AUTHORED OFFLINE FIXTURE',
    input:d.input, assessment:d.assessment, state:d.state, input_sha256:digest,
    evidence:record ? {address:d.evidence.address.toLowerCase(), chain_id:61999, record,
      ...( /^0x[\da-fA-F]{64}$/.test(d.evidence.hash || '') ? {hash:d.evidence.hash} : {})} : null
  };
}

export function compareRevisions(before, after) {
  const a = before.input, b = after.input;
  for (const key of ['package','from_version','to_version','source_url']) {
    if (a[key] !== b[key]) throw Error('Comparison requires the same package, versions and source URL.');
  }
  if (canonical([...a.changes].sort()) !== canonical([...b.changes].sort())) {
    throw Error('Obligation scope changed. Keep the same declared changes to measure a revision.');
  }
  if (Boolean(before.evidence) !== Boolean(after.evidence)) throw Error('Do not mix offline fixtures with saved records.');
  if (before.evidence && before.evidence.address !== after.evidence.address) throw Error('Use records from the same contract.');
  const rows = a.changes.map((change, i) => {
    const old = before.assessment.items[i], next = after.assessment.items[b.changes.indexOf(change)];
    const transition = old.status === 'COVERED' && next.status !== 'COVERED' ? 'REGRESSED'
      : old.status !== 'COVERED' && next.status === 'COVERED' ? 'RESOLVED'
      : old.status === next.status ? (next.status === 'COVERED' ? 'STILL COVERED' : 'STILL OPEN') : 'CHANGED / OPEN';
    return {change, before:old, after:next, transition};
  });
  const counts = {resolved:0, regressed:0, open:0, covered:0};
  for (const row of rows) {
    if (row.transition === 'RESOLVED') counts.resolved++;
    if (row.transition === 'REGRESSED') counts.regressed++;
    if (row.after.status === 'COVERED') counts.covered++; else counts.open++;
  }
  return {protocol:'patchdebt-revision-comparison-v1', before, after, rows, counts,
    guide_changed:a.guide !== b.guide,
    boundary:'Compares assessment outcomes for a fixed obligation set. It does not establish software compatibility, causality or source authenticity.'};
}

export function highlightedText(text, quotes) {
  const ranges = [];
  for (const quote of quotes.filter(Boolean)) {
    let at = text.indexOf(quote);
    while (at !== -1) { ranges.push([at, at + quote.length]); at = text.indexOf(quote, at + quote.length); }
  }
  ranges.sort((a,b) => a[0]-b[0]);
  const merged = [];
  for (const [start,end] of ranges) {
    const last = merged.at(-1);
    if (last && start <= last[1]) last[1] = Math.max(last[1], end); else merged.push([start,end]);
  }
  const parts = []; let cursor = 0;
  for (const [start,end] of merged) {
    if (start > cursor) parts.push({text:text.slice(cursor,start), mark:false});
    parts.push({text:text.slice(start,end), mark:true}); cursor = end;
  }
  if (cursor < text.length) parts.push({text:text.slice(cursor), mark:false});
  return parts;
}

export async function verifySnapshot(s, desk) {
  const e = s.evidence;
  if (!e) throw Error('Offline fixtures cannot be verified onchain.');
  if (desk.bound?.toLowerCase() !== e.address) throw Error('Verify the matching contract source in Chain desk first.');
  const r = await desk.read(e.record.owner, e.record.request_id);
  if (!r || canonical(r) !== canonical(e.record)) throw Error('Saved snapshot differs from the finalized record.');
  const proof = desk.manifest.assessments?.find(x => x.request_id === r.request_id &&
    (x.owner ?? desk.manifest.owner)?.toLowerCase() === r.owner);
  const hash = e.hash || proof?.transaction;
  if (hash) {
    const v = await desk.verifyTransaction({address:desk.bound, owner:r.owner, requestId:r.request_id, digest:r.input_sha256, hash});
    if (!v.record || canonical(v.record) !== canonical(r)) throw Error('Transaction does not prove this finalized record.');
    return {level:'FINALIZED TRANSACTION + RECORD', checked_at:new Date().toISOString(), hash,
      source_sha256:desk.expectedHash};
  }
  return {level:'FINALIZED RECORD READ', checked_at:new Date().toISOString(), source_sha256:desk.expectedHash};
}
