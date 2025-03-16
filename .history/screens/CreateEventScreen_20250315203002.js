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
  Platform
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
// Comment out the DateTimePicker import for now
// import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// In your imports
import { db, auth } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import * as Network from 'expo-network';

const CreateEventScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [dateString, setDateString] = useState(new Date().toLocaleDateString());
  const [timeString, setTimeString] = useState(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
  const [eventImage, setEventImage] = useState(null);
  const [isPublic, setIsPublic] = useState(true); // Default to public/announcement
  
  // Use a placeholder function instead of the image picker
  const pickImage = () => {
    Alert.alert(
      'Feature Coming Soon',
      'Image upload will be available in the next update.',
      [{ text: 'OK' }]
    );
    
    // For testing, you can set a placeholder image
    setEventImage('https://via.placeholder.com/150');
  };
  
  // Add loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleCreateEvent = async () => {
    if (!eventName.trim()) {
      Alert.alert('Error', 'Please enter an event name');
      return;
    }
    
    try {
      // Show loading state
      setIsSubmitting(true);
      
      // Check network connectivity using expo-network instead of NetInfo
      const networkState = await Network.getNetworkStateAsync();
      const isConnected = networkState.isConnected && networkState.isInternetReachable;
      
      // Parse date and time strings
      const [month, day, year] = dateString.split('/');
      let hours = 0;
      let minutes = 0;
      
      // Try to parse the time string
      try {
        const timeParts = timeString.match(/(\d+):(\d+)\s*([AP]M)?/i);
        if (timeParts) {
          hours = parseInt(timeParts[1]);
          minutes = parseInt(timeParts[2]);
          const period = timeParts[3] ? timeParts[3].toUpperCase() : null;
          
          // Convert to 24-hour format if needed
          if (period === 'PM' && hours < 12) {
            hours += 12;
          } else if (period === 'AM' && hours === 12) {
            hours = 0;
          }
        }
      } catch (e) {
        console.error('Error parsing time:', e);
      }
      
      // Create a date object
      const eventDateTime = new Date(
        parseInt(year),
        parseInt(month) - 1, // Month is 0-indexed
        parseInt(day),
        hours,
        minutes
      );
      
      // Create event object for Firestore
      const eventData = {
        title: eventName,
        description: description,
        location: location,
        date: eventDateTime.toISOString(),
        time: timeString,
        imageUrl: eventImage,
        createdBy: user?.uid || 'anonymous',
        createdByName: user?.displayName || 'Anonymous User',
        createdAt: serverTimestamp(),
        isPublic: isPublic,
        type: 'event'
      };
      
      // Save to AsyncStorage first to ensure we don't lose data
      const localEventData = {
        ...eventData,
        id: `local-${Date.now()}`,
        createdAt: new Date().toISOString() // Convert serverTimestamp to string for local storage
      };
      
      const existingEvents = await AsyncStorage.getItem('events');
      const events = existingEvents ? JSON.parse(existingEvents) : [];
      events.push(localEventData);
      await AsyncStorage.setItem('events', JSON.stringify(events));
      
      // Now try to save to Firestore, but don't block the UI
      let firestoreSuccess = false;
      let docRef = null;
      
      // Only try Firestore if we have connectivity
      if (isConnected) {
        try {
          console.log('Network available, saving to Firestore');
          
          // Create Firestore object (with serverTimestamp)
          const firestoreData = {
            title: eventName,
            description: description,
            location: location,
            date: eventDateTime.toISOString(),
            time: timeString,
            imageUrl: eventImage,
            createdBy: user?.uid || 'anonymous',
            createdByName: user?.displayName || 'Anonymous User',
            createdAt: serverTimestamp(),
            isPublic: isPublic,
            type: 'event'
          };
          
          // Use a short timeout
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Firestore connection timeout')), 5000)
          );
          
          docRef = await Promise.race([
            addDoc(collection(db, 'events'), firestoreData),
            timeoutPromise
          ]);
          
          if (docRef) {
            console.log('Event saved to Firestore with ID:', docRef.id);
            firestoreSuccess = true;
            
            // Update local storage with Firestore ID
            const updatedEvents = events.map(event => 
              event.id === localEventData.id ? 
                {...event, id: docRef.id, pendingSync: false} : 
                event
            );
            await AsyncStorage.setItem('events', JSON.stringify(updatedEvents));
            
            // Handle announcements if public
            if (isPublic) {
              try {
                const announcementData = {
                  title: eventName,
                  description: description,
                  imageUrl: eventImage,
                  type: 'event',
                  eventId: docRef.id,
                  createdAt: serverTimestamp(),
                  createdBy: user?.uid || 'anonymous',
                  createdByName: user?.displayName || 'Anonymous User'
                };
                
                const announcementRef = await addDoc(collection(db, 'announcements'), announcementData);
                
                // Save announcement locally too
                const existingAnnouncements = await AsyncStorage.getItem('announcements');
                const announcements = existingAnnouncements ? JSON.parse(existingAnnouncements) : [];
                announcements.push({
                  ...announcementData,
                  id: announcementRef.id,
                  createdAt: new Date().toISOString(),
                  pendingSync: false
                });
                await AsyncStorage.setItem('announcements', JSON.stringify(announcements));
              } catch (announcementError) {
                console.error('Error saving announcement:', announcementError);
              }
            }
          }
        } catch (firestoreError) {
          console.error('Error saving to Firestore:', firestoreError);
          // Mark the event for future sync
          const pendingEvents = events.map(event => 
            event.id === localEventData.id ? {...event, pendingSync: true} : event
          );
          await AsyncStorage.setItem('events', JSON.stringify(pendingEvents));
        }
      } else {
        console.log('No network connection, saved locally only');
      }
      
      // Show appropriate success message
      Alert.alert(
        'Success',
        isConnected && firestoreSuccess 
          ? 'Event created successfully and added to announcements!' 
          : 'Event saved locally. It will sync when you\'re back online.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Error creating event:', error);
      Alert.alert('Error', 'Failed to create event. Please try again.');
    } finally {
      setIsSubmitting(false);
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
        <Text style={styles.headerTitle}>Create New Event</Text>
        <View style={{ width: 20 }} />
      </View>
      
      <View style={styles.formContainer}>
        <TouchableOpacity 
          style={styles.imagePickerContainer}
          onPress={pickImage}
        >
          {eventImage ? (
            <Image 
              source={{ uri: eventImage }} 
              style={styles.eventImage} 
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <FontAwesome5 name="camera" size={30} color="#a0aec0" />
              <Text style={styles.imagePlaceholderText}>Add Event Image</Text>
            </View>
          )}
        </TouchableOpacity>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Event Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter event name"
            value={eventName}
            onChangeText={setEventName}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe your event"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter event location"
            value={location}
            onChangeText={setLocation}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Date (MM/DD/YYYY)</Text>
          <TextInput
            style={styles.input}
            placeholder="MM/DD/YYYY"
            value={dateString}
            onChangeText={setDateString}
            keyboardType="numbers-and-punctuation"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Time (HH:MM AM/PM)</Text>
          <TextInput
            style={styles.input}
            placeholder="HH:MM AM/PM"
            value={timeString}
            onChangeText={setTimeString}
            keyboardType="default"
          />
        </View>
        
        {/* Toggle for public/private event */}
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
              {isPublic ? 'Yes - Public Event' : 'No - Private Event'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={[styles.createButton, isSubmitting && styles.disabledButton]}
          onPress={handleCreateEvent}
          disabled={isSubmitting}
        >
          <Text style={styles.createButtonText}>
            {isSubmitting ? 'Creating...' : 'Create Event'}
          </Text>
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
  eventImage: {
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
  dateTimeButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
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
  // Add disabled button style
  disabledButton: {
    backgroundColor: '#cccccc',
    opacity: 0.7,
  },
});

export default CreateEventScreen;

// Remove the unused handleSaveEvent function at the bottom