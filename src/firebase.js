import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSjLgIDBfXDQ8GliTSLsz6y-yIFBcSBp8",
  authDomain: "priyanka-portfolio-85816.firebaseapp.com",
  projectId: "priyanka-portfolio-85816",
  storageBucket: "priyanka-portfolio-85816.firebasestorage.app",
  messagingSenderId: "891966885287",
  appId: "1:891966885287:web:4c3a570cf484010b083a82",
  measurementId: "G-CWR024FPFV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
