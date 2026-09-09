/*
Firebase integration scaffold.

When we connect your Firebase project, this module will:
1. initialize Firebase
2. sign in the player (likely anonymous auth first)
3. sync profile/progress with Firestore
4. keep localStorage as an offline fallback

Nothing here contains credentials yet.
*/

export const firebaseReady = false;

export async function initCloud(){
  return {
    connected:false,
    message:"Local save active. Firebase is scaffolded but not connected yet."
  };
}
