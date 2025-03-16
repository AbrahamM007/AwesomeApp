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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date(Date.now() + 2 * 60 * 60 * 1000)); // 2 hours later
  const [isGroupEvent, setIsGroupEvent] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  
  // Mock data for user's groups
  const userGroups = [
    { id: '1', name: 'Young Adults' },
    { id: '2', name: 'Prayer Warriors' },
    { id: '3', name: 'Bible Study' }
  ];
  
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please allow access to your photo library to select an event image.');
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
  
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };
  
  const handleStartTimeChange = (event, selectedTime) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      setStartTime(selectedTime);
    }
  };
  
  const handleEndTimeChange = (event, selectedTime) => {
    setShowEndTimePicker(false);
    if (selectedTime) {
      setEndTime(selectedTime);
    }
  };
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const formatTime = (time) => {
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
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
    
    if (!location.trim()) {
      Alert.alert('Error', 'Please enter an event location');
      return;
    }
    
    // Here you would typically send the data to your backend
    // For now, we'll just show a success message and navigate back
    Alert.alert(
      'Success',
      `Event "${title}" created successfully!`,
      [
        { 
          text: 'OK', 
          onPress: () => navigation.navigate('MyEvents') 
        }
      ]
    );
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
        <TouchableOpacity style={styles.imagePickerContainer} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.eventImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <FontAwesome5 name="image" size={40} color="#a0aec0" />
              <Text style={styles.imagePlaceholderText}>Tap to add a cover image</Text>
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
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Location *</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="Enter event location"
            placeholderTextColor="#a0aec0"
          />
        </View>
        
        <View style={styles.dateTimeContainer}>
          <Text style={styles.inputLabel}>Date and Time</Text>
          
          <TouchableOpacity 
            style={styles.dateTimeButton}
            onPress={() => setShowDatePicker(true)}
          >
            <FontAwesome5 name="calendar-alt" size={16} color="#2c5282" style={styles.dateTimeIcon} />
            <Text style={styles.dateTimeText}>{formatDate(date)}</Text>
          </TouchableOpacity>
          
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          
          <View style={styles.timeContainer}>
            <TouchableOpacity 
              style={[styles.dateTimeButton, styles.timeButton]}
              onPress={() => setShowStartTimePicker(true)}
            >
              <FontAwesome5 name="clock" size={16} color="#2c5282" style={styles.dateTimeIcon} />
              <Text style={styles.dateTimeText}>Start: {formatTime(startTime)}</Text>
            </TouchableOpacity>
            
            {showStartTimePicker && (
              <DateTimePicker
                value={startTime}
                mode="time"
                display="default"
                onChange={handleStartTimeChange}
              />
            )}
            
            <TouchableOpacity 
              style={[styles.dateTimeButton, styles.timeButton]}
              onPress={() => setShowEndTimePicker(true)}
            >
              <FontAwesome5 name="clock" size={16} color="#2c5282" style={styles.dateTimeIcon} />
              <Text style={styles.dateTimeText}>End: {formatTime(endTime)}</Text>
            </TouchableOpacity>
            
            {showEndTimePicker && (
              <DateTimePicker
                value={endTime}
                mode="time"
                display="default"
                onChange={handleEndTimeChange}
              />
            )}
          </View>
        </View>
        
        <View style={styles.groupContainer}>
          <View style={styles.groupToggleContainer}>
            <Text style={styles.inputLabel}>Create as Group Event</Text>
            <Switch
              trackColor={{ false: "#cbd5e0", true: "#90cdf4" }}
              thumbColor={isGroupEvent ? "#2c5282" : "#a0aec0"}
              onValueChange={setIsGroupEvent}
              value={isGroupEvent}
            />
          </View>
          
          {isGroupEvent && (
            <View style={styles.groupSelectionContainer}>
              <Text style={styles.groupSelectionLabel}>Select a Group:</Text>
              {userGroups.map(group => (
                <TouchableOpacity 
                  key={group.id}
                  style={[
                    styles.groupOption,
                    selectedGroup?.id === group.id && styles.groupOptionSelecte