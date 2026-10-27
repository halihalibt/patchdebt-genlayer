# GitHub migration evidence checks

Release 0.5 adds a headless, read-only check of migration documentation. A check binds an exact Git commit and canonical input hash to a freshly verified Studionet transaction and record. Every declared obligation must be COVERED. This complements Revision desk; no contract change is required.

## Prepare an assessment

1. Create `.patchdebt/input.json` using the input schema in `examples/pr-check/after-input.json`. The guide text is part of this file; external files or URLs are not fetched. Keep every declared migration obligation explicit.
2. Import this JSON in the website's **PR evidence gate** section. Verify source and assess it through Chain desk with your browser wallet. Export the finalized dossier as `.patchdebt/dossier.json`.
3. Commit both files. Any later input change needs an assessment for the exact new input. A prior assessment can be reused for identical canonical input; this does not claim a new assessment was made for the PR.
4. Run the checker or use the workflow below. Reports contain commit, input hash, findings, transaction hash, source hash and verification time. No wallet keys or write transactions are used by the checker.

## Run locally

Node 22+; install the pinned dependencies with `npm ci`.

```sh
node cli/check.mjs --root . --input .patchdebt/input.json --dossier .patchdebt/dossier.json --repository OWNER/REPOSITORY --out reports/patchdebt.json
```

Add `--baseline path/to/baseline-dossier.json` for a fresh-verified fixed-scope comparison. Paths are relative to `--root`, must stay within that checkout and must exactly match committed HEAD content. `--commit SHA` optionally asserts the expected HEAD. Package, versions, source URL and obligation scope must match for comparisons.

| Exit | Status | Meaning |
|---|---|---|
| 0 | PASS | Transaction-bound assessment of this exact input covers all obligations. |
| 1 | DEBT | At least one finding is MISSING, CONFLICT or UNKNOWN. |
| 2 | ERROR | Invalid input, mismatched evidence, missing files, incomplete execution or unavailable verification. No approval. |
| 3 | PENDING | No dossier supplied to the CLI. Assessment is still required. |

A pending transaction never passes. Rerun after finality or an RPC outage; the checker never resubmits. The supplied repository workflow requires the dossier file, so a missing file is ERROR. A successful report proves assessment coverage of declared obligations, not program compatibility or completeness of the obligation list.

## GitHub Actions

This repository's `.github/workflows/migration-check.yml` checks `.patchdebt/` changes on pull requests and supports manual execution. It checks out the base commit's trusted checker separately from candidate data, passes the exact PR head SHA, installs dependencies without lifecycle scripts, and only reads candidate JSON. Reports appear in the job summary and downloadable artifact, including when the check fails. There are no secrets, PR comments or wallet transactions.

To integrate into another repository, check out a reviewed immutable PatchDebt release commit as `checker` and your PR head as `candidate`; use the same command and workflow permissions. Do not execute candidate scripts. This repository's workflow is the working same-repository example. Branch protection must be configured by a repository administrator if a failing check must prevent merging; the workflow alone does not enforce that rule.

## Recorded integration example

`examples/pr-check/before-input.json` and `after-input.json` use the historical Pydantic inputs assessed in October 2026. Their matching dossiers are in `examples/revisions/`. The incomplete guide yields DEBT; the corrected guide yields PASS. Running these through CI is new integration execution using existing assessments, not new GenLayer transactions, a new contract deployment or external adoption.

Accepted code baseline: 0.4 commit `8433d137f4fd448cda8ba95b588f11d1d597c554`. All PR-check code, workflow and website input import are new in 0.5.
