import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  enableIndexedDbPersistence, 
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
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);
let analytics = null;

// Try to initialize analytics if available
try {
  analytics = getAnalytics(app);
} catch (error) {
  console.log('Analytics not available in this environment');
}

// IMPORTANT: Disable persistence for now to avoid the internal assertion errors
// We can re-enable it later once the basic functionality works
// enableIndexedDbPersistence(db).catch(err => {
//   console.error('Error enabling persistence:', err);
// });

// Helper functions for Firestore operations
const getCollection = (collectionName) => collection(db, collectionName);
const getDocument = (collectionName, docId) => doc(db, collectionName, docId);

// Specific collection helpers
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
  getAnnouncementsRef,
  getMinistriesRef,
  getGroupsRef,
  getEventsRef,
  getAnnouncements,
  getMinistries,
  getGroups,
  getEvents
};