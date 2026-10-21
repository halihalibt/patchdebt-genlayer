# Changelog

## 0.4.0 — 2026-10-21

### Added

- Revision desk: save a baseline and revised assessment, align the same obligations and identify resolved gaps, regressions and remaining work.
- Browser-local shelf for up to 12 validated snapshots, JSON dossier/comparison import and portable comparison export.
- Side-by-side guide snapshots with exact evidence highlighting, per-obligation explanations and input hashes.
- Read-only revalidation of both selected records against the deployed contract, with transaction verification when a matching hash is available.
- Baseline-to-editor action with a fresh request ID for a separately assessed revision.
- A recorded Pydantic comparison using the existing public and gap dossiers, clearly identified as historical evidence.

### Improved

- Larger form, explanation, quotation and action typography; responsive comparison cards and mobile form layout.
- Compact finding counts and plain-language result-state explanations.

### Validation and scope

- 30 frontend/integrity tests; 24 existing Python contract harness tests; source hash check and production build.
- No contract change or redeployment. Revision desk consumes the existing assessment protocol.
- Comparison measures saved assessment outcomes for fixed obligations; it does not prove compatibility or authenticate source URLs.

Baseline for this release: repository main `c818bfc9f3c733b6b1445483aed7a764a6ce9010` (0.3). This is a code comparison baseline, not a claim about a platform acceptance decision.
