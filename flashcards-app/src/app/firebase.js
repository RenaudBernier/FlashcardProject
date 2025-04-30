// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyCL0xwEVj660gpiekNg0_0VZVgckNNcBfc",
    authDomain: "flashcards-9a00a.firebaseapp.com",
    projectId: "flashcards-9a00a",
    storageBucket: "flashcards-9a00a.firebasestorage.app",
    messagingSenderId: "1031251007751",
    appId: "1:1031251007751:web:864ad99a8616486e6e0da2",
    measurementId: "G-LHHS94ERPK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
//const analytics = getAnalytics(app);