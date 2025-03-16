import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const AnnouncementsScreen = () => {
  const navigation = useNavigation();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to announcements collection
    const unsubscribe = firestore()
      .collection('announcements')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const announcementList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() // Convert Firestore timestamp to JS Date
        }));
        setAnnouncements(announcementList);
        setLoading(false);
      }, error => {
        console.error('Error fetching announcements:', error);
        setLoading(false);
      });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const renderAnnouncementItem = ({ item }) => {
    const isEvent = item.type === 'event';
    const isMinistry = item.type === 'ministry';
    
    return (
      <TouchableOpacity 
        style={styles.announcementCard}
        onPress={() => {
          if (isEvent) {
            navigation.navigate('EventDetails', { eventId: item.eventId });
          } else if (isMinistry) {
            navigation.navigate('MinistryDetails', { ministryId: item.ministryId });
          }
        }}
      >
        {item.imageUrl ? (
          <Image 
            source={{ uri: item.imageUrl }} 
            style={styles.announcementImage} 
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <FontAwesome5 
              name={isEvent ? 'calendar-alt' : 'hands-helping'} 
              size={30} 
              color="#a0aec0" 
            />
          </View>
        )}
        
        <View style={styles.announcementContent}>
          <View style={styles.typeContainer}>
            <Text style={styles.typeText}>
              {isEvent ? 'Event' : isMinistry ? 'Ministry' : 'Announcement'}
            </Text>
          </View>
          
          <Text style={styles.announcementTitle}>{item.title}</Text>
          <Text style={styles.announcementDescription} numberOfLines={2}>
            {item.description}
          </Text>
          
          {item.createdAt && (
            <Text style={styles.dateText}>
              {item.createdAt.toLocaleDateString()}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#a9c25d" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Announcements</Text>
      </View>
      
      {announcements.length === 0 ? (
        <View style={styles.emptyContainer}>
          <FontAwesome5 name="bell-slash" size={50} color="#a0aec0" />
          <Text style={styles.emptyText}>No announcements yet</Text>
        </View>
      ) : (
        <FlatList
          data={announcements}
          renderItem={renderAnnouncementItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#d4f5c9',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',