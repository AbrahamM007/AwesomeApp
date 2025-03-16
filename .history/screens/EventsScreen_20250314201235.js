import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Modal, TextInput } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EventsScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventTime, setNewEventTime] = useState('');
  const [newEventLocation, setNewEventLocation] = useState('');
  
  // Load events from storage when component mounts
  useEffect(() => {
    loadEvents();
  }, []);
  
  // Save events to AsyncStorage
  const saveEvents = async (updatedEvents) => {
    try {
      await AsyncStorage.setItem('userEvents', JSON.stringify(updatedEvents));
    } catch (error) {
      console.error('Error saving events:', error);
    }
  };
  
  // Load events from AsyncStorage
  const loadEvents = async () => {
    try {
      const savedEvents = await AsyncStorage.getItem('userEvents');
      if (savedEvents) {
        setEvents(JSON.parse(savedEvents));
      }
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };
  
  const addEvent = () => {
    if (newEventTitle.trim() && newEventDate.trim()) {
      const newEvent = {
        id: Date.now().toString(),
        title: newEventTitle,
        date: newEventDate,
        time: newEventTime,
        location: newEventLocation
      };
      
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      saveEvents(updatedEvents);
      
      // Reset form and close modal
      setNewEventTitle('');
      setNewEventDate('');
      setNewEventTime('');
      setNewEventLocation('');
      setModalVisible(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header and calendar sections remain the same */}
      
      <ScrollView style={styles.eventsContainer}>
        {events.length > 0 ? (
          events.map((event) => (
            <TouchableOpacity key={event.id} style={styles.eventCard}>
              <View style={styles.eventDateContainer}>
                <FontAwesome5 name="calendar-alt" size={24} color="#2c5282" />
                <Text style={styles.eventDate}>{event.date}</Text>
              </View>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <View style={styles.eventDetails}>
                <View style={styles.eventDetailItem}>
                  <Ionicons name="time-outline" size={16} color="#2c5282" />
                  <Text style={styles.eventDetailText}>{event.time}</Text>
                </View>
                <View style={styles.eventDetailItem}>
                  <Ionicons name="location-outline" size={16} color="#2c5282" />
                  <Text style={styles.eventDetailText}>{event.location}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyText}>No events added yet. Tap + to add one.</Text>
        )}
      </ScrollView>
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
      
      {/* Add Event Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Event</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Event Title"
              value={newEventTitle}
              onChangeText={setNewEventTitle}
              placeholderTextColor="#2c5282"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Date (e.g., Sunday, June 12)"
              value={newEventDate}
              onChangeText={setNewEventDate}
              placeholderTextColor="#2c5282"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Time (e.g., 9:00 AM - 11:00 AM)"
              value={newEventTime}
              onChangeText={setNewEventTime}
              placeholderTextColor="#2c5282"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={newEventLocation}
              onChangeText={setNewEventLocation}
              placeholderTextColor="#2c5282"
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={addEvent}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// Add these styles to the existing styles
const additionalStyles = {
  emptyText: {
    textAlign: 'center',
    color: '#2c5282',
    fontSize: 16,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#d4f5c9',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c5282',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fffde7',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    color: '#2c5282',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    borderRadius: 10,
    padding: 15,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#fffde7',
  },
  saveButton: {
    backgroundColor: '#2c5282',
  },
  cancelButtonText: {
    color: '#2c5282',
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4f5c9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#8eda8e',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2c5282',
  },
  menuButton: {
    padding: 5,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#8eda8e',
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 15,
  },
  monthText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c5282',
  },
  calendarControls: {
    flexDirection: 'row',
  },
  calendarButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#d4f5c9',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  eventsContainer: {
    flex: 1,
    padding: 15,
  },
  eventCard: {
    backgroundColor: '#fffde7',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  eventDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  eventDate: {
    fontSize: 16,
    color: '#2c5282',
    marginLeft: 10,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c5282',
    marginBottom: 10,
  },
  eventDetails: {
    marginTop: 5,
  },
  eventDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventDetailText: {
    fontSize: 14,
    color: '#2c5282',
    marginLeft: 10,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2c5282',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default EventsScreen;