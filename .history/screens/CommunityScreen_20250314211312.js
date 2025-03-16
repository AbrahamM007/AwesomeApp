import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CommunityScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Church Groups</Text>
        
        <TouchableOpacity style={styles.groupCard}>
          <Image 
            source={require('../assets/youth-group.jpg')} 
            style={styles.groupImage}
            resizeMode="cover"
          />
          <View style={styles.groupInfo}>
            <Text style={styles.groupName}>Youth Group</Text>
            <Text style={styles.groupMembers}>24 members</Text>
            <View style={styles.groupButton}>
              <Text style={styles.groupButtonText}>Join</Text>
            </View>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.groupCard}>
          <Image 
            source={require('../assets/worship-team.jpg')} 
            style={styles.groupImage}
            resizeMode="cover"
          />
          <View style={styles.groupInfo}>
            <Text style={styles.groupName}>Worship Team</Text>
            <Text style={styles.groupMembers}>12 members</Text>
            <View style={styles.groupButton}>
              <Text style={styles.groupButtonText}>Join</Text>
            </View>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.groupCard}>
          <Image 
            source={require('../assets/bible-study.jpg')} 
            style={styles.groupImage}
            resizeMode="cover"
          />
          <View style={styles.groupInfo}>
            <Text style={styles.groupName}>Bible Study</Text>
            <Text style={styles.groupMembers}>18 members</Text>
            <View style={styles.groupButton}>
              <Text style={styles.groupButtonText}>Join</Text>
            </View>
          </View>
        </TouchableOpacity>
        
        <Text style={styles.sectionTitle}>Upcoming Meetings</Text>
        
        <View style={styles.meetingCard}>
          <View style={styles.meetingHeader}>
            <Text style={styles.meetingTitle}>Youth Group Meeting</Text>
            <Text style={styles.meetingDate}>Friday, June 16</Text>
          </View>
          <View style={styles.meetingDetails}>
            <View style={styles.meetingInfo}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.meetingInfoText}>7:00 PM - 9:00 PM</Text>
            </View>
            <View style={styles.meetingInfo}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text style={styles.meetingInfoText}>Youth Room</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.attendButton}>
            <Text style={styles.attendButtonText}>I'll Attend</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c5282',
    marginBottom: 15,
    marginTop: 10,
  },
  groupCard: {
    backgroundColor: '#fffde7',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  groupImage: {
    width: 100,
    height: 100,
  },
  groupInfo: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  groupName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  groupMembers: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  groupButton: {
    backgroundColor: '#8eda8e',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  groupButtonText: {
    color: '#2c5282',
    fontWeight: '600',
  },
  meetingCard: {
    backgroundColor: '#fffde7',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  meetingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  meetingDate: {
    fontSize: 14,
    color: '#2c5282',
    fontWeight: '500',
  },
  meetingDetails: {
    marginBottom: 15,
  },
  meetingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  meetingInfoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  attendButton: {
    backgroundColor: '#8eda8e',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'center',
  },
  attendButtonText: {
    color: '#2c5282',
    fontWeight: '600',
  },
});

export default CommunityScreen;