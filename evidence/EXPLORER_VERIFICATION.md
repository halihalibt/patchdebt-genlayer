# Independently observed Studio Explorer evidence

VERIFIED by actual Explorer browser UI on 2026-10-19, not a fabricated JSON-RPC receipt or consensus export. See [structured observations](EXPLORER_VERIFICATION.json).

All three existing transactions displayed FINALIZED / SUCCESS / Return / Normal / Accepted. Both assess calls bind the reported sender, destination, method, request IDs and input payloads. The two returned records match the supplied hashes and ordered statuses exactly. Both visible vote maps show 3 agree and 2 idle; this is not a claim that every validator voted agree.

Deployment code copied from the Explorer DOM is exactly 8916 bytes and byte-identical to canonical source, SHA256 f828966372c167491fb8e2a61be0d7d639b5170b1bd784ab01fa4bce93cf4aa3. The live website Verify Source also passed.

Explorer transaction return values are distinct from a fresh finalized get_record website read. User-provided get_count(owner)=2 remains reported, not independently read back. No new transaction was sent. Full local WASM GenVM execution was not performed.
