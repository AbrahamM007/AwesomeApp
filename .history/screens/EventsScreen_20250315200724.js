import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Dimensions
} from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppHeader from '../components/AppHeader';

const { width } = Dimensions.get('window');

const EventsScreen = () => {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch events from Firebase instead of AsyncStorage
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        
        // Get events from Firebase
        const eventsRef = firebase.firestore().collection('events');
        const snapshot = await eventsRef.orderBy('date', 'desc').get();
        
        if (!snapshot.empty) {
          const fetchedEvents = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setEvents(fetchedEvents);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        
        // Fallback to AsyncStorage if Firebase fails
        try {
          const eventsData = await AsyncStorage.getItem('events');
          if (eventsData) {
            const parsedEvents = JSON.parse(eventsData);
            parsedEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
            setEvents(parsedEvents);
          }
        } catch (storageError) {
          console.error('Fallback error:', storageError);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
    
    // Set up real-time listener for events collection
    const unsubscribe = firebase.firestore()
      .collection('events')
      .orderBy('date', 'desc')
      .onSnapshot(snapshot => {
        if (!snapshot.empty) {
          const fetchedEvents = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setEvents(fetchedEvents);
          setLoading(false);
        }
      }, error => {
        console.error('Snapshot error:', error);
      });
    
    // Clean up listener on unmount
    return () => unsubscribe();
  }, [navigation]);
  
  // Format date for display - fixed to handle invalid dates
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Date TBD';
      }
      const options = { weekday: 'short', month: 'short', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    } catch (error) {
      return 'Date TBD';
    }
  };
  
  // Format time for display with validation
  const formatTime = (timeString) => {
    return timeString || 'Time TBD';
  };
  
  // Get date parts safely
  const getDateDay = (dateString) => {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'TBD' : date.getDate();
    } catch (error) {
      return 'TBD';
    }
  };
  
  const getDateMonth = (dateString) => {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) 
        ? 'TBD' 
        : date.toLocaleString('default', { month: 'short' });
    } catch (error) {
      return 'TBD';
    }
  };
  
  // Render each event item with improved church events styling
  const renderEventItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.eventCard}
      onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
    >
      <View style={styles.eventCardInner}>
        <View style={styles.eventDateContainer}>
          <View style={styles.eventDateBadge}>
            <Text style={styles.eventDateDay}>{getDateDay(item.date)}</Text>
            <Text style={styles.eventDateMonth}>{getDateMonth(item.date)}</Text>
          </View>
        </View>
        
        <View style={styles.eventContent}>
          <Text style={styles.eventTitle} numberOfLines={1}>{item.title}</Text>
          <View style={styles.eventMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={14} color="#3c5c8e" />
              <Text style={styles.metaText}>{formatTime(item.time)}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="location-outline" size={14} color="#3c5c8e" />
              <Text style={styles.metaText}>{item.location || 'Location TBD'}</Text>
            </View>
          </View>
          {item.description && (
            <Text style={styles.eventDescription} numberOfLines={1}>
              {item.description}
            </Text>
          )}
        </View>
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
      
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <TouchableOpacity onPress={() => console.log('See all events')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3c5c8e" />
            <Text style={styles.loadingText}>Loading events...</Text>
          </View>
        ) : events.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="calendar-outline" size={50} color="#ffffff" />
            </View>
            <Text style={styles.emptyText}>No Events Found</Text>
            <Text style={styles.emptySubText}>Create your first church event</Text>
            <TouchableOpacity 
              style={styles.emptyButton}
              onPress={() => navigation.navigate('CreateEvent')}
            >
              <Text style={styles.emptyButtonText}>Create Event</Text>
              <Ionicons name="add-circle" size={18} color="#ffffff" style={{marginLeft: 8}} />
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={events}
            renderItem={renderEventItem}
            keyExtractor={(item) => item.id || Math.random().toString()}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      
      {events.length > 0 && (
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => navigation.navigate('CreateEvent')}
        >
          <View style={styles.createButtonInner}>
            <Ionicons name="add" size={24} color="#ffffff" />
          </View>
        </TouchableOpacity>
      )}
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
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
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
  eventCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventCardInner: {
    flexDirection: 'row',
  },
  eventDateContainer: {
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRightWidth: 1,
    borderRightColor: '#eaeaea',
  },
  eventDateBadge: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#eaeaea',
  },
  eventDateDay: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3c5c8e',
    lineHeight: 24,
  },
  eventDateMonth: {
    fontSize: 12,
    color: '#666666',
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  eventContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3c5c8e',
    marginBottom: 8,
  },
  eventMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  metaText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#666666',
  },
  eventDescription: {
    fontSize: 13,
    color: '#888888',
    fontStyle: 'italic',
  },
  createButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#a9c25d',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  createButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#a9c25d',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EventsScreen;