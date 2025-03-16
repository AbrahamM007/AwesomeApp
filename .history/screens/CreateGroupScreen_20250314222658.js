import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Switch
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../context/AuthContext';

const CreateGroupScreen = ({ navigation }) => {
  const { userInfo } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [meetingTime, setMeetingTime] = useState('');
  const [meetingLocation, setMeetingLocation] = useState('');
  const [isMinistry, setIsMinistry] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please allow access to your photo library to select an image.');
      return;
    }
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  
  const handleCreateGroup = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a group name');
      return;
    }
    
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a group description');
      return;
    }
    
    if (!image) {
      Alert.alert('Error', 'Please select a group image');
      return;
    }
    
    // Here you would typically send the data to your backend
    // For now, we'll just show a success message and navigate back
    
    Alert.alert(
      'Success',
      `Your ${isMinistry ? 'ministry' : 'group'} has been created!`,
      [
        { 
          text: 'OK', 
          onPress: () => navigation.goBack() 
        }
      ]
    );
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
        <Text style={styles.headerTitle}>
          Create {isMinistry ? 'Ministry' : 'Group'}
        </Text>
        <View style={{ width: 20 }} />
      </View>
      
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          <TouchableOpacity style={styles.imagePickerContainer} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.groupImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <FontAwesome5 name="image" size={40} color="#a0aec0" />
                <Text style={styles.imagePlaceholderText}>Tap to add a cover image</Text>
              </View>
            )}
          </TouchableOpacity>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Name *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder={`Enter ${isMinistry ? 'ministry' : 'group'} name`}
              placeholderTextColor="#a0aec0"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder={`Describe what this ${isMinistry ? 'ministry' : 'group'} is about`}
              placeholderTextColor="#a0aec0"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Meeting Time</Text>
            <TextInput
              style={styles.input}
              value={meetingTime}
              onChangeText={setMeetingTime}
              placeholder="e.g., Wednesdays at 7:00 PM"
              placeholderTextColor="#a0aec0"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Meeting Location</Text>
            <TextInput
              style={styles.input}
              value={meetingLocation}
              onChangeText={setMeetingLocation}
              placeholder="e.g., Fellowship Hall"
              placeholderTextColor="#a0aec0"
            />
          </View>
          
          <View style={styles.toggleContainer}>
            <Text style={styles.inputLabel}>Group Type</Text>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleText}>
                {isMinistry ? "This is a ministry" : "This is a social group"}
              </Text>
              <Switch
                trackColor={{ false: "#cbd5e0", true: "#90cdf4" }}
                thumbColor={isMinistry ? "#2c5282" : "#a0aec0"}
                onValueChange={setIsMinistry}
                value={isMinistry}
              />
            </View>
            <Text style={styles.toggleDescription}>
              {isMinistry 
                ? "Ministries are official church groups with specific service purposes" 
                : "Social groups are for fellowship and community building"}
            </Text>
          </View>
          
          <View style={styles.toggleContainer}>
            <Text style={styles.inputLabel}>Privacy Settings</Text>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleText}>
                {isPrivate ? "Private group" : "Public group"}
              </Text>
              <Switch
                trackColor={{ false: "#cbd5e0", true: "#90cdf4" }}
                thumbColor={isPrivate ? "#2c5282" : "#a0aec0"}
                onValueChange={setIsPrivate}
                value={isPrivate}
              />
            </View>
            <Text style={styles.toggleDescription}>
              {isPrivate 
                ? "Members must be approved to join this group" 
                : "Anyone can join this group"}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.createButton}
            onPress={handleCreateGroup}
          >
            <Text style={styles.createButtonText}>
              Create {isMinistry ? 'Ministry' : 'Group'}
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
  },
  backButton: {
    padding: 5,
  },
  formContainer: {
    padding: 20,
  },
  imagePickerContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#e2e8f0',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  groupImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    marginTop: 10,
    color: '#718096',
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a5568',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2d3748',
  },
  textArea: {
    minHeight: 120,
    paddingTop: 12,
  },
  toggleContainer: {
    marginBottom: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  toggleText: {
    fontSize: 14,
    color: '#4a5568',
  },
  toggleDescription: {
    fontSize: 12,
    color: '#718096',
    marginTop: 5,
    marginLeft: 5,
  },
  createButton: {
    backgroundColor: '#2c5282',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateGroupScreen;