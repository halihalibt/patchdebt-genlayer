# Deployment and verification status

- Current status: source and local CPython harness only.
- The unit harness substitutes GenLayer APIs; passing tests do not establish GenVM compatibility.
- No deployed contract address, transaction hash, or on-chain execution is claimed.
- Before deployment: validate the source against the currently supported GenLayer SDK/runtime, run official GenVM tests, then deploy manually through GenLayer Studio and preserve the transaction receipt and contract address.
- Never place private keys or seed phrases in this repository.
