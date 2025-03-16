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
  const [type, setType] = useState('announcement');
  const [image, setImage] = useState(null);
  const [author, setAuthor] = useState(userInfo?.name || '');
  const [sendNotification, setSendNotification] = useState(true);
  
  // Additional fields for events
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  
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
  
  const handleCreateFeedItem = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }
    
    if (!content.trim()) {
      Alert.alert('Error', 'Please enter content');
      return;
    }
    
    if (type === 'event') {
      if (!date.trim()) {
        Alert.alert('Error', 'Please enter a date for the event');
        return;
      }
      
      if (!time.trim()) {
        Alert.alert('Error', 'Please enter a time for the event');
        return;
      }
      
      if (!location.trim()) {
        Alert.alert('Error', 'Please enter a location for the event');
        return;
      }
    }
    
    // Here you would typically send the data to your backend
    // For now, we'll just show a success message and navigate back
    
    let successMessage = `${type.charAt(0).toUpperCase() + type.slice(1)} created successfully!`;
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
        <Text style={styles.headerTitle}>Create Feed Item</Text>
        <View style={{ width: 20 }} />
      </View>
      
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.typeSelector}>
            <Text style={styles.inputLabel}>Type</Text>
            <View style={styles.typeOptions}>
              <TouchableOpacity 
                style={[
                  styles.typeOption, 
                  type === 'announcement' && styles.typeOptionSelected
                ]}
                onPress={() => setType('announcement')}
              >
                <FontAwesome5 
                  name="bullhorn" 
                  size={16} 
                  color={type === 'announcement' ? "#fff" : "#718096"} 
                />
                <Text style={[
                  styles.typeOptionText,
                  type === 'announcement' && styles.typeOptionTextSelected
                ]}>Announcement</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.typeOption, 
                  type === 'event' && styles.typeOptionSelected,
                  type === 'event' && { backgroundColor: '#2c5282' }
                ]}
                onPress={() => setType('event')}
              >
                <FontAwesome5 
                  name="calendar-alt" 
                  size={16} 
                  color={type === 'event' ? "#fff" : "#718096"} 
                />
                <Text style={[
                  styles.typeOptionText,
                  type === 'event' && styles.typeOptionTextSelected
                ]}>Event</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.typeOption, 
                  type === 'devotional' && styles.typeOptionSelected,
                  type === 'devotional' && { backgroundColor: '#805ad5' }
                ]}
                onPress={() => setType('devotional')}
              >
                <FontAwesome5 
                  name="book-open" 
                  size={16} 
                  color={type === 'devotional' ? "#fff" : "#718096"} 
                />
                <Text style={[
                  styles.typeOptionText,
                  type === 'devotional' && styles.typeOptionTextSelected
                ]}>Devotional</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.typeOption, 
                  type === 'news' && styles.typeOptionSelected,
                  type === 'news' && { backgroundColor: '#38a169' }
                ]}
                onPress={() => setType('news')}
              >
                <FontAwesome5 
                  name="newspaper" 
                  size={16} 
                  color={type === 'news' ? "#fff" : "#718096"} 
                />
                <Text style={[
                  styles.typeOptionText,
                  type === 'news' && styles.typeOptionTextSelected
                ]}>News</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {(type === 'event' || type === 'news') && (
            <TouchableOpacity style={styles.imagePickerContainer} onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.itemImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <FontAwesome5 name="image" size={40} color="#a0aec0" />
                  <Text style={styles.imagePlaceholderText}>Tap to add an image</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Title *</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter title"
              placeholderTextColor="#a0aec0"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Content *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={content}
              onChangeText={setContent}
              placeholder="Enter content"
              placeholderTextColor="#a0aec0"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>
          
          {(type === 'announcement' || type === 'devotional') && (
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Author</Text>
              <TextInput
                style={styles.input}
                value={author}
                onChangeText={setAuthor}
                placeholder="Enter author name"
                placeholderTextColor="#a0aec0"
              />
            </View>
          )}
          
          {type === 'event' && (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Date *</Text>
                <TextInput
                  style={styles.input}
                  value={date}
                  onChangeText={setDate}
                  placeholder="e.g., June 18, 2023"
                  placeholderTextColor="#a0aec0"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Time *</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  onChangeText={setTime}
                  placeholder="e.g., 7:00 PM - 9:00 PM"
                  placeholderTextColor="#a0aec0"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Location *</Text>
                <TextInput
                  style={styles.input}
                  value={location}
                  onChangeText={setLocation}
                  placeholder="Enter location"
                  placeholderTextColor="#a0aec0"
                />
              </View>
            </>
          )}
          
          <View style={styles.notificationContainer}>
            <Text style={styles.inputLabel}>Send Notification</Text>
            <View style={styles.notificationToggle}>
              <Text style={styles.notificationText}>
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
            onPress={handleCreateFeedItem}
          >
            <Text style={styles.createButtonText}>Create {type.charAt(0).toUpperCase() + type.slice(1)}</Text>
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
  typeSelector: {
    marginBottom: 20,
  },
  typeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  typeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  typeOptionSelected: {
    backgroundColor: '#e53e3e',
    borderColor: '#e53e3e',
  },
  typeOptionText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#718096',
  },
  typeOptionTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  imagePickerContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#e2e8f0',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  itemImage: {
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
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  notificationText: {
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