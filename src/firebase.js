// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFIezUllPD1SzmgiMPKnkrkABxavcrHfY",
  authDomain: "bnews-4833f.firebaseapp.com",
  databaseURL: "https://bnews-4833f-default-rtdb.firebaseio.com",
  projectId: "bnews-4833f",
  storageBucket: "bnews-4833f.firebasestorage.app",
  messagingSenderId: "443777083730",
  appId: "1:443777083730:web:2f5605324049d58a0c728b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

export {app, auth, db}