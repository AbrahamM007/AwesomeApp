import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
  Alert
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const EditGroupScreen = ({ route, navigation }) => {
  const { groupId } = route.params;
  
  // Mock data for the group
  const [groupData, setGroupData] = useState({
    id: groupId,
    name: 'Bible Study',
    description: 'Weekly in-depth Bible study focusing on understanding Scripture and applying it to daily life.',
    meetingDay: 'Wednesday',
    meetingTime: '7:00 PM',
    location: 'Room 201',
    isPrivate: false,
    requireApproval: true,
    image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  });
  
  const handleSave = () => {
    // Validate form
    if (!groupData.name.trim()) {
      Alert.alert('Error', 'Group name is required');
      return;
    }
    
    // In a real app, you would save the changes to your backend
    Alert.alert(
      'Success',
      'Group details updated successfully',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };
  
  const handleDeleteGroup = () => {
    Alert.alert(
      'Delete Group',
      'Are you sure you want to delete this group? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // In a real app, you would delete the group from your backend
            navigation.navigate('Groups');
          }
        }
      ]
    );
  };
  
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setGroupData({ ...groupData, image: result.assets[0].uri });
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={20} color="#2c5282" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Group</Text>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity 
          style={styles.imageContainer}
          onPress={pickImage}
        >
          <Image 
            source={{ uri: groupData.image }} 
            style={styles.groupImage} 
          />
          <View style={styles.imageOverlay}>
            <FontAwesome5 name="camera" size={24} color="#fff" />
            <Text style={styles.changeImageText}>Change Image</Text>
          </View>
        </TouchableOpacity>
        
        <View style={styles.formContainer}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Group Name</Text>
            <TextInput
              style={styles.input}
              value={groupData.name}
              onChangeText={(text) => setGroupData({ ...groupData, name: text })}
              placeholder="Enter group name"
              placeholderTextColor="#a0aec0"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={groupData.description}
              onChangeText={(text) => setGroupData({ ...groupData, description: text })}
              placeholder="Enter group description"
              placeholderTextColor="#a0aec0"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
          
          <View style={styles.formRow}>
            <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Meeting Day</Text>
              <TextInput
                style={styles.input}
                value={groupData.meetingDay}
                onChangeText={(text) => setGroupData({ ...groupData, meetingDay: text })}
                placeholder="e.g. Monday"
                placeholderTextColor="#a0aec0"
              />
            </View>
            
            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>Meeting Time</Text>
              <TextInput
                style={styles.input}
                value={groupData.meetingTime}
                onChangeText={(text) => setGroupData({ ...groupData, meetingTime: text })}
                placeholder="e.g. 7:00 PM"
                placeholderTextColor="#a0aec0"
              />
            </View>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={groupData.location}
              onChangeText={(text) => setGroupData({ ...groupData, location: text })}
              placeholder="Enter meeting location"
              placeholderTextColor="#a0aec0"
            />
          </View>
          
          <View style={styles.switchGroup}>
            <View style={styles.switchInfo}>
              <Text style={styles.switchLabel}>Private Group</Text>
              <Text style={styles.switchDescription}>
                Private groups are not visible in group listings
              </Text>
            </View>
            <Switch
              value={groupData.isPrivate}
              onValueChange={(value) => setGroupData({ ...groupData, isPrivate: value })}
              trackColor={{ false: '#cbd5e0', true: '#90cdf4' }}
              thumbColor={groupData.isPrivate ? '#2c5282' : '#f7fafc'}
            />
          </View>
          
          <View style={styles.switchGroup}>
            <View style={styles.switchInfo}>
              <Text style={styles.switchLabel}>Require Approval</Text>
              <Text style={styles.switchDescription}>
                New members must be approved by an admin
              </Text>
            </View>
            <Switch
              value={groupData.requireApproval}
              onValueChange={(value) => setGroupData({ ...groupData, requireApproval: value })}
              trackColor={{ false: '#cbd5e0', true: '#90cdf4' }}
              thumbColor={groupData.requireApproval ? '#2c5282' : '#f7fafc'}
            />
          </View>
          
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={handleDeleteGroup}
          >
            <FontAwesome5 name="trash-alt" size={16} color="#fff" />
            <Text style={styles.deleteButtonText}>Delete Group</Text>
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
  },
  backButton: {
    padding: 5,
  },
  saveButton: {
    backgroundColor: '#2c5282',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    marginBottom: 20,
  },
  groupImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeImageText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  formContainer: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2d3748',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  switchGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  switchInfo: {
    flex: 1,
    marginRight: 10,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 5,
  },
  switchDescription: {
    fontSize: 14,
    color: '#718096',
  },
  deleteButton: {
    backgroundColor: '#e53e3e',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default EditGroupScreen;