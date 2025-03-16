import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppHeader from '../components/AppHeader';

const EventsScreen = () => {
  const navigation = useNavigation();
  // Fix: Only declare events once
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Load real events data from AsyncStorage
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const storedEvents = await AsyncStorage.getItem('events');
        if (storedEvents) {
          const parsedEvents = JSON.parse(storedEvents);
          // Sort by dateTime (upcoming first)
          parsedEvents.sort((a, b) => 
            new Date(a.dateTime) - new Date(b.dateTime)
          );
          setEvents(parsedEvents);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error('Error loading events:', error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadEvents();
    
    // Set up a refresh interval
    const refreshInterval = setInterval(loadEvents, 5000);
    
    // Clean up
    return () => clearInterval(refreshInterval);
  }, []);

  const renderEventItem = ({ item }) => {
    // Format the date
    const eventDate = new Date(item.dateTime);
    const formattedDate = eventDate.toLocaleDateString();
    const formattedTime = eventDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    return (
      <TouchableOpacity 
        style={styles.eventCard}
        onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
      >
        {item.imageUrl ? (
          <Image 
            source={{ uri: item.imageUrl }} 
            style={styles.eventImage} 
          />
        ) : (
          <View style={styles.eventImagePlaceholder}>
            <FontAwesome5 name="calendar-alt" size={30} color="#a0aec0" />
          </View>
        )}
        
        <View style={styles.eventContent}>
          <Text style={styles.eventTitle}>{item.name}</Text>
          
          <View style={styles.eventDetails}>
            <View style={styles.detailRow}>
              <FontAwesome5 name="clock" size={14} color="#a9c25d" solid />
              <Text style={styles.detailText}>
                {formattedDate} at {formattedTime}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <FontAwesome5 name="map-marker-alt" size={14} color="#a9c25d" solid />
              <Text style={styles.detailText}>
                {item.location || 'Location TBD'}
              </Text>
            </View>
          </View>
          
          <Text style={styles.eventDescription} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#a9c25d" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Upcoming Events</Text>
      </View>
      
      {events.length === 0 ? (
        <View style={styles.emptyContainer}>
          <FontAwesome5 name="calendar-times" size={50} color="#a0aec0" />
          <Text style={styles.emptyText}>No upcoming events</Text>
        </View>
      ) : (
        <FlatList
          data={events}
          renderItem={renderEventItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
      
      <TouchableOpacity 
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateEvent')}
      >
        <FontAwesome5 name="plus" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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