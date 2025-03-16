import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const MyEventsScreen = ({ navigation }) => {
  const { userInfo } = useAuth();
  
  // Mock data for user's events
  const userEvents = [
    {
      id: '1',
      title: 'Sunday Service',
      date: 'Sunday, June 12, 2023',
      time: '10:00 AM - 12:00 PM',
      location: 'Main Sanctuary',
      description: 'Weekly worship service with praise, prayer, and teaching.',
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      isOrganizer: true
    },
    {
      id: '2',
      title: 'Youth Night',
      date: 'Friday, June 17, 2023',
      time: '7:00 PM - 9:00 PM',
      location: 'Youth Center',
      description: 'Fun night of games, worship, and fellowship for teens.',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      isOrganizer: false
    },
    {
      id: '3',
      title: 'Bible Study Workshop',
      date: 'Saturday, June 18, 2023',
      time: '9:00 AM - 12:00 PM',
      location: 'Fellowship Hall',
      description: 'Learn effective Bible study methods and tools.',
      image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      isOrganizer: true
    }
  ];
  
  const renderEventItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.eventCard}
      onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.eventImage}
        resizeMode="cover"
      />
      <View style={styles.eventInfo}>
        <View style={styles.eventHeader}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          {item.isOrganizer && (
            <View style={styles.organizerTag}>
              <Text style={styles.organizerText}>Organizer</Text>
            </View>
          )}
        </View>
        
        <View style={styles.eventDetails}>
          <View style={styles.eventDetailItem}>
            <FontAwesome5 name="calendar-alt" size={14} color="#718096" style={styles.eventDetailIcon} />
            <Text style={styles.eventDetailText}>{item.date}</Text>
          </View>
          
          <View style={styles.eventDetailItem}>
            <FontAwesome5 name="clock" size={14} color="#718096" style={styles.eventDetailIcon} />
            <Text style={styles.eventDetailText}>{item.time}</Text>
          </View>
          
          <View style={styles.eventDetailItem}>
            <FontAwesome5 name="map-marker-alt" size={14} color="#718096" style={styles.eventDetailIcon} />
            <Text style={styles.eventDetailText}>{item.location}</Text>
          </View>
        </View>
        
        <Text style={styles.eventDescription} numberOfLines={2}>{item.description}</Text>
        
        <View style={styles.eventActions}>
          {item.isOrganizer && (
            <TouchableOpacity 
              style={styles.eventActionButton}
              onPress={() => navigation.navigate('ManageEvent', { eventId: item.id })}
            >
              <FontAwesome5 name="edit" size={16} color="#2c5282" />
              <Text style={styles.eventActionText}>Edit</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={styles.eventActionButton}
            onPress={() => {/* Handle RSVP */}}
          >
            <FontAwesome5 name="calendar-check" size={16} color="#2c5282" />
            <Text style={styles.eventActionText}>RSVP</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.eventActionButton}
            onPress={() => navigation.navigate('EventComments', { eventId: item.id })}
          >
            <FontAwesome5 name="comment-alt" size={16} color="#2c5282" />
            <Text style={styles.eventActionText}>Comments</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={20} color="#2c5282" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Events</Text>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => navigation.navigate('CreateEvent')}
        >
          <FontAwesome5 name="plus" size={20} color="#2c5282" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={userEvents}
        renderItem={renderEventItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FontAwesome5 name="calendar-alt" size={60} color="#cbd5e0" />
            <Text style={styles.emptyText}>You don't have any events yet</Text>
            <TouchableOpacity 
              style={styles.emptyButton}
              onPress={() => navigation.navigate('CreateEvent')}
            >
              <Text style={styles.emptyButtonText}>Create Event</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#d4f5c9',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  backButton: {
    padding: 5,
  },
  createButton: {
    padding: 5,
  },
  listContainer: {
    padding: 20,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 150,
  },
  eventInfo: {
    padding: 15,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    flex: 1,
  },
  organizerTag: {
    backgroundColor: '#ebf8ff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  organizerText: {
    fontSize: 12,
    color: '#2c5282',
    fontWeight: '600',
  },
  eventDetails: {
    marginBottom: 10,
  },
  eventDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventDetailIcon: {
    width: 20,
    textAlign: 'center',
    marginRight: 8,
  },
  eventDetailText: {
    fontSize: 14,
    color: '#4a5568',
  },
  eventDescription: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 15,
  },
  eventActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 15,
  },
  eventActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  eventActionText: {
    color: '#2c5282',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#718096',
    marginTop: 20,
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: '#2c5282',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyEventsScreen;