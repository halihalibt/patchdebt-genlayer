# Projects submission draft — DO NOT SUBMIT YET

Status: PENDING / BLOCKED gates remain. Actual Portal form not inspected; these are semantic field drafts, not invented mandatory field rules.

Name: PatchDebt — Migration Coverage Desk

Short description:

> PatchDebt maps declared software migration changes to actionable guide evidence. Each GenLayer assessment binds package versions, a guide snapshot, ordered findings and exact quotations to a request-specific input hash. The product exposes missing instructions, conflicting advice and uncertainty without claiming software compatibility.

Category suggestion: Developer Tools.

Repository: https://github.com/halihalibt/patchdebt-genlayer

Website: existing preview https://patchdebt.zsf197176.chatgpt.site — VERIFIED native publication/public access setting, PENDING independent public-resource and browser acceptance (cloud HTTP 403). GitHub Pages expected URL https://halihalibt.github.io/patchdebt-genlayer/ remains BLOCKED until Pages is enabled. Do not claim either is a verified live onchain product.

Complete contract: https://github.com/halihalibt/patchdebt-genlayer/blob/main/intelligent-contract/contracts/migration_coverage.py

Contract and three existing transactions are reported below for Stable Studionet, 61999; independent source/receipt verification remains PENDING.

Product evidence (separate from A submission):

- https://github.com/halihalibt/patchdebt-genlayer/blob/main/VALIDATION.md
- https://github.com/halihalibt/patchdebt-genlayer/blob/main/PRODUCT_ACCEPTANCE.md
- https://github.com/halihalibt/patchdebt-genlayer/actions/workflows/pages.yml

Logo: https://github.com/halihalibt/patchdebt-genlayer/blob/main/assets/patchdebt-logo.png

Usage: enter versions, list changes and supply guide text; verify deployed source, connect testnet wallet, choose a fresh request ID and sign assess; wait for finality/execution/agreement and exact record readback; inspect item quotations and export dossier. Existing records can be queried by owner/request without a wallet.

This describes the implemented workflow. Until deployment acceptance and website wallet E2E are complete, label it an unverified candidate, not a completed live product. Do not put a placeholder address or inactive URL into a completed submission.

## Reconciled Studio evidence (supersedes earlier absence statements)

# Existing Studio evidence — user-provided, not independently verified

Reported network: Stable Studionet / 61999. Reported contract: `0x724AcFe201463a016f59aC41516D99ab789a5c34`. Actual source identity and transaction network details remain PENDING.

Deployment transaction: `0xfe07e2f31b1daa8ab577ad15ad6de2538c8ade6f782b97da31605581678d8387`.

Owner: `0x22acaa233b7b985b36ef168f2de9295334065b15`; reported get_count(owner): **2**.

| Request | Reported state | Reported items | Input SHA256 | Existing transaction |
|---|---|---|---|---|
| patchdebt-public-001 | COVERED | COVERED, COVERED | `5da5070d1fdfe0ce0e1f9c09032d6488bf47579ffc73c0327f527f2a072dbbe7` | `0xb9d04723fbfab34f971d1608cad2742207ec7691ca9f5c70a11a260db4e9a30b` |
| patchdebt-gap-001 | DEBT | COVERED, MISSING | `2f66e88c7134d6ea08b47b6199f3ab812b53192c4d5ac29923ebb34c8ac94e82` | `0x2e7a9f227f9178725bbc4f86ebcf634e6570fbc24830b547e72011e5a5108a58` |

These are user-provided Studio outcomes. No independently retrieved receipts, finality/execution evidence or vote exports are asserted. Canonical source SHA256 is `f828966372c167491fb8e2a61be0d7d639b5170b1bd784ab01fa4bce93cf4aa3`; equality with deployed code remains PENDING. Existing transactions must not be recreated. Input snapshots in examples/live/covered.json and missing.json independently hash to the reported input identities. They are not full returned onchain records.

Submission gate: deployed-source verification, independent record/receipt checks and product-wallet E2E remain PENDING. Do not submit this draft as fully verified.
