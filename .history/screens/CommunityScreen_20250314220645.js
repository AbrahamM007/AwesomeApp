import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const CommunityScreen = () => {
  const { userInfo } = useAuth();
  const [activeTab, setActiveTab] = useState('groups');
  
  // Mock data for groups
  const groups = [
    {
      id: '1',
      name: 'Young Adults',
      members: 42,
      description: 'A community for young adults (18-30) to connect, grow, and serve together.',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80'
    },
    {
      id: '2',
      name: 'Prayer Warriors',
      members: 28,
      description: 'Dedicated to praying for our church, community, and world needs.',
      image: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: '3',
      name: 'Bible Study',
      members: 35,
      description: 'In-depth study of Scripture with discussion and application.',
      image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    // Fix the typo in the groups data
    {
      id: '4',
      name: 'Worship Team',
      members: 18,
      description: 'Musicians and vocalists who lead worship during services and events.',
      image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: '5',
      name: 'Family Ministry',
      members: 53,
      description: 'Supporting and equipping families to grow in faith together.',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];
  
  // Mock data for prayer requests
  const prayerRequests = [
    {
      id: '1',
      user: 'Sarah Johnson',
      request: 'Please pray for my mother who is undergoing surgery next week.',
      timestamp: '2 hours ago',
      prayerCount: 12
    },
    {
      id: '2',
      user: 'Michael Chen',
      request: 'I have a job interview on Friday. Prayers for wisdom and favor would be appreciated.',
      timestamp: '5 hours ago',
      prayerCount: 8
    },
    {
      id: '3',
      user: 'Lisa Rodriguez',
      request: 'My son is struggling with anxiety. Please pray for peace and healing.',
      timestamp: '1 day ago',
      prayerCount: 24
    },
    {
      id: '4',
      user: 'David Wilson',
      request: 'Thanksgiving for a successful surgery and prayers for continued recovery.',
      timestamp: '2 days ago',
      prayerCount: 18
    }
  ];
  
  // Mock data for discussions
  const discussions = [
    {
      id: '1',
      title: 'Understanding the Beatitudes',
      author: 'Pastor John',
      replies: 15,
      lastActivity: '3 hours ago'
    },
    {
      id: '2',
      title: 'Book Recommendations for New Believers',
      author: 'Emily Taylor',
      replies: 23,
      lastActivity: '1 day ago'
    },
    {
      id: '3',
      title: 'Favorite Worship Songs',
      author: 'Marcus Lee',
      replies: 42,
      lastActivity: '2 days ago'
    },
    {
      id: '4',
      title: 'Interpreting Romans 8',
      author: 'Dr. Rebecca Adams',
      replies: 31,
      lastActivity: '3 days ago'
    }
  ];
  
  const renderGroupItem = ({ item }) => (
    <TouchableOpacity style={styles.groupCard}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.groupImage}
        resizeMode="cover"
      />
      <View style={styles.groupInfo}>
        <Text style={styles.groupName}>{item.name}</Text>
        <Text style={styles.groupMembers}>{item.members} members</Text>
        <Text style={styles.groupDescription} numberOfLines={2}>{item.description}</Text>
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join Group</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  
  const renderPrayerItem = ({ item }) => (
    <View style={styles.prayerCard}>
      <View style={styles.prayerHeader}>
        <Text style={styles.prayerUser}>{item.user}</Text>
        <Text style={styles.prayerTimestamp}>{item.timestamp}</Text>
      </View>
      <Text style={styles.prayerText}>{item.request}</Text>
      <View style={styles.prayerActions}>
        <TouchableOpacity style={styles.prayButton}>
          <FontAwesome5 name="praying-hands" size={16} color="#2c5282" />
          <Text style={styles.prayButtonText}>Pray ({item.prayerCount})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.commentButton}>
          <FontAwesome5 name="comment" size={16} color="#718096" />
          <Text style={styles.commentButtonText}>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  const renderDiscussionItem = ({ item }) => (
    <TouchableOpacity style={styles.discussionCard}>
      <View style={styles.discussionContent}>
        <Text style={styles.discussionTitle}>{item.title}</Text>
        <Text style={styles.discussionAuthor}>Started by {item.author}</Text>
        <View style={styles.discussionStats}>
          <Text style={styles.discussionReplies}>{item.replies} replies</Text>
          <Text style={styles.discussionActivity}>Last activity: {item.lastActivity}</Text>
        </View>
      </View>
      <FontAwesome5 name="chevron-right" size={16} color="#a0aec0" />
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community</Text>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'groups' && styles.activeTab]}
          onPress={() => setActiveTab('groups')}
        >
          <Text style={[styles.tabText, activeTab === 'groups' && styles.activeTabText]}>Groups</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'prayer' && styles.activeTab]}
          onPress={() => setActiveTab('prayer')}
        >
          <Text style={[styles.tabText, activeTab === 'prayer' && styles.activeTabText]}>Prayer</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'discussions' && styles.activeTab]}
          onPress={() => setActiveTab('discussions')}
        >
          <Text style={[styles.tabText, activeTab === 'discussions' && styles.activeTabText]}>Discussions</Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'groups' && (
        <FlatList
          data={groups}
          renderItem={renderGroupItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
      
      {activeTab === 'prayer' && (
        <View style={styles.prayerContainer}>
          <TouchableOpacity style={styles.addPrayerButton}>
            <FontAwesome5 name="plus" size={16} color="#fff" />
            <Text style={styles.addPrayerButtonText}>Add Prayer Request</Text>
          </TouchableOpacity>
          <FlatList
            data={prayerRequests}
            renderItem={renderPrayerItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      )}
      
      {activeTab === 'discussions' && (
        <View style={styles.discussionContainer}>
          <TouchableOpacity style={styles.addDiscussionButton}>
            <FontAwesome5 name="plus" size={16} color="#fff" />
            <Text style={styles.addDiscussionButtonText}>Start New Discussion</Text>
          </TouchableOpacity>
          <FlatList
            data={discussions}
            renderItem={renderDiscussionItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      )}
    </View>
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
  listContainer: {
    padding: 20,
  },
  groupCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  groupImage: {
    width: 100,
    height: '100%',
  },
  groupInfo: {
    flex: 1,
    padding: 15,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 5,
  },
  groupMembers: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 5,
  },
  groupDescription: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 10,
  },
  joinButton: {
    backgroundColor: '#2c5282',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  prayerContainer: {
    flex: 1,
  },
  addPrayerButton: {
    flexDirection: 'row',
    backgroundColor: '#2c5282',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  addPrayerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  prayerCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  prayerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  prayerUser: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  prayerTimestamp: {
    fontSize: 14,
    color: '#a0aec0',
  },
  prayerText: {
    fontSize: 16,
    color: '#4a5568',
    lineHeight: 22,
    marginBottom: 15,
  },
  prayerActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 15,
  },
  prayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  prayButtonText: {
    color: '#2c5282',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentButtonText: {
    color: '#718096',
    fontSize: 14,
    marginLeft: 5,
  },
  discussionContainer: {
    flex: 1,
  },
  addDiscussionButton: {
    flexDirection: 'row',
    backgroundColor: '#2c5282',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  addDiscussionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  // Complete the styles
  discussionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  discussionContent: {
    flex: 1,
    marginRight: 10,
  },
  discussionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 5,
  },
  discussionAuthor: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 5,
  },
  discussionStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discussionReplies: {
    fontSize: 14,
    color: '#2c5282',
    fontWeight: '600',
    marginRight: 15,
  },
  discussionActivity: {
    fontSize: 14,
    color: '#a0aec0',
  },
});

export default CommunityScreen;