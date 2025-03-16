import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const MinistryScreen = () => {
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
            <View style={styles.ministryCard}>
              {/* Ministry content would go here */}
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add" size={24} color="#2c5282" />
            </TouchableOpacity>
          </View>
          <View style={styles.ministryCard}>
            {/* Another ministry card */}
          </View>
        </View>
        
        {/* People Section */}
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