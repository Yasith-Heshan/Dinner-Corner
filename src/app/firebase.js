// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAh1WM7VDE1MnXxBFohMfkP-b2mDZHPn1E",
    authDomain: "dinnercorner-8558b.firebaseapp.com",
    projectId: "dinnercorner-8558b",
    storageBucket: "dinnercorner-8558b.appspot.com",
    messagingSenderId: "815302849563",
    appId: "1:815302849563:web:13fe07201699c6386c74be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);