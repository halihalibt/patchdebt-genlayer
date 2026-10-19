# Verification boundary — v0.3 candidate

| Check | State | Evidence |
|---|---|---|
| Frontend tests | VERIFIED — 17/17 locally | Node tests include Python/JS hash parity, quote/count/order checks, record binding, source mismatch, write gating, duplicate/uncertain submission recovery, unrelated transaction rejection, pending state, terminal execution failure, actual UI case/edit events and pending deployment controls. |
| Build | VERIFIED locally | esbuild emits static site and bundled pinned SDK. No runtime secret needed. |
| Canonical source | VERIFIED locally | Included full source and test files byte-identical to A, actual SHA256 independently computed. |
| Contract CPython | VERIFIED — 24/24 | Substituted SDK/storage/model/consensus. |
| Official SDK Direct | VERIFIED — 10/10 | Native runner SDK/storage + mocked host. Not WASM or network. See intelligent-contract/RUNTIME_AUDIT.md. |
| Full GenVM, deployment, wallet E2E | BLOCKED / PENDING | No full executor; RPC HTTP 403/1010; no user signature or live address. |
| GitHub Pages | BLOCKED at recovery | Historical Configure Pages failed Not Found; expected site returned 404. Administration setting is required. New workflow results must be inspected separately. |
| Existing PatchDebt hosting | VERIFIED publication; PENDING independent access | Saved version 2 deployed successfully, public access confirmed through hosting API. External HTTP resource requests returned 403; no browser/resource success is claimed. |
| Desktop/mobile visual, console, public asset checks | PENDING | Supported browser automation capability unavailable. No browser was installed or substituted to invent visual QA. |

No fixture, mock receipt, offline hash or local SDK result establishes real chain consensus. `deployment.json` remains PENDING_DEPLOYMENT and locks live signing. The live adapter can be activated only after source identity and actual deployment/assessment evidence are independently verified. See RELEASE_STATUS.md for observed GitHub checks.
