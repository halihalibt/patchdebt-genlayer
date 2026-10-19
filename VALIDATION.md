# Validation boundary

- The root `index.html` is a static, offline-first demonstration workbench.
- The three case studies are authored fixtures; they are not AI judgments or chain results.
- Custom inputs intentionally do not receive a semantic verdict in offline mode.
- The browser export labels the evidence origin and hashes the canonicalized input.
- The contract source is copied from `halihalibt/migration-coverage-primitive`; its SHA-256 is recorded in `SOURCE_SHA256.txt`.
- Contract tests use mocked GenLayer interfaces under ordinary CPython. They do not establish GenVM compatibility.
- No deployment, transaction, wallet write, or live consensus is claimed.
