import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { db, auth } from '../firebase/config';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

const GroupMembersScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { groupId } = route.params;
  
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const currentUser = auth.currentUser;
  const isAdmin = group?.createdBy === currentUser?.uid;

  useEffect(() => {
    const fetchGroupAndMembers = async () => {
      try {
        // Fetch group details
        const groupDoc = await getDoc(doc(db, 'groups', groupId));
        if (!groupDoc.exists()) {
          Alert.alert('Error', 'Group not found');
          navigation.goBack();
          return;
        }
        
        const groupData = { id: groupDoc.id, ...groupDoc.data() };
        setGroup(groupData);
        
        // Fetch member details
        const memberIds = groupData.members || [];
        if (memberIds.length === 0) {
          setMembers([]);
          setLoading(false);
          return;
        }
        
        const usersRef = collection(db, 'users');
        const memberPromises = memberIds.map(async (memberId) => {
          const memberDoc = await getDoc(doc(usersRef, memberId));
          if (memberDoc.exists()) {
            return { id: memberDoc.id, ...memberDoc.data() };
          }
          return { id: memberId, displayName: 'Unknown Member' };
        });
        
        const memberData = await Promise.all(memberPromises);
        setMembers(memberData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching group members:', error);
        Alert.alert('Error', 'Failed to load group members');
        setLoading(false);
      }
    };
    
    fetchGroupAndMembers();
  }, [groupId, navigation]);

  const renderMemberItem = ({ item }) => (
    <View style={styles.memberItem}>
      <View style={styles.memberAvatar}>
        <Text style={styles.memberInitial}>
          {item.displayName ? item.displayName.charAt(0).toUpperCase() : '?'}
        </Text>
      </View>
      
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{item.displayName || 'Unknown Member'}</Text>
        {item.id === group?.createdBy && (
          <View style={styles.adminBadge}>
            <Text style={styles.adminText}>Admin</Text>
          </View>
        )}
      </View>
      
      {isAdmin && item.id !== currentUser?.uid && (
        <TouchableOpacity style={styles.removeButton}>
          <Ionicons name="remove-circle-outline" size={24} color="#ff6b6b" />
        </TouchableOpacity>
      )}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#e1f0d8" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3c5c8e" />
          <Text style={styles.loadingText}>Loading members...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#e1f0d8" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#3c5c8e" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Group Members</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.container}>
        <Text style={styles.memberCount}>
          {members.length} {members.length === 1 ? 'Member' : 'Members'}
        </Text>
        
        <FlatList
          data={members}
          renderItem={renderMemberItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.membersList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No members found</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e1f0d8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#e1f0d8',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3c5c8e',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  memberCount: {
    fontSize: 16,
    color: '#777777',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  membersList: {
    padding: 16,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3c5c8e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  memberInitial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  memberInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  adminBadge: {
    backgroundColor: '#a9c25d',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  adminText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },
  removeButton: {
    padding: 8,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#777777',
    fontStyle: 'italic',
  }
});

export default GroupMembersScreen;