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

const MinistriesScreen = () => {
  const navigation = useNavigation();
  const [ministries, setMinistries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Load real ministries data from AsyncStorage
  useEffect(() => {
    const loadMinistries = async () => {
      try {
        setLoading(true);
        const storedMinistries = await AsyncStorage.getItem('ministries');
        if (storedMinistries) {
          const parsedMinistries = JSON.parse(storedMinistries);
          // Sort alphabetically by name
          parsedMinistries.sort((a, b) => 
            a.name.localeCompare(b.name)
          );
          setMinistries(parsedMinistries);
        } else {
          setMinistries([]);
        }
      } catch (error) {
        console.error('Error loading ministries:', error);
        setMinistries([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadMinistries();
    
    // Set up a refresh interval
    const refreshInterval = setInterval(loadMinistries, 5000);
    
    // Clean up
    return () => clearInterval(refreshInterval);
  }, []);

  const renderMinistryItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.ministryCard}
        onPress={() => navigation.navigate('MinistryDetails', { ministryId: item.id })}
      >
        {item.imageUrl ? (
          <Image 
            source={{ uri: item.imageUrl }} 
            style={styles.ministryImage} 
          />
        ) : (
          <View style={styles.ministryImagePlaceholder}>
            <FontAwesome5 name="hands-helping" size={30} color="#a0aec0" />
          </View>
        )}
        
        <Text style={styles.ministryName}>{item.name}</Text>
        
        <Text style={styles.ministryDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.memberCount}>
          <FontAwesome5 name="users" size={14} color="#a9c25d" solid />
          <Text style={styles.memberCountText}>
            {item.memberCount || 0} members
          </Text>
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
        <Text style={styles.headerTitle}>Community Groups</Text>
      </View>
      
      {ministries.length === 0 ? (
        <View style={styles.emptyContainer}>
          <FontAwesome5 name="users-slash" size={50} color="#a0aec0" />
          <Text style={styles.emptyText}>No groups available</Text>
        </View>
      ) : (
        <FlatList
          data={ministries}
          renderItem={renderMinistryItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
        />
      )}
      
      <TouchableOpacity 
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateMinistry')}
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
    padding: 12,
  },
  ministryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 8,
    padding: 16,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  ministryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  ministryImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  ministryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    textAlign: 'center',
    marginBottom: 8,
  },
  ministryDescription: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 12,
  },
  memberCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberCountText: {
    fontSize: 14,
    color: '#4a5568',
    marginLeft: 6,
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

export default MinistriesScreen;