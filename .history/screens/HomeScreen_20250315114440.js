import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [ministries, setMinistries] = useState([]);
  
  // Load data from AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load announcements
        const storedAnnouncements = await AsyncStorage.getItem('announcements');
        if (storedAnnouncements) {
          const parsedAnnouncements = JSON.parse(storedAnnouncements);
          // Sort by createdAt date (newest first) and limit to 3
          parsedAnnouncements.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          setAnnouncements(parsedAnnouncements.slice(0, 3));
        }
        
        // Load events
        const storedEvents = await AsyncStorage.getItem('events');
        if (storedEvents) {
          const parsedEvents = JSON.parse(storedEvents);
          // Sort by dateTime (upcoming first) and limit to 3
          parsedEvents.sort((a, b) => 
            new Date(a.dateTime) - new Date(b.dateTime)
          );
          setEvents(parsedEvents.slice(0, 3));
        }
        
        // Load ministries
        const storedMinistries = await AsyncStorage.getItem('ministries');
        if (storedMinistries) {
          const parsedMinistries = JSON.parse(storedMinistries);
          setMinistries(parsedMinistries.slice(0, 3));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    
    loadData();
    
    // Set up a refresh interval
    const refreshInterval = setInterval(loadData, 5000);
    
    // Clean up
    return () => clearInterval(refreshInterval);
  }, []);
  
  // Render an announcement item
  const renderAnnouncementItem = ({ item }) => {
    const isEvent = item.type === 'event';
    const isMinistry = item.type === 'ministry';
    
    return (
      <TouchableOpacity 
        style={styles.announcementCard}
        onPress={() => {
          if (isEvent) {
            navigation.navigate('EventDetails', { eventId: item.eventId });
          } else if (isMinistry) {
            navigation.navigate('MinistryDetails', { ministryId: item.ministryId });
          }
        }}
      >
        {item.imageUrl ? (
          <Image 
            source={{ uri: item.imageUrl }} 
            style={styles.announcementImage} 
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <FontAwesome5 
              name={isEvent ? 'calendar-alt' : 'hands-helping'} 
              size={24} 
              color="#a0aec0" 
            />
          </View>
        )}
        
        <View style={styles.announcementContent}>
          <Text style={styles.announcementTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.announcementDescription} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  // Render an event item
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
            <FontAwesome5 name="calendar-alt" size={24} color="#a0aec0" />
          </View>
        )}
        
        <View style={styles.eventContent}>
          <Text style={styles.eventTitle} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.eventTime}>
            {formattedDate} at {formattedTime}
          </Text>
          <Text style={styles.eventLocation} numberOfLines={1}>
            {item.location || 'Location TBD'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  // Render a ministry item
  const renderMinistryItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.ministryCard}
        onPress={() => navigation.navigate('MinistryDetails', { ministryId: item.id })}
      >
        {item.imageUrl ? (
          <Image 
            source={{ uri: item.imageUrl }} 
            style={styles.ministryImage} 
          />
        ) : (
          <View style={styles.ministryImagePlaceholder}>
            <FontAwesome5 name="hands-helping" size={24} color="#a0aec0" />
          </View>
        )}
        
        <Text style={styles.ministryName} numberOfLines={2}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.churchName}>Awesome Church</Text>
      </View>
      
      {/* Announcements Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Announcements</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Announcements')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {announcements.length === 0 ? (
          <View style={styles.emptyState}>
            <FontAwesome5 name="bell-slash" size={24} color="#a0aec0" />
            <Text style={styles.emptyStateText}>No announcements yet</Text>
          </View>
        ) : (
          <FlatList
            data={announcements}
            renderItem={renderAnnouncementItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.announcementsList}
          />
        )}
      </View>
      
      {/* Upcoming Events Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Events')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {events.length === 0 ? (
          <View style={styles.emptyState}>
            <FontAwesome5 name="calendar-times" size={24} color="#a0aec0" />
            <Text style={styles.emptyStateText}>No upcoming events</Text>
          </View>
        ) : (
          <FlatList
            data={events}
            renderItem={renderEventItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.eventsList}
          />
        )}
      </View>
      
      {/* Your Groups Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Groups</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Ministries')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {ministries.length === 0 ? (
          <View style={styles.emptyState}>
            <FontAwesome5 name="users-slash" size={24} color="#a0aec0" />
            <Text style={styles.emptyStateText}>No groups yet</Text>
          </View>
        ) : (
          <FlatList
            data={ministries}
            renderItem={renderMinistryItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.ministriesList}
          />
        )}
      </View>
      
      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('CreateEvent')}
        >
          <FontAwesome5 name="calendar-plus" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Create Event</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('CreateMinistry')}
        >
          <FontAwesome5 name="users" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Create Group</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  welcomeText: {
    fontSize: 18,
    color: '#4a5568',
  },
  churchName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c5282',
    marginTop: 5,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  seeAllText: {
    fontSize: 14,
    color: '#a9c25d',
    fontWeight: '600',
  },
  emptyState: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  emptyStateText: {
    marginTop: 10,
    color: '#718096',
    fontSize: 16,
  },
  // Announcements styles
  announcementsList: {
    paddingRight: 20,
  },
  announcementCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 280,
    marginRight: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  announcementImage: {
    width: '100%',
    height: 120,
  },
  imagePlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  announcementContent: {
    padding: 15,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 5,
  },
  announcementDescription: {
    fontSize: 14,
    color: '#4a5568',
  },
  // Events styles
  eventsList: {
    paddingRight: 20,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 200,
    marginRight: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  eventImage: {
    width: '100%',
    height: 100,
  },
  eventImagePlaceholder: {
    width: '100%',
    height: 100,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventContent: {
    padding: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 5,
  },
  eventTime: {
    fontSize: 12,
    color: '#a9c25d',
    marginBottom: 5,
  },
  eventLocation: {
    fontSize: 12,
    color: '#718096',
  },
  // Ministries styles
  ministriesList: {
    paddingRight: 20,
  },
  ministryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 120,
    marginRight: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
    padding: 10,
  },
  ministryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  ministryImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  ministryName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2d3748',
    textAlign: 'center',
  },
  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  actionButton: {
    backgroundColor: '#a9c25d',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default HomeScreen;