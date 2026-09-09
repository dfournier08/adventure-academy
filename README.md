# Adventure Academy v0.3 Update

This update modifies Glam Quest only.

## New learning-support features
- Read Page button for spoken directions
- Auto-read directions setting
- Read Question button that reads the question and choices
- Hint button for Math and Logic / Problem Solving
- Show Me How button unlocks 3 minutes after Hint
- Step-by-step solution support
- If Show Me How is used, the question returns later and points are awarded only after an independent correct retry
- Help usage is tracked in Grown-Up Settings and printed on section tickets

## Install
Copy the contents of this update folder into the root of your existing Adventure_Academy project and replace matching files.

Then test:
`firebase serve --only hosting`

Commit:
`git add .`
`git commit -m "Add spoken directions and guided problem solving"`
`git push`

Deploy:
`firebase deploy --only hosting`
