import React from 'react';
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
import { useAuth } from '../context/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { userInfo } = useAuth();
  
  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: '1',
      title: 'Sunday Service',
      date: 'Sunday, May 15',
      time: '10:00 AM',
      location: 'Main Sanctuary',
      image: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80'
    },
    {
      id: '2',
      title: 'Bible Study',
      date: 'Wednesday, May 18',
      time: '7:00 PM',
      location: 'Fellowship Hall',
      image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: '3',
      title: 'Youth Group',
      date: 'Friday, May 20',
      time: '6:30 PM',
      location: 'Youth Center',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80'
    }
  ];
  
  // Mock data for daily devotionals
  const devotionals = [
    {
      id: '1',
      title: 'Finding Peace in Troubled Times',
      verse: 'John 14:27',
      preview: 'Peace I leave with you; my peace I give you. I do not give to you as the world gives...'
    },
    {
      id: '2',
      title: 'The Power of Faith',
      verse: 'Hebrews 11:1',
      preview: 'Now faith is confidence in what we hope for and assurance about what we do not see...'
    }
  ];

  const renderEventItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.eventCard}
      onPress={() => navigation.navigate('Events', { eventId: item.id })}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.eventImage}
        resizeMode="cover"
      />
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <View style={styles.eventInfo}>
          <FontAwesome5 name="calendar-alt" size={14} color="#718096" style={styles.eventIcon} />
          <Text style={styles.eventText}>{item.date}</Text>
        </View>
        <View style={styles.eventInfo}>
          <FontAwesome5 name="clock" size={14} color="#718096" style={styles.eventIcon} />
          <Text style={styles.eventText}>{item.time}</Text>
        </View>
        <View style={styles.eventInfo}>
          <FontAwesome5 name="map-marker-alt" size={14} color="#718096" style={styles.eventIcon} />
          <Text style={styles.eventText}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.userName}>{userInfo?.name || 'Friend'}</Text>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <View style={styles.profileImage}>
            <Text style={styles.profileInitial}>
              {userInfo?.name?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Events')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={upcomingEvents}
          renderItem={renderEventItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.eventsList}
        />
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Daily Devotional</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Devotional')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {devotionals.map(item => (
          <TouchableOpacity 
            key={item.id}
            style={styles.devotionalCard}
            onPress={() => navigation.navigate('Devotional', { devotionalId: item.id })}
          >
            <View style={styles.devotionalContent}>
              <Text style={styles.devotionalTitle}>{item.title}</Text>
              <Text style={styles.devotionalVerse}>{item.verse}</Text>
              <Text style={styles.devotionalPreview}>{item.preview}</Text>
            </View>
            <FontAwesome5 name="chevron-right" size={16} color="#a0aec0" />
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Community</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Community')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.communityCard}
          onPress={() => navigation.navigate('Community')}
        >
          <View style={styles.communityContent}>
            <FontAwesome5 name="users" size={24} color="#2c5282" style={styles.communityIcon} />
            <View>
              <Text style={styles.communityTitle}>Connect with Others</Text>
              <Text style={styles.communityText}>Join groups, discussions, and prayer requests</Text>
            </View>
          </View>
          <FontAwesome5 name="chevron-right" size={16} color="#a0aec0" />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#d4f5c9',
  },
  greeting: {
    fontSize: 16,
    color: '#718096',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  profileButton: {
    padding: 5,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8eda8e',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  profileInitial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  seeAllText: {
    fontSize: 14,
    color: '#2c5282',
    fontWeight: '600',
  },
  eventsList: {
    paddingRight: 20,
  },
  eventCard: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginRight: 15,
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
  eventDetails: {
    padding: 15,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 10,
  },
  eventInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventIcon: {
    marginRight: 8,
  },
  eventText: {
    fontSize: 14,
    color: '#718096',
  },
  devotionalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  devotionalContent: {
    flex: 1,
    marginRight: 10,
  },
  devotionalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 5,
  },
  devotionalVerse: {
    fontSize: 14,
    color: '#2c5282',
    fontWeight: '600',
    marginBottom: 5,
  },
  devotionalPreview: {
    fontSize: 14,
    color: '#718096',
  },
  communityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  communityContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  communityIcon: {
    marginRight: 15,
  },
  communityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 5,
  },
  communityText: {
    fontSize: 14,
    color: '#718096',
  },
});

export default HomeScreen;