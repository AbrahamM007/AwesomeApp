import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence, collection, doc, setDoc, addDoc, getDoc, getDocs, query, where, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getApps, getApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBswoHAZkg2GYXXemgl7jieEc2lz6SD80",
  authDomain: "newhopeappfeed.firebaseapp.com",
  projectId: "newhopeappfeed",
  storageBucket: "newhopeappfeed.firebasestorage.app",
  messagingSenderId: "578893626747",
  appId: "1:578893626747:web:f43404d389630e312b91de",
  measurementId: "G-DV765Y6R4Z"
};

// Initialize Firebase only once
let app;
let analytics;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  console.log('Firebase app initialized for the first time');
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.log('Analytics not available in this environment');
  }
} else {
  app = getApp();
  console.log('Using existing Firebase app instance');
}

// Initialize Firestore with persistence enabled from the start
let db;
try {
  // Get Firestore instance first
  db = getFirestore(app);
  
  // Enable persistence before doing anything else with Firestore
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
  console.error('Error with Firestore setup:', err);
  // Fallback to regular Firestore if there was an error
  if (!db) {
    db = getFirestore(app);
  }
}

// Initialize Auth
const auth = getAuth(app);

// Helper functions for Firestore operations
const getCollection = (collectionName) => collection(db, collectionName);
const getDocument = (collectionName, docId) => doc(db, collectionName, docId);

// Specific collection helpers for your app
const announcementsRef = collection(db, 'announcements');
const ministriesRef = collection(db, 'ministries');
const groupsRef = collection(db, 'groups');

// Helper functions for common operations
const getAnnouncements = async (limit = 20) => {
  const q = query(announcementsRef, orderBy('createdAt', 'desc'), limit(limit));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const getMinistries = async () => {
  const snapshot = await getDocs(ministriesRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const getGroups = async () => {
  const snapshot = await getDocs(groupsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Export everything needed
export { 
  db, 
  auth, 
  analytics,
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
  getDocument,
  // New exports
  announcementsRef,
  ministriesRef,
  groupsRef,
  getAnnouncements,
  getMinistries,
  getGroups
};