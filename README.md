# PatchDebt — Migration Coverage Desk

PatchDebt reviews whether a supplied migration guide provides actionable instructions for each declared software change. It makes documentation debt visible with exact quotations, explanations, version-bound input hashes and independently validated GenLayer records. It does not prove software compatibility, source authenticity or completeness of the supplied change list.

**Release 0.3 — source and existing finalized records VERIFIED; product-wallet E2E BLOCKED.** Actual public website: https://halihalibt.github.io/patchdebt-genlayer/ . Deployed source matches canonical bytes. Both existing records were read and exported through the real product; all three existing transactions were independently observed in the official Explorer. No new wallet transaction has been sent. [Acceptance matrix](FINAL_READINESS_REPORT.md) · [Projects draft](SUBMISSION_PROJECTS.md).

## Try the interface

The existing cobalt/ultramarine and moonlight-gold CSS starfield is retained. Three authored examples illustrate COVERED, MISSING and CONFLICT. They are labelled offline and never run inference. Editing inputs clears results. Export preserves evidence origin and computes a Python-compatible canonical SHA256, including Unicode.

The Chain Desk loads a short public Pydantic migration-table input (not a verdict), verifies deployed source SHA256 before binding, reads finalized records without a wallet, and supports EIP-1193 wallets. The manifest is VERIFIED_ONCHAIN after independent source/record acceptance. Signing still requires a connected Studionet wallet. Product-wallet E2E remains blocked in the acceptance browser, which has no wallet provider. It stores publicly submitted text onchain; keys remain in the wallet.

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

The workflow tests, builds and publishes B through GitHub Pages. Run 39300248515 succeeded on 1a84985e735d18cc14f876431ed9deebfd1fc444. Final public release.json matches that commit/run; evidence/pages-resource-check.json records all six HTTP 200 responses. Six public resources returned HTTP 200, including HTML, bundled JS, logo, manifest, release identity and canonical source. Pages is enabled; older Pages/preview blockers are historical and do not describe the current public site.

## Contract and logo

`intelligent-contract/contracts/migration_coverage.py` is a complete byte-identical copy of [Repository A](https://github.com/halihalibt/migration-coverage-primitive), including tests, runtime audit and manual execution instructions. `SOURCE_SHA256.txt` verifies content SHA256, not Git blob SHA.

`assets/patchdebt-logo.png`: original orbital PD monogram and gold star, 1024×1024 PNG, below 2 MB; SVG source included. Responsive layout and reduced-motion CSS retained. Actual desktop source/record/export controls passed. No application console errors were observed in the successful read session (browser-extension metadata errors are separate). Mobile rendering remains PENDING; jsdom does not prove visual layout.

MIT License.
