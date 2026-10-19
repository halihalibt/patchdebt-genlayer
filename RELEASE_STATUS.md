# Release status

Candidate v0.3, owner halihalibt. Both repositories are public. The recovery baseline was A 9392a7acffc4c9fe1d70caa42ab1c3004a831d71 and B 23a1dae6bfef42b7c0b17770ab36772447c2504a.

Historical A run 39281282311 initially had no runner assigned and was queued; later it completed successfully. This was a transient queue, not proof of source failure. The historical B runs settled as failures/cancellations. B job 118153430684 ran static checks successfully and failed at Configure Pages with Not Found. No retry can substitute for enabling Pages.

New source changes require the new Contract Checks run to be inspected after push. Local tests have passed; no claim is made about a future CI run. Final main commits are available from GitHub rather than guessed inside their own contents.

Deployment and full GenVM acceptance remain blocked/pending as described in VALIDATION.md. No Portal action has been taken.
