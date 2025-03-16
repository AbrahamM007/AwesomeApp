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
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase/config';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up listeners for announcements and events
    const announcementsRef = collection(db, 'announcements');
    const announcementsQuery = query(
      announcementsRef, 
      orderBy('createdAt', 'desc'), 
      limit(3)
    );
    
    const eventsRef = collection(db, 'events');
    const eventsQuery = query(
      eventsRef, 
      orderBy('date', 'desc'), 
      limit(3)
    );
    
    // Listen for announcements
    const unsubscribeAnnouncements = onSnapshot(announcementsQuery, (snapshot) => {
      const announcementsList = [];
      snapshot.forEach((doc) => {
        announcementsList.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setAnnouncements(announcementsList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching announcements:", error);
      setLoading(false);
    });
    
    // Listen for events
    const unsubscribeEvents = onSnapshot(eventsQuery, (snapshot) => {
      const eventsList = [];
      snapshot.forEach((doc) => {
        eventsList.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setEvents(eventsList);
    }, (error) => {
      console.error("Error fetching events:", error);
    });
    
    // Clean up listeners
    return () => {
      unsubscribeAnnouncements();
      unsubscribeEvents();
    };
  }, []);

  // Render announcement item
  const renderAnnouncementItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.announcementCard}
      onPress={() => navigation.navigate('AnnouncementDetails', { id: item.id })}
    >
      <View style={styles.announcementHeader}>
        <View style={styles.announcementBadge}>
          <Ionicons name="megaphone" size={16} color="#ffffff" />
        </View>
        <Text style={styles.announcementTitle} numberOfLines={1}>{item.title}</Text>
      </View>
      <Text style={styles.announcementContent} numberOfLines={2}>
        {item.content}
      </Text>
      <View style={styles.announcementFooter}>
        <Text style={styles.announcementAuthor}>
          Posted by {item.authorName || 'Anonymous'}
        </Text>
        <Text style={styles.announcementDate}>
          {item.createdAt ? new Date(item.createdAt.toDate()).toLocaleDateString() : 'Recently'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#e1f0d8" />
      
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.churchName}>New Hope Church</Text>
      </View>
      
      <ScrollView style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3c5c8e" />
            <Text style={styles.loadingText}>Loading content...</Text>
          </View>
        ) : (
          <>
            {/* Announcements Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Announcements</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Announcements')}>
                  <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
              </View>
              
              {announcements.length === 0 ? (
                <View style={styles.emptySection}>
                  <Text style={styles.emptyText}>No announcements yet</Text>
                </View>
              ) : (
                <FlatList
                  data={announcements}
                  renderItem={renderAnnouncementItem}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.announcementsContainer}
                />
              )}
              
              <TouchableOpacity 
                style={styles.createButton}
                onPress={() => navigation.navigate('CreateAnnouncement')}
              >
                <Text style={styles.createButtonText}>Create Announcement</Text>
                <Ionicons name="add-circle-outline" size={18} color="#3c5c8e" />
              </TouchableOpacity>
            </View>
            
            {/* Events Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Upcoming Events</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Events')}>
                  <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
              </View>
              
              {events.length === 0 ? (
                <View style={styles.emptySection}>
                  <Text style={styles.emptyText}>No upcoming events</Text>
                </View>
              ) : (
                <View style={styles.eventsPreview}>
                  {events.map(event => (
                    <TouchableOpacity 
                      key={event.id}
                      style={styles.eventPreviewCard}
                      onPress={() => navigation.navigate('EventDetails', { eventId: event.id })}
                    >
                      <Text style={styles.eventPreviewTitle} numberOfLines={1}>{event.title}</Text>
                      <Text style={styles.eventPreviewDate}>
                        {event.date ? new Date(event.date.toDate()).toLocaleDateString() : 'Date TBD'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e1f0d8',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#e1f0d8',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#555555',
    fontWeight: '500',
  },
  churchName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3c5c8e',
    marginTop: 4,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  loadingContainer: {
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666666',
  },
  section: {
    marginBottom: 24,
    paddingTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#a9c25d',
    fontWeight: '600',
  },
  emptySection: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888888',
    fontStyle: 'italic',
  },
  // Announcements styles
  announcementsContainer: {
    paddingLeft: 20,
    paddingRight: 8,
  },
  announcementCard: {
    width: 280,
    marginRight: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  announcementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  announcementBadge: {
    backgroundColor: '#a9c25d',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3c5c8e',
    flex: 1,
  },
  announcementContent: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 12,
    lineHeight: 20,
  },
  announcementFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  announcementAuthor: {
    fontSize: 12,
    color: '#777777',
    fontStyle: 'italic',
  },
  announcementDate: {
    fontSize: 12,
    color: '#777777',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    paddingVertical: 8,
  },
  createButtonText: {
    fontSize: 14,
    color: '#3c5c8e',
    fontWeight: '600',
    marginRight: 6,
  },
  // Events preview styles
  eventsPreview: {
    paddingHorizontal: 20,
  },
  eventPreviewCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: '#a9c25d',
  },
  eventPreviewTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3c5c8e',
    flex: 1,
  },
  eventPreviewDate: {
    fontSize: 13,
    color: '#777777',
    marginLeft: 8,
  }
});

export default HomeScreen;