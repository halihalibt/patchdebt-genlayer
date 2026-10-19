# PatchDebt — Migration Coverage Desk

PatchDebt reviews whether a supplied migration guide provides actionable instructions for each declared software change. It makes documentation debt visible with exact quotations, explanations, version-bound input hashes and independently validated GenLayer records. It does not prove software compatibility, source authenticity or completeness of the supplied change list.

**Release 0.3 candidate — NOT submission-ready.** No deployed address or real consensus result exists. A source-bound SDK adapter is implemented and tested with mocks, but live writes remain locked until deployment acceptance is recorded. [Acceptance status](VALIDATION.md) · [Manual Studio package](intelligent-contract/MANUAL_STUDIO_EXECUTION.md) · [Projects draft](SUBMISSION_PROJECTS.md).

## Try the interface

The existing cobalt/ultramarine and moonlight-gold CSS starfield is retained. Three authored examples illustrate COVERED, MISSING and CONFLICT. They are labelled offline and never run inference. Editing inputs clears results. Export preserves evidence origin and computes a Python-compatible canonical SHA256, including Unicode.

The Chain Desk loads a short public Pydantic migration-table input (not a verdict), verifies deployed source SHA256 before binding, reads finalized records without a wallet, and supports EIP-1193 wallets. A deployment manifest must record verified acceptance before signing is enabled. It stores publicly submitted text onchain; keys remain in the wallet.

A pending submission is saved before signing and survives refresh. Recheck only reads. Ambiguous submission outcomes block retries until the original ID is recovered. Completion requires finality, successful execution, majority agreement, sender/recipient/method/argument binding and the exact saved record. A merely ACCEPTED transaction is not complete. Finalized failure clears the pending lock without showing success. Reads have a 20-second timeout and no automatic repeated submission.

## Run

Node 22+, Python 3.12:

```sh
npm ci --no-audit --no-fund
npm run check:source
npm test
npm run build
```

Serve `dist/` using a static host. `index.html` is the source template; `app.js` is generated into `dist/` by the build. Opening the source HTML alone is not the built application. Dependencies are pinned: genlayer-js 1.1.8, esbuild 0.25.12, jsdom 26.1.0.

## Publication

The workflow tests and builds B, uploads its Pages artifact, then deploys. Pages must first be enabled with Source = GitHub Actions at the repository's Settings → Pages. The currently observed site URL returned HTTP 404; no public publication success is claimed. The expected URL, **not yet verified live**, is https://halihalibt.github.io/patchdebt-genlayer/ . Failed historical Configure Pages logs returned Not Found; ordinary GITHUB_TOKEN cannot enable Pages without the required external administration permission.

Only this repository owns product source. The earlier privately hosted prototype is not the submission website or this release.

## Contract and logo

`intelligent-contract/contracts/migration_coverage.py` is a complete byte-identical copy of [Repository A](https://github.com/halihalibt/migration-coverage-primitive), including tests, runtime audit and manual execution instructions. `SOURCE_SHA256.txt` verifies content SHA256, not Git blob SHA.

`assets/patchdebt-logo.png`: original orbital PD monogram and gold star, 1024×1024 PNG, below 2 MB; SVG source included. Responsive layout and reduced-motion CSS retained. Full browser layout, console and mobile verification are PENDING; jsdom checks actual control events but does not render the design.

MIT License.
