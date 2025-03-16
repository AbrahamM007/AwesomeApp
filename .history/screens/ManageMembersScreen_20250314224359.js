import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Alert
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const ManageMembersScreen = ({ route, navigation }) => {
  const { groupId, groupName } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for group members
  const [members, setMembers] = useState([
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
  ]);
  
  // Mock data for pending requests
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: '6',
      name: 'John Smith',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      requestDate: '2 days ago'
    },
    {
      id: '7',
      name: 'Amanda Lee',
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
      requestDate: '1 week ago'
    }
  ]);
  
  const filteredMembers = searchQuery
    ? members.filter(member => 
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : members;
  
  const handleRemoveMember = (memberId) => {
    Alert.alert(
      'Remove Member',
      'Are you sure you want to remove this member from the group?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setMembers(members.filter(member => member.id !== memberId));
          }
        }
      ]
    );
  };
  
  const handleMakeAdmin = (memberId) => {
    setMembers(members.map(member => 
      member.id === memberId 
        ? { ...member, isAdmin: true, role: 'Admin' } 
        : member
    ));
  };
  
  const handleAcceptRequest = (requestId) => {
    const request = pendingRequests.find(req => req.id === requestId);
    if (request) {
      const newMember = {
        id: request.id,
        name: request.name,
        role: 'Member',
        image: request.image,
        isAdmin: false
      };
      setMembers([...members, newMember]);
      setPendingRequests(pendingRequests.filter(req => req.id !== requestId));
    }
  };
  
  const handleRejectRequest = (requestId) => {
    setPendingRequests(pendingRequests.filter(req => req.id !== requestId));
  };
  
  const renderMemberItem = ({ item }) => (
    <View style={styles.memberItem}>
      <Image source={{ uri: item.image }} style={styles.memberImage} />
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{item.name}</Text>
        <Text style={styles.memberRole}>{item.role}</Text>
      </View>
      <View style={styles.memberActions}>
        {!item.isAdmin && (
          <>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleMakeAdmin(item.id)}
            >
              <FontAwesome5 name="user-shield" size={16} color="#2c5282" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.removeButton]}
              onPress={() => handleRemoveMember(item.id)}
            >
              <FontAwesome5 name="user-times" size={16} color="#e53e3e" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
  
  const renderRequestItem = ({ item }) => (
    <View style={styles.requestItem}>
      <Image source={{ uri: item.image }} style={styles.memberImage} />
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{item.name}</Text>
        <Text style={styles.requestDate}>Requested {item.requestDate}</Text>
      </View>
      <View style={styles.requestActions}>
        <TouchableOpacity 
          style={[styles.requestButton, styles.acceptButton]}
          onPress={() => handleAcceptRequest(item.id)}
        >
          <FontAwesome5 name="check" size={14} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.requestButton, styles.rejectButton]}
          onPress={() => handleRejectRequest(item.id)}
        >
          <FontAwesome5 name="times" size={14} color="#fff" />
        </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Manage Members</Text>
        <View style={{ width: 30 }} />
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
      
      {pendingRequests.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pending Requests</Text>
          <FlatList
            data={pendingRequests}
            renderItem={renderRequestItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>
      )}
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Members</Text>
        <FlatList
          data={filteredMembers}
          renderItem={renderMemberItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.membersList}
        />
      </View>
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
  section: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 15,
  },
  membersList: {
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
  requestItem: {
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
  requestDate: {
    fontSize: 14,
    color: '#718096',
  },
  memberActions: {
    flexDirection: 'row',
  },
  requestActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ebf8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  removeButton: {
    backgroundColor: '#fff5f5',
  },
  requestButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  acceptButton: {
    backgroundColor: '#48bb78',
  },
  rejectButton: {
    backgroundColor: '#e53e3e',
  },
});

export default ManageMembersScreen;