import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
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
  serverTimestamp 
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getApps, getApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBswoHAZkg2GYXXemgl7jieEc2lz6SD80",
  authDomain: "newhopeappfeed.firebaseapp.com",
  projectId: "newhopeappfeed",
  storageBucket: "newhopeappfeed.appspot.com",
  messagingSenderId: "578893626747",
  appId: "1:578893626747:web:f43404d389630e312b91de",
  measurementId: "G-DV765Y6R4Z"
};

// Initialize Firebase only once with a simpler approach
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with explicit settings to avoid assertion errors
const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  experimentalForceLongPolling: true, // Use long polling instead of WebSockets
  ignoreUndefinedProperties: true // Be more forgiving with data
});

// Initialize Auth
const auth = getAuth(app);

// Null analytics to avoid errors
const analytics = null;

// Helper functions with additional error handling
const getCollection = (collectionName) => {
  try {
    return collection(db, collectionName);
  } catch (error) {
    console.error(`Error getting collection ${collectionName}:`, error);
    throw error;
  }
};

const getDocument = (collectionName, docId) => {
  try {
    return doc(db, collectionName, docId);
  } catch (error) {
    console.error(`Error getting document ${collectionName}/${docId}:`, error);
    throw error;
  }
};

// Specific collection helpers with error handling
const getAnnouncementsRef = () => getCollection('announcements');
const getMinistriesRef = () => getCollection('ministries');
const getGroupsRef = () => getCollection('groups');
const getEventsRef = () => getCollection('events');

// Helper functions for common operations with better error handling
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

// Other helper functions remain the same
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
  getAnnouncementsRef,
  getMinistriesRef,
  getGroupsRef,
  getEventsRef,
  getAnnouncements,
  getMinistries,
  getGroups,
  getEvents
};