import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerTitle}>Home</Text>
        
        {/* Live Stream Card */}
        <View style={styles.liveCard}>
          <View style={styles.liveContent}>
            {/* This would be your video player component */}
          </View>
          <View style={styles.liveFooter}>
            <View>
              <Text style={styles.liveText}>LIVE</Text>
              <Text style={styles.liveSubtext}>Started at 9:00</Text>
            </View>
            <TouchableOpacity style={styles.playButton}>
              <Ionicons name="play" size={24} color="#2c5282" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Navigation Icons */}
        <View style={styles.navIcons}>
          <TouchableOpacity style={styles.navItem}>
            <View style={styles.iconCircle}>
              <FontAwesome5 name="tv" size={24} color="#2c5282" />
            </View>
            <Text style={styles.navText}>Watch</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem}>
            <View style={styles.iconCircle}>
              <FontAwesome5 name="book-open" size={24} color="#2c5282" />
            </View>
            <Text style={styles.navText}>Bible</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem}>
            <View style={styles.iconCircle}>
              <FontAwesome5 name="map-marker-alt" size={24} color="#2c5282" />
            </View>
            <Text style={styles.navText}>Location</Text>
          </TouchableOpacity>
        </View>
        
        {/* Prayer Request Button */}
        <TouchableOpacity style={styles.prayerButton}>
          <Text style={styles.prayerButtonText}>Send Prayer Request</Text>
          <FontAwesome5 name="comment" size={20} color="#2c5282" />
        </TouchableOpacity>
        
        {/* Events Section */}
        <Text style={styles.sectionTitle}>Events</Text>
        <View style={styles.eventsContainer}>
          <View style={styles.eventCard}></View>
          <View style={styles.eventCard}></View>
        </View>
      </ScrollView>
      
      {/* Bottom Tab Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
          <FontAwesome5 name="home" size={20} color="#2c5282" />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <FontAwesome5 name="tv" size={20} color="#2c5282" />
          <Text style={styles.tabText}>Watch</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <FontAwesome5 name="th-large" size={20} color="#2c5282" />
          <Text style={styles.tabText}>Apps</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <FontAwesome5 name="user" size={20} color="#2c5282" />
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
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
  liveCard: {
    backgroundColor: '#fffde7', // Light cream color
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  liveContent: {
    height: 150,
    backgroundColor: '#fffde7',
  },
  liveFooter: {
    backgroundColor: '#8eda8e', // Green footer
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  liveText: {
    color: '#ff4757', // Red text for LIVE
    fontWeight: 'bold',
    fontSize: 16,
  },
  liveSubtext: {
    color: '#2c5282',
    fontSize: 14,
  },
  playButton: {
    backgroundColor: '#8eda8e',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  navIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  navItem: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8eda8e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  navText: {
    color: '#2c5282',
    fontSize: 16,
    fontWeight: '500',
  },
  prayerButton: {
    backgroundColor: '#8eda8e',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  prayerButtonText: {
    color: '#2c5282',
    fontSize: 18,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c5282',
    marginBottom: 15,
  },
  eventsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventCard: {
    backgroundColor: '#fffde7',
    borderRadius: 15,
    width: '48%',
    height: 100,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
    paddingVertical: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#8eda8e',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  tabText: {
    fontSize: 12,
    color: '#2c5282',
    marginTop: 4,
  },
});

export default HomeScreen;