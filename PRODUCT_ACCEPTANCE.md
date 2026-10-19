# Product validation

| Workflow | Evidence |
|---|---|
| Public site and resources | [PatchDebt](https://halihalibt.github.io/patchdebt-genlayer/); HTML, versioned JavaScript, logo, manifest, release identity and source resource checked |
| Deployed source identity | Exact SHA-256 match before contract access |
| Existing record lookup | Covered and missing-step records read and exported from finalized state |
| Wallet assessment | [Finalized successful transaction](https://explorer-studio.genlayer.com/tx/0x50d745ee7ddfc89fcbf54c849585ab870b4215d1ca73f456511502dea7f28d82) |
| Transaction binding | Actual product checked sender, destination, method, arguments, finality, Leader success and majority agreement |
| Saved result | Owner `0x49ce61764cca0c15a79e2d98baa535fc7547eb3a`, request `patchdebt-web-e2e-001`, COVERED / COVERED |
| Dossier export | [Actual receipt-bound download](evidence/WEBSITE_WALLET_DOSSIER.json) · [Screenshot](evidence/website-wallet-export.jpg) |
| Missing record | No success result; ledger and metadata cleared to UNASSESSED |
| Narrow-screen controls and console | [Maintainer-confirmed manual check](evidence/MANUAL_ACCEPTANCE.json): download successful, buttons working, no console errors |

Input SHA-256 for the wallet assessment: `5da5070d1fdfe0ce0e1f9c09032d6488bf47579ffc73c0327f527f2a072dbbe7`.

Automated tests cover pending persistence, no-resubmit behavior, rejected source identity, failed/unknown execution, insufficient votes and transaction mismatch. Offline fixtures remain explicitly labelled. [Validation scope and limitations](VALIDATION.md#validation-boundaries).
