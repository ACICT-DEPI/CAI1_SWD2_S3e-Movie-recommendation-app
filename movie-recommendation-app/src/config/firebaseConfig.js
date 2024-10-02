import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFGGUv34zkP2YTBfIIIwqBMwzlAOdY2cg",
  authDomain: "movie-app-5cb7f.firebaseapp.com",
  projectId: "movie-app-5cb7f",
  storageBucket: "movie-app-5cb7f.appspot.com",
  messagingSenderId: "608104963830",
  appId: "1:608104963830:web:b42c2506abb8963842d6d7",
  measurementId: "G-LVXZ7NZPNX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services (e.g., Auth, Firestore, Storage)
const db = getFirestore(app);
const auth = getAuth(app);
export default app;
export { db, auth };
