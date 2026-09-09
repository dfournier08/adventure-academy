# Adventure Academy v0.4 update

Fixes requested after v0.3 testing:

1. Glam Quest now has a persistent **Adventure Hub** button so it can be exited without closing/reopening.
2. **Unlock All Worlds** continues to bypass progression locks, but unfinished worlds now contain a small interactive development sandbox instead of description-only placeholder pages.
3. Adds a root-level **Prize Center** where all Glam Quest section prizes, the Glam grand prize, and future world rewards can be configured before play.
4. Adds a safer **Reset Entire Game** control:
   - first warning dialog
   - then requires typing `RESET`
   - no data is erased unless both confirmations are completed
5. Keeps Firebase configuration untouched.

## Install

Copy the contents of this update folder into the existing Adventure_Academy project and replace matching files.

Then:

firebase serve --only hosting

Test:
- Adventure Hub -> Glam Quest -> Adventure Hub
- Grown-Up Settings -> Unlock All Worlds
- Open every unfinished world and try the sandbox interaction
- Prize Center save/load
- Reset warning (cancel it during testing unless you really intend to reset)

Then:

git add .
git commit -m "Fix navigation, testing mode, prize center, and reset safeguards"
git push
firebase deploy --only hosting
