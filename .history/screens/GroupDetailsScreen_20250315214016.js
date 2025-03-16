import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { db, auth } from '../firebase/config';
import { doc, getDoc, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { joinGroup } from '../firebase/auth';

const GroupDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { groupId } = route.params;
  
  const [group, setGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [joiningGroup, setJoiningGroup] = useState(false);
  
  const currentUser = auth.currentUser;
  const isMember = group?.members?.includes(currentUser?.uid);

  useEffect(() => {
    // Fetch group details
    const fetchGroup = async () => {
      try {
        const groupDoc = await getDoc(doc(db, 'groups', groupId));
        if (groupDoc.exists()) {
          setGroup({ id: groupDoc.id, ...groupDoc.data() });
        } else {
          Alert.alert('Error', 'Group not found');
          navigation.goBack();
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching group:', error);
        Alert.alert('Error', 'Failed to load group details');
        setLoading(false);
      }
    };
    
    fetchGroup();
    
    // Set up listener for messages
    const messagesRef = collection(db, 'groups', groupId, 'messages');
    const messagesQuery = query(messagesRef, orderBy('createdAt', 'desc'));
    
    const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
      const messagesList = [];
      snapshot.forEach((doc) => {
        messagesList.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setMessages(messagesList);
    }, (error) => {
      console.error("Error fetching messages:", error);
    });
    
    // Clean up listener
    return () => {
      unsubscribeMessages();
    };
  }, [groupId, navigation]);

  const handleJoinGroup = async () => {
    if (!currentUser) {
      Alert.alert('Error', 'You must be logged in to join a group');
      return;
    }
    
    try {
      setJoiningGroup(true);
      await joinGroup(groupId);
      
      // Update local state
      setGroup(prevGroup => ({
        ...prevGroup,
        members: [...(prevGroup.members || []), currentUser.uid]
      }));
      
      Alert.alert('Success', 'You have joined the group');
    } catch (error) {
      console.error('Error joining group:', error);
      Alert.alert('Error', 'Failed to join group. Please try again.');
    } finally {
      setJoiningGroup(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentUser) {
      return;
    }
    
    if (!isMember) {
      Alert.alert('Error', 'You must join the group to send messages');
      return;
    }
    
    try {
      setSendingMessage(true);
      
      const messagesRef = collection(db, 'groups', groupId, 'messages');
      await addDoc(messagesRef, {
        text: newMessage.trim(),
        createdAt: serverTimestamp(),
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Church Member',
        userPhotoURL: currentUser.photoURL || null
      });
      
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message. Please try again.');
    } finally {
      setSendingMessage(false);
    }
  };

  const renderMessageItem = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.userId === currentUser?.uid ? styles.myMessage : styles.otherMessage
    ]}>
      <Text style={styles.messageSender}>{item.userName}</Text>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>
        {item.createdAt ? new Date(item.createdAt.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#e1f0d8" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3c5c8e" />
          <Text style={styles.loadingText}>Loading group details...</Text>
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
        <Text style={styles.headerTitle} numberOfLines={1}>{group?.name}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('GroupMembers', { groupId })}>
          <Ionicons name="people" size={24} color="#3c5c8e" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.container}>
        <View style={styles.groupInfo}>
          <Text style={styles.groupDescription}>
            {group?.description || 'No description provided'}
          </Text>
          <Text style={styles.memberCount}>
            {group?.members?.length || 0} members
          </Text>
          
          {!isMember && (
            <TouchableOpacity
              style={[styles.joinButton, joiningGroup && styles.disabledButton]}
              onPress={handleJoinGroup}
              disabled={joiningGroup}
            >
              {joiningGroup ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.joinButtonText}>Join Group</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.messagesContainer}>
          <Text style={styles.sectionTitle}>Group Chat</Text>
          
          {messages.length === 0 ? (
            <View style={styles.emptyMessages}>
              <Ionicons name="chatbubble-outline" size={40} color="#cccccc" />
              <Text style={styles.emptyText}>No messages yet</Text>
              {isMember ? (
                <Text style={styles.emptySubtext}>Be the first to send a message!</Text>
              ) : (
                <Text style={styles.emptySubtext}>Join the group to start chatting</Text>
              )}
            </View>
          ) : (
            <FlatList
              data={messages}
              renderItem={renderMessageItem}
              keyExtractor={(item) => item.id}
              inverted
              contentContainerStyle={styles.messagesList}
            />
          )}
        </View>
        
        {isMember && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Type a message..."
              multiline
            />
            <TouchableOpacity
              style={[styles.sendButton, (!newMessage.trim() || sendingMessage) && styles.disabledSendButton]}
              onPress={handleSendMessage}
              disabled={!newMessage.trim() || sendingMessage}
            >
              {sendingMessage ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Ionicons name="send" size={20} color="#ffffff" />
              )}
            </TouchableOpacity>
          </View>
        )}
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
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  groupInfo: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  groupDescription: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 10,
    lineHeight: 22,
  },
  memberCount: {
    fontSize: 14,
    color: '#777777',
    marginBottom: 16,
  },
  joinButton: {
    backgroundColor: '#a9c25d',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    shadowOpacity: 0.1,
  },
  joinButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  messagesContainer: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3c5c8e',
    marginBottom: 16,
  },
  emptyMessages: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3c5c8e',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#777777',
    marginTop: 8,
    textAlign: 'center',
  },
  messagesList: {
    paddingBottom: 16,
  },
  messageContainer: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#e1f0d8',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
  },
  messageSender: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3c5c8e',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#333333',
  },
  messageTime: {
    fontSize: 10,
    color: '#777777',
    alignSelf: 'flex-end',
    marginTop: 4,
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

export default GroupDetailsScreen;