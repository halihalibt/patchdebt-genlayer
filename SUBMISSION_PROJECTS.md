# Submission draft — final acceptance still pending

Status: PENDING; do not submit to Portal yet. Actual form not inspected; labels below are semantic drafts, not invented required form fields.

## Copyable English introduction

PatchDebt — Migration Coverage Desk

PatchDebt turns software migration obligations into an evidence ledger. Developers bind package versions, declared changes and a guide snapshot to a GenLayer assessment, inspect exact quotations and explanations, query finalized records and export an audit dossier. The public product verifies deployed source identity before contract access and separates offline examples from live evidence.

## Field values

- Repository (VERIFIED public): https://github.com/halihalibt/patchdebt-genlayer
- Complete source (VERIFIED): https://github.com/halihalibt/patchdebt-genlayer/blob/main/intelligent-contract/contracts/migration_coverage.py
- Contract (VERIFIED): `0x724AcFe201463a016f59aC41516D99ab789a5c34`
- Network: Stable Studionet; configured chain ID 61999
- Source SHA256 (VERIFIED): `f828966372c167491fb8e2a61be0d7d639b5170b1bd784ab01fa4bce93cf4aa3`
- Website (VERIFIED public): https://halihalibt.github.io/patchdebt-genlayer/
- Evidence (VERIFIED observations): https://github.com/halihalibt/patchdebt-genlayer/blob/main/evidence/EXPLORER_VERIFICATION.md
- Validation: https://github.com/halihalibt/patchdebt-genlayer/blob/main/FINAL_READINESS_REPORT.md
- Product dossier: https://github.com/halihalibt/patchdebt-genlayer/blob/main/evidence/WEBSITE_GAP_DOSSIER.json
- Product acceptance: https://github.com/halihalibt/patchdebt-genlayer/blob/main/PRODUCT_ACCEPTANCE.md
- Logo (VERIFIED): https://raw.githubusercontent.com/halihalibt/patchdebt-genlayer/main/assets/patchdebt-logo.png — original PNG, 1024×1024, 189067 bytes

## Existing transaction evidence

- Deployment: https://explorer-studio.genlayer.com/tx/0xfe07e2f31b1daa8ab577ad15ad6de2538c8ade6f782b97da31605581678d8387
- Public assessment: https://explorer-studio.genlayer.com/tx/0xb9d04723fbfab34f971d1608cad2742207ec7691ca9f5c70a11a260db4e9a30b
- Gap assessment: https://explorer-studio.genlayer.com/tx/0x2e7a9f227f9178725bbc4f86ebcf634e6570fbc24830b547e72011e5a5108a58

## Use

Constructor has no arguments. `assess(request_id, payload)` accepts the JSON input documented in README; `get_record(owner, request_id)` and `get_count(owner)` are public views. Existing records can be queried without a wallet. The website source check precedes reads; signing additionally requires an active wallet, accepted manifest and correct network.

## Remaining wallet step

In a browser with your Studionet wallet, open https://halihalibt.github.io/patchdebt-genlayer/ , Verify Source, Connect Wallet on chain 61999, Load Public Doc Input, enter a fresh request ID `patchdebt-web-e2e-001` (query first; if already used choose a new ID), and approve exactly one assessment. Recheck until finalized, export its dossier and return the transaction hash plus dossier. If submission is uncertain, recover and attach the original transaction ID; never resubmit. No private key or seed phrase is needed. This product-wallet transaction has NOT yet occurred.

Product-wallet E2E and mobile render acceptance remain outstanding. Do not claim full local WASM execution or already completed Portal submission.
