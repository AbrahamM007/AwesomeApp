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
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '../context/AuthContext';

const CreateEventScreen = ({ navigation }) => {
  const { userInfo } = useAuth();
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000), // 2 hours later
    location: '',
    address: '',
    cost: '',
    capacity: '',
    image: null,
    organizer: userInfo?.name || '',
  });
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [sendNotification, setSendNotification] = useState(true);
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const formatTime = (time) => {
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setEventData({ ...eventData, date: selectedDate });
    }
  };
  
  const handleStartTimeChange = (event, selectedTime) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      setEventData({ ...eventData, startTime: selectedTime });
    }
  };
  
  const handleEndTimeChange = (event, selectedTime) => {
    setShowEndTimePicker(false);
    if (selectedTime) {
      setEventData({ ...eventData, endTime: selectedTime });
    }
  };
  
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
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setEventData({ ...eventData, image: result.assets[0].uri });
    }
  };
  
  const handleCreateEvent = () => {
    // Validate form
    if (!eventData.title.trim()) {
      Alert.alert('Error', 'Event title is required');
      return;
    }
    
    if (!eventData.description.trim()) {
      Alert.alert('Error', 'Please enter an event description');
      return;
    }
    
    if (!eventData.location.trim()) {
      Alert.alert('Error', 'Please enter a location');
      return;
    }
    
    if (!eventData.image) {
      Alert.alert('Error', 'Please select an event image');
      return;
    }
    
    // Here you would typically send the data to your backend
    // For now, we'll just show a success message and navigate back
    
    let successMessage = 'Event created successfully!';
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
        <Text style={styles.headerTitle}>Create Event</Text>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleCreateEvent}
        >
          <Text style={styles.saveButtonText}>Create</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity 
          style={styles.imageContainer}
          onPress={pickImage}
        >
          {eventData.image ? (
            <Image 
              source={{ uri: eventData.image }} 
              style={styles.eventImage} 
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <FontAwesome5 name="image" size={40} color="#a0aec0" />
              <Text style={styles.imagePlaceholderText}>Add Event Image</Text>
            </View>
          )}
        </TouchableOpacity>
        
        <View style={styles.formContainer}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Event Title *</Text>
            <TextInput
              style={styles.input}
              value={eventData.title}
              onChangeText={(text) => setEventData({ ...eventData, title: text })}
              placeholder="Enter event title"
              placeholderTextColor="#a0aec0"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={eventData.description}
              onChangeText={(text) => setEventData({ ...eventData, description: text })}
              placeholder="Describe your event"
              placeholderTextColor="#a0aec0"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Date *</Text>
            <TouchableOpacity 
              style={styles.dateTimeButton}
              onPress={() => setShowDatePicker(true)}
            >
              <FontAwesome5 name="calendar-alt" size={18} color="#718096" style={styles.dateTimeIcon} />
              <Text style={styles.dateTimeText}>{formatDate(eventData.date)}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={eventData.date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
          
          <View style={styles.formRow}>
            <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Start Time *</Text>
              <TouchableOpacity 
                style={styles.dateTimeButton}
                onPress={() => setShowStartTimePicker(true)}
              >
                <FontAwesome5 name="clock" size={18} color="#718096" style={styles.dateTimeIcon} />
                <Text style={styles.dateTimeText}>{formatTime(eventData.startTime)}</Text>
              </TouchableOpacity>
              {showStartTimePicker && (
                <DateTimePicker
                  value={eventData.startTime}
                  mode="time"
                  display="default"
                  onChange={handleStartTimeChange}
                />
              )}
            </View>
            
            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>End Time</Text>
              <TouchableOpacity 
                style={styles.dateTimeButton}
                onPress={() => setShowEndTimePicker(true)}
              >
                <FontAwesome5 name="clock" size={18} color="#718096" style={styles.dateTimeIcon} />
                <Text style={styles.dateTimeText}>{formatTime(eventData.endTime)}</Text>
              </TouchableOpacity>
              {showEndTimePicker && (
                <DateTimePicker
                  value={eventData.endTime}
                  mode="time"
                  display="default"
                  onChange={handleEndTimeChange}
                />
              )}
            </View>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Location *</Text>
            <TextInput
              style={styles.input}
              value={eventData.location}
              onChangeText={(text) => setEventData({ ...eventData, location: text })}
              placeholder="e.g., Main Sanctuary"
              placeholderTextColor="#a0aec0"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              value={eventData.address}
              onChangeText={(text) => setEventData({ ...eventData, address: text })}
              placeholder="Enter full address"
              placeholderTextColor="#a0aec0"
            />
          </View>
          
          <View style={styles.formRow}>
            <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Cost</Text>
              <TextInput
                style={styles.input}
                value={eventData.cost}
                onChangeText={(text) => setEventData({ ...eventData, cost: text })}
                placeholder="e.g., $10"
                placeholderTextColor="#a0aec0"
              />
            </View>
            
            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>Capacity</Text>
              <TextInput
                style={styles.input}
                value={eventData.capacity}
                onChangeText={(text) => setEventData({ ...eventData, capacity: text })}
                placeholder="e.g., 50"
                placeholderTextColor="#a0aec0"
                keyboardType="number-pad"
              />
            </View>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Organizer</Text>
            <TextInput
              style={styles.input}
              value={eventData.organizer}
              onChangeText={(text) => setEventData({ ...eventData, organizer: text })}
              placeholder="Enter organizer name"
              placeholderTextColor="#a0aec0"
            />
          </View>
          
          <View style={styles.notificationContainer}>
            <Text style={styles.label}>Send Notification</Text>
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
            onPress={handleCreateEvent}
          >
            <Text style={styles.createButtonText}>Create Event</Text>
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
    height: 200,
    marginBottom: 20,
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#718096',
    fontSize: 16,
    marginTop: 10,
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
  dateTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  dateTimeIcon: {
    marginRight: 10,
  },
  dateTimeText: {
    fontSize: 16,
    color: '#2d3748',
  },
  notificationContainer: {
    marginBottom: 20,
  },
  notificationToggle: {
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
  notificationText: {
    fontSize: 14,
    color: '#4a5568',
  },
  createButton: {
    backgroundColor: