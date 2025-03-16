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

const CreateFeedItemScreen = ({ navigation }) => {
  const { userInfo } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState('announcement'); // announcement, update, prayer
  const [image, setImage] = useState(null);
  const [isPinned, setIsPinned] = useState(false);
  const [sendNotification, setSendNotification] = useState(true);
  
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
  
  // Add this to your form submission handler
  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }
    
    try {
      setSubmitting(true);
      
      const user = auth.currentUser;
      if (!user) {
        setSubmitting(false);
        Alert.alert(
          'Authentication Required',
          'You need to be logged in to create feed items.',
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Go to Profile', 
              onPress: () => navigation.navigate('Profile') 
            }
          ]
        );
        return;
      }
      
      // Continue with feed item creation
      // ...
    } catch (error) {
      console.error('Error creating feed item:', error);
      Alert.alert('Error', 'Failed to create feed item. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleCreatePost = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a post title');
      return;
    }
    
    if (!content.trim()) {
      Alert.alert('Error', 'Please enter post content');
      return;
    }
    
    // Here you would typically send the data to your backend
    // For now, we'll just show a success message and navigate back
    
    let successMessage = 'Post created successfully!';
    if (sendNotification) {
      successMessage += ' Notification sent to all members.';
    }
    
    Alert.alert(
      'Success',
      successMessage,
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
        <Text style={styles.headerTitle}>Create Post</Text>
        <View style={{ width: 20 }} />
      </View>
      
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Post Title *</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter post title"
              placeholderTextColor="#a0aec0"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Content *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={content}
              onChangeText={setContent}
              placeholder="Enter post content"
              placeholderTextColor="#a0aec0"
              multiline
              numberOfLines={8}
              textAlignVertical="top"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Post Type</Text>
            <View style={styles.postTypeContainer}>
              <TouchableOpacity 
                style={[
                  styles.postTypeOption,
                  postType === 'announcement' && styles.postTypeSelected
                ]}
                onPress={() => setPostType('announcement')}
              >
                <FontAwesome5 
                  name="bullhorn" 
                  size={16} 
                  color={postType === 'announcement' ? "#2c5282" : "#718096"} 
                />
                <Text 
                  style={[
                    styles.postTypeText,
                    postType === 'announcement' && styles.postTypeTextSelected
                  ]}
                >
                  Announcement
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.postTypeOption,
                  postType === 'update' && styles.postTypeSelected
                ]}
                onPress={() => setPostType('update')}
              >
                <FontAwesome5 
                  name="info-circle" 
                  size={16} 
                  color={postType === 'update' ? "#2c5282" : "#718096"} 
                />
                <Text 
                  style={[
                    styles.postTypeText,
                    postType === 'update' && styles.postTypeTextSelected
                  ]}
                >
                  Update
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.postTypeOption,
                  postType === 'prayer' && styles.postTypeSelected
                ]}
                onPress={() => setPostType('prayer')}
              >
                <FontAwesome5 
                  name="pray" 
                  size={16} 
                  color={postType === 'prayer' ? "#2c5282" : "#718096"} 
                />
                <Text 
                  style={[
                    styles.postTypeText,
                    postType === 'prayer' && styles.postTypeTextSelected
                  ]}
                >
                  Prayer
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity style={styles.imagePickerContainer} onPress={pickImage}>
            {image ? (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: image }} style={styles.imagePreview} />
                <TouchableOpacity 
                  style={styles.removeImageButton}
                  onPress={() => setImage(null)}
                >
                  <FontAwesome5 name="times-circle" size={24} color="#e53e3e" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.imagePlaceholder}>
                <FontAwesome5 name="image" size={30} color="#a0aec0" />
                <Text style={styles.imagePlaceholderText}>Tap to add an image (optional)</Text>
              </View>
            )}
          </TouchableOpacity>
          
          <View style={styles.toggleContainer}>
            <Text style={styles.inputLabel}>Pin to Top</Text>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleText}>
                {isPinned 
                  ? "This post will be pinned to the top of the feed" 
                  : "Standard post order"}
              </Text>
              <Switch
                trackColor={{ false: "#cbd5e0", true: "#90cdf4" }}
                thumbColor={isPinned ? "#2c5282" : "#a0aec0"}
                onValueChange={setIsPinned}
                value={isPinned}
              />
            </View>
          </View>
          
          <View style={styles.toggleContainer}>
            <Text style={styles.inputLabel}>Send Notification</Text>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleText}>
                {sendNotification 
                  ? "All members will be notified" 
                  : "No notification will be sent"}
              </Text>
              <Switch
                trackColor={{ false: "#cbd5e0", true: "#90cdf4" }}
                thumbColor={sendNotification ? "#2c5282" : "#a0aec0"}
                onValueChange={setSendNotification}
                value={sendNotification}
              />
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.createButton}
            onPress={handleCreatePost}
          >
            <Text style={styles.createButtonText}>Create Post</Text>
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
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    padding: 5,
  },
  formContainer: {
    padding: 20,
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
    minHeight: 150,
    paddingTop: 12,
  },
  postTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postTypeOption: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 5,
    marginHorizontal: 5,
  },
  postTypeSelected: {
    backgroundColor: '#ebf8ff',
    borderColor: '#90cdf4',
  },
  postTypeText: {
    fontSize: 14,
    color: '#718096',
    marginTop: 5,
  },
  postTypeTextSelected: {
    color: '#2c5282',
    fontWeight: 'bold',
  },
  imagePickerContainer: {
    marginBottom: 20,
  },
  imagePlaceholder: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
    borderRadius: 8,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 14,
    color: '#a0aec0',
    marginTop: 10,
  },
  imagePreviewContainer: {
    position: 'relative',
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

export default CreateFeedItemScreen;