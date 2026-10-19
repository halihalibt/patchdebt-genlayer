# Manual Studio Execution Package — PatchDebt / halihalibt

Status: PENDING real execution. Do not use any unrelated project account or address.

## 1. File and network

Open https://studio.genlayer.com/ using your own test wallet/account. Select Stable Studionet, chain **61999**. Use Normal / Full Consensus, never Leader Only. No private key or seed phrase should be shared.

Import `contracts/migration_coverage.py` from this repository. Expected SHA256:

`f828966372c167491fb8e2a61be0d7d639b5170b1bd784ab01fa4bce93cf4aa3`

Class: MigrationCoverage. Constructor arguments: **none** (leave empty, do not enter `{}` or a string). Deploy once and wait for FINALIZED plus successful execution. If the Studio itself shows 403/1010 or a runtime error, stop and return that error, not repeated transactions. Do not use a different network as a substitute.

Return deployment transaction ID, deployed contract address, network/chain ID, full receipt, execution result, consensus result/votes and deployed source text (download/export). A successful deployment alone does not test the LLM path.

## 2. Two required assessment writes

Keep the same deployed contract and owner. `assess` takes exactly two strings: request_id and payload. Paste the JSON below as the payload's string VALUE; do not add extra quotation characters in Studio's string field. Do not use a view call or Leader Only to create evidence. Wait for each transaction before moving on.

### patchdebt-public-001

Method: `assess`

request_id: `patchdebt-public-001`

payload:

```json
{
  "package": "Pydantic BaseModel",
  "from_version": "1.x",
  "to_version": "2.x",
  "changes": [
    "Replace BaseModel.dict() with the V2 model_dump() method.",
    "Replace BaseModel.parse_obj() with the V2 model_validate() method."
  ],
  "guide": "Pydantic V1 | Pydantic V2\ndict() | model_dump()\nparse_obj() | model_validate()",
  "source_url": "https://docs.pydantic.dev/latest/migration/#changes-to-pydanticbasemodel"
}
```

Expected input SHA256: `5da5070d1fdfe0ce0e1f9c09032d6488bf47579ffc73c0327f527f2a072dbbe7`. Expected semantic result: COVERED / COVERED, aggregate COVERED. These are expectations, not recorded outcomes.

### patchdebt-gap-001

Method: `assess`

request_id: `patchdebt-gap-001`

payload:

```json
{
  "package": "Pydantic BaseModel",
  "from_version": "1.x",
  "to_version": "2.x",
  "changes": [
    "Replace BaseModel.dict() with the V2 model_dump() method.",
    "Replace BaseModel.parse_obj() with the V2 model_validate() method."
  ],
  "guide": "Pydantic V1 | Pydantic V2\ndict() | model_dump()",
  "source_url": "https://docs.pydantic.dev/latest/migration/#changes-to-pydanticbasemodel"
}
```

Expected input SHA256: `2f66e88c7134d6ea08b47b6199f3ab812b53192c4d5ac29923ebb34c8ac94e82`. Expected semantic result: COVERED / MISSING, aggregate DEBT. These are expectations, not recorded outcomes.

## 3. Read back both records (no signature)

For each ID, call `get_record(owner, request_id)`. `owner` is the actual sender of its assess transaction, written as 0x plus 40 hex characters. Use the exact request IDs above. Return the complete JSON strings, including input_sha256, input, assessment and state. `get_count(owner)` should be 2 after exactly two successful assessments. Extra previously accepted requests change that count; do not fabricate it.

Preserve both assessment transaction IDs, FINALIZED receipts, successful execution, consensus/votes, actual sender and full returned records. If a verdict differs, return the actual result and diagnostics. Do not repeat with new IDs merely to obtain the desired answer. Reusing the same ID/input returns the existing record without re-running the model; it is not an independent new assessment.

Minimum proposed signed operations: **3 total** (one deployment, two assessments). Read calls require no new transaction. Optional conflict validation uses examples/live/conflict.json and a new request ID only if a real-model discrepancy or reviewer requirement justifies another transaction.

## 4. Website authorization and remaining integration

Open https://github.com/halihalibt/patchdebt-genlayer/settings/pages . Under Build and deployment → Source choose **GitHub Actions**. The workflow already declares Pages/OIDC permissions; enabling Pages requires repository administration not exposed by the current connector. Do not create or disclose a PAT. After enabling, run the latest workflow once from https://github.com/halihalibt/patchdebt-genlayer/actions/workflows/pages.yml .

Return the three transaction IDs, contract address, actual sender, complete receipts/readbacks and confirmation Pages is enabled. The developer can then verify source identity, record actual evidence, update deployment.json and unlock product writes. At least one website wallet write and finalized readback must still be exercised after activation; those additional signatures cannot be pre-claimed. Browser desktop/mobile visual acceptance also remains pending because supported browser QA tooling is unavailable here.

This package does not authorize storing your keys and does not claim transactions already happened. Do not enter Portal until all missing gates are verified.
