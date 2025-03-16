import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Share
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const EventsScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const eventId = route?.params?.eventId;
  
  const EventsScreen = () => {
    const navigation = useNavigation();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Load real events data from AsyncStorage
    useEffect(() => {
      const loadEvents = async () => {
        try {
          setLoading(true);
          const storedEvents = await AsyncStorage.getItem('events');
          if (storedEvents) {
            const parsedEvents = JSON.parse(storedEvents);
            // Sort by dateTime (upcoming first)
            parsedEvents.sort((a, b) => 
              new Date(a.dateTime) - new Date(b.dateTime)
            );
            setEvents(parsedEvents);
          } else {
            setEvents([]);
          }
        } catch (error) {
          console.error('Error loading events:', error);
          setEvents([]);
        } finally {
          setLoading(false);
        }
      };
      
      loadEvents();
      
      // Set up a refresh interval
      const refreshInterval = setInterval(loadEvents, 5000);
      
      // Clean up
      return () => clearInterval(refreshInterval);
    }, []);
  
  // Mock events data
  const events = [
    {
      id: '1',
      title: 'Sunday Service',
      date: 'Sunday, May 15',
      time: '10:00 AM',
      location: 'Main Sanctuary',
      description: 'Join us for our weekly Sunday service with worship, prayer, and teaching from Pastor John.',
      image: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80'
    },
    {
      id: '2',
      title: 'Bible Study',
      date: 'Wednesday, May 18',
      time: '7:00 PM',
      location: 'Fellowship Hall',
      description: 'Midweek Bible study focusing on the book of Romans. Open to all ages and knowledge levels.',
      image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: '3',
      title: 'Youth Group',
      date: 'Friday, May 20',
      time: '6:30 PM',
      location: 'Youth Center',
      description: 'Weekly gathering for teens with games, worship, and small group discussions.',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80'
    },
    {
      id: '4',
      title: 'Community Outreach',
      date: 'Saturday, May 21',
      time: '9:00 AM',
      location: 'Downtown Community Center',
      description: 'Join us as we serve our community by distributing food and supplies to those in need.',
      image: 'https://images.unsplash.com/photo-1593113598332-cd59a93c6138?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: '5',
      title: 'Prayer Meeting',
      date: 'Tuesday, May 17',
      time: '6:00 AM',
      location: 'Prayer Room',
      description: 'Early morning prayer gathering to start the day with focus and intention.',
      image: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];
  
  // Filter events based on search query
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleShareEvent = async (event) => {
    try {
      await Share.share({
        message: `${event.title}\n${event.date} at ${event.time}\nLocation: ${event.location}\n\n${event.description}\n\nShared from AwesomeApp`,
      });
    } catch (error) {
      console.log('Error sharing:', error.message);
    }
  };
  
  // If an event ID is provided, show the event details
  if (eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return null;
    
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
          <View style={{ width: 30 }} />
        </View>
        
        <ScrollView style={styles.scrollContainer}>
          <Image 
            source={{ uri: event.image }} 
            style={styles.eventDetailImage}
            resizeMode="cover"
          />
          
          <View style={styles.eventDetailContent}>
            <Text style={styles.eventDetailTitle}>{event.title}</Text>
            
            <View style={styles.eventDetailInfo}>
              <View style={styles.eventDetailInfoItem}>
                <FontAwesome5 name="calendar-alt" size={18} color="#2c5282" style={styles.eventDetailIcon} />
                <Text style={styles.eventDetailInfoText}>{event.date}</Text>
              </View>
              
              <View style={styles.eventDetailInfoItem}>
                <FontAwesome5 name="clock" size={18} color="#2c5282" style={styles.eventDetailIcon} />
                <Text style={styles.eventDetailInfoText}>{event.time}</Text>
              </View>
              
              <View style={styles.eventDetailInfoItem}>
                <FontAwesome5 name="map-marker-alt" size={18} color="#2c5282" style={styles.eventDetailIcon} />
                <Text style={styles.eventDetailInfoText}>{event.location}</Text>
              </View>
            </View>
            
            <Text style={styles.eventDetailDescription}>{event.description}</Text>
            
            <TouchableOpacity style={styles.registerButton}>
              <Text style={styles.registerButtonText}>Register for Event</Text>
            </TouchableOpacity>
            
            <View style={styles.eventActions}>
              <TouchableOpacity style={styles.eventActionButton}>
                <FontAwesome5 name="calendar-plus" size={18} color="#2c5282" />
                <Text style={styles.eventActionText}>Add to Calendar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.eventActionButton}
                onPress={() => handleShareEvent(event)}
              >
                <FontAwesome5 name="share-alt" size={18} color="#2c5282" />
                <Text style={styles.eventActionText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
  
  // Otherwise, show the list of events
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Events</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <FontAwesome5 name="search" size={16} color="#a0aec0" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search events..."
          placeholderTextColor="#a0aec0"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <FlatList
        data={filteredEvents}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.eventsList}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.eventCard}
            onPress={() => navigation.navigate('Events', { eventId: item.id })}
          >
            <Image 
              source={{ uri: item.image }} 
              style={styles.eventImage}
              resizeMode="cover"
            />
            <View style={styles.eventDetails}>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <View style={styles.eventInfo}>
                <FontAwesome5 name="calendar-alt" size={14} color="#718096" style={styles.eventIcon} />
                <Text style={styles.eventText}>{item.date}</Text>
              </View>
              <View style={styles.eventInfo}>
                <FontAwesome5 name="clock" size={14} color="#718096" style={styles.eventIcon} />
                <Text style={styles.eventText}>{item.time}</Text>
              </View>
              <View style={styles.eventInfo}>
                <FontAwesome5 name="map-marker-alt" size={14} color="#718096" style={styles.eventIcon} />
                <Text style={styles.eventText}>{item.location}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flex: 1,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  backButton: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 15,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: '#4a5568',
    fontSize: 16,
  },
  eventsList: {
    padding: 20,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 180,
  },
  eventDetails: {
    padding: 15,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 10,
  },
  eventInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventIcon: {
    marginRight: 8,
  },
  eventText: {
    fontSize: 14,
    color: '#718096',
  },
  eventDetailImage: {
    width: '100%',
    height: 250,
  },
  eventDetailContent: {
    padding: 20,
  },
  eventDetailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 15,
  },
  eventDetailInfo: {
    backgroundColor: '#f0f9ff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  eventDetailInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  eventDetailIcon: {
    marginRight: 10,
    width: 25,
  },
  eventDetailInfoText: {
    fontSize: 16,
    color: '#4a5568',
  },
  eventDetailDescription: {
    fontSize: 16,
    color: '#4a5568',
    lineHeight: 24,
    marginBottom: 25,
  },
  registerButton: {
    backgroundColor: '#2c5282',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#2c5282',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  eventActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f9ff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    flex: 0.48,
  },
  eventActionText: {
    color: '#2c5282',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default EventsScreen;