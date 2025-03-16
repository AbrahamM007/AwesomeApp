import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
// Import the correct DateTimePicker component
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
// Fix the AsyncStorage import
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateEventScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [eventImage, setEventImage] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
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
  
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };
  
  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };
  
  const handleCreateEvent = async () => {
    if (!eventName.trim()) {
      Alert.alert('Error', 'Please enter an event name');
      return;
    }
    
    try {
      // Combine date and time
      const eventDateTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes()
      );
      
      // Create event object
      const eventData = {
        id: Date.now().toString(), // Simple ID generation
        name: eventName,
        description: description,
        location: location,
        dateTime: eventDateTime.toISOString(),
        imageUrl: eventImage,
        createdBy: user?.uid || 'anonymous',
        createdAt: new Date().toISOString(),
        isPublic: isPublic,
        type: 'event'
      };
      
      // Save to AsyncStorage instead of Firestore
      // Get existing events
      const existingEvents = await AsyncStorage.getItem('events');
      const events = existingEvents ? JSON.parse(existingEvents) : [];
      
      // Add new event
      events.push(eventData);
      
      // Save back to AsyncStorage
      await AsyncStorage.setItem('events', JSON.stringify(events));
      
      // If public, also add to announcements
      if (isPublic) {
        const announcementData = {
          id: Date.now().toString() + '-announcement',
          title: eventName,
          description: description,
          imageUrl: eventImage,
          type: 'event',
          eventId: eventData.id,
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
        'Event created successfully and added to announcements!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      console.error('Error creating event:', error);
      Alert.alert('Error', 'Failed to create event. Please try again.');
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
          <Text style={styles.inputLabel}>Date</Text>
          <TouchableOpacity
            style={styles.dateTimeButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Time</Text>
          <TouchableOpacity
            style={styles.dateTimeButton}
            onPress={() => setShowTimePicker(true)}
          >
            <Text>{time.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              onChange={onTimeChange}
            />
          )}
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
              {isPublic ? 'Yes - Public Event' : 'No - Private Event'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.createButton}
          onPress={handleCreateEvent}
        >
          <Text style={styles.createButtonText}>Create Event</Text>
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
});

export default CreateEventScreen;