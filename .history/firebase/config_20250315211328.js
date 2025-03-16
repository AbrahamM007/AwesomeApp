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
  // Enable persistence before doing anything else with Firestore
  const firestoreSettings = { synchronizeTabs: false };
  
  // Get Firestore instance and immediately enable persistence
  db = getFirestore(app);
  
  // We need to enable persistence before any other Firestore operations
  enableIndexedDbPersistence(db, firestoreSettings)
    .then(() => {
      console.log('Firestore persistence enabled successfully');
    })
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

// Initialize Auth after Firestore to avoid any potential issues
const auth = getAuth(app);

// Don't create any collection references or call any Firestore methods
// until after persistence has been initialized

// Helper functions for Firestore operations - create these lazily to avoid initialization issues
const getCollection = (collectionName) => collection(db, collectionName);
const getDocument = (collectionName, docId) => doc(db, collectionName, docId);

// Specific collection helpers for your app - use functions instead of direct references
// to avoid initialization issues
const getAnnouncementsRef = () => collection(db, 'announcements');
const getMinistriesRef = () => collection(db, 'ministries');
const getGroupsRef = () => collection(db, 'groups');
const getEventsRef = () => collection(db, 'events');

// Helper functions for common operations
const getAnnouncements = async (limitCount = 20) => {
  try {
    const announcementsRef = getAnnouncementsRef();
    const q = query(announcementsRef, orderBy('createdAt', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return [];
  }
};

const getMinistries = async () => {
  try {
    const ministriesRef = getMinistriesRef();
    const snapshot = await getDocs(ministriesRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching ministries:', error);
    return [];
  }
};

const getGroups = async () => {
  try {
    const groupsRef = getGroupsRef();
    const snapshot = await getDocs(groupsRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching groups:', error);
    return [];
  }
};

const getEvents = async (limitCount = 20) => {
  try {
    const eventsRef = getEventsRef();
    const q = query(eventsRef, orderBy('date', 'asc'), limit(limitCount));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
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
  // Collection references
  getAnnouncementsRef,
  getMinistriesRef,
  getGroupsRef,
  getEventsRef,
  // Helper functions
  getAnnouncements,
  getMinistries,
  getGroups,
  getEvents
};