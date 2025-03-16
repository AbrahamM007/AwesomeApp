import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const CommentsScreen = ({ route, navigation }) => {
  const { itemId, itemType } = route.params;
  const { userInfo } = useAuth();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: '1',
      user: {
        id: '1',
        name: 'John Smith',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      text: 'This is great news! Looking forward to attending.',
      timestamp: '2 hours ago',
      likes: 5
    },
    {
      id: '2',
      user: {
        id: '2',
        name: 'Sarah Johnson',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      text: 'Thanks for sharing this information. I\'ll make sure to mark my calendar.',
      timestamp: '1 hour ago',
      likes: 3
    },
    {
      id: '3',
      user: {
        id: '3',
        name: 'Michael Chen',
        image: 'https://randomuser.me/api/portraits/men/22.jpg',
      },
      text: 'Can\'t wait for this event! Will there be childcare available?',
      timestamp: '45 minutes ago',
      likes: 2
    }
  ]);
  
  const handleAddComment = () => {
    if (!comment.trim()) return;
    
    const newComment = {
      id: Date.now().toString(),
      user: {
        id: userInfo.id,
        name: userInfo.name,
        image: userInfo.image || 'https://randomuser.me/api/portraits/lego/1.jpg',
      },
      text: comment,
      timestamp: 'Just now',
      likes: 0
    };
    
    setComments([newComment, ...comments]);
    setComment('');
  };
  
  const handleLikeComment = (commentId) => {
    setComments(
      comments.map(item => 
        item.id === commentId 
          ? { ...item, likes: item.likes + 1 } 
          : item
      )
    );
  };
  
  const renderCommentItem = ({ item }) => (
    <View style={styles.commentItem}>
      <Image source={{ uri: item.user.image }} style={styles.userImage} />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <Text style={styles.commentText}>{item.text}</Text>
        <View style={styles.commentActions}>
          <TouchableOpacity 
            style={styles.likeButton}
            onPress={() => handleLikeComment(item.id)}
          >
            <FontAwesome5 name="heart" size={14} color="#718096" />
            <Text style={styles.likeCount}>{item.likes > 0 ? item.likes : ''}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={20} color="#2c5282" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Comments</Text>
        <View style={{ width: 20 }} />
      </View>
      
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.commentsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FontAwesome5 name="comment-alt" size={50} color="#cbd5e0" />
            <Text style={styles.emptyText}>No comments yet</Text>
            <Text style={styles.emptySubtext}>Be the first to comment!</Text>
          </View>
        }
      />
      
      <View style={styles.commentInputContainer}>
        <Image 
          source={{ uri: userInfo?.image || 'https://randomuser.me/api/portraits/lego/1.jpg' }} 
          style={styles.inputUserImage} 
        />
        <TextInput
          style={styles.commentInput}
          value={comment}
          onChangeText={setComment}
          placeholder="Add a comment..."
          placeholderTextColor="#a0aec0"
          multiline
        />
        <TouchableOpacity 
          style={[
            styles.sendButton,
            !comment.trim() && styles.sendButtonDisabled
          ]}
          onPress={handleAddComment}
          disabled={!comment.trim()}
        >
          <FontAwesome5 
            name="paper-plane" 
            size={18} 
            color={comment.trim() ? "#2c5282" : "#a0aec0"} 
            solid 
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#d4f5c9',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  backButton: {
    padding: 5,
  },
  commentsList: {
    padding: 20,
    paddingBottom: 100,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  userName: {
    fontWeight: 'bold',
    color: '#2d3748',
    fontSize: 14,
  },
  timestamp: {
    color: '#a0aec0',
    fontSize: 12,
  },
  commentText: {
    color: '#4a5568',
    fontSize: 14,
    lineHeight: 20,
  },
  commentActions: {
    flexDirection: 'row',
    marginTop: 8,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    marginLeft: 5,
    color: '#718096',
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#718096',
    marginTop: 15,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#a0aec0',
    marginTop: 5,
  },
  commentInputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  inputUserImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 16,
    color: '#2d3748',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  sendButtonDisabled: {
    opacity: 0.7,
  }
});

export default CommentsScreen;