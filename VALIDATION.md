# Validation index

See [current acceptance matrix](FINAL_READINESS_REPORT.md), [independent Explorer evidence](evidence/EXPLORER_VERIFICATION.md), and [original user reports](evidence/STUDIO_REPORTED_EVIDENCE.md).

VERIFIED: 24 CPython harness tests; 10 prior official SDK Direct Mode tests (native, not WASM); source/checksum equality; deployed source identity; two actual finalized website record reads; 19 frontend tests and production build.

PENDING: full local WASM execution, mobile rendering acceptance, independent count readback. BLOCKED: new website-wallet E2E and live pending recovery without an installed wallet. Studio transactions are not product-wallet proof. Runtime details remain in RUNTIME_AUDIT.md (A) and intelligent-contract/RUNTIME_AUDIT.md (B).
