import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { queryClient } from "./queryClient";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    // Create/update user in our database
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uid: result.user.uid,
        name: result.user.displayName || 'Anonymous',
        username: result.user.email?.split('@')[0] || `user${Date.now()}`,
        avatar: result.user.photoURL,
        sport: 'Not specified' // Default value
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create user profile');
    }

    // Invalidate users query to refresh the data
    queryClient.invalidateQueries({ queryKey: ['/api/users'] });
    return result.user;
  } catch (error: any) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export const signOut = () => auth.signOut();

export { auth };