# Product acceptance

Canonical SHA256: `f828966372c167491fb8e2a61be0d7d639b5170b1bd784ab01fa4bce93cf4aa3`. Contract: `0x724AcFe201463a016f59aC41516D99ab789a5c34`. Stable Studionet, configured chain ID 61999. No redeployment, duplicate assessment or Portal submission occurred.

| Acceptance gate | State | Evidence / limitation |
|---|---|---|
| A/B full contract and tests byte equality | VERIFIED | Independent local bytes comparison and SHA256; 8916 source bytes |
| CPython harness | VERIFIED | 24 tests; mocks, not GenVM |
| Official SDK Direct Mode | VERIFIED | 10 tests in prior runtime audit; native Python, not full WASM |
| Full local WASM GenVM | PENDING | Not executed; no such claim |
| Deployed source identity | VERIFIED | Website Verify Source and Explorer deployment code bytes match canonical hash |
| Existing deployment and 2 assess transactions | VERIFIED | Official Explorer DOM: FINALIZED / SUCCESS / Return / Normal / Accepted |
| Both finalized website get_record reads | VERIFIED | Actual public website exports in B evidence/; exact IDs, hashes and ordered findings |
| get_count(owner)=2 | PENDING | Original user report preserved; not independently queried |
| Production frontend build | VERIFIED | 19 frontend tests passed; not evidence of wallet E2E |
| Public Pages release | VERIFIED | Run 39300248515 succeeded for 1a84985e735d18cc14f876431ed9deebfd1fc444; published release.json independently matches that commit/run |
| Missing-record live handling | VERIFIED | Actual absent request returns no finalized record; query clears prior ledger and metadata; automated and final live browser checks recorded |
| Live source-mismatch / RPC outage injection | PENDING | Unit rejection tests pass; original actual RPC failure displayed an error, never success; no fabricated live fault test |
| Desktop controls / resource loading | VERIFIED | Actual Verify Source, both record queries, exports and absent query; six public resources HTTP 200 |
| Mobile layout | PENDING | Responsive CSS retained; no mobile viewport rendering acceptance performed |
| Wallet availability | BLOCKED | Actual CONNECT WALLET: Install an EIP-1193 browser wallet |
| New website-wallet assessment / pending reload / tx-bound dossier | BLOCKED | Requires wallet in user's browser; no new transaction was sent |

Explorer observations are independent UI observations, not raw JSON-RPC receipt/vote exports. Each assessment displayed 3 agree and 2 idle votes. Existing website dossiers originate from finalized contract reads and do not falsely claim to contain a transaction receipt. Original Studio reports remain separately labelled USER_PROVIDED_STUDIO_RESULTS.

The current node API requires `status: "finalized"` for gen_call. SDK 1.1.8 emitted only the legacy transaction_hash_variant; real website reads returned Contract not found. The adapter now sends the documented status explicitly using SDK calldata encoding/decoding; both real reads subsequently passed. Official reference: https://docs.genlayer.com/api-references/genlayer-node/gen/gen_call . Checksum addresses are retained. A real absent query exposed a stale visible ledger; the query now clears prior results before reading. Contract business logic and visual design are unchanged.

Pending recovery, sender/destination/method/arguments binding, failed execution and duplicate blocking have automated coverage, not live wallet proof. Do not infer product-wallet success from prior Studio transactions. LLM semantic judgment is probabilistic and does not prove compatibility, source authenticity or completeness of declared changes.

## Existing record checks

| Request | State | Ordered findings | Input SHA256 |
|---|---|---|---|
| patchdebt-public-001 | COVERED | COVERED, COVERED | 5da5070d1fdfe0ce0e1f9c09032d6488bf47579ffc73c0327f527f2a072dbbe7 |
| patchdebt-gap-001 | DEBT | COVERED, MISSING | 2f66e88c7134d6ea08b47b6199f3ab812b53192c4d5ac29923ebb34c8ac94e82 |

The two WEBSITE_*_DOSSIER.json files were exported by actual published product controls after successful finalized get_record reads. Their evidence origin is FINALIZED CONTRACT READ; they contain no invented transaction receipt. pages-resource-check.json records independent HTTP resource responses and release identity.

In a browser with your Studionet wallet, open https://halihalibt.github.io/patchdebt-genlayer/ , Verify Source, Connect Wallet on chain 61999, Load Public Doc Input, enter a fresh request ID `patchdebt-web-e2e-001` (query first; if already used choose a new ID), and approve exactly one assessment. Recheck until finalized, export its dossier and return the transaction hash plus dossier. If submission is uncertain, recover and attach the original transaction ID; never resubmit. No private key or seed phrase is needed. This product-wallet transaction has NOT yet occurred.

Final browser observation: https://github.com/halihalibt/patchdebt-genlayer/blob/main/evidence/WEBSITE_BROWSER_ACCEPTANCE.json . Screenshot: https://github.com/halihalibt/patchdebt-genlayer/blob/main/evidence/website-finalized-record.jpg . Published HTML loads app.js?v=25534560bb12b9bd, matching bundled bytes. An unversioned script cache was found during acceptance and fixed by adding a build-time content hash. Final absent query returned no record with empty metadata/ledger and UNASSESSED; final wallet check found no EIP-1193 provider and SIGN ASSESSMENT disabled.
