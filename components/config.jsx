// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDzkoOyz-_PyGwUoknlQ-NwmT3R4McyAtA",
    authDomain: "skinet-5e460.firebaseapp.com",
    databaseURL: "https://skinet-5e460-default-rtdb.firebaseio.com",
    projectId: "skinet-5e460",
    storageBucket: "skinet-5e460.firebasestorage.app",
    messagingSenderId: "327811922766",
    appId: "1:327811922766:web:aadca6e7c1fa7df2a9bc1f"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);