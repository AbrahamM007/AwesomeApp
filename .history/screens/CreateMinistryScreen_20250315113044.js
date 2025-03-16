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
  AsyncStorage
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// Remove Firebase import
// import firestore from '@react-native-firebase/firestore';
import { useAuth } from '../context/AuthContext';

const CreateMinistryScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [ministryName, setMinistryName] = useState('');
  const [description, setDescription] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [location, setLocation] = useState('');
  const [ministryImage, setMinistryImage] = useState(null);
  const [isPublic, setIsPublic] = useState(true); // Default to public/announcement
  
  // Use a placeholder function instead of the image picker
  const pickImage = () => {
    Alert.alert(
      'Feature Coming Soon',
      'Image upload will be available in the next update.',
      [{ text: 'OK' }]
    );
    
    // For testing, you can set a placeholder image
    setMinistryImage('https://via.placeholder.com/150');
  };
  
  const handleCreateMinistry = async () => {
    if (!ministryName.trim()) {
      Alert.alert('Error', 'Please enter a ministry name');
      return;
    }
    
    try {
      // Create ministry object
      const ministryData = {
        id: Date.now().toString(), // Simple ID generation
        name: ministryName,
        description: description,
        meetingTime: meetingTime,
        location: location,
        imageUrl: ministryImage,
        createdBy: user?.uid || 'anonymous',
        createdAt: new Date().toISOString(),
        isPublic: isPublic, // This determines if it shows in announcements
        type: 'ministry' // To distinguish from events
      };
      
      // Save to AsyncStorage instead of Firestore
      // Get existing ministries
      const existingMinistries = await AsyncStorage.getItem('ministries');
      const ministries = existingMinistries ? JSON.parse(existingMinistries) : [];
      
      // Add new ministry
      ministries.push(ministryData);
      
      // Save back to AsyncStorage
      await AsyncStorage.setItem('ministries', JSON.stringify(ministries));
      
      // If public, also add to announcements
      if (isPublic) {
        const announcementData = {
          id: Date.now().toString() + '-announcement',
          title: ministryName,
          description: description,
          imageUrl: ministryImage,
          type: 'ministry',
          ministryId: ministryData.id,
          createdAt: new Date().toISOString(),
          createdBy: user?.uid || 'anonymous'
        };
        
        // Get existing announcements
        const existingAnnouncements = await AsyncStorage.getItem('announcements');
        const announcements = existingAnnouncements ? JSON.parse(existingAnnouncements) : [];
        
        // Add new announcement
        announcements.push(announcementData);
        
        // Save back to AsyncStorage
        await AsyncStorage.setItem('announcements', JSON.stringify(announcements));
      }
      
      Alert.alert(
        'Success',
        'Ministry created successfully and added to announcements!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      console.error('Error creating ministry:', error);
      Alert.alert('Error', 'Failed to create ministry. Please try again.');
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={20} color="#2c5282" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create New Ministry</Text>
        <View style={{ width: 20 }} />
      </View>
      
      <View style={styles.formContainer}>
        <TouchableOpacity 
          style={styles.imagePickerContainer}
          onPress={pickImage}
        >
          {ministryImage ? (
            <Image 
              source={{ uri: ministryImage }} 
              style={styles.ministryImage} 
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <FontAwesome5 name="hands-helping" size={30} color="#a0aec0" />
              <Text style={styles.imagePlaceholderText}>Add Ministry Image</Text>
            </View>
          )}
        </TouchableOpacity>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Ministry Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter ministry name"
            value={ministryName}
            onChangeText={setMinistryName}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe the ministry's purpose and activities"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Meeting Time</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., Every Sunday at 9:00 AM"
            value={meetingTime}
            onChangeText={setMeetingTime}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter meeting location"
            value={location}
            onChangeText={setLocation}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Show in Announcements</Text>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              isPublic ? styles.toggleActive : styles.toggleInactive
            ]}
            onPress={() => setIsPublic(!isPublic)}
          >
            <Text style={styles.toggleText}>
              {isPublic ? 'Yes - Public Ministry' : 'No - Private Ministry'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.createButton}
          onPress={handleCreateMinistry}
        >
          <Text style={styles.createButtonText}>Create Ministry</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    alignItems: 'center',
    marginBottom: 30,
  },
  ministryImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    marginTop: 10,
    color: '#718096',
    fontSize: 14,
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
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    paddingTop: 12,
  },
  toggleButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleActive: {
    backgroundColor: '#a9c25d',
  },
  toggleInactive: {
    backgroundColor: '#e2e8f0',
  },
  toggleText: {
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: '#a9c25d',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateMinistryScreen;