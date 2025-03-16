import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Modal } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MinistryScreen = ({ navigation }) => {
  const [ministries, setMinistries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newMinistryName, setNewMinistryName] = useState('');
  const [newMinistryDescription, setNewMinistryDescription] = useState('');
  
  // Load ministries from storage when component mounts
  useEffect(() => {
    loadMinistries();
  }, []);
  
  // Save ministries to AsyncStorage
  const saveMinistries = async (updatedMinistries) => {
    try {
      await AsyncStorage.setItem('userMinistries', JSON.stringify(updatedMinistries));
    } catch (error) {
      console.error('Error saving ministries:', error);
    }
  };
  
  // Load ministries from AsyncStorage
  const loadMinistries = async () => {
    try {
      const savedMinistries = await AsyncStorage.getItem('userMinistries');
      if (savedMinistries) {
        setMinistries(JSON.parse(savedMinistries));
      }
    } catch (error) {
      console.error('Error loading ministries:', error);
    }
  };
  
  const addMinistry = () => {
    if (newMinistryName.trim()) {
      const newMinistry = {
        id: Date.now().toString(),
        name: newMinistryName,
        description: newMinistryDescription,
        date: new Date().toLocaleDateString()
      };
      
      const updatedMinistries = [...ministries, newMinistry];
      setMinistries(updatedMinistries);
      saveMinistries(updatedMinistries);
      
      // Reset form and close modal
      setNewMinistryName('');
      setNewMinistryDescription('');
      setModalVisible(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerTitle}>My Ministries</Text>
        
        {/* Ministry Icon */}
        <View style={styles.iconContainer}>
          <FontAwesome5 name="church" size={50} color="#2c5282" />
        </View>
        
        {/* My Ministries Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Ministries</Text>
          <View style={styles.ministryCards}>
            {ministries.length > 0 ? (
              ministries.map(ministry => (
                <View key={ministry.id} style={styles.ministryCard}>
                  <Text style={styles.ministryName}>{ministry.name}</Text>
                  <Text style={styles.ministryDescription}>{ministry.description}</Text>
                  <Text style={styles.ministryDate}>Added: {ministry.date}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>No ministries added yet. Tap + to add one.</Text>
            )}
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setModalVisible(true)}
            >
              <Ionicons name="add" size={24} color="#2c5282" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Add Ministry Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New Ministry</Text>
              
              <TextInput
                style={styles.input}
                placeholder="Ministry Name"
                value={newMinistryName}
                onChangeText={setNewMinistryName}
                placeholderTextColor="#2c5282"
              />
              
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Description"
                value={newMinistryDescription}
                onChangeText={setNewMinistryDescription}
                placeholderTextColor="#2c5282"
                multiline
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
                  onPress={addMinistry}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        
        {/* Rest of the component remains the same */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>People</Text>
          <View style={styles.peopleContainer}>
            <View style={styles.peopleRow}>
              <View style={styles.personCircle}></View>
              <View style={styles.personCircle}></View>
              <View style={styles.personCircle}></View>
              <View style={styles.personCircle}></View>
              <View style={styles.personCircle}></View>
              <View style={styles.personCircle}></View>
            </View>
            <TouchableOpacity style={styles.addButtonPeople}>
              <Ionicons name="add" size={24} color="#2c5282" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Ministry Events Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ministry Events</Text>
          <View style={styles.eventsContainer}>
            <View style={styles.eventCard}></View>
            <View style={styles.eventCard}></View>
            <TouchableOpacity style={styles.addButtonEvents}>
              <Ionicons name="add" size={24} color="#2c5282" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4f5c9', // Light green background
  },
  scrollContainer: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c5282', // Dark blue color
    textAlign: 'center',
    marginVertical: 20,
  },
  iconContainer: {
    backgroundColor: '#8eda8e',
    width: 120,
    height: 120,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8eda8e',
    marginBottom: 15,
  },
  ministryCards: {
    position: 'relative',
  },
  ministryCard: {
    backgroundColor: '#fffde7',
    borderRadius: 20,
    height: 100,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  addButton: {
    position: 'absolute',
    right: 10,
    top: -15,
    backgroundColor: '#8eda8e',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  peopleContainer: {
    position: 'relative',
  },
  peopleRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  personCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  addButtonPeople: {
    position: 'absolute',
    right: 10,
    top: 5,
    backgroundColor: '#8eda8e',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  eventsContainer: {
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  eventCard: {
    backgroundColor: '#fffde7',
    borderRadius: 20,
    width: '48%',
    height: 100,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  addButtonEvents: {
    position: 'absolute',
    right: 10,
    top: -15,
    backgroundColor: '#8eda8e',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default MinistryScreen;