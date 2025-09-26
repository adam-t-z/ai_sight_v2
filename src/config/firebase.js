// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
//   apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  authDomain: "ai-sight-walking.firebaseapp.com",
  projectId: "ai-sight-walking",
  storageBucket: "ai-sight-walking.appspot.com",
  messagingSenderId: "987654321098",
  appId: "1:987654321098:web:abc123def456ghi789",
  measurementId: "G-XXXXXXXXXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Export the Firebase app instance
export default app;