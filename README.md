# PatchDebt — Migration Coverage Desk

PatchDebt is an evidence-first workbench for reviewing whether a supplied migration guide accounts for a declared list of breaking changes. The UI uses an original CSS-rendered Starry Night-inspired field: cobalt and ultramarine swirls, a moonlit gold palette, layered night hills, and restrained motion.

## Live preview

The root `index.html` is a dependency-free static site suitable for GitHub Pages. The three selectable cases are authored offline fixtures. Editing custom inputs intentionally does not generate a semantic verdict; no model inference or chain execution is implied.

## Repository map

- `index.html` — complete responsive product UI, CSS art direction and local interactions.
- `intelligent-contract/contracts/migration_coverage.py` — canonical Intelligent Contract source, byte-identical to the primitive repository.
- `intelligent-contract/tests/test_contract.py` — CPython mock harness; not a GenVM test.
- `VALIDATION.md` — claims and verification boundaries.
- `VISUAL_DIRECTION.md` — design intent.
- `.github/workflows/pages.yml` — static GitHub Pages deployment workflow.

## Status

The UI is a local/offline preview until the Pages workflow succeeds. No contract deployment, transaction, wallet write, or live GenLayer consensus is claimed. Runtime compatibility and actual deployment remain pending.