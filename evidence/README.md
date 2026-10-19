# Evidence index

| Evidence | Format and provenance |
|---|---|
| [Deployment and two Studio assessments](EXPLORER_VERIFICATION.json) | Independently observed official Explorer UI; includes exact returned records and source identity |
| [Website-wallet assessment](WEBSITE_WALLET_TRANSACTION.json) | Independent Explorer observation with sender, destination, method, request and findings |
| [Receipt-bound product dossier](https://github.com/halihalibt/patchdebt-genlayer/blob/main/evidence/WEBSITE_WALLET_DOSSIER.json) | Actual public-product download; includes the RPC transaction receipt and matching finalized record |
| [Original Studio report](STUDIO_REPORTED_EVIDENCE.json) | Original maintainer report, preserved separately from independent evidence |
| [Chrome narrow-screen check](MANUAL_ACCEPTANCE.json) | Maintainer-reported browser controls, download and console results |

The exported dossier has origin `FINALIZED TRANSACTION + RECORD`. The original covered/gap product exports in the application repository have origin `FINALIZED CONTRACT READ`; they do not claim receipt binding. Evidence files retain their original capture context rather than being relabelled as newer tests.
