import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMFlS5s9UQnEkwol4Ca_K4lMMd-ocW6Us",
  authDomain: "my-salon-app-d687c.firebaseapp.com",
  projectId: "my-salon-app-d687c",
  storageBucket: "my-salon-app-d687c.firebasestorage.app",
  messagingSenderId: "374340508593",
  appId: "1:374340508593:web:b815af6984ae013840fb90",
  measurementId: "G-H2ZS71983J"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');
