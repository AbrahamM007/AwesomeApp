import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Alert,
  FlatList,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { db, auth } from '../firebase/config';
import { doc, getDoc, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, updateDoc, increment } from 'firebase/firestore';

const PrayerDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { prayerId } = route.params;
  
  const [prayer, setPrayer] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [sendingComment, setSendingComment] = useState(false);
  const [hasPrayed, setHasPrayed] = useState(false);
  
  const currentUser = auth.currentUser;

  useEffect(() => {
    // Fetch prayer details
    const fetchPrayer = async () => {
      try {
        const prayerDoc = await getDoc(doc(db, 'prayers', prayerId));
        if (prayerDoc.exists()) {
          setPrayer({ id: prayerDoc.id, ...prayerDoc.data() });
        } else {
          Alert.alert('Error', 'Prayer request not found');
          navigation.goBack();
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching prayer:', error);
        Alert.alert('Error', 'Failed to load prayer details');
        setLoading(false);
      }
    };
    
    fetchPrayer();
    
    // Set up listener for comments
    const commentsRef = collection(db, 'prayers', prayerId, 'comments');
    const commentsQuery = query(commentsRef, orderBy('createdAt', 'desc'));
    
    const unsubscribeComments = onSnapshot(commentsQuery, (snapshot) => {
      const commentsList = [];
      snapshot.forEach((doc) => {
        commentsList.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setComments(commentsList);
    }, (error) => {
      console.error("Error fetching comments:", error);
    });
    
    // Check if user has prayed
    const checkPrayedStatus = async () => {
      if (currentUser) {
        try {
          const prayedDoc = await getDoc(doc(db, 'prayers', prayerId, 'prayed', currentUser.uid));
          setHasPrayed(prayedDoc.exists());
        } catch (error) {
          console.error('Error checking prayed status:', error);
        }
      }
    };
    
    checkPrayedStatus();
    
    // Clean up listener
    return () => {
      unsubscribeComments();
    };
  }, [prayerId, navigation, currentUser]);

  const handlePray = async () => {
    if (!currentUser) {
      Alert.alert('Error', 'You must be logged in to pray');
      return;
    }
    
    if (hasPrayed) {
      return; // Already prayed
    }
    
    try {
      // Add user to prayed subcollection
      await setDoc(doc(db, 'prayers', prayerId, 'prayed', currentUser.uid), {
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Church Member',
        prayedAt: serverTimestamp()
      });
      
      // Increment prayer count
      await updateDoc(doc(db, 'prayers', prayerId), {
        prayerCount: increment(1)
      });
      
      // Update local state
      setPrayer(prev => ({
        ...prev,
        prayerCount: (prev.prayerCount || 0) + 1
      }));
      setHasPrayed(true);
      
      Alert.alert('Thank You', 'Your prayer has been counted');
    } catch (error) {
      console.error('Error praying:', error);
      Alert.alert('Error', 'Failed to record your prayer. Please try again.');
    }
  };

  const handleSendComment = async () => {
    if (!newComment.trim() || !currentUser) {
      return;
    }
    
    try {
      setSendingComment(true);
      
      const commentsRef = collection(db, 'prayers', prayerId, 'comments');
      await addDoc(commentsRef, {
        text: newComment.trim(),
        createdAt: serverTimestamp(),
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Church Member',
        userPhotoURL: currentUser.photoURL || null
      });
      
      setNewComment('');
    } catch (error) {
      console.error('Error sending comment:', error);
      Alert.alert('Error', 'Failed to send comment. Please try again.');
    } finally {
      setSendingComment(false);
    }
  };

  const renderCommentItem = ({ item }) => (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <Text style={styles.commentAuthor}>{item.userName}</Text>
        <Text style={styles.commentTime}>
          {item.createdAt ? new Date(item.createdAt.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
        </Text>
      </View>
      <Text style={styles.commentText}>{item.text}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#e1f0d8" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3c5c8e" />
          <Text style={styles.loadingText}>Loading prayer request...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#e1f0d8" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#3c5c8e" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Prayer Request</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.container}>
        <View style={styles.prayerCard}>
          <Text style={styles.prayerTitle}>{prayer?.title}</Text>
          
          <Text style={styles.prayerRequest}>
            {prayer?.request || 'No details provided for this prayer request.'}
          </Text>
          
          <View style={styles.prayerMeta}>
            <Text style={styles.prayerAuthor}>
              {prayer?.isAnonymous ? 'Anonymous' : `From ${prayer?.creatorName || 'Church Member'}`}
            </Text>
            <Text style={styles.prayerDate}>
              {prayer?.createdAt ? new Date(prayer.createdAt.toDate()).toLocaleDateString() : 'Recently'}
            </Text>
          </View>
          
          <TouchableOpacity
            style={[styles.prayButton, hasPrayed && styles.prayedButton]}
            onPress={handlePray}
            disabled={hasPrayed}
          >
            <Ionicons name={hasPrayed ? "heart" : "heart-outline"} size={20} color="#ffffff" />
            <Text style={styles.prayButtonText}>
              {hasPrayed ? 'Prayed' : 'Pray for This'} ({prayer?.prayerCount || 0})
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.commentsSection}>
          <Text style={styles.sectionTitle}>Encouragements</Text>
          
          <FlatList
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.commentsList}
            ListEmptyComponent={
              <View style={styles.emptyComments}>
                <Text style={styles.emptyText}>No encouragements yet</Text>
                <Text style={styles.emptySubtext}>Be the first to encourage!</Text>
              </View>
            }
          />
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newComment}
            onChangeText={setNewComment}
            placeholder="Write a word of encouragement..."
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, (!newComment.trim() || sendingComment) && styles.disabledSendButton]}
            onPress={handleSendComment}
            disabled={!newComment.trim() || sendingComment}
          >
            {sendingComment ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Ionicons name="send" size={20} color="#ffffff" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e1f0d8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#e1f0d8',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3c5c8e',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  prayerCard: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  prayerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3c5c8e',
    marginBottom: 12,
  },
  prayerRequest: {
    fontSize: 16,
    color: '#555555',
    lineHeight: 24,
    marginBottom: 16,
  },
  prayerMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  prayerAuthor: {
    fontSize: 14,
    color: '#777777',
    fontStyle: 'italic',
  },
  prayerDate: {
    fontSize: 14,
    color: '#777777',
  },
  prayButton: {
    backgroundColor: '#a9c25d',
    borderRadius: 25,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prayedButton: {
    backgroundColor: '#3c5c8e',
  },
  prayButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  commentsSection: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3c5c8e',
    marginBottom: 16,
  },
  commentsList: {
    paddingBottom: 16,
  },
  commentContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3c5c8e',
  },
  commentTime: {
    fontSize: 12,
    color: '#777777',
  },
  commentText: {
    fontSize: 15,
    color: '#333333',
    lineHeight: 22,
  },
  emptyComments: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3c5c8e',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#777777',
    marginTop: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#a9c25d',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledSendButton: {
    backgroundColor: '#cccccc',
  }
});

export default PrayerDetailsScreen;