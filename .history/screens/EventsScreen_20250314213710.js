import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const events = [
  {
    id: '1',
    title: 'Sunday Service',
    date: 'June 12, 2023',
    time: '9:00 AM - 11:00 AM',
    location: 'Main Sanctuary',
    description: 'Join us for our weekly Sunday service with worship, prayer, and a message from Pastor Johnson.',
    day: '12',
    month: 'JUN',
  },
  {
    id: '2',
    title: 'Bible Study',
    date: 'June 15, 2023',
    time: '7:00 PM - 8:30 PM',
    location: 'Fellowship Hall',
    description: 'Dive deeper into God\'s Word with our weekly Bible study. This week we\'ll be studying the book of Romans.',
    day: '15',
    month: 'JUN',
  },
  {
    id: '3',
    title: 'Youth Group',
    date: 'June 17, 2023',
    time: '6:00 PM - 8:00 PM',
    location: 'Youth Center',
    description: 'A fun evening for teenagers with games, worship, and a relevant message.',
    day: '17',
    month: 'JUN',
  },
  {
    id: '4',
    title: 'Prayer Meeting',
    date: 'June 20, 2023',
    time: '7:00 PM - 8:00 PM',
    location: 'Prayer Room',
    description: 'Join us as we gather to pray for our church, community, and world.',
    day: '20',
    month: 'JUN',
  },
  {
    id: '5',
    title: 'Community Outreach',
    date: 'June 24, 2023',
    time: '10:00 AM - 1:00 PM',
    location: 'Community Center',
    description: 'Help us serve our community by distributing food and supplies to those in need.',
    day: '24',
    month: 'JUN',
  },
];

const EventsScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const filters = ['All', 'This Week', 'This Month', 'Upcoming'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Events</Text>
        <TouchableOpacity style={styles.calendarButton}>
          <Ionicons name="calendar" size={24} color="#2c5282" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.filterTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {events.map(event => (
          <TouchableOpacity key={event.id} style={styles.eventCard}>
            <View style={styles.eventDateBadge}>
              <Text style={styles.eventDateDay}>{event.day}</Text>
              <Text style={styles.eventDateMonth}>{event.month}</Text>
            </View>
            <View style={styles.eventDetails}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <View style={styles.eventInfo}>
                <Ionicons name="time-outline" size={14} color="#666" />
                <Text style={styles.eventInfoText}>{event.time}</Text>
              </View>
              <View style={styles.eventInfo}>
                <Ionicons name="location-outline" size={14} color="#666" />
                <Text style={styles.eventInfoText}>{event.location}</Text>
              </View>
              <Text style={styles.eventDescription} numberOfLines={2}>
                {event.description}
              </Text>
              <TouchableOpacity style={styles.registerButton}>
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
        
        {/* Bottom padding to account for the floating tab bar */}
        <View style={{height: 100}} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  calendarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterButtonActive: {
    backgroundColor: '#8eda8e',
  },
  filterText: {
    color: '#666',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#2c5282',
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 5,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventDateBadge: {
    width: 60,
    height: 70,
    backgroundColor: '#8eda8e',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  eventDateDay: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  eventDateMonth: {
    fontSize: 14,
    color: '#2c5282',
    fontWeight: '600',
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c5282',
    marginBottom: 8,
  },
  eventInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventInfoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  eventDescription: {
    fontSize: 14,
    color: '#444',
    marginTop: 5,
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: '#8eda8e',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  registerButtonText: {
    color: '#2c5282',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default EventsScreen;