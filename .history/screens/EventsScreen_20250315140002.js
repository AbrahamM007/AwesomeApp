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
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.eventImage} />
      ) : (
        <View style={styles.eventImagePlaceholder}>
          <FontAwesome5 name="calendar-alt" size={40} color="#c1ff72" />
        </View>
      )}
      
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        
        <View style={styles.eventDetails}>
          <View style={styles.detailRow}>
            <FontAwesome5 name="calendar" size={14} color="#c1ff72" solid />
            <Text style={styles.detailText}>{formatDate(item.date)}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <FontAwesome5 name="clock" size={14} color="#c1ff72" solid />
            <Text style={styles.detailText}>{formatTime(item.time)}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <FontAwesome5 name="map-marker-alt" size={14} color="#c1ff72" solid />
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
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <AppHeader 
        title="EVENTS" 
        showBackButton={false}
        backgroundColor="#000000"
        titleStyle={styles.headerTitle}
        rightComponent={
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => navigation.navigate('CreateEvent')}
          >
            <FontAwesome5 name="plus" size={20} color="#c1ff72" />
          </TouchableOpacity>
        }
      />
      
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#c1ff72" />
            <Text style={styles.loadingText}>Loading events...</Text>
          </View>
        ) : events.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <FontAwesome5 name="calendar-times" size={40} color="#000000" />
            </View>
            <Text style={styles.emptyText}>NO EVENTS FOUND</Text>
            <Text style={styles.emptySubText}>
              Create a new event to get started
            </Text>
            <TouchableOpacity 
              style={styles.emptyButton}
              onPress={() => navigation.navigate('CreateEvent')}
            >
              <Text style={styles.emptyButtonText}>CREATE EVENT</Text>
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
          <FontAwesome5 name="plus" size={24} color="#000000" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 28,
    letterSpacing: 2,
    color: '#c1ff72',
  },
  addButton: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  loadingText: {
    marginTop: 10, 
    color: '#c1ff72', 
    fontWeight: '500',
    letterSpacing: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000000',
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#c1ff72',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#c1ff72',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  emptyText: {
    fontSize: 28, 
    color: '#c1ff72', 
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 8,
    letterSpacing: 2,
  },
  emptySubText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#c1ff72',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  listContainer: {
    padding: 16,
  },
  eventCard: {
    backgroundColor: '#111111',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#c1ff72',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#333333',
  },
  eventImage: {
    width: '100%',
    height: 150,
  },
  eventImagePlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventContent: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#c1ff72',
    marginBottom: 10,
    letterSpacing: 1,
  },
  eventDetails: {
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 8,
    fontWeight: '400',
  },
  eventDescription: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
  },
  createButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#c1ff72',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#c1ff72',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default EventsScreen;