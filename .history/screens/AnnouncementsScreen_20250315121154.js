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
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AnnouncementsScreen = () => {
  const navigation = useNavigation();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Load real announcements data from AsyncStorage
  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        setLoading(true);
        const storedAnnouncements = await AsyncStorage.getItem('announcements');
        if (storedAnnouncements) {
          const parsedAnnouncements = JSON.parse(storedAnnouncements);
          // Sort by createdAt date (newest first)
          parsedAnnouncements.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          setAnnouncements(parsedAnnouncements);
        } else {
          setAnnouncements([]);
        }
      } catch (error) {
        console.error('Error loading announcements:', error);
        setAnnouncements([]);
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
    const createdDate = new Date(item.createdAt);
    const formattedDate = createdDate.toLocaleDateString();
    
    return (
      <View style={styles.announcementCard}>
        {item.imageUrl ? (
          <Image 
            source={{ uri: item.imageUrl }} 
            style={styles.announcementImage} 
          />
        ) : (
          <View style={styles.announcementImagePlaceholder}>
            <FontAwesome5 name="bullhorn" size={30} color="#a0aec0" />
          </View>
        )}
        
        <View style={styles.announcementContent}>
          <Text style={styles.announcementTitle}>{item.title}</Text>
          
          <Text style={styles.announcementDate}>
            Posted on {formattedDate}
          </Text>
          
          <Text style={styles.announcementDescription}>
            {item.description}
          </Text>
        </View>
      </View>
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
      
      <TouchableOpacity 
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateAnnouncement')}
      >
        <FontAwesome5 name="plus" size={20} color="#fff" />
      </TouchableOpacity>
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
  },
  announcementImage: {
    width: '100%',
    height: 150,
  },
  announcementImagePlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  announcementContent: {
    padding: 16,
  },
  announcementTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 8,
  },
  announcementDate: {
    fontSize: 14,
    color: '#a9c25d',
    marginBottom: 10,
  },
  announcementDescription: {
    fontSize: 16,
    color: '#4a5568',
    lineHeight: 24,
  },
  createButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#a9c25d',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default AnnouncementsScreen;