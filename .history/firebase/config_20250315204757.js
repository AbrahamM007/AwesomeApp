import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence, initializeFirestore, CACHE_SIZE_UNLIMITED } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getApps, getApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "newhopeappfeed.firebaseapp.com",
  projectId: "newhopeappfeed",
  storageBucket: "newhopeappfeed.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase only once
let app;
let db;
let auth;

// Check if any Firebase apps have been initialized
if (getApps().length === 0) {
  // No Firebase apps initialized yet, create a new one
  app = initializeApp(firebaseConfig);
  console.log('Firebase app initialized for the first time');
} else {
  // Firebase app already exists, get the existing instance
  app = getApp();
  console.log('Using existing Firebase app instance');
}

// Initialize Firestore with settings optimized for poor connectivity
db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  experimentalAutoDetectLongPolling: true, // Auto-detect the best connection method
  ignoreUndefinedProperties: true
});

// Initialize Auth
auth = getAuth(app);

// Enable offline persistence only once
try {
  enableIndexedDbPersistence(db)
    .then(() => {
      console.log('Firestore persistence enabled successfully');
    })
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a time
        console.warn('Firestore persistence failed: Multiple tabs open');
      } else if (err.code === 'unimplemented') {
        // The current browser does not support persistence
        console.warn('Firestore persistence not supported by this browser');
      } else {
        console.error('Firestore persistence error:', err);
      }
    });
} catch (err) {
  console.error('Error enabling persistence:', err);
}

export { db, auth };