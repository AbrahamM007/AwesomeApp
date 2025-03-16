import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppHeader from '../components/AppHeader';
import theme from '../styles/theme';

const SermonsScreen = () => {
  const navigation = useNavigation();
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Categories for filtering
  const categories = [
    { id: 'all', name: 'ALL' },
    { id: 'faith', name: 'FAITH' },
    { id: 'hope', name: 'HOPE' },
    { id: 'love', name: 'LOVE' },
    { id: 'prayer', name: 'PRAYER' },
    { id: 'worship', name: 'WORSHIP' },
  ];
  
  // Load sermons from AsyncStorage
  useEffect(() => {
    const loadSermons = async () => {
      try {
        setLoading(true);
        const storedSermons = await AsyncStorage.getItem('sermons');
        
        if (storedSermons) {
          const parsedSermons = JSON.parse(storedSermons);
          // Sort by date (newest first)
          parsedSermons.sort((a, b) => new Date(b.date) - new Date(a.date));
          setSermons(parsedSermons);
        } else {
          // Sample data if none exists
          const sampleSermons = [
            {
              id: '1',
              title: 'Finding Hope in Difficult Times',
              speaker: 'Pastor John Smith',
              date: '2023-05-15T10:00:00Z',
              duration: '45:30',
              imageUrl: 'https://example.com/sermon1.jpg',
              videoUrl: 'https://example.com/sermon1.mp4',
              categories: ['hope', 'faith'],
              description: 'A message about finding hope when life seems difficult.',
              views: 1245,
            },
            {
              id: '2',
              title: 'The Power of Prayer',
              speaker: 'Pastor Maria Rodriguez',
              date: '2023-05-08T10:00:00Z',
              duration: '38:15',
              imageUrl: 'https://example.com/sermon2.jpg',
              videoUrl: 'https://example.com/sermon2.mp4',
              categories: ['prayer', 'faith'],
              description: 'Learn how prayer can transform your life and relationship with God.',
              views: 987,
            },
            {
              id: '3',
              title: 'Living with Purpose',
              speaker: 'Pastor John Smith',
              date: '2023-05-01T10:00:00Z',
              duration: '42:10',
              imageUrl: 'https://example.com/sermon3.jpg',
              videoUrl: 'https://example.com/sermon3.mp4',
              categories: ['faith', 'love'],
              description: 'Discover how to live a life of purpose and meaning.',
              views: 1532,
            },
            {
              id: '4',
              title: 'The Heart of Worship',
              speaker: 'Worship Pastor David Lee',
              date: '2023-04-24T10:00:00Z',
              duration: '40:45',
              imageUrl: 'https://example.com/sermon4.jpg',
              videoUrl: 'https://example.com/sermon4.mp4',
              categories: ['worship', 'love'],
              description: 'Understanding what true worship means and how it changes us.',
              views: 876,
            },
            {
              id: '5',
              title: 'Faith That Moves Mountains',
              speaker: 'Pastor Maria Rodriguez',
              date: '2023-04-17T10:00:00Z',
              duration: '47:20',
              imageUrl: 'https://example.com/sermon5.jpg',
              videoUrl: 'https://example.com/sermon5.mp4',
              categories: ['faith'],
              description: 'Building a faith that can overcome any obstacle in your life.',
              views: 1089,
            },
          ];
          
          setSermons(sampleSermons);
          await AsyncStorage.setItem('sermons', JSON.stringify(sampleSermons));
        }
      } catch (error) {
        console.error('Error loading sermons:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadSermons();
  }, []);
  
  // Filter sermons by category
  const filteredSermons = selectedCategory === 'all'
    ? sermons
    : sermons.filter(sermon => sermon.categories.includes(selectedCategory));
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Render category item
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.id && styles.selectedCategoryButton
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Text 
        style={[
          styles.categoryButtonText,
          selectedCategory === item.id && styles.selectedCategoryButtonText
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  
  // Render sermon item
  const renderSermonItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.sermonCard}
      onPress={() => navigation.navigate('SermonDetails', { sermonId: item.id })}
    >
      <View style={styles.sermonImageContainer}>
        {item.imageUrl ? (
          <Image 
            source={{ uri: item.imageUrl }} 
            style={styles.sermonImage}
            defaultSource={require('../assets/sermon-placeholder.png')}
          />
        ) : (
          <View style={styles.sermonImagePlaceholder}>
            <FontAwesome5 name="video" size={30} color={theme.colors.primary} />
          </View>
        )}
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      </View>
      
      <View style={styles.sermonContent}>
        <Text style={styles.sermonTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.sermonSpeaker}>
          {item.speaker}
        </Text>
        <View style={styles.sermonMeta}>
          <Text style={styles.sermonDate}>{formatDate(item.date)}</Text>
          <View style={styles.viewsContainer}>
            <FontAwesome5 name="eye" size={12} color="#888888" />
            <Text style={styles.viewsText}>{item.views}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <AppHeader 
        title="SERMONS" 
        showBackButton={true}
        backgroundColor={theme.colors.background}
        titleStyle={styles.headerTitle}
      />
      
      <View style={styles.container}>
        {/* Categories filter */}
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
        
        {/* Sermons list */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingText}>Loading sermons...</Text>
          </View>
        ) : filteredSermons.length === 0 ? (
          <View style={styles.emptyContainer}>
            <FontAwesome5 name="video-slash" size={40} color={theme.colors.primary} />
            <Text style={styles.emptyText}>No sermons found</Text>
            <Text style={styles.emptySubText}>
              {selectedCategory === 'all' 
                ? 'Check back later for new sermons' 
                : 'Try selecting a different category'}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredSermons}
            renderItem={renderSermonItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.sermonsList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  headerTitle: {
    ...theme.typography.header,
  },
  categoriesList: {
    paddingBottom: theme.spacing.md,
  },
  categoryButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    borderRadius: theme.borderRadius.small,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  selectedCategoryButton: {
    backgroundColor: theme.colors.primary,
  },
  categoryButtonText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  },
  selectedCategoryButtonText: {
    color: '#000000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...theme.typography.body,
    marginTop: theme.spacing.md,
    color: theme.colors.primary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  emptyText: {
    ...theme.typography.title,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  emptySubText: {
    ...theme.typography.body,
    textAlign: 'center',
  },
  sermonsList: {
    paddingBottom: theme.spacing.xl,
  },
  sermonCard: {
    ...theme.components.card,
    marginBottom: theme.spacing.md,
    padding: 0,
    overflow: 'hidden',
  },
  sermonImageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
  },
  sermonImage: {
    width: '100%',
    height: '100%',
  },
  sermonImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.placeholder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.small,
  },
  durationText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sermonContent: {
    padding: theme.spacing.md,
  },
  sermonTitle: {
    ...theme.typography.title,
    fontSize: 18,
    marginBottom: theme.spacing.xs,
  },
  sermonSpeaker: {
    ...theme.typography.body,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  sermonMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sermonDate: {
    ...theme.typography.caption,
    fontSize: 12,
    marginLeft: theme.spacing.xs,
    color: '#888888',
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewsText: {
    ...theme.typography.caption,
    fontSize: