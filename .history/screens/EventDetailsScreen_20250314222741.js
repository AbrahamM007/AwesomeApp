import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const EventDetailsScreen = ({ route, navigation }) => {
  const { eventId } = route.params;
  const { userInfo } = useAuth();
  const [isAttending, setIsAttending] = useState(false);
  
  // Mock data for the event
  const event = {
    id: eventId,
    title: 'Summer Retreat',
    description: 'Join us for our annual summer retreat at Mountain View Retreat Center. This year\'s theme is "Renewed Spirit" and we\'ll focus on spiritual renewal and community building. Activities include worship sessions, small group discussions, outdoor activities, and plenty of time for reflection and fellowship.',
    date: 'July 21-23, 2023',
    time: 'Starts Friday at 4:00 PM, ends Sunday at 2:00 PM',
    location: 'Mountain View Retreat Center',
    address: '1234 Mountain Road, Pine Valley, CA 92123',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    organizer: 'Young Adults Ministry',
    cost: '$150 per person (scholarships available)',
    attendees: 28,
    capacity: 50,
    isAdmin: userInfo?.role === 'admin',
    details: [
      {
        title: 'What to Bring',
        content: 'Bible, notebook, pen, comfortable clothes, hiking shoes, toiletries, sleeping bag or bedding for a twin bed, pillow, towel, flashlight, and any necessary medications.'
      },
      {
        title: 'Transportation',
        content: 'Carpooling will be available. Please indicate if you need a ride or can offer rides to others when you register.'
      },
      {
        title: 'Schedule',
        content: 'A detailed schedule will be emailed to all registered participants one week before the event.'
      }
    ]
  };
  
  const handleAttendance = () => {
    if (isAttending) {
      Alert.alert(
        'Cancel Attendance',
        'Are you sure you want to cancel your attendance to this event?',
        [
          {
            text: 'No',
            style: 'cancel'
          },
          {
            text: 'Yes',
            onPress: () => {
              setIsAttending(false);
              // In a real app, you would update the backend here
            }
          }
        ]
      );
    } else {
      setIsAttending(true);
      // In a real app, you would update the backend here
    }
  };
  
  const handleShare = () => {
    // In a real app, you would implement sharing functionality here
    Alert.alert('Share', 'Sharing functionality would be implemented here');
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={20} color="#2c5282" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Event Details</Text>
        {event.isAdmin && (
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.navigate('EditEvent', { eventId: event.id })}
          >
            <FontAwesome5 name="edit" size={20} color="#2c5282" />
          </TouchableOpacity>
        )}
      </View>
      
      <ScrollView style={styles.container}>
        <Image source={{ uri: event.image }} style={styles.eventImage} />
        
        <View style={styles.contentContainer}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          
          <View style={styles.organizerContainer}>
            <Text style={styles.organizerLabel}>Organized by:</Text>
            <Text style={styles.organizerName}>{event.organizer}</Text>
          </View>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <FontAwesome5 name="calendar-alt" size={18} color="#2c5282" style={styles.detailIcon} />
              <Text style={styles.detailText}>{event.date}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <FontAwesome5 name="clock" size={18} color="#2c5282" style={styles.detailIcon} />
              <Text style={styles.detailText}>{event.time}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <FontAwesome5 name="map-marker-alt" size={18} color="#2c5282" style={styles.detailIcon} />
              <View style={styles.locationContainer}>
                <Text style={styles.detailText}>{event.location}</Text>
                <Text style={styles.addressText}>{event.address}</Text>
              </View>
            </View>
            
            <View style={styles.detailItem}>
              <FontAwesome5 name="dollar-sign" size={18} color="#2c5282" style={styles.detailIcon} />
              <Text style={styles.detailText}>{event.cost}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <FontAwesome5 name="users" size={18} color="#2c5282" style={styles.detailIcon} />
              <Text style={styles.detailText}>
                {event.attendees} attending · {event.capacity - event.attendees} spots left
              </Text>
            </View>
          </View>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>About this event</Text>
            <Text style={styles.descriptionText}>{event.description}</Text>
          </View>
          
          {event.details.map((detail, index) => (
            <View key={index} style={styles.infoSection}>
              <Text style={styles.sectionTitle}>{detail.title}</Text>
              <Text style={styles.infoText}>{detail.content}</Text>
            </View>
          ))}
          
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity 
              style={[
                styles.attendButton,
                isAttending && styles.cancelButton
              ]}
              onPress={handleAttendance}
            >
              <FontAwesome5 
                name={isAttending ? "calendar-times" : "calendar-check"} 
                size={18} 
                color="#fff" 
              />
              <Text style={styles.attendButtonText}>
                {isAttending ? "Cancel Attendance" : "Attend Event"}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.shareButton}
              onPress={handleShare}
            >
              <FontAwesome5 name="share-alt" size={18} color="#2c5282" />
              <Text style={styles.shareButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
          
          {event.isAdmin && (
            <TouchableOpacity 
              style={styles.adminButton}
              onPress={() => navigation.navigate('ManageAttendees', { eventId: event.id })}
            >
              <FontAwesome5 name="user-cog" size={18} color="#fff" />
              <Text style={styles.adminButtonText}>Manage Attendees</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#d4f5c9',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c5282',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    padding: 5,
  },
  editButton: {
    padding: 5,
  },
  eventImage: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    padding: 20,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 10,
  },
  organizerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  organizerLabel: {
    fontSize: 14,
    color: '#718096',
    marginRight: 5,
  },
  organizerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  detailIcon: {
    width: 25,
    marginRight: 10,
    marginTop: 2,
  },
  detailText: {
    fontSize: 16,
    color: '#4a5568',
    flex: 1,
  },
  locationContainer: {
    flex: 1,
  },
  addressText: {
    fontSize: 14,
    color: '#718096',
    marginTop: 2,
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#4a5568',
    lineHeight: 24,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#4a5568',
    lineHeight: 24,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  attendButton: {
    flexDirection: 'row',
    backgroundColor: '#2c5282',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.7,
  },
  cancelButton: {
    backgroundColor: '#e53e3e',
  },
  attendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  shareButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2c5282',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.25,
  },
  shareButtonText: {
    color: '#2c5282',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  adminButton: {
    flexDirection: 'row',
    backgroundColor: '#805ad5',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  adminButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default EventDetailsScreen;