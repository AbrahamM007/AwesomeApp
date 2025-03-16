import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
// Import only what we need
import { collection, getDocs, query, orderBy, limit, db } from '../firebase/config';

const EventsScreen = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    // Create mock data for now
    const mockEvents = [
      { 
        id: 'event1', 
        title: 'Sunday Service', 
        description: 'Join us for our weekly Sunday service', 
        formattedDate: 'Every Sunday at 10:00 AM' 
      },
      { 
        id: 'event2', 
        title: 'Youth Group Meeting', 
        description: 'Weekly youth group gathering with games and discussion', 
        formattedDate: 'Every Wednesday at 6:30 PM' 
      },
      { 
        id: 'event3', 
        title: 'Community Outreach', 
        description: 'Serving our local community through various projects', 
        formattedDate: 'First Saturday of each month' 
      },
      { 
        id: 'event4', 
        title: 'Bible Study', 
        description: 'In-depth study of scripture', 
        formattedDate: 'Tuesdays at 7:00 PM' 
      }
    ];
    
    // Simulate loading
    setTimeout(() => {
      if (isMounted) {
        setEvents(mockEvents);
        setLoading(false);
      }
    }, 1000);
    
    // Commented out Firestore code for now
    /*
    const loadEvents = async () => {
      try {
        setLoading(true);
        
        try {
          const eventsRef = collection(db, 'events');
          const q = query(eventsRef, orderBy('date', 'asc'), limit(20));
          const snapshot = await getDocs(q);
          
          if (isMounted) {
            const eventsData = snapshot.docs.map(doc => {
              const data = doc.data();
              return {
                id: doc.id,
                ...data,
                formattedDate: data.date && typeof data.date.toDate === 'function'
                  ? data.date.toDate().toLocaleDateString()
                  : 'Date not available'
              };
            });
            setEvents(eventsData);
            setError(null);
          }
        } catch (firestoreError) {
          console.error('Firestore specific error:', firestoreError);
          
          if (isMounted) {
            setEvents(mockEvents);
            setError('Using sample data while we fix database issues');
          }
        }
      } catch (err) {
        console.error('Error loading events:', err);
        if (isMounted) {
          setError('Failed to load events. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadEvents();
    */
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Rest of your component remains the same
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Display a note that we're using mock data
  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 10, backgroundColor: '#ffe0b2' }}>
        <Text style={{ textAlign: 'center', color: '#bf360c' }}>
          Using sample data while we resolve database issues
        </Text>
      </View>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>{item.formattedDate}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text>No upcoming events found</Text>
          </View>
        }
      />
    </View>
  );
};

export default EventsScreen;