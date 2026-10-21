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
