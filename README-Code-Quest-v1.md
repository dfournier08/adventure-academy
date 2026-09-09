# Code Quest v1 — Adventure Academy update

Adds the first fully playable non-Glam world.

## Structure
5 sections × 10 coding challenges = 50 activities.

1. Sequences
2. Turns & Paths
3. Loops
4. Conditions
5. Debugging

## Features
- Click-to-build command programs
- Visual movement grid
- Run/test loop
- Spoken page and question directions
- Auto-read option
- Hint button
- Show Me How button locked for 3 minutes after a hint
- If Show Me How is used, the challenge must be solved again independently before points are awarded
- Hint/solve statistics
- Section tickets
- Code Explorer badge
- Shared Adventure Academy completion update
- Reads the Code Quest world prize from the existing Prize Center

## Install
Copy the `worlds/code` folder from this update over the existing `Adventure_Academy/worlds/code` folder.

Then test:
firebase serve --only hosting

When satisfied:
git add .
git commit -m "Build Code Quest v1 with five coding sections"
git push
firebase deploy --only hosting
