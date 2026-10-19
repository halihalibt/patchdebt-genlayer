# Validation checkpoint

| Layer | Result | Scope |
|---|---|---|
| CPython | VERIFIED — 24/24 | Substituted SDK, storage, model and consensus; validates ordering, quotes, malformed JSON/types, duplicate keys/changes/indices, idempotency, owner isolation, quota, disagreement and quote/reason audit rejection. |
| Official SDK Direct Mode | VERIFIED — 10/10 | genlayer-test 0.29.2, SDK from GenVM v0.2.16, native Python; real storage, Address formatting, hashes, production validator callbacks, errors and closure serialization; host/LLM and consensus are mocked. |
| Official linter | VERIFIED | genvm-linter 0.11.0, schema 3 methods; 3 advisory W004 ordinary exception warnings. |
| Full WASM GenVM | BLOCKED | No executor/Docker available; native Direct Mode is not a substitute. |
| Stable RPC | BLOCKED | Read-only POST HTTP 403 / Cloudflare 1010. |
| Real deployment/consensus | PENDING | No transaction sent, no deployed address. User Studio signing package is provided. |

The source checksum is independently calculated and stored in SOURCE_SHA256.txt. The initial checksum matched before edits; this release changes source and therefore has a new checksum. Evidence and limits must remain visible until actual onchain acceptance is recorded.
