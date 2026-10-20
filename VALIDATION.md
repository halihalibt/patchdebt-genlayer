# Validation

| Layer | Result | Scope |
|---|---|---|
| CPython contract harness | 24 passed | Mocked SDK, storage, model and consensus |
| Official SDK Direct Mode | 10 passed | Native SDK storage, addresses, hashing, validator callbacks and closure serialization; mocked host/model |
| Official linter | Passed | Three advisory W004 warnings for ordinary exceptions |
| Frontend tests | 22 passed | Input/evidence integrity, source gate, transaction binding, recovery, failures and duplicate prevention |
| Real Studionet execution | Verified | Deployment and three assessments; finalized successful execution and accepted consensus |
| Public website | Verified | Source check, finalized readback, transaction binding and actual JSON download |
| Chrome narrow-screen workflow | Manual check passed | JSON download, controls and application console checked in Chrome at narrow width |

[Runtime compatibility](RUNTIME_AUDIT.md) documents the pinned SDK. [Deployment](DEPLOYMENT.md) and [evidence index](evidence/README.md) link the actual records and provenance. The application includes finalized record lookup and transaction-bound JSON export.

## Validation boundaries

Direct Mode is native Python, not full local WASM GenVM execution. No independent full local WASM run, exhaustive device/accessibility audit or live RPC-outage injection is claimed. Pending-state reload and malformed-response cases have automated coverage; the published transaction was already finalized during read-only recovery. Semantic correctness and prompt-injection resistance are not universal guarantees.
