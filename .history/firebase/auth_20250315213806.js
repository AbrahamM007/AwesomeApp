import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp, collection, addDoc } from 'firebase/firestore';
import { auth, db } from './config';

export const registerUser = async (email, password, displayName) => {
  try {
    // Create the user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update the user's display name
    await updateProfile(user, {
      displayName: displayName
    });
    
    // Create a user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      role: 'member', // Default role
      photoURL: user.photoURL || null,
      phoneNumber: user.phoneNumber || null,
      isActive: true
    });
    
    return user;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  // Your existing login code
  // ...
  
  // Update last login timestamp
  try {
    const user = auth.currentUser;
    if (user) {
      await setDoc(doc(db, 'users', user.uid), {
        lastLogin: serverTimestamp()
      }, { merge: true });
    }
  } catch (error) {
    console.error('Error updating last login:', error);
    // Don't throw here, as login was successful
  }
};

// Add this new function for creating groups
export const createGroup = async (groupData) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('You must be logged in to create a group');
    }
    
    // Add the group to Firestore
    const groupsRef = collection(db, 'groups');
    const newGroup = {
      ...groupData,
      createdBy: user.uid,
      creatorName: user.displayName || 'Church Member',
      members: [user.uid], // Creator is the first member
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(groupsRef, newGroup);
    return { id: docRef.id, ...newGroup };
  } catch (error) {
    console.error('Error creating group:', error);
    throw error;
  }
};

// Function to join a group
export const joinGroup = async (groupId) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('You must be logged in to join a group');
    }
    
    // Update the group's members array
    const groupRef = doc(db, 'groups', groupId);
    await setDoc(groupRef, {
      members: arrayUnion(user.uid),
      updatedAt: serverTimestamp()
    }, { merge: true });
    
    return true;
  } catch (error) {
    console.error('Error joining group:', error);
    throw error;
  }
};