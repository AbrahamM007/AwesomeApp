import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerTitle}>Profile</Text>
        
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image 
            source={require('../assets/profile-placeholder.jpg')} 
            style={styles.profileImage}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>User Name</Text>
            <Text style={styles.userBio}>This is the space for the user bio</Text>
          </View>
        </View>
        
        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#2c5282" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="information-circle" size={24} color="#2c5282" />
          </TouchableOpacity>
        </View>
        
        {/* My Ministries Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>My Ministries</Text>
          <View style={styles.ministryCards}>
            <View style={styles.ministryCard}>
              {/* Ministry content would go here */}
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.ministryCard}>
            {/* Another ministry card */}
          </View>
        </View>
        
        {/* My Events Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>My Events</Text>
          <View style={styles.eventsGrid}>
            <View style={styles.eventCard}></View>
            <View style={styles.eventCard}></View>
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c5282',
    marginBottom: 5,
  },
  userBio: {
    fontSize: 16,
    color: '#2c5282',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: '#8eda8e',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c5282',
    marginBottom: 15,
  },
  ministryCards: {
    position: 'relative',
    marginBottom: 15,
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
    backgroundColor: '#2c5282',
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
  eventsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventCard: {
    backgroundColor: '#fffde7',
    borderRadius: 20,
    width: '48%',
    height: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default ProfileScreen;