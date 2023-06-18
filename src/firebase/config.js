// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCepOiA1PtXNU0J0HPnzyXF50A6F5bwO4M",
  authDomain: "bearboo-chat.firebaseapp.com",
  projectId: "bearboo-chat",
  storageBucket: "bearboo-chat.appspot.com",
  messagingSenderId: "382591906516",
  appId: "1:382591906516:web:e755e424ad1b4b50dc0141",
  measurementId: "G-C73TVPJEWJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export default db;
