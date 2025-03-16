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

const DiscussionDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { discussionId } = route.params;
  
  const [discussion, setDiscussion] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [sendingComment, setSendingComment] = useState(false);
  
  const currentUser = auth.currentUser;

  useEffect(() => {
    // Fetch discussion details
    const fetchDiscussion = async () => {
      try {
        const discussionDoc = await getDoc(doc(db, 'discussions', discussionId));
        if (discussionDoc.exists()) {
          setDiscussion({ id: discussionDoc.id, ...discussionDoc.data() });
        } else {
          Alert.alert('Error', 'Discussion not found');
          navigation.goBack();
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching discussion:', error);
        Alert.alert('Error', 'Failed to load discussion details');
        setLoading(false);
      }
    };
    
    fetchDiscussion();
    
    // Set up listener for comments
    const commentsRef = collection(db, 'discussions', discussionId, 'comments');
    const commentsQuery = query(commentsRef, orderBy('createdAt', 'asc'));
    
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
    
    // Clean up listener
    return () => {
      unsubscribeComments();
    };
  }, [discussionId, navigation]);

  const handleSendComment = async () => {
    if (!newComment.trim() || !currentUser) {
      return;
    }
    
    try {
      setSendingComment(true);
      
      const commentsRef = collection(db, 'discussions', discussionId, 'comments');
      await addDoc(commentsRef, {
        text: newComment.trim(),
        createdAt: serverTimestamp(),
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Church Member',
        userPhotoURL: currentUser.photoURL || null
      });
      
      // Update comment count
      await updateDoc(doc(db, 'discussions', discussionId), {
        commentCount: increment(1)
      });
      
      // Update local state
      setDiscussion(prev => ({
        ...prev,
        commentCount: (prev.commentCount || 0) + 1
      }));
      
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
          {item.createdAt ? new Date(item.createdAt.toDate()).toLocaleString([], {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }) : 'Just now'}
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
          <Text style={styles.loadingText}>Loading discussion...</Text>
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
        <Text style={styles.headerTitle}>Discussion</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.container}>
        <View style={styles.discussionCard}>
          <Text style={styles.discussionTitle}>{discussion?.title}</Text>
          
          <Text style={styles.discussionTopic}>
            {discussion?.topic || 'No details provided for this discussion.'}
          </Text>
          
          <View style={styles.discussionMeta}>
            <Text style={styles.discussionAuthor}>
              Started by {discussion?.creatorName || 'Church Member'}
            </Text>
            <Text style={styles.discussionDate}>
              {discussion?.createdAt ? new Date(discussion.createdAt.toDate()).toLocaleDateString() : 'Recently'}
            </Text>
          </View>
        </View>
        
        <View style={styles.commentsSection}>
          <Text style={styles.sectionTitle}>
            Comments ({discussion?.commentCount || 0})
          </Text>
          
          <FlatList
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.commentsList}
            ListEmptyComponent={
              <View style={styles.emptyComments}>
                <Text style={styles.emptyText}>No comments yet</Text>
                <Text style={styles.emptySubtext}>Be the first to comment!</Text>
              </View>
            }
          />
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newComment}
            onChangeText={setNewComment}
            placeholder="Add to the discussion..."
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
  discussionCard: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  discussionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3c5c8e',
    marginBottom: 12,
  },
  discussionTopic: {
    fontSize: 16,
    color: '#555555',
    lineHeight: 24,
    marginBottom: 16,
  },
  discussionMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  discussionAuthor: {
    fontSize: 14,
    color: '#777777',
    fontStyle: 'italic',
  },
  discussionDate: {
    fontSize: 14,
    color: '#777777',
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

export default DiscussionDetailsScreen;