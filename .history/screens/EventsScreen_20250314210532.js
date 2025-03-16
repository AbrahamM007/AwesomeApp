import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Modal, TextInput, Alert } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EventsScreen = () => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventTime, setNewEventTime] = useState('');
  const [newEventLocation, setNewEventLocation] = useState('');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const savedEvents = await AsyncStorage.getItem('churchEvents');
      if (savedEvents !== null) {
        setEvents(JSON.parse(savedEvents));
      } else {
        // Default events if none are saved
        const defaultEvents = [
          {
            id: '1',
            title: 'Sunday Service',
            date: 'Sunday, June 12',
            time: '9:00 AM - 11:00 AM',
            location: 'Main Sanctuary'
          },
          {
            id: '2',
            title: 'Bible Study',
            date: 'Wednesday, June 15',
            time: '7:00 PM - 8:30 PM',
            location: 'Fellowship Hall'
          }
        ];
        await AsyncStorage.setItem('churchEvents', JSON.stringify(defaultEvents));
        setEvents(defaultEvents);
      }
    } catch (error) {
      console.error('Failed to load events:', error);
    }
  };

  const saveEvent = async () => {
    if (!newEventTitle || !newEventDate || !newEventTime || !newEventLocation) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const newEvent = {
        id: Date.now().toString(),
        title: newEventTitle,
        date: newEventDate,
        time: newEventTime,
        location: newEventLocation
      };

      const updatedEvents = [...events, newEvent];
      await AsyncStorage.setItem('churchEvents', JSON.stringify(updatedEvents));
      setEvents(updatedEvents);
      setModalVisible(false);
      resetForm();
    } catch (error) {
      console.error('Failed to save event:', error);
      Alert.alert('Error', 'Failed to save event. Please try again.');
    }
  };

  const resetForm = () => {
    setNewEventTitle('');
    setNewEventDate('');
    setNewEventTime('');
    setNewEventLocation('');
  };

  const deleteEvent = async (id) => {
    try {
      const updatedEvents = events.filter(event => event.id !== id);
      await AsyncStorage.setItem('churchEvents', JSON.stringify(updatedEvents));
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Failed to delete event:', error);
      Alert.alert('Error', 'Failed to delete event. Please try again.');
    }
  };

  const renderDateIcon = (date) => {
    const parts = date.split(', ');
    const day = parts[1].split(' ')[1];
    const month = parts[1].split(' ')[0].substring(0, 3).toUpperCase();
    
    return (
      <View style={styles.eventDateBadge}>
        <Text style={styles.eventDateDay}>{day}</Text>
        <Text style={styles.eventDateMonth}>{month}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Church Events</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {events.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            {renderDateIcon(event.date)}
            <View style={styles.eventDetails}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <View style={styles.eventInfo}>
                <Ionicons name="calendar-outline" size={14} color="#666" />
                <Text style={styles.eventInfoText}>{event.date}</Text>
              </View>
              <View style={styles.eventInfo}>
                <Ionicons name="time-outline" size={14} color="#666" />
                <Text style={styles.eventInfoText}>{event.time}</Text>
              </View>
              <View style={styles.eventInfo}>
                <Ionicons name="location-outline" size={14} color="#666" />
                <Text style={styles.eventInfoText}>{event.location}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => deleteEvent(event.id)}
            >
              <Ionicons name="trash-outline" size={18} color="#ff4757" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          resetForm();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>New Event</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Event Title</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter event title"
                value={newEventTitle}
                onChangeText={setNewEventTitle}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Date (e.g., Sunday, June 12)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter date"
                value={newEventDate}
                onChangeText={setNewEventDate}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Time (e.g., 9:00 AM - 11:00 AM)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter time"
                value={newEventTime}
                onChangeText={setNewEventTime}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter location"
                value={newEventLocation}
                onChangeText={setNewEventLocation}
              />
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  resetForm();
                }}
              >
                <Text style={styles.buttonCancelText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.buttonSave]}
                onPress={saveEvent}
              >
                <Text style={styles.buttonSaveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4f5c9',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100, // Extra space for the floating button
  },
  eventCard: {
    backgroundColor: '#fffde7',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  eventDateBadge: {
    width: 50,
    height: 60,
    backgroundColor: '#e6f7ff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  eventDateDay: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  eventDateMonth: {
    fontSize: 12,
    color: '#2c5282',
    fontWeight: '600',
  },
  eventDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  eventInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventInfoText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  deleteButton: {
    padding: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2c5282',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c5282',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    borderRadius: 10,
    padding: 12,
    width: '48%',
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: '#f5f5f5',
  },
  buttonCancelText: {
    color: '#666',
    fontWeight: '600',
  },
  buttonSave: {
    backgroundColor: '#8eda8e',
  },
  buttonSaveText: {
    color: '#2c5282',
    fontWeight: '600',
  },
});

export default EventsScreen;