// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-q1Liw6F_7IrR-XKf5gRvw3ossZN-Kp0",
  authDomain: "alimentahappy.firebaseapp.com",
  projectId: "alimentahappy",
  storageBucket: "alimentahappy.appspot.com",
  messagingSenderId: "794961013096",
  appId: "1:794961013096:web:81dad897e74ba273bb4edd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
