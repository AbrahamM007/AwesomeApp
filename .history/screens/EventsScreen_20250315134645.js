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
  StatusBar
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppHeader from '../components/AppHeader';

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
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Format time for display
  const formatTime = (timeString) => {
    return timeString;
  };
  
  // Render each event item
  const renderEventItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.eventCard}
      onPress={() => {
        // Navigate to event details screen when implemented
        // navigation.navigate('EventDetails', { eventId: item.id });
        console.log('Event pressed:', item.title);
      }}
    >
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.eventImage} />
      ) : (
        <View style={styles.eventImagePlaceholder}>
          <FontAwesome5 name="calendar-alt" size={40} color="#a0aec0" />
        </View>
      )}
      
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        
        <View style={styles.eventDetails}>
          <View style={styles.detailRow}>
            <FontAwesome5 name="calendar" size={14} color="#a9c25d" />
            <Text style={styles.detailText}>{formatDate(item.date)}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <FontAwesome5 name="clock" size={14} color="#a9c25d" />
            <Text style={styles.detailText}>{formatTime(item.time)}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <FontAwesome5 name="map-marker-alt" size={14} color="#a9c25d" />
            <Text style={styles.detailText}>{item.location}</Text>
          </View>
        </View>
        
        <Text style={styles.eventDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#2c5282" />
      
      <AppHeader 
        title="Events" 
        showBackButton={false}
        rightComponent={
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => navigation.navigate('CreateEvent')}
          >
            <FontAwesome5 name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        }
      />
      
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#a9c25d" />
            <Text style={{ marginTop: 10, color: '#718096' }}>Loading events...</Text>
          </View>
        ) : events.length === 0 ? (
          <View style={styles.emptyContainer}>
            <FontAwesome5 name="calendar-times" size={50} color="#a0aec0" />
            <Text style={styles.emptyText}>No events found</Text>
            <Text style={{ color: '#718096', textAlign: 'center', marginTop: 5 }}>
              Create a new event to get started
            </Text>
          </View>
        ) : (
          <FlatList
            data={events}
            renderItem={renderEventItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      
      <TouchableOpacity 
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateEvent')}
      >
        <FontAwesome5 name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2c5282',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  addButton: {
    padding: 8,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#d4f5c9',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#718096',
    marginTop: 10,
  },
  listContainer: {
    padding: 16,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventImage: {
    width: '100%',
    height: 150,
  },
  eventImagePlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventContent: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 10,
  },
  eventDetails: {
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#4a5568',
    marginLeft: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: '#718096',
  },
  createButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#a9c25d',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default EventsScreen;