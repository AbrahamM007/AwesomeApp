import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const CommentsScreen = ({ route, navigation }) => {
  const { postId } = route.params;
  const { userInfo } = useAuth();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: '1',
      user: {
        id: '2',
        name: 'Sarah Johnson',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      text: 'This is great news! Looking forward to the event.',
      timestamp: '2 hours ago',
      likes: 5,
      isLiked: false,
    },
    {
      id: '2',
      user: {
        id: '3',
        name: 'Michael Chen',
        image: 'https://randomuser.me/api/portraits/men/22.jpg',
      },
      text: 'Thanks for sharing this information. Will there be childcare available?',
      timestamp: '1 hour ago',
      likes: 2,
      isLiked: true,
    },
    {
      id: '3',
      user: {
        id: '4',
        name: 'Emily Rodriguez',
        image: 'https://randomuser.me/api/portraits/women/28.jpg',
      },
      text: 'I\'m excited to participate!',
      timestamp: '45 minutes ago',
      likes: 1,
      isLiked: false,
    }
  ]);
  
  const inputRef = useRef(null);
  
  const handleAddComment = () => {
    if (comment.trim() === '') return;
    
    const newComment = {
      id: Date.now().toString(),
      user: {
        id: userInfo.id,
        name: userInfo.name,
        image: userInfo.profileImage,
      },
      text: comment,
      timestamp: 'Just now',
      likes: 0,
      isLiked: false,
    };
    
    setComments([newComment, ...comments]);
    setComment('');
    Keyboard.dismiss();
  };
  
  const handleLikeComment = (id) => {
    setComments(
      comments.map(item => 
        item.id === id 
          ? { 
              ...item, 
              isLiked: !item.isLiked,
              likes: item.isLiked ? item.likes - 1 : item.likes + 1
            } 
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
            style={styles.actionButton}
            onPress={() => handleLikeComment(item.id)}
          >
            <FontAwesome5 
              name="heart" 
              size={14} 
              color={item.isLiked ? "#e53e3e" : "#718096"} 
              solid={item.isLiked} 
            />
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome5 name="reply" size={14} color="#718096" />
            <Text style={styles.actionText}>Reply</Text>
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
        inverted
      />
      
      <View style={styles.inputContainer}>
        <Image 
          source={{ uri: userInfo?.profileImage || 'https://randomuser.me/api/portraits/men/1.jpg' }} 
          style={styles.inputUserImage} 
        />
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={comment}
          onChangeText={setComment}
          placeholder="Add a comment..."
          placeholderTextColor="#a0aec0"
          multiline
        />
        <TouchableOpacity 
          style={[
            styles.sendButton,
            comment.trim() === '' && styles.sendButtonDisabled
          ]}
          onPress={handleAddComment}
          disabled={comment.trim() === ''}
        >
          <FontAwesome5 name="paper-plane" size={16} color="#fff" solid />
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
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    padding: 5,
  },
  commentsList: {
    padding: 20,
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
    borderRadius: 10,
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
    alignItems: 'center',
    marginBottom: 5,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  timestamp: {
    fontSize: 12,
    color: '#a0aec0',
  },
  commentText: {
    fontSize: 14,
    color: '#4a5568',
    lineHeight: 20,
  },
  commentActions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  actionText: {
    fontSize: 12,
    color: '#718096',
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  inputUserImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 14,
    color: '#2d3748',
  },
  sendButton: {
    backgroundColor: '#2c5282',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  sendButtonDisabled: {
    backgroundColor: '#cbd5e0',
  },
});

export default CommentsScreen;