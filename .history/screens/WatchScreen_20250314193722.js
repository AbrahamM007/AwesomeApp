import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const WatchScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerTitle}>Watch</Text>
        
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
        
        {/* Video Grid */}
        <View style={styles.videoGrid}>
          <View style={styles.videoRow}>
            <TouchableOpacity style={styles.videoCard}></TouchableOpacity>
            <TouchableOpacity style={styles.videoCard}></TouchableOpacity>
          </View>
          
          <View style={styles.videoRow}>
            <TouchableOpacity style={styles.videoCard}></TouchableOpacity>
            <TouchableOpacity style={styles.videoCard}></TouchableOpacity>
          </View>
          
          <View style={styles.videoRow}>
            <TouchableOpacity style={styles.videoCard}></TouchableOpacity>
            <TouchableOpacity style={styles.videoCard}></TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Tab Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <FontAwesome5 name="home" size={20} color="#2c5282" />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
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
  videoGrid: {
    marginTop: 10,
  },
  videoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  videoCard: {
    backgroundColor: '#fffde7',
    borderRadius: 15,
    width: '48%',
    height: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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

export default WatchScreen;