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
            <Text style={styles.sectionTitle}>Your Groups</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Groups')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {yourGroups.length > 0 ? (
            <FlatList
              data={yourGroups}
              renderItem={renderGroupItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.groupsList}
            />
          ) : (
            <View style={styles.emptyState}>
              <FontAwesome5 name="users" size={40} color="#cbd5e0" />
              <Text style={styles.emptyStateText}>You haven't joined any groups yet</Text>
              <TouchableOpacity 
                style={styles.emptyStateButton}
                onPress={() => navigation.navigate('Groups')}
              >
                <Text style={styles.emptyStateButtonText}>Find Groups</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Announcements</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {announcements.map(announcement => (
            <View key={announcement.id} style={styles.announcementCard}>
              {announcement.isPinned && (
                <View style={styles.pinnedBadge}>
                  <FontAwesome5 name="thumbtack" size={10} color="#fff" />
                  <Text style={styles.pinnedText}>Pinned</Text>
                </View>
              )}
              <Text style={styles.announcementTitle}>{announcement.title}</Text>
              <Text style={styles.announcementContent}>{announcement.content}</Text>
              <Text style={styles.announcementDate}>{announcement.date}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('CreateEvent')}
            >
              <View style={styles.actionIcon}>
                <FontAwesome5 name="calendar-plus" size={20} color="#2c5282" />
              </View>
              <Text style={styles.actionText}>Create Event</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Groups')}
            >
              <View style={styles.actionIcon}>
                <FontAwesome5 name="user-friends" size={20} color="#2c5282" />
              </View>
              <Text style={styles.actionText}>Join Group</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => {/* Handle prayer request */}}
            >
              <View style={styles.actionIcon}>
                <FontAwesome5 name="pray" size={20} color="#2c5282" />
              </View>
              <Text style={styles.actionText}>Prayer Request</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => {/* Handle giving */}}
            >
              <View style={styles.actionIcon}>
                <FontAwesome5 name="hand-holding-heart" size={20} color="#2c5282" />
              </View>
              <Text style={styles.actionText}>Give</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  welcomeText: {
    fontSize: 16,
    color: '#4a5568',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 25,
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
    color: '#2c5282',
    fontWeight: '500',
  },
  eventsList: {
    paddingRight: 20,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 280,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 140,
  },
  eventContent: {
    padding: 15,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 10,
  },
  eventDetails: {},
  eventDetailItem: {
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
  groupsList: {
    paddingRight: 20,
  },
  groupCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 160,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  groupImage: {
    width: '100%',
    height: 100,
  },
  groupContent: {
    padding: 12,
  },
  groupName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 5,
  },
  groupMeeting: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupMeetingText: {
    fontSize: 12,
    color: '#718096',
    marginLeft: 5,
  },
  emptyState: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#718096',
    marginTop: 10,
    marginBottom: 15,
  },
  emptyStateButton: {
    backgroundColor: '#2c5282',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  emptyStateButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  announcementCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pinnedBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#2c5282',
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinnedText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 3,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 5,
  },
  announcementContent: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 10,
  },
  announcementDate: {
    fontSize: 12,
    color: '#a0aec0',
  },
  quickActions: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ebf8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2d3748',
  },
});

export default HomeScreen;