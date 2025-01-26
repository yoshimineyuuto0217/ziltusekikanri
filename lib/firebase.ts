// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7wbNGGj-pX-e4a7HEWIiPb02yhlgaolI",
  authDomain: "ziltusekikannri-651ec.firebaseapp.com",
  projectId: "ziltusekikannri-651ec",
  storageBucket: "ziltusekikannri-651ec.firebasestorage.app",
  messagingSenderId: "645033828934",
  appId: "1:645033828934:web:a413ff4363ec4f4e7ba047"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app)