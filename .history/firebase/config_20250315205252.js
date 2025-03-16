import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence, getFirestore as getFirestoreOriginal } from 'firebase/firestore';
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
let db;
let auth;

// Create a custom getFirestore function that ensures persistence is enabled
const getFirestoreWithPersistence = async (app) => {
  const firestore = getFirestoreOriginal(app);
  
  try {
    // Try to enable persistence
    await enableIndexedDbPersistence(firestore);
    console.log('Firestore persistence enabled successfully');
  } catch (err) {
    if (err.code === 'failed-precondition') {
      console.warn('Firestore persistence failed: Multiple tabs open');
    } else if (err.code === 'unimplemented') {
      console.warn('Firestore persistence not supported by this browser');
    } else {
      console.error('Firestore persistence error:', err.code, err.message);
    }
  }
  
  return firestore;
};

// Initialize app
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  console.log('Firebase app initialized for the first time');
} else {
  app = getApp();
  console.log('Using existing Firebase app instance');
}

// Initialize Auth
auth = getAuth(app);

// Export a function to get the Firestore instance
// This ensures that any code importing this will wait for persistence to be enabled
const getDb = async () => {
  if (!db) {
    db = await getFirestoreWithPersistence(app);
  }
  return db;
};

// For backward compatibility, also export the db directly
// But it will be undefined until getDb() is called
export { getDb, db, auth };