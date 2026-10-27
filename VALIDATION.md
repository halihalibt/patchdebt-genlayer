# Validation

| Layer | Result | Scope |
|---|---|---|
| CPython contract harness | 24 passed | Mocked SDK, storage, model and consensus |
| Official SDK Direct Mode | 10 passed | Native SDK storage, addresses, hashing, validator callbacks and closure serialization; mocked host/model |
| Official linter | Passed | Three advisory W004 warnings for ordinary exceptions |
| Frontend tests | 30 passed | Existing integrity/recovery cases plus revision transitions, scope guards, import validation, proof downgrade, persistence, evidence highlighting and comparison export |
| Real Studionet execution | Verified | Deployment and three assessments; finalized successful execution and accepted consensus |
| Public website | Verified | Source check, finalized readback, transaction binding and actual JSON download |
| Chrome narrow-screen workflow | Manual check passed | JSON download, controls and application console checked in Chrome at narrow width |

[Runtime compatibility](RUNTIME_AUDIT.md) documents the pinned SDK. [Deployment](DEPLOYMENT.md) and [evidence index](evidence/README.md) link the actual records and provenance. The application includes finalized record lookup and transaction-bound JSON export.

## Validation boundaries

Direct Mode is native Python, not full local WASM GenVM execution. No independent full local WASM run, exhaustive device/accessibility audit or live RPC-outage injection is claimed. Pending-state reload and malformed-response cases have automated coverage; the published transaction was already finalized during read-only recovery. Semantic correctness and prompt-injection resistance are not universal guarantees.

## Revision desk / 0.4

The new automated cases validate the historical Pydantic pair as one resolved gap and its reverse as one regression. They reject changed scope, tampered hashes/quotes, inconsistent embedded records, mixed origins and mismatched contracts. Fresh-verification tests require exact finalized state and successful linked transaction verification. UI tests cover saving, recorded-example loading, selection, export, restoration and clearing. The Python harness passed 24 tests with the existing contract source hash unchanged. Previous Direct Mode and linter results above are retained historical results, not rerun as part of the frontend upgrade.

The historical example is a new comparison of existing assessments, not evidence of new transactions or external adoption. No user feedback or usage counts are fabricated.

## Public release verification / 0.4

GitHub Actions run `39589647294` passed build, tests and Pages deployment for commit `97f4e46d4dbe5ed8dcaa5a64f5c8c2501a120c3a`. The public `release.json` returned that exact commit and run.

On the public application, the recorded example produced one resolved gap, zero regressions and zero open obligations. Source SHA-256 matched the pinned contract. Both records and both manifest-linked transactions passed fresh read-only checks. The actual downloaded [comparison](evidence/REVISION_COMPARISON.json) retained both verification levels and hashes. A refresh restored the local shelf while clearing session verification. Baseline editing populated the original guide and generated a fresh request ID; importing the downloaded comparison checked its contents and did not inherit prior live verification claims. No new wallet transaction was sent. [Captured UI](evidence/revision-comparison.jpg).

The browser log contained extension-origin metadata errors; no application-origin error was observed during these checks. This release's desktop UI was inspected; no new exhaustive device audit is claimed.

## PR evidence gate / 0.5

- 38 Node tests passed, including CLI HEAD binding, dirty input rejection, error-report creation, missing-evidence pending state, verified coverage transitions, stale evidence rejection and website PR input import. The 24 Python contract tests also passed; canonical contract source is unchanged.
- [PR #2](https://github.com/halihalibt/patchdebt-genlayer/pull/2) exercised the real GitHub integration. The [incomplete-guide run](https://github.com/halihalibt/patchdebt-genlayer/actions/runs/40453240531) completed with `DEBT` and exit 1; its report uploaded successfully. The [corrected-guide run](https://github.com/halihalibt/patchdebt-genlayer/actions/runs/40453355816) passed and uploaded its report. The checks used the base commit's trusted checker and exact candidate HEAD.
- Independent local CLI reads also verified pinned source, historical transaction execution/consensus and matching records for both inputs. Portable results: [DEBT](evidence/pr-check/verified-debt.json) and [PASS with baseline comparison](evidence/pr-check/verified-pass.json).
- [Pages run 40453197198](https://github.com/halihalibt/patchdebt-genlayer/actions/runs/40453197198) passed build and deployment. Public release identity returned commit `d7576c1098c6bad184c2e130773dfba8576e23f2`, and public HTML included the new PR evidence gate and V0.5 label.
- These are new CLI/CI executions using existing finalized assessments. No new contract deployment, new assessment transaction, external adoption or branch-protection enforcement is claimed. Live verification depends on Studionet availability. The new import was exercised in DOM tests; no new exhaustive visual/device audit is claimed.
