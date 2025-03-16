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
  Modal,
  TextInput,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../firebase/config';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { createGroup } from '../firebase/auth';

const CommunityScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('groups');
  const [groups, setGroups] = useState([]);
  const [prayers, setPrayers] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [groupModalVisible, setGroupModalVisible] = useState(false);
  const [prayerModalVisible, setPrayerModalVisible] = useState(false);
  const [discussionModalVisible, setDiscussionModalVisible] = useState(false);
  
  // Form states
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [newPrayerTitle, setNewPrayerTitle] = useState('');
  const [newPrayerRequest, setNewPrayerRequest] = useState('');
  const [newDiscussionTitle, setNewDiscussionTitle] = useState('');
  const [newDiscussionTopic, setNewDiscussionTopic] = useState('');
  
  const [creatingItem, setCreatingItem] = useState(false);

  useEffect(() => {
    // Set up listener for groups
    const groupsRef = collection(db, 'groups');
    const groupsQuery = query(groupsRef, orderBy('createdAt', 'desc'));
    
    const unsubscribeGroups = onSnapshot(groupsQuery, (snapshot) => {
      const groupsList = [];
      snapshot.forEach((doc) => {
        groupsList.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setGroups(groupsList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching groups:", error);
      setLoading(false);
    });
    
    // Set up listener for prayers
    const prayersRef = collection(db, 'prayers');
    const prayersQuery = query(prayersRef, orderBy('createdAt', 'desc'));
    
    const unsubscribePrayers = onSnapshot(prayersQuery, (snapshot) => {
      const prayersList = [];
      snapshot.forEach((doc) => {
        prayersList.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setPrayers(prayersList);
    }, (error) => {
      console.error("Error fetching prayers:", error);
    });
    
    // Set up listener for discussions
    const discussionsRef = collection(db, 'discussions');
    const discussionsQuery = query(discussionsRef, orderBy('createdAt', 'desc'));
    
    const unsubscribeDiscussions = onSnapshot(discussionsQuery, (snapshot) => {
      const discussionsList = [];
      snapshot.forEach((doc) => {
        discussionsList.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setDiscussions(discussionsList);
    }, (error) => {
      console.error("Error fetching discussions:", error);
    });
    
    // Clean up listeners
    return () => {
      unsubscribeGroups();
      unsubscribePrayers();
      unsubscribeDiscussions();
    };
  }, []);

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) {
      Alert.alert('Error', 'Please enter a group name');
      return;
    }
    
    try {
      setCreatingItem(true);
      
      await createGroup({
        name: newGroupName.trim(),
        description: newGroupDescription.trim(),
        type: 'public',
        memberCount: 1
      });
      
      setGroupModalVisible(false);
      setNewGroupName('');
      setNewGroupDescription('');
      
      Alert.alert('Success', 'Your group has been created successfully');
    } catch (error) {
      console.error('Error creating group:', error);
      Alert.alert('Error', 'Failed to create group. Please try again.');
    } finally {
      setCreatingItem(false);
    }
  };

  const handleCreatePrayer = async () => {
    if (!newPrayerTitle.trim()) {
      Alert.alert('Error', 'Please enter a prayer title');
      return;
    }
    
    try {
      setCreatingItem(true);
      
      const user = auth.currentUser;
      if (!user) {
        throw new Error('You must be logged in to create a prayer request');
      }
      
      const prayersRef = collection(db, 'prayers');
      await addDoc(prayersRef, {
        title: newPrayerTitle.trim(),
        request: newPrayerRequest.trim(),
        createdBy: user.uid,
        creatorName: user.displayName || 'Church Member',
        createdAt: serverTimestamp(),
        prayerCount: 0,
        isAnonymous: false
      });
      
      setPrayerModalVisible(false);
      setNewPrayerTitle('');
      setNewPrayerRequest('');
      
      Alert.alert('Success', 'Your prayer request has been shared');
    } catch (error) {
      console.error('Error creating prayer request:', error);
      Alert.alert('Error', 'Failed to create prayer request. Please try again.');
    } finally {
      setCreatingItem(false);
    }
  };

  const handleCreateDiscussion = async () => {
    if (!newDiscussionTitle.trim()) {
      Alert.alert('Error', 'Please enter a discussion title');
      return;
    }
    
    try {
      setCreatingItem(true);
      
      const user = auth.currentUser;
      if (!user) {
        throw new Error('You must be logged in to start a discussion');
      }
      
      const discussionsRef = collection(db, 'discussions');
      await addDoc(discussionsRef, {
        title: newDiscussionTitle.trim(),
        topic: newDiscussionTopic.trim(),
        createdBy: user.uid,
        creatorName: user.displayName || 'Church Member',
        createdAt: serverTimestamp(),
        commentCount: 0
      });
      
      setDiscussionModalVisible(false);
      setNewDiscussionTitle('');
      setNewDiscussionTopic('');
      
      Alert.alert('Success', 'Your discussion has been created');
    } catch (error) {
      console.error('Error creating discussion:', error);
      Alert.alert('Error', 'Failed to create discussion. Please try again.');
    } finally {
      setCreatingItem(false);
    }
  };

  // Render group item
  const renderGroupItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('GroupDetails', { groupId: item.id })}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.cardIcon, styles.groupIcon]}>
          <Ionicons name="people" size={24} color="#ffffff" />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.cardSubtitle}>{item.members?.length || 1} members</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#a9c25d" />
      </View>
      
      {item.description ? (
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
      ) : null}
      
      <View style={styles.cardFooter}>
        <Text style={styles.cardCreator}>
          Created by {item.creatorName || 'Church Member'}
        </Text>
        <Text style={styles.cardDate}>
          {item.createdAt ? new Date(item.createdAt.toDate()).toLocaleDateString() : 'Recently'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // Render prayer item
  const renderPrayerItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('PrayerDetails', { prayerId: item.id })}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.cardIcon, styles.prayerIcon]}>
          <Ionicons name="heart" size={24} color="#ffffff" />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.cardSubtitle}>{item.prayerCount || 0} prayers</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#a9c25d" />
      </View>
      
      {item.request ? (
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.request}
        </Text>
      ) : null}
      
      <View style={styles.cardFooter}>
        <Text style={styles.cardCreator}>
          {item.isAnonymous ? 'Anonymous' : `From ${item.creatorName || 'Church Member'}`}
        </Text>
        <Text style={styles.cardDate}>
          {item.createdAt ? new Date(item.createdAt.toDate()).toLocaleDateString() : 'Recently'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // Render discussion item
  const renderDiscussionItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('DiscussionDetails', { discussionId: item.id })}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.cardIcon, styles.discussionIcon]}>
          <Ionicons name="chatbubbles" size={24} color="#ffffff" />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.cardSubtitle}>{item.commentCount || 0} comments</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#a9c25d" />
      </View>
      
      {item.topic ? (
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.topic}
        </Text>
      ) : null}
      
      <View style={styles.cardFooter}>
        <Text style={styles.cardCreator}>
          Started by {item.creatorName || 'Church Member'}
        </Text>
        <Text style={styles.cardDate}>
          {item.createdAt ? new Date(item.createdAt.toDate()).toLocaleDateString() : 'Recently'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // Empty component for each section
  const renderEmptyComponent = (type) => {
    let icon, title, subtitle, action;
    
    switch (type) {
      case 'groups':
        icon = 'people-outline';
        title = 'No groups yet';
        subtitle = 'Create a new group to get started';
        action = () => setGroupModalVisible(true);
        break;
      case 'prayers':
        icon = 'heart-outline';
        title = 'No prayer requests';
        subtitle = 'Share a prayer request with the community';
        action = () => setPrayerModalVisible(true);
        break;
      case 'discussions':
        icon = 'chatbubbles-outline';
        title = 'No discussions yet';
        subtitle = 'Start a new discussion topic';
        action = () => setDiscussionModalVisible(true);
        break;
    }
    
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name={icon} size={60} color="#cccccc" />
        <Text style={styles.emptyText}>{title}</Text>
        <Text style={styles.emptySubtext}>{subtitle}</Text>
        <TouchableOpacity 
          style={styles.emptyButton}
          onPress={action}
        >
          <Text style={styles.emptyButtonText}>
            {type === 'groups' ? 'Create Group' : 
             type === 'prayers' ? 'Share Prayer Request' : 'Start Discussion'}
          </Text>
          <Ionicons name="add-circle-outline" size={18} color="#3c5c8e" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    // Around line 357 - Missing closing tag for SafeAreaView
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#e1f0d8" />
      
      // Around line 374 - Missing closing tag for View
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'groups' && styles.activeTab]}
          onPress={() => setActiveTab('groups')}
        >
          <Ionicons 
            name={activeTab === 'groups' ? "people" : "people-outline"} 
            size={20} 
            color={activeTab === 'groups' ? "#3c5c8e" : "#777777"} 
          />
          <Text style={[styles.tabText, activeTab === 'groups' && styles.activeTabText]}>
            Groups
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'prayers' && styles.activeTab]}
          onPress={() => setActiveTab('prayers')}
        >
          <Ionicons 
            name={activeTab === 'prayers' ? "heart" : "heart-outline"} 
            size={20} 
            color={activeTab === 'prayers' ? "#3c5c8e" : "#777777"} 
          />
          <Text style={[styles.tabText, activeTab === 'prayers' && styles.activeTabText]}>
            Prayers
          </Text>
        </TouchableOpacity>
        
        // Around line 408-423 - Issues with TouchableOpacity and Ionicons
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'discussions' && styles.activeTab]}
          onPress={() => setActiveTab('discussions')}
        >
          <Ionicons 
            name={activeTab === 'discussions' ? "chatbubbles" : "chatbubbles-outline"} 
            size={20} 
            color={activeTab === 'discussions' ? "#3c5c8e" : "#777777"} 
          />
          <Text style={[styles.tabText, activeTab === 'discussions' && styles.activeTabText]}>
            Discussions
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'discussions' && styles.activeTab]}
          onPress={() => setActiveTab('discussions')}
        >
          <Ionicons 
            name={activeTab === 'discussions' ? "chatbubbles" : "chatbubbles-outline"}