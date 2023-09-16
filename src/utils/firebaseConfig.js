// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvhkdzgD_EXvCRJeKJIXpTwKpgaKe935o",
  authDomain: "survey-app-backend.firebaseapp.com",
  projectId: "survey-app-backend",
  storageBucket: "survey-app-backend.appspot.com",
  messagingSenderId: "1098104077679",
  appId: "1:1098104077679:web:34e80f405835d72325fc9a",
  measurementId: "G-MYTEVE1VFM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

export { app, db };