import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const MyGroupsScreen = ({ navigation }) => {
  const { userInfo } = useAuth();
  
  // Mock data for user's groups
  const userGroups = [
    {
      id: '1',
      name: 'Young Adults',
      role: 'Admin',
      members: 42,
      description: 'A community for young adults (18-30) to connect, grow, and serve together.',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80'
    },
    {
      id: '2',
      name: 'Prayer Warriors',
      role: 'Member',
      members: 28,
      description: 'Dedicated to praying for our church, community, and world needs.',
      image: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: '3',
      name: 'Bible Study',
      role: 'Admin',
      members: 35,
      description: 'In-depth study of Scripture with discussion and application.',
      image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];
  
  const renderGroupItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.groupCard}
      onPress={() => navigation.navigate('GroupDetails', { groupId: item.id })}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.groupImage}
        resizeMode="cover"
      />
      <View style={styles.groupInfo}>
        <View style={styles.groupHeader}>
          <Text style={styles.groupName}>{item.name}</Text>
          <View style={styles.roleTag}>
            <Text style={styles.roleText}>{item.role}</Text>
          </View>
        </View>
        <Text style={styles.groupMembers}>{item.members} members</Text>
        <Text style={styles.groupDescription} numberOfLines={2}>{item.description}</Text>
        
        <View style={styles.groupActions}>
          <TouchableOpacity 
            style={styles.groupActionButton}
            onPress={() => navigation.navigate('GroupChat', { groupId: item.id })}
          >
            <FontAwesome5 name="comment-alt" size={16} color="#2c5282" />
            <Text style={styles.groupActionText}>Chat</Text>
          </TouchableOpacity>
          
          {item.role === 'Admin' && (
            <TouchableOpacity 
              style={styles.groupActionButton}
              onPress={() => navigation.navigate('ManageGroup', { groupId: item.id })}
            >
              <FontAwesome5 name="cog" size={16} color="#2c5282" />
              <Text style={styles.groupActionText}>Manage</Text>
            </TouchableOpacity>
          )}
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
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => navigation.navigate('CreateGroup')}
        >
          <FontAwesome5 name="plus" size={20} color="#2c5282" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={userGroups}
        renderItem={renderGroupItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FontAwesome5 name="users" size={60} color="#cbd5e0" />
            <Text style={styles.emptyText}>You haven't joined any groups yet</Text>
            <TouchableOpacity 
              style={styles.emptyButton}
              onPress={() => navigation.navigate('Community')}
            >
              <Text style={styles.emptyButtonText}>Find Groups</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  backButton: {
    padding: 5,
  },
  createButton: {
    padding: 5,
  },
  listContainer: {
    padding: 20,
  },
  groupCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  groupImage: {
    width: '100%',
    height: 150,
  },
  groupInfo: {
    padding: 15,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  roleTag: {
    backgroundColor: '#ebf8ff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  roleText: {
    fontSize: 12,
    color: '#2c5282',
    fontWeight: '600',
  },
  groupMembers: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 5,
  },
  groupDescription: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 15,
  },
  groupActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 15,
  },
  groupActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  groupActionText: {
    color: '#2c5282',
    fontSize: 14,
    fontWeight: '600',
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
  emptyButton: {
    backgroundColor: '#2c5282',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyGroupsScreen;