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
      date: 'Sunday, June 12',
      time: '10:00 AM',
      location: 'Main Sanctuary',
      image: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: '2',
      title: 'Prayer Meeting',
      date: 'Wednesday, June 15',
      time: '7:00 PM',
      location: 'Prayer Room',
      image: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: '3',
      title: 'Youth Night',
      date: 'Friday, June 17',
      time: '6:30 PM',
      location: 'Youth Center',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];
  
  // Mock data for your groups
  const yourGroups = [
    {
      id: '1',
      name: 'Young Adults',
      nextMeeting: 'Thursday, 7:00 PM',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: '3',
      name: 'Bible Study',
      nextMeeting: 'Wednesday, 7:00 PM',
      image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];
  
  // Mock data for announcements
  const announcements = [
    {
      id: '1',
      title: 'Sunday Service Time Change',
      content: 'Starting next week, our Sunday service will begin at 10:00 AM instead of 9:30 AM.',
      date: 'June 10, 2023',
      isPinned: true
    },
    {
      id: '2',
      title: 'Summer Retreat Registration',
      content: 'Registration is now open for our annual summer retreat!',
      date: 'June 8, 2023'
    }
  ];
  
  const renderEventItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.eventCard}
      onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.eventImage} />
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <View style={styles.eventDetails}>
          <View style={styles.eventDetailItem}>
            <FontAwesome5 name="calendar-alt" size={14} color="#2c5282" style={styles.eventIcon} />
            <Text style={styles.eventDetailText}>{item.date}</Text>
          </View>
          <View style={styles.eventDetailItem}>
            <FontAwesome5 name="clock" size={14} color="#2c5282" style={styles.eventIcon} />
            <Text style={styles.eventDetailText}>{item.time}</Text>
          </View>
          <View style={styles.eventDetailItem}>
            <FontAwesome5 name="map-marker-alt" size={14} color="#2c5282" style={styles.eventIcon} />
            <Text style={styles.eventDetailText}>{item.location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  const renderGroupItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.groupCard}
      onPress={() => navigation.navigate('GroupDetails', { groupId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.groupImage} />
      <View style={styles.groupContent}>
        <Text style={styles.groupName}>{item.name}</Text>
        <View style={styles.groupMeeting}>
          <FontAwesome5 name="calendar-alt" size={12} color="#718096" />
          <Text style={styles.groupMeetingText}>{item.nextMeeting}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.userName}>{userInfo?.name || 'Guest'}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image 
            source={{ uri: userInfo?.profileImage || 'https://randomuser.me/api/portraits/men/1.jpg' }} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
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