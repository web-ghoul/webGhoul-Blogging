// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBgcjGmXJhvbR_3IqOIp3Xc6QHfrHi6unQ",
    authDomain: "webghoul-blogging-app.firebaseapp.com",
    projectId: "webghoul-blogging-app",
    storageBucket: "webghoul-blogging-app.appspot.com",
    messagingSenderId: "332589954386",
    appId: "1:332589954386:web:102a88d74c48fbbc1ab68b",
    measurementId: "G-C0T77TN1PQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
export const auth = getAuth(app)
// Initialize Firebase Authentication and get a reference to the service

