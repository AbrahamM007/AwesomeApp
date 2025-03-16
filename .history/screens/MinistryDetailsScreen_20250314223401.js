import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const MinistryDetailsScreen = ({ route, navigation }) => {
  const { ministryId } = route.params;
  const { userInfo } = useAuth();
  const [isJoined, setIsJoined] = useState(false);
  
  // Mock data for the ministry
  const ministry = {
    id: ministryId,
    name: 'Worship Team',
    description: 'The Worship Team is dedicated to leading our congregation in worship through music, creating an atmosphere where people can encounter God. We value excellence, authenticity, and spiritual depth in our worship expressions.',
    longDescription: 'Our team consists of vocalists, instrumentalists, and tech volunteers who work together to facilitate meaningful worship experiences. We believe that worship is more than just music—it's a lifestyle of devotion to God. Our ministry serves during Sunday services, special events, and occasionally at community outreach programs.\n\nWe are committed to spiritual growth, musical excellence, and creating space for people to connect with God through worship. Regular rehearsals, devotional times, and training sessions help us grow both spiritually and in our musical abilities.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    leader: {
      name: 'Sarah Johnson',
      role: 'Worship Director',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      contact: 'sarah.johnson@example.com'
    },
    meetingTime: 'Rehearsals on Thursdays at 6:30 PM',
    meetingLocation: 'Sanctuary',
    requirements: 'Musical ability, commitment to regular rehearsals, and a heart for worship. New members must audition and meet with the worship director.',
    members: 18,
    isAdmin: userInfo?.role === 'admin' || userInfo?.id === '2', // Assuming Sarah is user ID 2
    announcements: [
      {
        id: '1',
        title: 'Special Worship Night',
        content: 'We\'re planning a special worship night on July 15th. All team members are expected to participate.',
        date: 'Posted 2 days ago'
      },
      {
        id: '2',
        title: 'New Song List',
        content: 'The new song list for next month is now available. Please start practicing these songs for upcoming services.',
        date: 'Posted 1 week ago'
      }
    ],
    members: [
      {
        id: '1',
        name: 'Sarah Johnson',
        role: 'Worship Director',
        image: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      {
        id: '2',
        name: 'Michael Chen',
        role: 'Lead Guitar',
        image: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: '3',
        name: 'Emily Rodriguez',
        role: 'Vocalist',
        image: 'https://randomuser.me/api/portraits/women/28.jpg'
      },
      {
        id: '4',
        name: 'David Kim',
        role: 'Keyboard',
        image: 'https://randomuser.me/api/portraits/men/62.jpg'
      },
      {
        id: '5',
        name: 'Lisa Thompson',
        role: 'Drums',
        image: 'https://randomuser.me/api/portraits/women/65.jpg'
      }
    ]
  };
  
  const handleJoinMinistry = () => {
    if (isJoined) {
      Alert.alert(
        'Leave Ministry',
        'Are you sure you want to leave this ministry?',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Leave',
            onPress: () => setIsJoined(false)
          }
        ]
      );
    } else {
      Alert.alert(
        'Join Ministry',
        'This ministry requires approval from the leader. Send a request to join?',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Send Request',
            onPress: () => {
              // In a real app, you would send a request to the backend
              Alert.alert('Request Sent', 'Your request to join has been sent to the ministry leader.');
            }
          }
        ]
      );
    }
  };
  
  const renderMemberItem = ({ item }) => (
    <View style={styles.memberItem}>
      <Image source={{ uri: item.image }} style={styles.memberImage} />
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{item.name}</Text>
        <Text style={styles.memberRole}>{item.role}</Text>
      </View>
    </View>
  );
  
  const renderAnnouncementItem = ({ item }) => (
    <View style={styles.announcementItem}>
      <View style={styles.announcementHeader}>
        <Text style={styles.announcementTitle}>{item.title}</Text>
        <Text style={styles.announcementDate}>{item.date}</Text>
      </View>
      <Text style={styles.announcementContent}>{item.content}</Text>
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
        <Text style={styles.headerTitle}>Ministry Details</Text>
        {ministry.isAdmin && (
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.navigate('EditGroup', { groupId: ministry.id, isMinistry: true })}
          >
            <FontAwesome5 name="edit" size={20} color="#2c5282" />
          </TouchableOpacity>
        )}
      </View>
      
      <ScrollView style={styles.container}>
        <Image source={{ uri: ministry.image }} style={styles.ministryImage} />
        
        <View style={styles.contentContainer}>
          <Text style={styles.ministryName}>{ministry.name}</Text>
          
          <View style={styles.ministryMeta}>
            <View style={styles.metaItem}>
              <FontAwesome5 name="users" size={16} color="#2c5282" style={styles.metaIcon} />
              <Text style={styles.metaText}>{ministry.members} members</Text>
            </View>
            
            <View style={styles.metaItem}>
              <FontAwesome5 name="clock" size={16} color="#2c5282" style={styles.metaIcon} />
              <Text style={styles.metaText}>{ministry.meetingTime}</Text>
            </View>
            
            <View style={styles.metaItem}>
              <FontAwesome5 name="map-marker-alt" size={16} color="#2c5282" style={styles.metaIcon} />
              <Text style={styles.metaText}>{ministry.meetingLocation}</Text>
            </View>
          </View>
          
          <View style={styles.leaderSection}>
            <Text style={styles.sectionTitle}>Ministry Leader</Text>
            <View style={styles.leaderCard}>
              <Image source={{ uri: ministry.leader.image }} style={styles.leaderImage} />
              <View style={styles.leaderInfo}>
                <Text style={styles.leaderName}>{ministry.leader.name}</Text>
                <Text style={styles.leaderRole}>{ministry.leader.role}</Text>
                <TouchableOpacity style={styles.contactButton}>
                  <FontAwesome5 name="envelope" size={14} color="#2c5282" />
                  <Text style={styles.contactButtonText}>Contact</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>About This Ministry</Text>
            <Text style={styles.descriptionText}>{ministry.longDescription}</Text>
          </View>
          
          <View style={styles.requirementsSection}>
            <Text style={styles.sectionTitle}>Requirements to Join</Text>
            <Text style={styles.requirementsText}>{ministry.requirements}</Text>
          </View>
          
          <View style={styles.announcementsSection}>
            <Text style={styles.sectionTitle}>Announcements</Text>
            {ministry.announcements.map(announcement => renderAnnouncementItem({ item: announcement }))}
          </View>
          
          <View style={styles.membersSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Members</Text>
              {ministry.isAdmin && (
                <TouchableOpacity 
                  style={styles.viewAllButton}
                  onPress={() => navigation.navigate('ManageMembers', { groupId: ministry.id, isMinistry: true })}
                >
                  <Text style={styles.viewAllButtonText}>Manage</Text>
                </TouchableOpacity>
              )}
            </View>
            <FlatList
              data={ministry.members.slice(0, 5)}
              renderItem={renderMemberItem}
              keyExtractor={item => item.id}
              horizontal={false}
              scrollEnabled={false}
            />
            {ministry.members.length > 5 && (
              <TouchableOpacity 
                style={styles.viewAllMembersButton}
                onPress={() => navigation.navigate('GroupMembers', { groupId: ministry.id, isMinistry: true })}
              >
                <Text style={styles.viewAllMembersText}>View All Members</Text>
              </TouchableOpacity>
            )}
          </View>
          
          <TouchableOpacity 
            style={[
              styles.joinButton,
              isJoined && styles.leaveButton
            ]}
            onPress={handleJoinMinistry}
          >
            <Text style={styles.joinButtonText}>
              {isJoined ? "Leave Ministry" : "Request to Join"}
            </Text>
          </TouchableOpacity>
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
  ministryImage: {
    width: '100%',
    height: 200,
  },
  contentContainer: {
    padding: 20,
  },
  ministryName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 15,
  },
  ministryMeta: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  metaIcon: {
    width: 25,
    marginRight: 10,
  },
  metaText: {
    fontSize: 16,
    color: '#4a5568',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 15,
  },
  leaderSection: {
    marginBottom: 20,
  },
  leaderCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  leaderImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  leaderInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  leaderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 5,
  },
  leaderRole: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 10,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ebf8ff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  contactButtonText: {
    color: '#2c5282',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  descriptionSection: {
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: '#4a5568',
    lineHeight: 24,
  },
  requirementsSection: {
    marginBottom: 20,
  },
  requirementsText: {
    fontSize: 16,
    color: '#4a5568',
    lineHeight: 24,
  },
  announcementsSection: {
    marginBottom: 20,
  },
  announcementItem: {
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
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  announcementDate: {
    fontSize: 12,
    color: '#a0aec0',
  },
  announcementContent: {
    fontSize: 14,
    color: '#4a5568',
    lineHeight: 20,
  },
  membersSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  viewAllButton: {
    backgroundColor: '#ebf8ff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  viewAllButtonText: {
    color: '#2c5282',
    fontSize: 14,
    fontWeight: 'bold',
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },