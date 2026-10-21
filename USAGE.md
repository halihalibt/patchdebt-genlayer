# Usage

## Network and contract

Stable GenLayer Studionet, chain ID **61999**, RPC `https://studio.genlayer.com/api`.

Contract: `0x724AcFe201463a016f59aC41516D99ab789a5c34`. Constructor: no arguments. Canonical source SHA-256: `f828966372c167491fb8e2a61be0d7d639b5170b1bd784ab01fa4bce93cf4aa3`.

## Input

`assess(request_id, payload)` takes two strings. The payload is a JSON object with exactly these keys:

| Field | Constraint |
|---|---|
| `package` | 1–100 characters |
| `from_version`, `to_version` | 1–100 characters each; must differ |
| `changes` | 1–8 unique obligations; 8–500 characters each |
| `guide` | Exact supplied guide snapshot; 1–10,000 characters |
| `source_url` | HTTPS reference; 9–500 characters |

The complete payload is 20–18,000 characters. Request IDs contain 1–64 ASCII letters, digits, underscores or hyphens. Blank required fields, duplicate JSON keys and invalid text are rejected. The source URL is recorded as a reference; the contract does not fetch or authenticate it.

A successful record is immutable for its owner/request ID. Identical input returns the existing record without a new model assessment; different input under that ID is rejected. The per-owner limit is 64 records.

## Read a published example

Open [PatchDebt](https://halihalibt.github.io/patchdebt-genlayer/), select **VERIFY SOURCE**, and use:

| Field | Value |
|---|---|
| Record owner | `0x49ce61764cca0c15a79e2d98baa535fc7547eb3a` |
| Request ID | `patchdebt-web-e2e-001` |

Select **READ FINALIZED RECORD**. The saved aggregate is `COVERED`, with two `COVERED` findings. **EXPORT DOSSIER** downloads the record, input hash and verified transaction evidence. Reading and exporting this existing assessment do not require a signature.

## Create an assessment

Enter the package versions, explicit obligations and guide text. Verify source, connect an EIP-1193 wallet on Studionet, choose a new request ID and select **SIGN ASSESSMENT**. Review the public data before signing. Use **RECHECK / READ ONLY** to inspect the transaction without resubmitting.

Completion requires finality, successful Leader execution, majority agreement, exact transaction binding and a matching finalized record. A pending or merely accepted transaction is not a completed assessment. If the submission outcome is uncertain, recover its original transaction ID and attach it before rechecking; do not send another transaction to recover the first one.

## Output

Records include `protocol`, `owner`, `request_id`, `input_sha256`, `input`, ordered `assessment.items` and aggregate `state`. Each finding has an index, status, verbatim quotation (where applicable) and explanation. Dossiers identify whether their origin is an offline fixture, finalized contract read or finalized transaction plus record.

## Revision workflow

Save an assessed baseline in **Revision desk**, choose **EDIT BASELINE GUIDE**, edit the guide and assess it under the new request ID. Save the finalized revision and select the pair to compare. **LOAD RECORDED EXAMPLE** starts with historical Pydantic records without a wallet. **VERIFY SELECTED PAIR / READ ONLY** checks both records after source verification. [Full instructions, import/export and comparison boundaries](docs/REVISIONS.md).
