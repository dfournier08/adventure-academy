# Adventure Academy v0.4.2 Routing Hotfix

Fixes Firebase Hosting clean-URL behavior that caused:
- Glam Quest's embedded game to show a 404
- Code Quest to load without CSS/JavaScript

Cause:
Firebase serves `/worlds/glam/index.html` as `/worlds/glam` and `/worlds/code/index.html` as `/worlds/code`.
Relative asset paths then resolved from the wrong directory.

Fix:
Critical asset paths now use root-absolute URLs.

Install:
1. Copy this update into the existing Adventure_Academy folder and replace matching files.
2. Run: firebase serve --only hosting
3. Test:
   http://localhost:5000/worlds/glam
   http://localhost:5000/worlds/code
4. Then:
   git add .
   git commit -m "Fix Firebase routing for Glam and Code Quest"
   git push
   firebase deploy --only hosting
