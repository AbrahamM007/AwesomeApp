import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PrayerRequestScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  
  // Load messages from storage when component mounts
  useEffect(() => {
    loadMessages();
  }, []);
  
  // Save messages to AsyncStorage
  const saveMessages = async (updatedMessages) => {
    try {
      await AsyncStorage.setItem('prayerMessages', JSON.stringify(updatedMessages));
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  };
  
  // Load messages from AsyncStorage
  const loadMessages = async () => {
    try {
      const savedMessages = await AsyncStorage.getItem('prayerMessages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };
  
  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { 
        id: Date.now().toString(), 
        text: message, 
        sender: 'me',
        timestamp: new Date().toISOString()
      };
      
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      saveMessages(updatedMessages);
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#2c5282" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Prayer Request</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#2c5282" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg) => (
          <View 
            key={msg.id} 
            style={[
              styles.messageBubble, 
              msg.sender === 'me' ? styles.myMessage : styles.otherMessage
            ]}
          >
            {msg.sender === 'other' && (
              <View style={styles.avatar}></View>
            )}
            <View style={[
              styles.messageContent,
              msg.sender === 'me' ? styles.myMessageContent : styles.otherMessageContent
            ]}>
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.messageInput}
          placeholder="Type your prayer request..."
          value={message}
          onChangeText={setMessage}
          placeholderTextColor="#2c5282"
          multiline
        />
        <TouchableOpacity style={styles.cameraButton}>
          <FontAwesome5 name="camera" size={24} color="#2c5282" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4f5c9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#8eda8e',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2c5282',
  },
  menuButton: {
    padding: 5,
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-end',
  },
  myMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  messageContent: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxWidth: '70%',
  },
  myMessageContent: {
    backgroundColor: '#8eda8e',
  },
  otherMessageContent: {
    backgroundColor: '#2c5282',
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#8eda8e',
    backgroundColor: '#d4f5c9',
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#fffde7',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    color: '#2c5282',
    marginRight: 10,
  },
  cameraButton: {
    backgroundColor: '#8eda8e',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#2c5282',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PrayerRequestScreen;