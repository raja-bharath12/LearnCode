// src/lib/firebase.js
// Firebase v9 modular SDK — Auth + Firestore

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBJTTwWnz608hUjSnsLL8zs3qVrxqw9F04",
  authDomain: "learncode-fade9.firebaseapp.com",
  projectId: "learncode-fade9",
  storageBucket: "learncode-fade9.firebasestorage.app",
  messagingSenderId: "217426226429",
  appId: "1:217426226429:web:38d45aeac766df7a356294",
  measurementId: "G-QP6JY7C92N"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;
