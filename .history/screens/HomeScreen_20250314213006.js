import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerTitle}>Home</Text>
        
        {/* Live Stream Card */}
        <View style={styles.liveCard}>
          <View 
            style={[styles.liveContent, {backgroundColor: '#8eda8e'}]} 
          />
          <View
            style={[styles.liveOverlay, {backgroundColor: 'rgba(0,0,0,0.4)'}]}
          />
          <View style={styles.liveFooter}>
            <View>
              <Text style={styles.liveText}>LIVE</Text>
              <Text style={styles.liveSubtext}>Sunday Service</Text>
            </View>
            <TouchableOpacity style={styles.playButton}>
              <Ionicons name="play" size={24} color="#2c5282" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Quick Access Icons - Updated to match mockup */}
        <View style={styles.quickAccessContainer}>
          <TouchableOpacity style={styles.quickAccessItem} onPress={() => navigation.navigate('Watch')}>
            <View style={styles.iconCircle}>
              <FontAwesome5 name="tv" size={24} color="#2c5282" />
            </View>
            <Text style={styles.quickAccessText}>Watch</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAccessItem}>
            <View style={styles.iconCircle}>
              <FontAwesome5 name="bible" size={24} color="#2c5282" />
            </View>
            <Text style={styles.quickAccessText}>Bible</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAccessItem}>
            <View style={styles.iconCircle}>
              <Ionicons name="location-outline" size={24} color="#2c5282" />
            </View>
            <Text style={styles.quickAccessText}>Location</Text>
          </TouchableOpacity>
        </View>
        
        {/* Prayer Request Button - Updated to match mockup */}
        <TouchableOpacity 
          style={styles.prayerButton}
          onPress={() => navigation.navigate('PrayerRequest')}
        >
          <Text style={styles.prayerButtonText}>Send Prayer Request</Text>
          <Ionicons name="arrow-forward" size={20} color="#2c5282" />
        </TouchableOpacity>
        
        {/* Events Section */}
        <View style={styles.eventsHeader}>
          <Text style={styles.sectionTitle}>Events</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Events')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.eventsContainer}>
          <TouchableOpacity style={styles.eventCard}>
            <View style={styles.eventDateBadge}>
              <Text style={styles.eventDateDay}>12</Text>
              <Text style={styles.eventDateMonth}>JUN</Text>
            </View>
            <View style={styles.eventDetails}>
              <Text style={styles.eventTitle}>Sunday Service</Text>
              <View style={styles.eventInfo}>
                <Ionicons name="time-outline" size={14} color="#666" />
                <Text style={styles.eventInfoText}>9:00 AM - 11:00 AM</Text>
              </View>
              <View style={styles.eventInfo}>
                <Ionicons name="location-outline" size={14} color="#666" />
                <Text style={styles.eventInfoText}>Main Sanctuary</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        
        {/* Space at bottom for tab bar */}
        <View style={{height: 80}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4f5c9', // Light green background matching mockup
  },
  scrollContainer: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c5282', // Dark blue color
    marginVertical: 20,
  },
  liveCard: {
    backgroundColor: '#fffde7',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 180,
  },
  liveContent: {
    height: 180,
    width: '100%',
  },
  liveOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  liveFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  liveText: {
    color: '#ff4757',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  liveSubtext: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  playButton: {
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  quickAccessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  quickAccessItem: {
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  quickAccessText: {
    color: '#2c5282',
    fontSize: 14,
    fontWeight: '500',
  },
  prayerButton: {
    backgroundColor: '#8eda8e',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  prayerButtonText: {
    color: '#2c5282',
    fontSize: 16,
    fontWeight: '600',
  },
  eventsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  seeAllText: {
    color: '#2c5282',
    fontWeight: '600',
  },
  eventsContainer: {
    marginBottom: 20,
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
});

export default HomeScreen;

// In your HomeScreen.js, update the navigation icons section:

{/* Navigation Icons */}
<View style={styles.navIcons}>
  <TouchableOpacity 
    style={styles.navItem}
    onPress={() => navigation.navigate('WatchScreen')}
  >
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
  
  <TouchableOpacity 
    style={styles.navItem}
    onPress={() => navigation.navigate('Ministries')}
  >
    <View style={styles.iconCircle}>
      <FontAwesome5 name="map-marker-alt" size={24} color="#2c5282" />
    </View>
    <Text style={styles.navText}>Location</Text>
  </TouchableOpacity>
</View>

{/* Prayer Request Button */}
<TouchableOpacity 
  style={styles.prayerButton}
  onPress={() => navigation.navigate('PrayerRequest')}
>
  <Text style={styles.prayerButtonText}>Send Prayer Request</Text>
  <FontAwesome5 name="comment" size={20} color="#2c5282" />
</TouchableOpacity>