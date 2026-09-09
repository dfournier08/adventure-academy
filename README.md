# Adventure Academy v0.1

This is the first modular scaffold for the learning platform.

## What is included

- Adventure Hub / world map
- Player profile
- Local progress storage
- Unlock engine
- Badge display
- Grown-up settings
- Testing unlock control
- Glam Quest v2 linked as World 1
- Preview modules for:
  - Leadership Academy
  - Detective Academy
  - Code Quest
  - Science Lab
  - Business Boulevard
  - Inventor Lab
  - Grandpa's Workshop
- Firebase Hosting configuration scaffold
- Firebase JavaScript integration placeholder

## Run locally

Because the project uses ES modules, the most reliable way to test locally is with a small local web server.

### Python
From this folder:

python -m http.server 8000

Then open:

http://localhost:8000

### VS Code
The Live Server extension also works well.

## Firebase Hosting

1. Create a Firebase project.
2. Install the Firebase CLI.
3. Sign in:
   firebase login
4. Copy `.firebaserc.example` to `.firebaserc`.
5. Replace `YOUR_FIREBASE_PROJECT_ID`.
6. Deploy:
   firebase deploy --only hosting

## Planned next development steps

1. Fully integrate Glam Quest v2 with the shared Adventure Academy profile.
2. Build Code Quest Level 1 as the second true playable world.
3. Add Firestore cloud sync.
4. Add Firebase Authentication, probably anonymous/player-code based first.
5. Add prize management and Grandpa project management to grown-up settings.
6. Add automatic GitHub-to-Firebase deployment after the repository is created.

## Important

Firebase credentials and project identifiers are intentionally not included yet.
