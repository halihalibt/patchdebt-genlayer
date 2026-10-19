# Final acceptance — wallet transaction and export verified

Contract: `0x724AcFe201463a016f59aC41516D99ab789a5c34`. Stable Studionet / configured chain ID 61999. Canonical SHA256: `f828966372c167491fb8e2a61be0d7d639b5170b1bd784ab01fa4bce93cf4aa3`. Full source and tests remain byte-identical across both public repositories; no contract business logic changed.

| Gate | State | Actual evidence |
|---|---|---|
| Source identity | VERIFIED | Website Verify Source and independent 8916-byte Explorer source comparison |
| Local CPython harness | VERIFIED | 24 tests; mocked host, not GenVM |
| Official SDK Direct Mode | VERIFIED | Prior 10 tests, native Python; linter passed with 3 advisory W004 warnings |
| Full local WASM GenVM | PENDING | Not performed and not claimed |
| Frontend tests/build | VERIFIED | 22 tests and production build passed |
| Original deployment + two Studio assessments | VERIFIED | Explorer FINALIZED/SUCCESS/Normal/Accepted; original user reports separately preserved |
| Original two finalized website records | VERIFIED | Exact request IDs, input hashes and COVERED/COVERED vs COVERED/MISSING |
| User product-wallet transaction | VERIFIED | User signed one real transaction; independently observed in Explorer |
| Product transaction-bound finalized recovery | VERIFIED | Actual published product verified sender/destination/method/arguments/leader execution/vote majority and exact saved record |
| Real export control / dossier | VERIFIED | Actual website download succeeded; origin FINALIZED TRANSACTION + RECORD; raw receipt and finalized record included |
| Read-only recovery without another signature | VERIFIED | Agent browser recovered existing transaction with no wallet and no write call |
| Pending persistence / duplicate prevention | VERIFIED locally | Automated tests; live reload during this already-finalized transaction was not practical, not claimed |
| Mobile rendering | PENDING | Responsive CSS retained; no mobile viewport acceptance performed |
| Live source mismatch / network outage injection | PENDING | Unit rejection coverage; prior actual RPC error failed closed, not a synthetic live outage test |
| Original owner get_count=2 | PENDING independent read | Original user report refers only to original owner, not the product-wallet owner |

## Product-wallet evidence

Transaction: https://explorer-studio.genlayer.com/tx/0x50d745ee7ddfc89fcbf54c849585ab870b4215d1ca73f456511502dea7f28d82

Owner: `0x49ce61764cca0c15a79e2d98baa535fc7547eb3a`. Request: `patchdebt-web-e2e-001`. Aggregate: COVERED. Ordered items: COVERED / COVERED. Input SHA256: `5da5070d1fdfe0ce0e1f9c09032d6488bf47579ffc73c0327f527f2a072dbbe7`.

Explorer independently displayed FINALIZED / SUCCESS / Return / Normal / Accepted; visible votes 3 agree, 2 idle. Actual public-product readback/export independently confirmed the exact record and transaction binding. User supplied the signature; the agent sent no new transaction, redeployed nothing, and did not submit to Portal.

- Product dossier: https://github.com/halihalibt/patchdebt-genlayer/blob/main/evidence/WEBSITE_WALLET_DOSSIER.json
- Actual export screenshot: https://github.com/halihalibt/patchdebt-genlayer/blob/main/evidence/website-wallet-export.jpg
- Transaction observations: evidence/WEBSITE_WALLET_TRANSACTION.json
- Fix CI/publication: https://github.com/halihalibt/patchdebt-genlayer/actions/runs/39303361998 — successful release b4594790e44281f2a40b64bbcff65fadfd000ee0; actual website script app.js?v=99233f8f47d5cc6e

## Corrected frontend defect

Studio's leader_receipt array contained a real mode=leader SUCCESS entry followed by an idle mode=validator ERROR entry. The old UI selected the last entry and falsely displayed execution ERROR. It now selects the actual leader and checks majority agreement. Actual leader errors, incomplete finality, insufficient votes and mismatched transaction arguments remain rejected. The export status now appears in the Chain Desk too; browser download URLs are revoked after a delay. Known manifest-linked records can recover transaction-bound dossiers through READ FINALIZED RECORD without another signature.

The previous no-wallet blocker described the agent browser and is resolved for product E2E by the user's successful transaction and independent read-only recovery/export. No second signature is needed. The remaining PENDING rows are disclosed validation limits; strict completion of every requested acceptance check is not claimed. No Portal submission. No compatibility or change-list completeness guarantees.
