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
  
  // Render each event item with improved styling
  const renderEventItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.eventCard}
      onPress={() => {
        console.log('Event pressed:', item.title);
      }}
    >
      <View style={styles.eventHeader}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.eventImage} />
        ) : (
          <View style={styles.eventImagePlaceholder}>
            <FontAwesome5 name="calendar-alt" size={40} color="#a9c25d" />
          </View>
        )}
        <View style={styles.eventDateBadge}>
          <Text style={styles.eventDateDay}>
            {new Date(item.date).getDate()}
          </Text>
          <Text style={styles.eventDateMonth}>
            {new Date(item.date).toLocaleString('default', { month: 'short' })}
          </Text>
        </View>
      </View>
      
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        
        <View style={styles.eventDetails}>
          <View style={styles.detailRow}>
            <FontAwesome5 name="calendar" size={14} color="#a9c25d" solid />
            <Text style={styles.detailText}>{formatDate(item.date)}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <FontAwesome5 name="clock" size={14} color="#a9c25d" solid />
            <Text style={styles.detailText}>{formatTime(item.time)}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <FontAwesome5 name="map-marker-alt" size={14} color="#a9c25d" solid />
            <Text style={styles.detailText}>{item.location}</Text>
          </View>
        </View>
        
        <Text style={styles.eventDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <TouchableOpacity style={styles.viewDetailsButton}>
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: '#a9c25d' }]}>
      <StatusBar barStyle="light-content" backgroundColor="#a9c25d" />
      
      <AppHeader 
        title="Events" 
        showBackButton={false}
        backgroundColor="#a9c25d"
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
            <ActivityIndicator size="large" color="#5e3b25" />
            <Text style={{ marginTop: 10, color: '#5e3b25', fontWeight: '500' }}>Loading events...</Text>
          </View>
        ) : events.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <FontAwesome5 name="calendar-times" size={40} color="#fff" />
            </View>
            <Text style={styles.emptyText}>No events found</Text>
            <Text style={styles.emptySubText}>
              Create a new event to get started
            </Text>
            <TouchableOpacity 
              style={styles.emptyButton}
              onPress={() => navigation.navigate('CreateEvent')}
            >
              <Text style={styles.emptyButtonText}>Create Event</Text>
            </TouchableOpacity>
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
      
      {events.length > 0 && (
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => navigation.navigate('CreateEvent')}
        >
          <FontAwesome5 name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // The backgroundColor will be overridden in the component
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  addButton: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#a9c25d', // Changed from #8eda8e to match button color
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
    fontSize: 24, 
    color: '#2c5282', 
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#a9c25d',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  eventHeader: {
    position: 'relative',
  },
  eventImage: {
    width: '100%',
    height: 180,
  },
  eventImagePlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: '#f0f7e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventDateBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    minWidth: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  eventDateDay: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  eventDateMonth: {
    fontSize: 12,
    color: '#4a5568',
    textTransform: 'uppercase',
  },
  eventContent: {
    padding: 20,
  },
  eventTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c5282',
    marginBottom: 12,
  },
  eventDetails: {
    marginBottom: 14,
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#4a5568',
    marginLeft: 10,
    fontWeight: '500',
    flex: 1,
  },
  eventDescription: {
    fontSize: 15,
    color: '#718096',
    lineHeight: 22,
    marginBottom: 16,
  },
  viewDetailsButton: {
    backgroundColor: '#f0f7e8',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  viewDetailsText: {
    color: '#5e3b25',
    fontWeight: '600',
    fontSize: 14,
  },
  createButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#a9c25d',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});

export default EventsScreen;