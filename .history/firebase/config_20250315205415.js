import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence, collection, doc, setDoc, addDoc, getDoc, getDocs, query, where, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getApps, getApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOCAbC123dEf456GhI789jKl01-MnO",
  authDomain: "newhopeappfeed.firebaseapp.com",
  projectId: "newhopeappfeed",
  storageBucket: "newhopeappfeed.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123def456"
};

// Initialize Firebase only once
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  console.log('Firebase app initialized for the first time');
} else {
  app = getApp();
  console.log('Using existing Firebase app instance');
}

// Initialize Firestore
const db = getFirestore(app);

// Try to enable persistence, but don't wait for it
try {
  enableIndexedDbPersistence(db)
    .then(() => console.log('Firestore persistence enabled successfully'))
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('Firestore persistence failed: Multiple tabs open');
      } else if (err.code === 'unimplemented') {
        console.warn('Firestore persistence not supported by this browser');
      } else {
        console.error('Firestore persistence error:', err);
      }
    });
} catch (err) {
  console.error('Error enabling persistence:', err);
}

// Initialize Auth
const auth = getAuth(app);

// Helper functions for Firestore operations
const getCollection = (collectionName) => collection(db, collectionName);
const getDocument = (collectionName, docId) => doc(db, collectionName, docId);

// Export everything needed
export { 
  db, 
  auth, 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  serverTimestamp,
  getCollection,
  getDocument
};