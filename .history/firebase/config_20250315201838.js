// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBswoHAZkg2GYXXemgl7jieEc2lz6SD80",
  authDomain: "newhopeappfeed.firebaseapp.com",
  projectId: "newhopeappfeed",
  storageBucket: "newhopeappfeed.firebasestorage.app",
  messagingSenderId: "578893626747",
  appId: "1:578893626747:web:38f5834fc15ecf822b91de",
  measurementId: "G-7GCPW2VGXR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db)
  .then(() => {
    console.log("Firestore persistence enabled");
  })
  .catch((err) => {
    console.error("Error enabling persistence:", err);
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled in one tab at a time
      console.warn('Multiple tabs open, persistence only enabled in one tab');
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the features required
      console.warn('Persistence not supported in this environment');
    }
  });

// Use getAuth instead of initializeAuth to avoid the "already-initialized" error
const auth = getAuth(app);

export { app, db, auth };