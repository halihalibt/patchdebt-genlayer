# Comparing migration-guide revisions

Revision desk turns individual assessments into a repeatable review workflow. It compares two guide snapshots against the same explicit obligations and preserves the evidence behind each outcome.

## Quick start without a wallet

1. Open **Revision desk** and select **LOAD RECORDED EXAMPLE**.
2. Inspect the baseline and revised guide side by side. Highlighted text is verbatim assessment evidence, not a textual diff.
3. The Pydantic example retains coverage of `dict()` and changes the `parse_obj()` obligation from `MISSING` to `COVERED`: one resolved gap, no regressions, no open obligations.
4. In **Chain desk**, select **VERIFY SOURCE**. Return to Revision desk and select **VERIFY SELECTED PAIR / READ ONLY** to check the two saved records and their manifest-linked transactions.
5. Select **EXPORT COMPARISON** for both snapshots, hashes, item transitions, aggregate counts and the current session's verification scope.

The example uses historical records `patchdebt-gap-001` and `patchdebt-public-001`. It reconstructs a before/after comparison of two guide variants. Their ordering in the UI does not claim that the original transactions formed a chronological edit-and-resubmit session. The files are copies of the existing website readback dossiers; no new assessment is implied by loading them.

## Review your own revision

1. Read a finalized assessment through Chain desk, then select **SAVE CURRENT ASSESSMENT** in Revision desk.
2. Choose it as **BEFORE / BASELINE** and select **EDIT BASELINE GUIDE**. This restores the original scope in the editor and generates a fresh request ID.
3. Edit the guide. Verify source, connect your Studionet wallet and submit the new assessment. Recheck until a successful finalized record is loaded.
4. Save the revised assessment, select it as **AFTER / REVISED**, inspect the transitions and verify the pair.
5. Export the comparison. Existing dossiers and exported comparisons can also be imported from a JSON file up to 2 MB.

New assessments publish the supplied guide and obligations on Studionet. Reading existing records, comparing and exporting do not send transactions. A pending assessment must be resolved before another is submitted.

## Comparison rules

Package, old/new versions, source URL and the set of obligation strings must match exactly. Reordering obligations is supported; adding, deleting or rewriting an obligation requires a separate comparison scope. Record snapshots must use the same contract, and record snapshots cannot be mixed with offline fixtures.

| Transition | Display |
|---|---|
| Any non-covered finding → `COVERED` | `RESOLVED` |
| `COVERED` → any non-covered finding | `REGRESSED` |
| `COVERED` → `COVERED` | `STILL COVERED` |
| Same non-covered status | `STILL OPEN` |
| Different non-covered statuses | `CHANGED / OPEN` |

A resolved status means that the later assessment labels the obligation covered. It is not an independent proof of semantic correctness. If guide text is identical, the UI explicitly warns that differing judgments do not establish a documentation fix. Neither comparison nor coverage proves software compatibility or completeness of the obligation list.

## Evidence and persistence

The shelf holds up to 12 snapshots in this browser's local storage. Hashes, quotation membership, aggregate states and embedded record consistency are validated on import and restoration. Imported claims of live verification are discarded. A new session requires a fresh verification read; file contents alone do not establish chain provenance.

Fresh verification checks the deployed source binding, owner/request namespace and exact finalized saved record. When a transaction hash is available from a dossier or the deployment manifest, sender, contract, method, arguments, finality, execution and agreement must also pass. Without a transaction hash, the result is labelled **FINALIZED RECORD READ**, not transaction-verified.

Clearing the shelf removes only browser-local snapshots. Export a portable copy before clearing or changing browsers. Importing a comparison revalidates and reconstructs its outcomes; it never inherits its previous session's verification status.
