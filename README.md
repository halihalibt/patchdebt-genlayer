# PatchDebt — Migration Coverage Desk

PatchDebt turns software migration obligations into an evidence ledger. Compare a guide with an explicit change list, inspect exact quotations and explanations, and export a finalized GenLayer assessment with its transaction evidence.

**[Open PatchDebt](https://halihalibt.github.io/patchdebt-genlayer/)** · [Usage](USAGE.md) · [Deployment](DEPLOYMENT.md) · [Evidence](evidence/README.md) · [Validation](VALIDATION.md)

## Review a migration

1. Enter the package, old/new versions, declared changes, guide text and source URL.
2. Verify the deployed source in **Chain desk**, then connect a Studionet wallet for a new assessment.
3. Submit with a unique request ID and wait for finalized execution and agreement.
4. Inspect the ordered findings, quotations and explanations; export the dossier with its input hash and evidence.

Existing records can be read without a wallet. Manifest-linked records also verify the transaction sender, destination, method, arguments, finality, execution and majority agreement before exporting a receipt-bound dossier. Pending submissions persist locally; rechecking only reads and never resubmits.

## Evidence model

| Finding | Meaning |
|---|---|
| `COVERED` | The supplied guide gives a concrete migration action. |
| `MISSING` | A declared obligation lacks an actionable step. |
| `CONFLICT` | The supplied advice contradicts the declared change. |
| `UNKNOWN` | The supplied material is insufficient or ambiguous. |

The three authored interface examples are labelled **offline fixtures** and never represent live inference or consensus. Custom text is assessed through the contract, not by the fixture viewer.

## Live deployment

Stable GenLayer Studionet · chain ID **61999** · contract `0x724AcFe201463a016f59aC41516D99ab789a5c34`.

Source verification, finalized record reads, a real website-wallet assessment and transaction-bound JSON export have been exercised on the public application. Desktop and Chrome narrow-screen checks covered source verification, record lookup, JSON download, controls and the application console. [Testing](VALIDATION.md).

## Run locally

Node 22+ and Python 3.12:

```sh
npm ci --no-audit --no-fund
npm run check:source
npm test
npm run build
```

Serve `dist/` with a static web server. `index.html` is the source template; the build generates the JavaScript bundle and binds it to its content hash. GitHub Actions tests, builds and publishes the application through Pages. The public [release identity](https://halihalibt.github.io/patchdebt-genlayer/release.json) identifies the deployed commit and workflow run.

## Repository guide

| Path | Contents |
|---|---|
| `src/` | Input validation, wallet/RPC integration and evidence presentation |
| `intelligent-contract/` | Complete contract source, tests and runtime documentation |
| `examples/live/` | Public-document inputs and clearly labelled negative fixtures |
| `evidence/` | Recorded readbacks, transaction dossier and verification provenance |
| `assets/` | Original PatchDebt logo and vector source |

The contract copy is byte-identical to [Migration Coverage Primitive](https://github.com/halihalibt/migration-coverage-primitive); SHA-256 `f828966372c167491fb8e2a61be0d7d639b5170b1bd784ab01fa4bce93cf4aa3`. The logo is a 1024 × 1024 PNG, 189,067 bytes. The cobalt-and-gold interface supports reduced motion; see [design notes](docs/DESIGN.md).

## Scope

PatchDebt evaluates documentation coverage. It does not prove software compatibility, authenticate a source URL or establish that the supplied change list is complete. Semantic judgments remain model-dependent. Guides and change lists submitted onchain are public. Wallet keys remain in the wallet.

MIT licensed. [License](LICENSE).
