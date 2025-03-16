import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const ChurchFeedScreen = ({ navigation }) => {
  const { userInfo } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [feedItems, setFeedItems] = useState([
    {
      id: '1',
      type: 'announcement',
      title: 'Sunday Service Time Change',
      content: 'Starting next week, our Sunday service will begin at 10:30 AM instead of 10:00 AM.',
      date: 'June 5, 2023',
      author: 'Pastor John',
      likes: 24,
      comments: 8
    },
    {
      id: '2',
      type: 'event',
      title: 'Annual Church Picnic',
      content: 'Join us for our annual church picnic at City Park. Food, games, and fellowship for the whole family!',
      date: 'June 18, 2023',
      time: '12:00 PM - 4:00 PM',
      location: 'City Park, Main Pavilion',
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      likes: 42,
      comments: 15
    },
    {
      id: '3',
      type: 'devotional',
      title: 'Daily Devotional: Finding Peace',
      content: 'In a world full of chaos, Jesus offers us His peace. "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid." - John 14:27',
      date: 'June 7, 2023',
      author: 'Sarah Johnson',
      likes: 36,
      comments: 5
    },
    {
      id: '4',
      type: 'news',
      title: 'New Children\'s Ministry Director',
      content: 'We\'re excited to welcome Emily Taylor as our new Children\'s Ministry Director. Emily brings 10 years of experience and a passion for helping children grow in their faith.',
      date: 'June 3, 2023',
      image: 'https://randomuser.me/api/portraits/women/28.jpg',
      likes: 31,
      comments: 12
    }
  ]);
  
  const isAdmin = userInfo?.role === 'admin';
  
  const onRefresh = () => {
    setRefreshing(true);
    // In a real app, you would fetch new data here
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  
  const renderFeedItem = ({ item }) => {
    switch (item.type) {
      case 'announcement':
        return renderAnnouncement(item);
      case 'event':
        return renderEvent(item);
      case 'devotional':
        return renderDevotional(item);
      case 'news':
        return renderNews(item);
      default:
        return null;
    }
  };
  
  const renderAnnouncement = (item) => (
    <View style={styles.feedCard}>
      <View style={styles.feedHeader}>
        <View style={styles.feedTypeContainer}>
          <FontAwesome5 name="bullhorn" size={14} color="#fff" />
          <Text style={styles.feedTypeText}>Announcement</Text>
        </View>
        <Text style={styles.feedDate}>{item.date}</Text>
      </View>
      
      <Text style={styles.feedTitle}>{item.title}</Text>
      <Text style={styles.feedContent}>{item.content}</Text>
      <Text style={styles.feedAuthor}>- {item.author}</Text>
      
      <View style={styles.feedActions}>
        <TouchableOpacity style={styles.feedAction}>
          <FontAwesome5 name="heart" size={16} color="#e53e3e" solid />
          <Text style={styles.feedActionText}>{item.likes}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.feedAction}
          onPress={() => navigation.navigate('Comments', { itemId: item.id, itemType: item.type })}
        >
          <FontAwesome5 name="comment" size={16} color="#718096" />
          <Text style={styles.feedActionText}>{item.comments}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.feedAction}>
          <FontAwesome5 name="share" size={16} color="#718096" />
        </TouchableOpacity>
      </View>
    </View>
  );
  
  const renderEvent = (item) => (
    <TouchableOpacity 
      style={styles.feedCard}
      onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
    >
      <View style={styles.feedHeader}>
        <View style={[styles.feedTypeContainer, styles.eventTypeContainer]}>
          <FontAwesome5 name="calendar-alt" size={14} color="#fff" />
          <Text style={styles.feedTypeText}>Event</Text>
        </View>
        <Text style={styles.feedDate}>{item.date}</Text>
      </View>
      
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.feedImage} />
      )}
      
      <Text style={styles.feedTitle}>{item.title}</Text>
      <Text style={styles.feedContent}>{item.content}</Text>
      
      <View style={styles.eventDetails}>
        <View style={styles.eventDetailItem}>
          <FontAwesome5 name="clock" size={14} color="#718096" style={styles.eventDetailIcon} />
          <Text style={styles.eventDetailText}>{item.time}</Text>
        </View>
        
        <View style={styles.eventDetailItem}>
          <FontAwesome5 name="map-marker-alt" size={14} color="#718096" style={styles.eventDetailIcon} />
          <Text style={styles.eventDetailText}>{item.location}</Text>
        </View>
      </View>
      
      <View style={styles.feedActions}>
        <TouchableOpacity style={styles.feedAction}>
          <FontAwesome5 name="heart" size={16} color="#e53e3e" solid />
          <Text style={styles.feedActionText}>{item.likes}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.feedAction}
          onPress={() => navigation.navigate('Comments', { itemId: item.id, itemType: item.type })}
        >
          <FontAwesome5 name="comment" size={16} color="#718096" />
          <Text style={styles.feedActionText}>{item.comments}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.feedAction}>
          <FontAwesome5 name="share" size={16} color="#718096" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  
  const renderDevotional = (item) => (
    <View style={styles.feedCard}>
      <View style={styles.feedHeader}>
        <View style={[styles.feedTypeContainer, styles.devotionalTypeContainer]}>
          <FontAwesome5 name="book-open" size={14} color="#fff" />
          <Text style={styles.feedTypeText}>Devotional</Text>
        </View>
        <Text style={styles.feedDate}>{item.date}</Text>
      </View>
      
      <Text style={styles.feedTitle}>{item.title}</Text>
      <Text style={styles.feedContent}>{item.content}</Text>
      <Text style={styles.feedAuthor}>- {item.author}</Text>
      
      <View style={styles.feedActions}>
        <TouchableOpacity style={styles.feedAction}>
          <FontAwesome5 name="heart" size={16} color="#e53e3e" solid />
          <Text style={styles.feedActionText}>{item.likes}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.feedAction}
          onPress={() => navigation.navigate('Comments', { itemId: item.id, itemType: item.type })}
        >
          <FontAwesome5 name="comment" size={16} color="#718096" />
          <Text style={styles.feedActionText}>{item.comments}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.feedAction}>
          <FontAwesome5 name="share" size={16} color="#718096" />
        </TouchableOpacity>
      </View>
    </View>
  );
  
  const renderNews = (item) => (
    <View style={styles.feedCard}>
      <View style={styles.feedHeader}>
        <View style={[styles.feedTypeContainer, styles.newsTypeContainer]}>
          <FontAwesome5 name="newspaper" size={14} color="#fff" />
          <Text style={styles.feedTypeText}>News</Text>
        </View>
        <Text style={styles.feedDate}>{item.date}</Text>
      </View>
      
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.feedImage} />
      )}
      
      <Text style={styles.feedTitle}>{item.title}</Text>
      <Text style={styles.feedContent}>{item.content}</Text>
      
      <View style={styles.feedActions}>
        <TouchableOpacity style={styles.feedAction}>
          <FontAwesome5 name="heart" size={16} color="#e53e3e" solid />
          <Text style={styles.feedActionText}>{item.likes}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.feedAction}
          onPress={() => navigation.navigate('Comments', { itemId: item.id, itemType: item.type })}
        >
          <FontAwesome5 name="comment" size={16} color="#718096" />
          <Text style={styles.feedActionText}>{item.comments}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.feedAction}>
          <FontAwesome5 name="share" size={16} color="#718096" />
        </TouchableOpacity>
      </View>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Church Feed</Text>
        {isAdmin && (
          <TouchableOpacity 
            style={styles.createButton}
            onPress={() => navigation.navigate('CreateFeedItem')}
          >
            <FontAwesome5 name="plus" size={20} color="#2c5282" />
          </TouchableOpacity>
        )}
      </View>
      
      <FlatList
        data={feedItems}
        renderItem={renderFeedItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2c5282']}
            tintColor="#2c5282"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FontAwesome5 name="church" size={60} color="#cbd5e0" />
            <Text style={styles.emptyText}>No updates at this time</Text>
          </View>
        }
      />
      
      {isAdmin && (
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={() => navigation.navigate('SendNotification')}
        >
          <FontAwesome5 name="bell" size={20} color="#fff" />
          <Text style={styles.notificationButtonText}>Send Notification</Text>
        </TouchableOpacity>
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
  createButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  listContainer: {
    padding: 15,
    paddingBottom: isAdmin ? 80 : 20,
  },
  feedCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  feedTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e53e3e',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  eventTypeContainer: {
    backgroundColor: '#2c5282',
  },
  devotionalTypeContainer: {
    backgroundColor: '#805ad5',
  },
  newsTypeContainer: {
    backgroundColor: '#38a169',
  },
  feedTypeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  feedDate: {
    fontSize: 14,
    color: '#718096',
  },
  feedImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 15,
  },
  feedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 10,
  },
  feedContent: {
    fontSize: 16,
    color: '#4a5568',
    lineHeight: 24,
    marginBottom: 10,
  },
  feedAuthor: {
    fontSize: 14,
    color: '#718096',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  eventDetails: {
    marginBottom: 15,
  },
  eventDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventDetailIcon: {
    width: 20,
    marginRight: 8,
  },
  eventDetailText: {
    fontSize: 14,
    color: '#4a5568',
  },
  feedActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 15,
  },
  feedAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  feedActionText: {
    color: '#718096',
    fontSize: 14,
    marginLeft: 5,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#718096',
    marginTop: 20,
  },
  notificationButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    backgroundColor: '#2c5282',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  notificationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  }
});

export default ChurchFeedScreen;