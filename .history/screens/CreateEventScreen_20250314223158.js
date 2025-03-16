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

const CreateEventScreen = ({ navigation }) => {
  const { userInfo } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [cost, setCost] = useState('');
  const [capacity, setCapacity] = useState('');
  const [image, setImage] = useState(null);
  const [organizer, setOrganizer] = useState(userInfo?.name || '');
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
  
  const handleCreateEvent = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter an event title');
      return;
    }
    
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter an event description');
      return;
    }
    
    if (!date.trim()) {
      Alert.alert('Error', 'Please enter an event date');
      return;
    }
    
    if (!startTime.trim()) {
      Alert.alert('Error', 'Please enter a start time');
      return;
    }
    
    if (!location.trim()) {
      Alert.alert('Error', 'Please enter a location');
      return;
    }
    
    if (!image) {
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
        <View style={{ width: 20 }} />
      </View>
      
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          <TouchableOpacity style={styles.imagePickerContainer} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.eventImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <FontAwesome5 name="image" size={40} color="#a0aec0" />
                <Text style={styles.imagePlaceholderText}>Tap to add an event image</Text>
              </View>
            )}
          </TouchableOpacity>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Event Title *</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter event title"
              placeholderTextColor="#a0aec0"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe your event"
              placeholderTextColor="#a0aec0"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>
          
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
          
          <View style={styles.rowContainer}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.inputLabel}>Start Time *</Text>
              <TextInput
                style={styles.input}
                value={startTime}
                onChangeText={setStartTime}
                placeholder="e.g., 7:00 PM"
                placeholderTextColor="#a0aec0"
              />
            </View>
            
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={styles.inputLabel}>End Time</Text>
              <TextInput
                style={styles.input}
                value={endTime}
                onChangeText={setEndTime}
                placeholder="e.g., 9:00 PM"
                placeholderTextColor="#a0aec0"
              />
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Location *</Text>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="e.g., Main Sanctuary"
              placeholderTextColor="#a0aec0"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Address</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Enter full address"
              placeholderTextColor="#a0aec0"
            />
          </View>
          
          <View style={styles.rowContainer}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.inputLabel}>Cost</Text>
              <TextInput
                style={styles.input}
                value={cost}
                onChangeText={setCost}
                placeholder="e.g., $10"
                placeholderTextColor="#a0aec0"
              />
            </View>
            
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={styles.inputLabel}>Capacity</Text>
              <TextInput
                style={styles.input}
                value={capacity}
                onChangeText={setCapacity}
                placeholder="e.g., 50"
                placeholderTextColor="#a0aec0"
                keyboardType="number-pad"
              />
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Organizer</Text>
            <TextInput
              style={styles.input}
              value={organizer}
              onChangeText={setOrganizer}
              placeholder="Enter organizer name"
              placeholderTextColor="#a0aec0"
            />
          </View>
          
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
  eventImage: {
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
  dateTimeContainer: {
    marginBottom: 20,
  },
  dateTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginTop: 8,
  },
  dateTimeIcon: {
    marginRight: 10,
  },
  dateTimeText: {
    fontSize: 16,
    color: '#4a5568',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  timeButton: {
    flex: 0.48,
  },
  groupContainer: {
    marginBottom: 30,
  },
  groupToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  groupSelectionContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 15,
  },
  groupSelectionLabel: {
    fontSize: 16,
    color: '#4a5568',
    marginBottom: 10,
  },
  groupOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  groupOptionSelected: {
    backgroundColor: '#ebf8ff',
  },
  groupOptionText: {
    fontSize: 16,
    color: '#4a5568',
  },
  groupOptionTextSelected: {
    color: '#2c5282',
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: '#2c5282',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
});

export default CreateEventScreen;