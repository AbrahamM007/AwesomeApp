import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const AnnouncementsScreen = () => {
  const navigation = useNavigation();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch announcements from Firebase
  useEffect(() => {
    let unsubscribe = () => {};
    
    // Set up real-time listener for announcements collection
    const announcementsRef = collection(db, 'announcements');
    const q = query(announcementsRef, orderBy('createdAt', 'desc'));
    
    unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedAnnouncements = [];
      querySnapshot.forEach((doc) => {
        fetchedAnnouncements.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setAnnouncements(fetchedAnnouncements);
      setLoading(false);
    }, error => {
      console.error('Announcements snapshot error:', error);
      setLoading(false);
    });
    
    // Clean up listener on unmount
    return () => unsubscribe();
  }, []);

  // Render each announcement item
  const renderAnnouncementItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.announcementCard}
      onPress={() => navigation.navigate('AnnouncementDetails', { announcementId: item.id })}
    >
      <View style={styles.announcementHeader}>
        <Text style={styles.announcementTitle}>{item.title}</Text>
        {item.createdAt && (
          <Text style={styles.announcementDate}>
            {new Date(item.createdAt.toDate()).toLocaleDateString()}
          </Text>
        )}
      </View>
      
      <Text style={styles.announcementContent} numberOfLines={3}>
        {item.content}
      </Text>
      
      <View style={styles.announcementFooter}>
        <Text style={styles.announcementAuthor}>
          Posted by {item.authorName || 'Anonymous'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#e1f0d8" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Announcements</Text>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => navigation.navigate('CreateAnnouncement')}
        >
          <Text style={styles.createButtonText}>Create</Text>
          <Ionicons name="add-circle-outline" size={18} color="#3c5c8e" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3c5c8e" />
            <Text style={styles.loadingText}>Loading announcements...</Text>
          </View>
        ) : announcements.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="megaphone-outline" size={50} color="#ffffff" />
            </View>
            <Text style={styles.emptyText}>No Announcements</Text>
            <Text style={styles.emptySubText}>Be the first to share news with the community</Text>
            <TouchableOpacity 
              style={styles.emptyButton}
              onPress={() => navigation.navigate('CreateAnnouncement')}
            >
              <Text style={styles.emptyButtonText}>Create Announcement</Text>
              <Ionicons name="add-circle" size={18} color="#ffffff" style={{marginLeft: 8}} />
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={announcements}
            renderItem={renderAnnouncementItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#e1f0d8',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3c5c8e',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  createButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3c5c8e',
    marginRight: 6,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#a9c25d',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3c5c8e',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
    textAlign: 'center',
  },
  emptyButton: {
    backgroundColor: '#a9c25d',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  emptyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
  },
  announcementCard: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#a9c25d',
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3c5c8e',
    flex: 1,
  },
  announcementDate: {
    fontSize: 12,
    color: '#888888',
  },
  announcementContent: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 12,
    lineHeight: 20,
  },
  announcementFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  announcementAuthor: {
    fontSize: 12,
    color: '#777777',
    fontStyle: 'italic',
  },
});

export default AnnouncementsScreen;