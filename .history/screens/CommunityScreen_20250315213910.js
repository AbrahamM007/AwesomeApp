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
  Modal,
  TextInput,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { createGroup } from '../firebase/auth';

const CommunityScreen = () => {
  const navigation = useNavigation();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [creatingGroup, setCreatingGroup] = useState(false);

  useEffect(() => {
    // Set up listener for groups
    const groupsRef = collection(db, 'groups');
    const groupsQuery = query(
      groupsRef, 
      orderBy('createdAt', 'desc')
    );
    
    // Listen for groups
    const unsubscribeGroups = onSnapshot(groupsQuery, (snapshot) => {
      const groupsList = [];
      snapshot.forEach((doc) => {
        groupsList.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setGroups(groupsList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching groups:", error);
      setLoading(false);
    });
    
    // Clean up listener
    return () => {
      unsubscribeGroups();
    };
  }, []);

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) {
      Alert.alert('Error', 'Please enter a group name');
      return;
    }
    
    try {
      setCreatingGroup(true);
      
      await createGroup({
        name: newGroupName.trim(),
        description: newGroupDescription.trim(),
        type: 'public', // You can add options for private groups later
        memberCount: 1
      });
      
      setModalVisible(false);
      setNewGroupName('');
      setNewGroupDescription('');
      
      Alert.alert('Success', 'Your group has been created successfully');
    } catch (error) {
      console.error('Error creating group:', error);
      Alert.alert('Error', 'Failed to create group. Please try again.');
    } finally {
      setCreatingGroup(false);
    }
  };

  const renderGroupItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.groupCard}
      onPress={() => navigation.navigate('GroupDetails', { groupId: item.id })}
    >
      <View style={styles.groupHeader}>
        <View style={styles.groupIcon}>
          <Ionicons name="people" size={24} color="#ffffff" />
        </View>
        <View style={styles.groupInfo}>
          <Text style={styles.groupName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.groupMembers}>{item.members?.length || 1} members</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#a9c25d" />
      </View>
      
      {item.description ? (
        <Text style={styles.groupDescription} numberOfLines={2}>
          {item.description}
        </Text>
      ) : null}
      
      <View style={styles.groupFooter}>
        <Text style={styles.groupCreator}>
          Created by {item.creatorName || 'Church Member'}
        </Text>
        <Text style={styles.groupDate}>
          {item.createdAt ? new Date(item.createdAt.toDate()).toLocaleDateString() : 'Recently'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#e1f0d8" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community Groups</Text>
        <TouchableOpacity 
          style={styles.createGroupButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3c5c8e" />
          <Text style={styles.loadingText}>Loading groups...</Text>
        </View>
      ) : (
        <FlatList
          data={groups}
          renderItem={renderGroupItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.groupsContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="people-outline" size={60} color="#cccccc" />
              <Text style={styles.emptyText}>No groups yet</Text>
              <Text style={styles.emptySubtext}>Create a new group to get started</Text>
              <TouchableOpacity 
                style={styles.emptyButton}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.emptyButtonText}>Create Group</Text>
                <Ionicons name="add-circle-outline" size={18} color="#3c5c8e" />
              </TouchableOpacity>
            </View>
          }
        />
      )}
      
      {/* Create Group Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create New Group</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#3c5c8e" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalLabel}>Group Name</Text>
            <TextInput
              style={styles.modalInput}
              value={newGroupName}
              onChangeText={setNewGroupName}
              placeholder="Enter group name"
              maxLength={50}
            />
            
            <Text style={styles.modalLabel}>Description (Optional)</Text>
            <TextInput
              style={styles.modalTextArea}
              value={newGroupDescription}
              onChangeText={setNewGroupDescription}
              placeholder="What is this group about?"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            
            <TouchableOpacity
              style={[styles.modalButton, (!newGroupName.trim() || creatingGroup) && styles.disabledButton]}
              onPress={handleCreateGroup}
              disabled={!newGroupName.trim() || creatingGroup}
            >
              {creatingGroup ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.modalButtonText}>Create Group</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e1f0d8',
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3c5c8e',
  },
  createGroupButton: {
    backgroundColor: '#a9c25d',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
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
  groupsContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  groupCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  groupIcon: {
    backgroundColor: '#3c5c8e',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3c5c8e',
    marginBottom: 2,
  },
  groupMembers: {
    fontSize: 14,
    color: '#777777',
  },
  groupDescription: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 12,
    lineHeight: 20,
  },
  groupFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  groupCreator: {
    fontSize: 12,
    color: '#777777',
    fontStyle: 'italic',
  },
  groupDate: {
    fontSize: 12,
    color: '#777777',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3c5c8e',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#777777',
    marginTop: 8,
    marginBottom: 24,
    textAlign: 'center',
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f5e8',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  emptyButtonText: {
    fontSize: 16,
    color: '#3c5c8e',
    fontWeight: '600',
    marginRight: 8,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3c5c8e',
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3c5c8e',
    marginBottom: 8,
    marginTop: 12,
  },
  modalInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  modalTextArea: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    height: 100,
    textAlignVertical: 'top',
  },
  modalButton: {
    backgroundColor: '#a9c25d',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    shadowOpacity: 0.1,
  },
  modalButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CommunityScreen;