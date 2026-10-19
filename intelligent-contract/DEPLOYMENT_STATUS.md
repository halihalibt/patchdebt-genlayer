# Deployment status

VERIFIED: deployed source and three existing successful finalized transactions; both finalized website records independently read. Manifest VERIFIED_ONCHAIN refers to these deployment gates, not completed wallet E2E.

Contract `0x724AcFe201463a016f59aC41516D99ab789a5c34`; canonical SHA256 `f828966372c167491fb8e2a61be0d7d639b5170b1bd784ab01fa4bce93cf4aa3`.

| Request | State | Ordered findings | Input SHA256 |
|---|---|---|---|
| patchdebt-public-001 | COVERED | COVERED, COVERED | 5da5070d1fdfe0ce0e1f9c09032d6488bf47579ffc73c0327f527f2a072dbbe7 |
| patchdebt-gap-001 | DEBT | COVERED, MISSING | 2f66e88c7134d6ea08b47b6199f3ab812b53192c4d5ac29923ebb34c8ac94e82 |

- Deployment: https://explorer-studio.genlayer.com/tx/0xfe07e2f31b1daa8ab577ad15ad6de2538c8ade6f782b97da31605581678d8387
- Public assessment: https://explorer-studio.genlayer.com/tx/0xb9d04723fbfab34f971d1608cad2742207ec7691ca9f5c70a11a260db4e9a30b
- Gap assessment: https://explorer-studio.genlayer.com/tx/0x2e7a9f227f9178725bbc4f86ebcf634e6570fbc24830b547e72011e5a5108a58

See [independent observations](../evidence/EXPLORER_VERIFICATION.md), [original reports](../evidence/STUDIO_REPORTED_EVIDENCE.md), and [full acceptance matrix](../FINAL_READINESS_REPORT.md).

BLOCKED: new website-wallet E2E; browser has no EIP-1193 wallet. PENDING: mobile render acceptance, full local WASM execution (not claimed), independent count. Do not redeploy or repeat existing requests.
