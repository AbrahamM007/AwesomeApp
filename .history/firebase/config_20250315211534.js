import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
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
// Remove analytics for now since it's causing errors
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBswoHAZkg2GYXXemgl7jieEc2lz6SD80",
  authDomain: "newhopeappfeed.firebaseapp.com",
  projectId: "newhopeappfeed",
  storageBucket: "newhopeappfeed.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "578893626747",
  appId: "1:578893626747:web:f43404d389630e312b91de",
  measurementId: "G-DV765Y6R4Z"
};

// Initialize Firebase only once with a simpler approach
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize services with minimal configuration
const db = getFirestore(app);
const auth = getAuth(app);
// Disable analytics for now
const analytics = null;

// Helper functions for Firestore operations
const getCollection = (collectionName) => collection(db, collectionName);
const getDocument = (collectionName, docId) => doc(db, collectionName, docId);

// Specific collection helpers
const getAnnouncementsRef = () => collection(db, 'announcements');
const getMinistriesRef = () => collection(db, 'ministries');
const getGroupsRef = () => collection(db, 'groups');
const getEventsRef = () => collection(db, 'events');

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