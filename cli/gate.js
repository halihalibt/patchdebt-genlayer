import {canonical, sha256, validateInput} from '../src/core.js';
import {snapshot, compareRevisions, verifySnapshot} from '../src/revisions.js';

export const EXIT = {PASS:0, DEBT:1, ERROR:2, PENDING:3};
export async function checkMigration({input, dossier, baseline, commit, repository, desk}) {
  validateInput(input);
  if (!/^[a-f0-9]{40}$/.test(commit || '') || !/^[\w.-]+\/[\w.-]+$/.test(repository || '')) throw Error('An exact Git commit and owner/repository are required.');
  const digest = await sha256(canonical(input));
  const report = {protocol:'patchdebt-pr-check-v1', repository, commit, input_sha256:digest,
    checked_at:new Date().toISOString(), status:'PENDING', exit_code:EXIT.PENDING,
    provenance:'Existing assessments may be reused only for byte-equivalent canonical input. This does not prove when an assessment was requested or software compatibility.'};
  if (!dossier) return {...report, message:'No assessment supplied. Assess this exact input in PatchDebt and commit the exported dossier.'};
  const current = await snapshot(dossier);
  if (!current.evidence) throw Error('Offline fixtures cannot authorize a PR check.');
  if (canonical(current.input) !== canonical(input)) throw Error('Assessment does not match the current commit input. Reassess the changed guide or obligations.');
  const proof = await verifySnapshot(current,desk);
  if (proof.level !== 'FINALIZED TRANSACTION + RECORD') throw Error('A finalized transaction and matching record are required for CI.');
  report.verification = proof;
  report.record = {owner:current.evidence.record.owner,request_id:current.evidence.record.request_id,address:current.evidence.address};
  report.findings = current.assessment.items;
  report.counts = {covered:report.findings.filter(x=>x.status==='COVERED').length,total:report.findings.length};
  if (baseline) {
    const previous=await snapshot(baseline);
    const comparison=compareRevisions(previous,current);
    const baselineProof=await verifySnapshot(previous,desk);
    if(baselineProof.level!=='FINALIZED TRANSACTION + RECORD')throw Error('Baseline requires transaction-bound verification.');
    report.comparison={counts:comparison.counts,rows:comparison.rows,guide_changed:comparison.guide_changed,baseline_verification:baselineProof};
  }
  const pass=report.counts.covered===report.counts.total;
  return {...report,status:pass?'PASS':'DEBT',exit_code:pass?EXIT.PASS:EXIT.DEBT,
    message:pass?'All declared obligations are covered.':'Unresolved migration obligations require changes.'};
}
export function markdown(report) {
  const clean=x=>String(x).replace(/[\r\n|<>`]/g,' ');
  let text=`## PatchDebt: ${report.status}\n\n${clean(report.message)}\n\nRepository: ${clean(report.repository)}\n\nCommit: ${clean(report.commit)}\n\nInput SHA-256: ${clean(report.input_sha256)}\n\n`;
  if(report.findings)text+='| Obligation | Status | Evidence |\n|---|---|---|\n'+report.findings.map((x,i)=>`| ${i+1} | ${x.status} | ${clean(x.quote || x.reason)} |`).join('\n')+'\n\n';
  if(report.comparison)text+=`Resolved: ${report.comparison.counts.resolved}; regressed: ${report.comparison.counts.regressed}; open: ${report.comparison.counts.open}.\n\n`;
  return text+report.provenance+'\n';
}
