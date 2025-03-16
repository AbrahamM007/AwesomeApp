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
          <View style={styles.emptyContainer}></View>