import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  RefreshControl
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const GroupsScreen = ({ navigation }) => {
  const { userInfo } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  
  // Mock data for groups
  const groups = [
    {
      id: '1',
      name: 'Young Adults',
      description: 'A community for young adults (18-30) to connect, grow spiritually, and build meaningful relationships.',
      members: 42,
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      isJoined: true,
      isMinistry: false,
      meetingTime: 'Thursdays at 7:00 PM',
      meetingLocation: 'Fellowship Hall'
    },
    {
      id: '2',
      name: 'Prayer Warriors',
      description: 'Dedicated to praying for our church, community, and world. Open to all who have a heart for prayer.',
      members: 28,
      image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      isJoined: false,
      isMinistry: true,
      meetingTime: 'Tuesdays at 6:00 AM',
      meetingLocation: 'Prayer Room'
    },
    {
      id: '3',
      name: 'Bible Study',
      description: 'In-depth study of Scripture with discussion and application. Currently studying the book of Romans.',
      members: 35,
      image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      isJoined: true,
      isMinistry: false,
      meetingTime: 'Wednesdays at 7:00 PM',
      meetingLocation: 'Room 201'
    },
    {
      id: '4',
      name: 'Worship Team',
      description: 'Musicians and vocalists who lead worship during church services and events.',
      members: 18,
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      isJoined: false,
      isMinistry: true,
      meetingTime: 'Rehearsals on Thursdays at 6:30 PM',
      meetingLocation: 'Sanctuary'
    },
    {
      id: '5',
      name: 'Children\'s Ministry',
      description: 'Dedicated to teaching and nurturing the spiritual growth of children from birth through 5th grade.',
      members: 25,
      image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      isJoined: false,
      isMinistry: true,
      meetingTime: 'Sundays during service',
      meetingLocation: 'Children\'s Wing'
    },
    {
      id: '6',
      name: 'Youth Group',
      description: 'A place for teenagers (6th-12th grade) to connect with each other and grow in their faith.',
      members: 30,
      image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      isJoined: false,
      isMinistry: true,
      meetingTime: 'Sundays at 5:00 PM',
      meetingLocation: 'Youth Room'
    }
  ];
  
  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const onRefresh = () => {
    setRefreshing(true);
    // In a real app, you would fetch new data here
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  
  const renderGroupItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.groupCard}
      onPress={() => 
        item.isMinistry 
          ? navigation.navigate('MinistryDetails', { ministryId: item.id })
          : navigation.navigate('GroupDetails', { groupId: item.id })
      }
    >
      <Image source={{ uri: item.image }} style={styles.groupImage} />
      <View style={styles.groupContent}>
        <View style={styles.groupHeader}>
          <Text style={styles.groupName}>{item.name}</Text>
          {item.isMinistry && (
            <View style={styles.ministryBadge}>
              <Text style={styles.ministryBadgeText}>Ministry</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.groupDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.groupMeta}>
          <View style={styles.groupMetaItem}>
            <FontAwesome5 name="users" size={14} color="#718096" />
            <Text style={styles.groupMetaText}>{item.members} members</Text>
          </View>
          
          {item.meetingTime && (
            <View style={styles.groupMetaItem}>
              <FontAwesome5 name="clock" size={14} color="#718096" />
              <Text style={styles.groupMetaText}>{item.meetingTime}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.groupActions}>
          {item.isJoined ? (
            <View style={styles.joinedButton}>
              <FontAwesome5 name="check" size={14} color="#fff" />
              <Text style={styles.joinedButtonText}>Joined</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Groups & Ministries</Text>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => navigation.navigate('CreateGroup')}
        >
          <FontAwesome5 name="plus" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <FontAwesome5 name="search" size={16} color="#a0aec0" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search groups and ministries"
          placeholderTextColor="#a0aec0"
        />
      </View>
      
      <FlatList
        data={filteredGroups}
        renderItem={renderGroupItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.groupsList}
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
            <FontAwesome5 name="users" size={60} color="#cbd5e0" />
            <Text style={styles.emptyText}>No groups found</Text>
            <TouchableOpacity
              style={styles.createGroupButton}
              onPress={() => navigation.navigate('CreateGroup')}
            >
              <Text style={styles.createGroupButtonText}>Create a Group</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  createButton: {
    backgroundColor: '#2c5282',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2d3748',
  },
  groupsList: {
    padding: 15,
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
    height: 150,
  },
  groupContent: {
    padding: 15,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    flex: 1,
  },
  ministryBadge: {
    backgroundColor: '#ebf8ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  ministryBadgeText: {
    color: '#2c5282',
    fontSize: 12,
    fontWeight: 'bold',
  },
  groupDescription: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 12,
    lineHeight: 20,
  },
  groupMeta: {
    marginBottom: 15,
  },
  groupMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  groupMetaText: {
    fontSize: 14,
    color: '#718096',
    marginLeft: 8,
  },
  groupActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  joinButton: {
    backgroundColor: '#2c5282',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  joinedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#48bb78',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  joinedButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
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
  createGroupButton: {
    backgroundColor: '#2c5282',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  createGroupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default GroupsScreen;