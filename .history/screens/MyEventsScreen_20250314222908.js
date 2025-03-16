import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const MyEventsScreen = ({ navigation }) => {
  const { userInfo } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [refreshing, setRefreshing] = useState(false);
  
  // Mock data for user's events
  const upcomingEvents = [
    {
      id: '1',
      title: 'Summer Retreat',
      date: 'July 21-23, 2023',
      time: 'Starts Friday at 4:00 PM',
      location: 'Mountain View Retreat Center',
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      organizer: 'Young Adults Ministry'
    },
    {
      id: '2',
      title: 'Worship Night',
      date: 'June 15, 2023',
      time: '7:00 PM - 9:00 PM',
      location: 'Main Sanctuary',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      organizer: 'Worship Team'
    }
  ];
  
  const pastEvents = [
    {
      id: '3',
      title: 'Easter Service',
      date: 'April 9, 2023',
      time: '10:00 AM - 12:00 PM',
      location: 'Main Sanctuary',
      image: 'https://images.unsplash.com/photo-1555601568-c9e6f328489b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      organizer: 'Church Staff'
    },
    {
      id: '4',
      title: 'Community Outreach',
      date: 'March 25, 2023',
      time: '9:00 AM - 1:00 PM',
      location: 'Downtown Community Center',
      image: 'https://images.unsplash.com/photo-1593113598332-cd59a0c3a9a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      organizer: 'Outreach Ministry'
    }
  ];
  
  const onRefresh = () => {
    setRefreshing(true);
    // In a real app, you would fetch new data here
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  
  const renderEventItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.eventCard}
      onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.eventImage} />
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        
        <View style={styles.eventDetail}>
          <FontAwesome5 name="calendar-alt" size={14} color="#718096" style={styles.eventIcon} />
          <Text style={styles.eventDetailText}>{item.date}</Text>
        </View>
        
        <View style={styles.eventDetail}>
          <FontAwesome5 name="clock" size={14} color="#718096" style={styles.eventIcon} />
          <Text style={styles.eventDetailText}>{item.time}</Text>
        </View>
        
        <View style={styles.eventDetail}>
          <FontAwesome5 name="map-marker-alt" size={14} color="#718096" style={styles.eventIcon} />
          <Text style={styles.eventDetailText}>{item.location}</Text>
        </View>
        
        <View style={styles.organizerContainer}>
          <Text style={styles.organizerLabel}>Organized by:</Text>
          <Text style={styles.organizerName}>{item.organizer}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Events</Text>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            Past
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={activeTab === 'upcoming' ? upcomingEvents : pastEvents}
        renderItem={renderEventItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.eventsList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2c5282']}
            tintColor="#2c5282"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FontAwesome5 name="calendar-times" size={60} color="#cbd5e0" />
            <Text style={styles.emptyText}>
              No {activeTab === 'upcoming' ? 'upcoming' : 'past'} events
            </Text>
            <TouchableOpacity
              style={styles.browseButton}
              onPress={() => navigation.navigate('Events')}
            >
              <Text style={styles.browseButtonText}>Browse Events</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#d4f5c9',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2c5282',
  },
  tabText: {
    fontSize: 16,
    color: '#718096',
  },
  activeTabText: {
    color: '#2c5282',
    fontWeight: 'bold',
  },
  eventsList: {
    padding: 15,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 150,
  },
  eventContent: {
    padding: 15,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 10,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventIcon: {
    width: 20,
    marginRight: 8,
  },
  eventDetailText: {
    fontSize: 14,
    color: '#4a5568',
  },
  organizerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  organizerLabel: {
    fontSize: 12,
    color: '#718096',
    marginRight: 5,
  },
  organizerName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2c5282',
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
  browseButton: {
    backgroundColor: '#2c5282',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default MyEventsScreen;