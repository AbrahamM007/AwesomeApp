import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { collection, getDocs, query, orderBy, limit, db } from '../firebase/config';

const EventsScreen = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    const loadEvents = async () => {
      try {
        setLoading(true);
        
        // Use a try-catch block specifically for the Firestore query
        try {
          // Create a reference to the events collection directly
          const eventsRef = collection(db, 'events');
          const q = query(eventsRef, orderBy('date', 'asc'), limit(20));
          
          // Wrap the getDocs call in its own try-catch to isolate potential issues
          const snapshot = await getDocs(q);
          
          // Only update state if the component is still mounted
          if (isMounted) {
            const eventsData = snapshot.docs.map(doc => {
              const data = doc.data();
              return {
                id: doc.id,
                ...data,
                // Add a formatted date that's safe to use
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
          
          // Fallback to mock data if Firestore fails
          if (isMounted) {
            setEvents([
              { id: 'mock1', title: 'Sample Event 1', description: 'This is a sample event while we fix database issues', formattedDate: 'Coming soon' },
              { id: 'mock2', title: 'Sample Event 2', description: 'Another sample event', formattedDate: 'Coming soon' }
            ]);
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
    
    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.description}</Text>
            {/* Use the pre-formatted date instead of trying to format it here */}
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