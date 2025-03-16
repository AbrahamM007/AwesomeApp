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

const MyGroupsScreen = ({ navigation }) => {
  const { userInfo } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('groups'); // 'groups' or 'ministries'
  
  // Mock data for user's groups
  const userGroups = [
    {
      id: '1',
      name: 'Young Adults',
      description: 'A community for young adults to connect, grow spiritually, and build relationships.',
      members: 28,
      role: 'Member',
      nextMeeting: 'Thursday, 7:00 PM',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: '2',
      name: 'Bible Study',
      description: 'Weekly in-depth Bible study focusing on understanding Scripture and applying it to daily life.',
      members: 15,
      role: 'Leader',
      nextMeeting: 'Wednesday, 7:00 PM',
      image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: '3',
      name: 'Prayer Team',
      description: 'A dedicated group that meets to pray for the church, community, and world needs.',
      members: 12,
      role: 'Member',
      nextMeeting: 'Monday, 6:30 PM',
      image: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];
  
  // Mock data for user's ministries
  const userMinistries = [
    {
      id: '1',
      name: 'Worship Team',
      description: 'Leading the congregation in worship through music and creating an atmosphere for encountering God.',
      members: 18,
      role: 'Member',
      nextMeeting: 'Thursday, 6:30 PM',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: '2',
      name: 'Children\'s Ministry',
      description: 'Nurturing the spiritual growth of children through engaging activities and Bible teaching.',
      members: 22,
      role: 'Volunteer',
      nextMeeting: 'Sunday, 9:00 AM',
      image: 'https://images.unsplash.com/photo-1544717305-996b815c338c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];
  
  const onRefresh = () => {
    setRefreshing(true);
    // In a real app, you would fetch updated data here
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  
  const renderGroupItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.groupCard}
      onPress={() => {
        if (activeTab === 'groups') {
          navigation.navigate('GroupDetails', { groupId: item.id });
        } else {
          navigation.navigate('MinistryDetails', { ministryId: item.id });
        }
      }}
    >
      <Image source={{ uri: item.image }} style={styles.groupImage} />
      <View style={styles.groupContent}>
        <View style={styles.groupHeader}>
          <Text style={styles.groupName}>{item.name}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{item.role}</Text>
          </View>
        </View>
        <Text style={styles.groupDescription} numberOfLines={2}>{item.description}</Text>
        <View style={styles.groupMeta}>
          <View style={styles.metaItem}>
            <FontAwesome5 name="users" size={14} color="#718096" />
            <Text style={styles.metaText}>{item.members} members</Text>
          </View>
          <View style={styles.metaItem}>
            <FontAwesome5 name="calendar-alt" size={14} color="#718096" />
            <Text style={styles.metaText}>{item.nextMeeting}</Text>
          </View>
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
        <Text style={styles.headerTitle}>My Groups</Text>
        <View style={{ width: 20 }} />
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[
            styles.tabButton,
            activeTab === 'groups' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('groups')}
        >
          <Text 
            style={[
              styles.tabButtonText,
              activeTab === 'groups' && styles.activeTabButtonText
            ]}
          >
            Groups
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tabButton,
            activeTab === 'ministries' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('ministries')}
        >
          <Text 
            style={[
              styles.tabButtonText,
              activeTab === 'ministries' && styles.activeTabButtonText
            ]}
          >
            Ministries
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={activeTab === 'groups' ? userGroups : userMinistries}
        renderItem={renderGroupItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2c5282']}
            tintColor="#2c5282"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <FontAwesome5 name="users" size={50} color="#cbd5e0" />
            <Text style={styles.emptyStateTitle}>
              No {activeTab === 'groups' ? 'groups' : 'ministries'} yet
            </Text>
            <Text style={styles.emptyStateText}>
              You haven't joined any {activeTab === 'groups' ? 'groups' : 'ministries'} yet.
            </Text>
            <TouchableOpacity 
              style={styles.emptyStateButton}
              onPress={() => navigation.navigate('Groups')}
            >
              <Text style={styles.emptyStateButtonText}>
                Find {activeTab === 'groups' ? 'Groups' : 'Ministries'}
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
      
      <TouchableOpacity 
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateGroup', { isMinistry: activeTab === 'ministries' })}
      >
        <FontAwesome5 name="plus" size={20} color="#fff" />
      </TouchableOpacity>
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: '#2c5282',
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#718096',
  },
  activeTabButtonText: {
    color: '#2c5282',
    fontWeight: 'bold',
  },
  listContent: {
    padding: 20,
  },
  groupCard: {
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
  groupImage: {
    width: '100%',
    height: 120,
  },
  groupContent: {
    padding: 15,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    flex: 1,
  },
  roleBadge: {
    backgroundColor: '#ebf8ff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  roleText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  groupDescription: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 10,
  },
  groupMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#718096',
    marginLeft: 5,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    marginTop: 15,
    marginBottom: 5,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyStateButton: {
    backgroundColor: '#2c5282',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#2c5282',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default MyGroupsScreen;