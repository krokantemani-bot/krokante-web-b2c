import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAa1BLKWA5OibO8yp6l1wVB5TAL6HVyrGE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "krokante-web.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "krokante-web",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "krokante-web.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "226655881162",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:226655881162:web:placeholder",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
