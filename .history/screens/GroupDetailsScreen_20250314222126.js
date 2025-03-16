import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const GroupDetailsScreen = ({ route, navigation }) => {
  const { groupId } = route.params;
  const { userInfo } = useAuth();
  const [activeTab, setActiveTab] = useState('about');
  
  // Mock data for the group
  const group = {
    id: groupId,
    name: 'Young Adults',
    description: 'A community for young adults (18-30) to connect, grow, and serve together. We meet weekly for Bible study, social events, and service projects.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
    members: 42,
    meetingTime: 'Wednesdays at 7:00 PM',
    meetingLocation: 'Fellowship Hall',
    isAdmin: true,
    announcements: [
      {
        id: '1',
        title: 'Summer Retreat Registration Open',
        content: 'Registration for our annual summer retreat is now open! Early bird pricing ends June 15.',
        date: 'May 30, 2023'
      },
      {
        id: '2',
        title: 'Service Project This Saturday',
        content: 'We\'ll be volunteering at the local food bank this Saturday from 9am-12pm. Sign up in the group chat!',
        date: 'June 2, 2023'
      }
    ],
    events: [
      {
        id: '1',
        title: 'Weekly Bible Study',
        date: 'Wednesday, June 14, 2023',
        time: '7:00 PM - 8:30 PM',
        location: 'Fellowship Hall'
      },
      {
        id: '2',
        title: 'Summer Retreat',
        date: 'July 21-23, 2023',
        time: 'All day',
        location: 'Mountain View Retreat Center'
      },
      {
        id: '3',
        title: 'Community Service Day',
        date: 'Saturday, June 17, 2023',
        time: '9:00 AM - 12:00 PM',
        location: 'City Food Bank'
      }
    ],
    members: [
      {
        id: '1',
        name: 'John Smith',
        role: 'Admin',
        image: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        role: 'Member',
        image: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      {
        id: '3',
        name: 'Michael Chen',
        role: 'Member',
        image: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: '4',
        name: 'Emily Taylor',
        role: 'Member',
        image: 'https://randomuser.me/api/portraits/women/28.jpg'
      },
      {
        id: '5',
        name: 'David Wilson',
        role: 'Member',
        image: 'https://randomuser.me/api/portraits/men/53.jpg'
      }
    ]
  };
  
  const renderAnnouncementItem = ({ item }) => (
    <View style={styles.announcementCard}>
      <View style={styles.announcementHeader}>
        <Text style={styles.announcementTitle}>{item.title}</Text>
        <Text style={styles.announcementDate}>{item.date}</Text>
      </View>
      <Text style={styles.announcementContent}>{item.content}</Text>
    </View>
  );
  
  const renderEventItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.eventCard}
      onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
    >
      <View style={styles.eventIconContainer}>
        <FontAwesome5 name="calendar-alt" size={24} color="#2c5282" />
      </View>
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventDate}>{item.date}</Text>
        <Text style={styles.eventTime}>{item.time}</Text>
        <Text style={styles.eventLocation}>{item.location}</Text>
      </View>
      <FontAwesome5 name="chevron-right" size={16} color="#a0aec0" />
    </TouchableOpacity>
  );
  
  const renderMemberItem = ({ item }) => (
    <View style={styles.memberItem}>
      <Image source={{ uri: item.image }} style={styles.memberImage} />
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{item.name}</Text>
        <Text style={styles.memberRole}>{item.role}</Text>
      </View>
    </View>
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
        <Text style={styles.headerTitle}>{group.name}</Text>
        {group.isAdmin && (
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.navigate('EditGroup', { groupId: group.id })}
          >
            <FontAwesome5 name="edit" size={20} color="#2c5282" />
          </TouchableOpacity>
        )}
      </View>
      
      <ScrollView style={styles.container}>
        <Image source={{ uri: group.image }} style={styles.groupImage} />
        
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'about' && styles.activeTab]}
            onPress={() => setActiveTab('about')}
          >
            <Text style={[styles.tabText, activeTab === 'about' && styles.activeTabText]}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'events' && styles.activeTab]}
            onPress={() => setActiveTab('events')}
          >
            <Text style={[styles.tabText, activeTab === 'events' && styles.activeTabText]}>Events</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'members' && styles.activeTab]}
            onPress={() => setActiveTab('members')}
          >
            <Text style={[styles.tabText, activeTab === 'members' && styles.activeTabText]}>Members</Text>
          </TouchableOpacity>
        </View>
        
        {activeTab === 'about' && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{group.description}</Text>
            
            <Text style={styles.sectionTitle}>Meeting Information</Text>
            <View style={styles.infoItem}>
              <FontAwesome5 name="clock" size={16} color="#2c5282" style={styles.infoIcon} />
              <Text style={styles.infoText}>{group.meetingTime}</Text>
            </View>
            <View style={styles.infoItem}>
              <FontAwesome5 name="map-marker-alt" size={16} color="#2c5282" style={styles.infoIcon} />
              <Text style={styles.infoText}>{group.meetingLocation}</Text>
            </View>
            
            <Text style={styles.sectionTitle}>Announcements</Text>
            <FlatList
              data={group.announcements}
              renderItem={renderAnnouncementItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No announcements at this time.</Text>
              }
            />
            
            {group.isAdmin && (
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => navigation.navigate('CreateAnnouncement', { groupId: group.id })}
              >
                <FontAwesome5 name="plus" size={16} color="#fff" />
                <Text style={styles.addButtonText}>Add Announcement</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        
        {activeTab === 'events' && (
          <View style={styles.sectionContainer}>
            <FlatList
              data={group.events}
              renderItem={renderEventItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No upcoming events.</Text>
              }
            />
            
            {group.isAdmin && (
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => navigation.navigate('CreateEvent', { groupId: group.id })}
              >
                <FontAwesome5 name="plus" size={16} color="#fff" />
                <Text style={styles.addButtonText}>Create Event</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        
        {activeTab === 'members' && (
          <View style={styles.sectionContainer}>
            <FlatList
              data={group.members}
              renderItem={renderMemberItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              numColumns={2}
              columnWrapperStyle={styles.memberColumns}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No members yet.</Text>
              }
            />
            
            {group.isAdmin && (
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => navigation.navigate('InviteMembers', { groupId: group.id })}
              >
                <FontAwesome5 name="user-plus" size={16} color="#fff" />
                <Text style={styles.addButtonText}>Invite Members</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('GroupChat', { groupId: group.id })}
          >
            <FontAwesome5 name="comment-alt" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Group Chat</Text>
          </TouchableOpacity>
          
          {!group.isAdmin && (
            <TouchableOpacity 
              style={[styles.actionButton, styles.leaveButton]}
              onPress={() => {
                // Handle leave group functionality
                alert('You have left the group');
                navigation.goBack();
              }}
            >
              <FontAwesome5 name="sign-out-alt" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>Leave Group</Text>
            </TouchableOpacity>
          )}
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c5282',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    padding: 5,
  },
  editButton: {
    padding: 5,
  },
  groupImage: {
    width: '100%',
    height: 200,
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
  sectionContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    marginTop: 20,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#4a5568',
    lineHeight: 24,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoIcon: {
    width: 25,
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#4a5568',
  },
  announcementCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    flex: 1,
  },
  announcementDate: {
    fontSize: 14,
    color: '#718096',
  },
  announcementContent: {
    fontSize: 14,
    color: '#4a5568',
    lineHeight: 20,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  eventIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ebf8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    color: '#4a5568',
  },
  eventTime: {
    fontSize: 14,
    color: '#4a5568',
  },
  eventLocation: {
    fontSize: 14,
    color: '#718096',
  },
  memberColumns: {
    justifyContent: 'space-between',
  },
  memberItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  memberImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  memberInfo: {
    alignItems: 'center',
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    textAlign: 'center',
    marginBottom: 5,
  },
  memberRole: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginVertical: 20,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#2c5282',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginBottom: 30,
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#2c5282',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.48,
  },
  leaveButton: {
    backgroundColor: '#e53e3e',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default GroupDetailsScreen;