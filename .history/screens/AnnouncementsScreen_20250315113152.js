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
// Remove Firebase import
// import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AnnouncementsScreen = () => {
  const navigation = useNavigation();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load announcements from AsyncStorage
    const loadAnnouncements = async () => {
      try {
        const storedAnnouncements = await AsyncStorage.getItem('announcements');
        if (storedAnnouncements) {
          const parsedAnnouncements = JSON.parse(storedAnnouncements);
          // Sort by createdAt date (newest first)
          parsedAnnouncements.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          setAnnouncements(parsedAnnouncements);
        }
      } catch (error) {
        console.error('Error loading announcements:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnnouncements();
    
    // Set up a refresh interval
    const refreshInterval = setInterval(loadAnnouncements, 5000);
    
    // Clean up
    return () => clearInterval(refreshInterval);
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
              {new Date(item.createdAt).toLocaleDateString()}
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
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#718096',
    marginTop: 10,
  },
  listContainer: {
    padding: 16,
  },
  announcementCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
  },
  announcementImage: {
    width: 100,
    height: 100,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  announcementContent: {
    flex: 1,
    padding: 12,
  },
  typeContainer: {
    backgroundColor: '#d4f5c9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  typeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 4,
  },
  announcementDescription: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 12,
    color: '#718096',
  },
});

export default AnnouncementsScreen;