// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5Y94mqxrsWN4yU_RzBp2j3dgxcW5t3ms",
  authDomain: "awsketch-717a7.firebaseapp.com",
  projectId: "awsketch-717a7",
  storageBucket: "awsketch-717a7.firebasestorage.app",
  messagingSenderId: "47094542234",
  appId: "1:47094542234:web:8eef655ca0d45601fa5423",
  measurementId: "G-7J32CS7MQ5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
