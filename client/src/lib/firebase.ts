import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: "", // Added messagingSenderId
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // After successful sign in, create or update user in our database
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: result.user.uid,
        name: result.user.displayName || 'Anonymous',
        username: result.user.email?.split('@')[0] || 'user' + Date.now(),
        avatar: result.user.photoURL,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create user profile');
    }

    return result.user;
  } catch (error: any) {
    console.error("Error signing in with Google:", error);
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Login popup was closed. Please try again.');
    } else if (error.code === 'auth/configuration-not-found') {
      throw new Error('Firebase configuration error. Please contact support.');
    }
    throw error;
  }
};

export const signOut = () => auth.signOut();

export { auth };