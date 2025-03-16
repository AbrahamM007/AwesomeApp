import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  // Your existing config
};

// Initialize Firebase only once
let app;
let db;
let auth;

try {
  // Try to get the existing app if it's already initialized
  app = initializeApp(firebaseConfig);
} catch (error) {
  // If the app is already initialized, get the existing instance
  if (error.code === 'app/duplicate-app') {
    console.log('Firebase app already exists, using existing instance');
    app = initializeApp();
  } else {
    console.error('Firebase initialization error:', error);
    throw error;
  }
}

// Initialize Firestore and Auth
db = getFirestore(app);
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