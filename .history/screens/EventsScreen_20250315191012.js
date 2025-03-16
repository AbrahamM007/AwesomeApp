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
  
  // Fetch events from AsyncStorage
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const eventsData = await AsyncStorage.getItem('events');
        if (eventsData) {
          const parsedEvents = JSON.parse(eventsData);
          // Sort events by date (most recent first)
          parsedEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
          setEvents(parsedEvents);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
    
    // Add listener to refresh events when navigating back to this screen
    const unsubscribe = navigation.addListener('focus', fetchEvents);
    return unsubscribe;
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
  
  // Render each event item with church app styling
  const renderEventItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.eventCard}
      onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
    >
      <View style={styles.eventImageContainer}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.eventImage} />
        ) : (
          <View style={styles.eventImagePlaceholder}>
            <Ionicons name="calendar-outline" size={40} color="#8c8c8c" />
          </View>
        )}
      </View>
      
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.eventDate}>{formatDate(item.date)} at {formatTime(item.time)}</Text>
        <Text style={styles.eventLocation} numberOfLines={1}>{item.location || 'Location TBD'}</Text>
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
            <Ionicons name="calendar-outline" size={50} color="#8c8c8c" />
            <Text style={styles.emptyText}>No events yet</Text>
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
      
      <TouchableOpacity 
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateEvent')}
      >
        <View style={styles.createButtonInner}>
          <Ionicons name="add" size={24} color="#ffffff" />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e1f0d8', // Light green background like in the images
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
  },
  churchName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3c5c8e', // Blue color from the images
    marginTop: 4,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#a9c25d', // Green color for action items
    fontWeight: '500',
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
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666666',
  },
  listContainer: {
    padding: 15,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#f5f7fa',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  eventImageContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  eventImagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3c5c8e', // Blue color from the images
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 13,
    color: '#888888',
  },
  createButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#a9c25d', // Green color for action items
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
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