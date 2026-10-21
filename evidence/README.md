# Evidence index

| Evidence | Format and provenance |
|---|---|
| [Deployment and two Studio assessments](EXPLORER_VERIFICATION.json) | Independently observed official Explorer UI; includes exact returned records and source identity |
| [Website-wallet assessment](WEBSITE_WALLET_TRANSACTION.json) | Independent Explorer observation with sender, destination, method, request and findings |
| [Receipt-bound product dossier](https://github.com/halihalibt/patchdebt-genlayer/blob/main/evidence/WEBSITE_WALLET_DOSSIER.json) | Actual public-product download; includes the RPC transaction receipt and matching finalized record |
| [Original Studio report](STUDIO_REPORTED_EVIDENCE.json) | Original maintainer report, preserved separately from independent evidence |

The exported dossier has origin `FINALIZED TRANSACTION + RECORD`. The original covered/gap product exports in the application repository have origin `FINALIZED CONTRACT READ`; they do not claim receipt binding. Evidence files retain their original capture context rather than being relabelled as newer tests.

## Revision desk / release 0.4

- [Public-product comparison export](REVISION_COMPARISON.json): downloaded from release `97f4e46d4dbe5ed8dcaa5a64f5c8c2501a120c3a` after fresh read-only verification of both historical records and their transactions on 2026-10-21.
- [Comparison screenshot](revision-comparison.jpg): the same public-page comparison, showing one resolved obligation, no regressions and two transaction-bound record checks.
- [Build and Pages deployment](https://github.com/halihalibt/patchdebt-genlayer/actions/runs/39589647294): successful production build and deployment for that release.

The two underlying assessments predate this feature. This evidence demonstrates the new comparison, verification and export workflow; it does not claim a new assessment transaction, a chronological revision session or external adoption. The downloaded report was imported back into the public product, where hashes and record consistency were checked and previous live verification claims were not inherited. Refresh restored the snapshots and required fresh verification. Editing the baseline restored its input and generated a new request ID without submitting a transaction.
