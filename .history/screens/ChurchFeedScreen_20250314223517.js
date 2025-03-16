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
  
  // Check if user is an admin
  const isAdmin = userInfo?.role === 'admin';
  
  // Mock data for feed items
  const feedItems = [
    {
      id: '1',
      type: 'announcement',
      title: 'Sunday Service Time Change',
      content: 'Starting next week, our Sunday service will begin at 10:00 AM instead of 9:30 AM. This change will be permanent going forward.',
      date: 'June 10, 2023',
      author: {
        name: 'Pastor David Wilson',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        role: 'Senior Pastor'
      },
      likes: 45,
      comments: 12,
      isLiked: false,
      isPinned: true
    },
    {
      id: '2',
      type: 'event',
      title: 'Summer Retreat',
      content: 'Registration is now open for our annual summer retreat! Join us for a weekend of fellowship, worship, and spiritual renewal.',
      date: 'June 8, 2023',
      eventDate: 'July 21-23, 2023',
      eventLocation: 'Mountain View Retreat Center',
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      author: {
        name: 'Sarah Johnson',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        role: 'Events Coordinator'
      },
      likes: 38,
      comments: 8,
      isLiked: true
    },
    {
      id: '3',
      type: 'update',
      title: 'New Children\'s Ministry Curriculum',
      content: 'We\'re excited to announce that we\'ll be implementing a new curriculum for our children\'s ministry starting next month. This curriculum focuses on biblical literacy and character development.',
      date: 'June 5, 2023',
      author: {
        name: 'Emily Rodriguez',
        image: 'https://randomuser.me/api/portraits/women/28.jpg',
        role: 'Children\'s Ministry Director'
      },
      likes: 27,
      comments: 5,
      isLiked: false
    },
    {
      id: '4',
      type: 'prayer',
      title: 'Prayer Request: Thompson Family',
      content: 'Please keep the Thompson family in your prayers as they navigate a difficult health situation with their youngest son, who was recently hospitalized.',
      date: 'June 3, 2023',
      author: {
        name: 'Prayer Team',
        image: 'https://randomuser.me/api/portraits/men/45.jpg',
        role: 'Prayer Ministry'
      },
      likes: 52,
      comments: 15,
      isLiked: true
    }
  ];
  
  const onRefresh = () => {
    setRefreshing(true);
    // In a real app, you would fetch new data here
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  
  const handleLike = (id) => {
    // In a real app, you would update the backend
    console.log(`Liked post ${id}`);
  };
  
  const renderFeedItem = ({ item }) => {
    const isPinned = item.isPinned;
    
    return (
      <View style={styles.feedCard}>
        {isPinned && (
          <View style={styles.pinnedBadge}>
            <FontAwesome5 name="thumbtack" size={12} color="#fff" />
            <Text style={styles.pinnedText}>Pinned</Text>
          </View>
        )}
        
        <View style={styles.feedHeader}>
          <View style={styles.authorContainer}>
            <Image source={{ uri: item.author.image }} style={styles.authorImage} />
            <View>
              <Text style={styles.authorName}>{item.author.name}</Text>
              <Text style={styles.authorRole}>{item.author.role}</Text>
            </View>
          </View>
          <Text style={styles.postDate}>{item.date}</Text>
        </View>
        
        <Text style={styles.feedTitle}>{item.title}</Text>
        <Text style={styles.feedContent}>{item.content}</Text>
        
        {item.type === 'event' && (
          <View style={styles.eventDetails}>
            <Image source={{ uri: item.image }} style={styles.eventImage} />
            <View style={styles.eventInfo}>
              <View style={styles.eventInfoItem}>
                <FontAwesome5 name="calendar-alt" size={14} color="#2c5282" style={styles.eventIcon} />
                <Text style={styles.eventInfoText}>{item.eventDate}</Text>
              </View>
              <View style={styles.eventInfoItem}>
                <FontAwesome5 name="map-marker-alt" size={14} color="#2c5282" style={styles.eventIcon} />
                <Text style={styles.eventInfoText}>{item.eventLocation}</Text>
              </View>
              <TouchableOpacity 
                style={styles.viewEventButton}
                onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
              >
                <Text style={styles.viewEventButtonText}>View Event</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        <View style={styles.feedActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleLike(item.id)}
          >
            <FontAwesome5 
              name="heart" 
              size={16} 
              color={item.isLiked ? "#e53e3e" : "#718096"} 
              solid={item.isLiked} 
            />
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Comments', { postId: item.id })}
          >
            <FontAwesome5 name="comment" size={16} color="#718096" />
            <Text style={styles.actionText}>{item.comments}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome5 name="share" size={16} color="#718096" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Church Updates</Text>
        {isAdmin && (
          <View style={styles.adminActions}>
            <TouchableOpacity 
              style={styles.adminButton}
              onPress={() => navigation.navigate('CreateFeedItem')}
            >
              <FontAwesome5 name="plus" size={16} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.adminButton}
              onPress={() => navigation.navigate('SendNotification')}
            >
              <FontAwesome5 name="bell" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      <FlatList
        data={feedItems}
        renderItem={renderFeedItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.feedList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2c5282']}
            tintColor="#2c5282"
          />
        }
      />
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
  adminActions: {
    flexDirection: 'row',
  },
  adminButton: {
    backgroundColor: '#2c5282',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  feedList: {
    padding: 15,
  },
  feedCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pinnedBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#2c5282',
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinnedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  authorRole: {
    fontSize: 12,
    color: '#718096',
  },
  postDate: {
    fontSize: 12,
    color: '#a0aec0',
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
    marginBottom: 15,
  },
  eventDetails: {
    backgroundColor: '#f7fafc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
  },
  eventImage: {
    width: '100%',
    height: 150,
  },
  eventInfo: {
    padding: 12,
  },
  eventInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventIcon: {
    width: 20,
    marginRight: 8,
  },
  eventInfoText: {
    fontSize: 14,
    color: '#4a5568',
  },
  viewEventButton: {
    backgroundColor: '#2c5282',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  viewEventButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  feedActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    marginLeft: 5,
    color: '#718096',
    fontSize: 14,
  },
});

export default ChurchFeedScreen;