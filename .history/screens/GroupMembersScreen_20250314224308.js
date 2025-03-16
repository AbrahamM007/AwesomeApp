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

const GroupMembersScreen = ({ route, navigation }) => {
  const { groupId, groupName } = route.params;
  const { userInfo } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for group members
  const members = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Leader',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      isAdmin: true
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Member',
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      isAdmin: false
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'Member',
      image: 'https://randomuser.me/api/portraits/women/28.jpg',
      isAdmin: false
    },
    {
      id: '4',
      name: 'David Kim',
      role: 'Member',
      image: 'https://randomuser.me/api/portraits/men/62.jpg',
      isAdmin: false
    },
    {
      id: '5',
      name: 'Lisa Thompson',
      role: 'Member',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      isAdmin: false
    }
  ];
  
  const filteredMembers = searchQuery
    ? members.filter(member => 
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : members;
  
  const renderMemberItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.memberItem}
      onPress={() => {/* Handle member press */}}
    >
      <Image source={{ uri: item.image }} style={styles.memberImage} />
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{item.name}</Text>
        <Text style={styles.memberRole}>{item.role}</Text>
      </View>
      {item.isAdmin && (
        <View style={styles.adminBadge}>
          <Text style={styles.adminText}>Admin</Text>
        </View>
      )}
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
        <Text style={styles.headerTitle}>{groupName} Members</Text>
        {userInfo?.role === 'admin' && (
          <TouchableOpacity 
            style={styles.manageButton}
            onPress={() => navigation.navigate('ManageMembers', { groupId, groupName })}
          >
            <FontAwesome5 name="cog" size={20} color="#2c5282" />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.searchContainer}>
        <FontAwesome5 name="search" size={16} color="#a0aec0" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search members..."
          placeholderTextColor="#a0aec0"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <FlatList
        data={filteredMembers}
        renderItem={renderMemberItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.membersList}
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
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    padding: 5,
  },
  manageButton: {
    padding: 5,
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
  membersList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  memberImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 5,
  },
  memberRole: {
    fontSize: 14,
    color: '#718096',
  },
  adminBadge: {
    backgroundColor: '#ebf8ff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  adminText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2c5282',
  },
});

export default GroupMembersScreen;