# Public-document acceptance inputs

`covered.json` contains two rows transcribed as plain text from Pydantic's official V1→V2 migration table, fetched 2026-10-19 UTC. The source URL redirects to the official current documentation. The declared change list is our bounded checklist, not a claim that those are all changes, or that the V1 methods have vanished (some remain deprecated).

`missing.json` deliberately truncates that supplied excerpt to one row, to test missing guidance for the second obligation. It is NOT the complete official migration guide and must not be presented as evidence that Pydantic's guide is defective.

`conflict.json` is an explicitly authored negative fixture contradicting that migration, not Pydantic's advice; its URL points to this repository's fixture. These files are inputs, not real chain results. Expected states describe fixture expectations. Actual executed outcomes are recorded separately in the repository evidence index.
