import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Fix the import statement for ImagePicker
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';

const CreateAnnouncementScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'You need to grant access to your photos to upload an image.');
        return;
      }
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImageUrl(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };
  
  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Missing Information', 'Please enter a title for your announcement.');
      return;
    }
    
    if (!description.trim()) {
      Alert.alert('Missing Information', 'Please enter a description for your announcement.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Create new announcement object
      const newAnnouncement = {
        id: uuidv4(),
        title: title.trim(),
        description: description.trim(),
        imageUrl: imageUrl,
        createdAt: new Date().toISOString(),
        type: 'announcement'
      };
      
      // Get existing announcements
      const existingAnnouncementsJson = await AsyncStorage.getItem('announcements');
      let announcements = [];
      
      if (existingAnnouncementsJson) {
        announcements = JSON.parse(existingAnnouncementsJson);
      }
      
      // Add new announcement
      announcements.push(newAnnouncement);
      
      // Save updated announcements
      await AsyncStorage.setItem('announcements', JSON.stringify(announcements));
      
      Alert.alert(
        'Success',
        'Your announcement has been created!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Error creating announcement:', error);
      Alert.alert('Error', 'Failed to create announcement. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Announcement</Text>
      </View>
      
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter announcement title"
          maxLength={100}
        />
        
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter announcement details"
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />
        
        <Text style={styles.label}>Image (Optional)</Text>
        <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
          <FontAwesome5 name="image" size={20} color="#a9c25d" />
          <Text style={styles.imagePickerText}>
            {imageUrl ? 'Change Image' : 'Select Image'}
          </Text>
        </TouchableOpacity>
        
        {imageUrl ? (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: imageUrl }} style={styles.imagePreview} />
            <TouchableOpacity 
              style={styles.removeImageButton}
              onPress={() => setImageUrl('')}
            >
              <FontAwesome5 name="times-circle" size={24} color="#e53e3e" solid />
            </TouchableOpacity>
          </View>
        ) : null}
        
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <FontAwesome5 name="bullhorn" size={20} color="#fff" />
              <Text style={styles.submitButtonText}>Post Announcement</Text>
            </>
          )}
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
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#d4f5c9',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a5568',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
  },
  textArea: {
    minHeight: 120,
  },
  imagePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
  },
  imagePickerText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#4a5568',
  },
  imagePreviewContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#a9c25d',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default CreateAnnouncementScreen;