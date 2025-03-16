import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
// Remove this import if it exists
// import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerTitle}>Home</Text>
        
        {/* Live Stream Card */}
        <View style={styles.liveCard}>
          {/* Replace the Image with a View until you have the actual image */}
          <View 
            style={[styles.liveContent, {backgroundColor: '#8eda8e'}]} 
          />
          {/* Replace LinearGradient with View */}
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
        
        {/* Daily Verse */}
        <View style={styles.verseContainer}>
          <Text style={styles.verseTitle}>Daily Verse</Text>
          <View style={styles.verseCard}>
            <Text style={styles.verseText}>
              "For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future."
            </Text>
            <Text style={styles.verseReference}>Jeremiah 29:11</Text>
            <TouchableOpacity style={styles.shareButton}>
              <Ionicons name="share-social-outline" size={18} color="#2c5282" />
              <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Events Section */}
        <View style={styles.eventsHeader}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
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
          
          <TouchableOpacity style={styles.eventCard}>
            <View style={styles.eventDateBadge}>
              <Text style={styles.eventDateDay}>15</Text>
              <Text style={styles.eventDateMonth}>JUN</Text>
            </View>
            <View style={styles.eventDetails}>
              <Text style={styles.eventTitle}>Bible Study</Text>
              <View style={styles.eventInfo}>
                <Ionicons name="time-outline" size={14} color="#666" />
                <Text style={styles.eventInfoText}>7:00 PM - 8:30 PM</Text>
              </View>
              <View style={styles.eventInfo}>
                <Ionicons name="location-outline" size={14} color="#666" />
                <Text style={styles.eventInfoText}>Fellowship Hall</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        
        {/* Announcements */}
        <Text style={styles.sectionTitle}>Announcements</Text>
        <View style={styles.announcementCard}>
          <View style={styles.announcementHeader}>
            <FontAwesome5 name="bullhorn" size={18} color="#2c5282" />
            <Text style={styles.announcementTitle}>Youth Camp Registration</Text>
          </View>
          <Text style={styles.announcementText}>
            Registration for our summer youth camp is now open! Sign up before June 20th to secure your spot.
          </Text>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Register Now</Text>
          </TouchableOpacity>
        </View>
        
        {/* Space at bottom */}
        <View style={{height: 20}} />
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
    height: 200,
  },
  liveContent: {
    height: 200,
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
    color: '#ff4757', // Red text for LIVE
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  prayerButtonText: {
    color: '#2c5282',
    fontSize: 18,
    fontWeight: '600',
  },
  verseContainer: {
    marginBottom: 30,
  },
  verseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c5282',
    marginBottom: 10,
  },
  verseCard: {
    backgroundColor: '#fffde7',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  verseText: {
    fontSize: 16,
    color: '#333',
    fontStyle: 'italic',
    lineHeight: 24,
  },
  verseReference: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    alignSelf: 'flex-end',
  },
  shareText: {
    color: '#2c5282',
    marginLeft: 5,
    fontWeight: '500',
  },
  eventsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c5282',
    marginBottom: 15,
  },
  seeAllText: {
    color: '#2c5282',
    fontWeight: '600',
  },
  eventsContainer: {
    marginBottom: 30,
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
  announcementCard: {
    backgroundColor: '#fffde7',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  announcementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c5282',
    marginLeft: 10,
  },
  announcementText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  registerButton: {
    backgroundColor: '#8eda8e',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
    marginTop: 15,
  },
  registerButtonText: {
    color: '#2c5282',
    fontWeight: '600',
  },
});

export default HomeScreen;