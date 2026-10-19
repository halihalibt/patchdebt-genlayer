# Deployment

| Property | Value |
|---|---|
| Network | Stable GenLayer Studionet |
| Chain ID | 61999 |
| Contract | `0x724AcFe201463a016f59aC41516D99ab789a5c34` |
| Source SHA-256 | `f828966372c167491fb8e2a61be0d7d639b5170b1bd784ab01fa4bce93cf4aa3` |
| Source identity | Verified from the deployed source and canonical file |

## Recorded transactions

| Operation | Evidence | Result |
|---|---|---|
| Deployment | [Transaction](https://explorer-studio.genlayer.com/tx/0xfe07e2f31b1daa8ab577ad15ad6de2538c8ade6f782b97da31605581678d8387) | FINALIZED / SUCCESS |
| Guide covers both obligations | [Transaction](https://explorer-studio.genlayer.com/tx/0xb9d04723fbfab34f971d1608cad2742207ec7691ca9f5c70a11a260db4e9a30b) | COVERED; COVERED / COVERED |
| Guide omits one obligation | [Transaction](https://explorer-studio.genlayer.com/tx/0x2e7a9f227f9178725bbc4f86ebcf634e6570fbc24830b547e72011e5a5108a58) | DEBT; COVERED / MISSING |
| Website-wallet assessment | [Transaction](https://explorer-studio.genlayer.com/tx/0x50d745ee7ddfc89fcbf54c849585ab870b4215d1ca73f456511502dea7f28d82) | COVERED; COVERED / COVERED |

All four transactions were independently inspected in the official Explorer as FINALIZED / SUCCESS / Return / Normal / Accepted. The website-wallet assessment also has a [product-exported dossier](https://github.com/halihalibt/patchdebt-genlayer/blob/main/evidence/WEBSITE_WALLET_DOSSIER.json) with the actual receipt and saved record. [Evidence and provenance](evidence/README.md).

The original two assessments belong to `0x22acaa233b7b985b36ef168f2de9295334065b15`; the website-wallet assessment belongs to `0x49ce61764cca0c15a79e2d98baa535fc7547eb3a`. Their owner namespaces and record counts are separate.
