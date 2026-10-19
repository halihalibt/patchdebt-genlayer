# Runtime compatibility

Target: Stable Studionet, 61999, `https://studio.genlayer.com/api`. Fixed source runner: `py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6`; inspected from official `genvm-universal` v0.2.16, SDK dependency `py-lib-genlayer-std:11rhn002yfajawsz7fai6mykznbxkxs6l91iskj5cm82c92qhy3v`.

| API | Evidence / finding |
|---|---|
| `gl.Contract`, TreeMap annotations, `u256`, decorators | Official SDK schema extraction succeeds: no-arg constructor, 1 write and 2 view methods. Real SDK native storage round trip passes. |
| `gl.message.sender_address` | Official Message field is Address. `Address.__str__` yields a checksum hex address; `.lower()` matches the 0x + 40 lowercase hex owner verified in Direct tests. Raw test fixture addresses are bytes and must not be stringified as Python bytes repr. |
| `exec_prompt(..., response_format='json')` | Pinned SDK supports JSON config and returns decoded dict. Local tests exercise this signature through real SDK and mocked host. String fallback is normalized to JSON text. |
| `run_nondet_unsafe(leader, validator)` | Callback receives `Return(calldata=decoded_value)` on success, VMError/UserError otherwise. It returns decoded leader data eagerly through the lazy API wrapper. `False` validator causes disagreement, not a stored result. |
| `gl.vm.Return.calldata` | Pinned SDK dataclass and actual Direct validator tests verified. Non-Return inputs reject. |
| `hashlib`, JSON, encoding, storage | Real native SDK tests verify canonical SHA256, persistence, idempotence and public reads; linter accepts the types. Full WASM resource usage is unverified. |
| Closure transport | Production Leader and Validator closure cloudpickle round trips pass in native Python using cloudpickle 3.1.1. This does not execute a GenVM sandbox. |

Official linter 0.11.0 `check` passes with three W004 warnings for ordinary ValueError in write methods. These are advisory; malformed inputs fail before storage writes. The runtime test does not prove full transaction rollback or memory/time bounds in WASM.

## Execution scope

The pinned SDK schema, storage and callbacks were checked natively; the deployed contract was additionally exercised on Stable Studionet with successful finalized transactions. [Deployment evidence](../DEPLOYMENT_STATUS.md) and [validation](../VALIDATION.md) distinguish these layers. Full local WASM execution, universal model accuracy and WASM resource bounds are not established by native tests.

## Official references

- https://docs.genlayer.com/developers/intelligent-contracts/features/calling-llms
- https://docs.genlayer.com/developers/intelligent-contracts/features/non-determinism
- https://docs.genlayer.com/api-references/genlayer-test/direct
- https://docs.genlayer.com/developers/intelligent-contracts/tooling-setup
- https://docs.genlayer.com/developers/networks

A pinned runner header identifies the source dependency; it does not identify every live node binary version.
