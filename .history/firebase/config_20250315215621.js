// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBswoHAZkg2GYXXemgl7jieEc2lz6SD80",
  authDomain: "newhopeappfeed.firebaseapp.com",
  projectId: "newhopeappfeed",
  storageBucket: "newhopeappfeed.appspot.com",
  messagingSenderId: "578893626747",
  appId: "1:578893626747:web:38f5834fc15ecf822b91de",
  measurementId: "G-7GCPW2VGXR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let analytics;

// Only initialize analytics in a browser environment
try {
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
} catch (error) {
  console.log('Analytics not available in this environment');
}

// Add a global auth state listener for debugging
if (__DEV__) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('Global auth state: User is signed in', user.uid);
    } else {
      console.log('Global auth state: User is signed out');
    }
  });
}

export { app, auth, db, analytics };