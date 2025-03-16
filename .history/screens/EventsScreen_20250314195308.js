import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const EventsScreen = ({ navigation }) => {
  const events = [
    {
      id: 1,
      title: 'Sunday Service',
      date: 'Sunday, June 12',
      time: '9:00 AM - 11:00 AM',
      location: 'Main Sanctuary'
    },
    {
      id: 2,
      title: 'Youth Group',
      date: 'Wednesday, June 15',
      time: '6:30 PM - 8:00 PM',
      location: 'Youth Center'
    },
    {
      id: 3,
      title: 'Bible Study',
      date: 'Thursday, June 16',
      time: '7:00 PM - 8:30 PM',
      location: 'Fellowship Hall'
    },
    {
      id: 4,
      title: 'Community Outreach',
      date: 'Saturday, June 18',
      time: '10:00 AM - 2:00 PM',
      location: 'Downtown Area'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#2c5282" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Events</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#2c5282" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.calendarHeader}>
        <Text style={styles.monthText}>June 2023</Text>
        <View style={styles.calendarControls}>
          <TouchableOpacity style={styles.calendarButton}>
            <Ionicons name="chevron-back" size={20} color="#2c5282" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.calendarButton}>
            <Ionicons name="chevron-forward" size={20} color="#2c5282" />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.eventsContainer}>
        {events.map((event) => (
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
        ))}
      </ScrollView>
      
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
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