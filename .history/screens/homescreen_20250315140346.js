import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppHeader from '../components/AppHeader';
import theme from '../styles/theme';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [ministries, setMinistries] = useState([]);
  
  // Menu items for the grid
  const menuItems = [
    { id: 'events', title: 'EVENTS', icon: 'calendar-alt', screen: 'Events' },
    { id: 'prayer', title: 'PRAYER', icon: 'pray', screen: 'Prayer' },
    { id: 'giving', title: 'GIVING', icon: 'hand-holding-heart', screen: 'Giving' },
    { id: 'bible', title: 'BIBLE', icon: 'bible', screen: 'Bible' },
    { id: 'sermons', title: 'SERMONS', icon: 'video', screen: 'Sermons' },
    { id: 'connect', title: 'CONNECT', icon: 'users', screen: 'Connect' },
  ];
  
  // Load data from AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load announcements
        const storedAnnouncements = await AsyncStorage.getItem('announcements');
        if (storedAnnouncements) {
          const parsedAnnouncements = JSON.parse(storedAnnouncements);
          // Sort by createdAt date (newest first) and limit to 3
          parsedAnnouncements.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          setAnnouncements(parsedAnnouncements.slice(0, 3));
        }
        
        // Load events
        const storedEvents = await AsyncStorage.getItem('events');
        if (storedEvents) {
          const parsedEvents = JSON.parse(storedEvents);
          // Sort by dateTime (upcoming first) and limit to 3
          parsedEvents.sort((a, b) => 
            new Date(a.dateTime) - new Date(b.dateTime)
          );
          setEvents(parsedEvents.slice(0, 3));
        }
        
        // Load ministries
        const storedMinistries = await AsyncStorage.getItem('ministries');
        if (storedMinistries) {
          const parsedMinistries = JSON.parse(storedMinistries);
          setMinistries(parsedMinistries.slice(0, 3));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    
    loadData();
    
    // Set up a refresh interval
    const refreshInterval = setInterval(loadData, 5000);
    
    // Clean up
    return () => clearInterval(refreshInterval);
  }, []);
  
  // Render an announcement item
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
              size={24} 
              color={theme.colors.primary} 
            />
          </View>
        )}
        
        <View style={styles.announcementContent}>
          <Text style={styles.announcementTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.announcementDescription} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  // Render an event item
  const renderEventItem = ({ item }) => {
    // Format the date
    const eventDate = new Date(item.dateTime);
    const formattedDate = eventDate.toLocaleDateString();
    const formattedTime = eventDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    return (
      <TouchableOpacity 
        style={styles.eventCard}
        onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
      >
        {item.imageUrl ? (
          <Image 
            source={{ uri: item.imageUrl }} 
            style={styles.eventImage} 
          />
        ) : (
          <View style={styles.eventImagePlaceholder}>
            <FontAwesome5 name="calendar-alt" size={24} color={theme.colors.primary} />
          </View>
        )}
        
        <View style={styles.eventContent}>
          <Text style={styles.eventTitle} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.eventTime}>
            {formattedDate} at {formattedTime}
          </Text>
          <Text style={styles.eventLocation} numberOfLines={1}>
            {item.location || 'Location TBD'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  // Render a ministry item
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
            <FontAwesome5 name="hands-helping" size={24} color={theme.colors.primary} />
          </View>
        )}
        
        <Text style={styles.ministryName} numberOfLines={2}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  
  // Render a menu item
  const renderMenuItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={() => navigation.navigate(item.screen)}
    >
      <View style={styles.menuIconContainer}>
        <FontAwesome5 name={item.icon} size={24} color={theme.colors.button.text} />
      </View>
      <Text style={styles.menuItemText}>{item.title}</Text>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <AppHeader 
        title="NUEVA ESPERANZA" 
        showBackButton={false}
      />
      
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeSection}>
          <Image 
            source={require('../assets/church-logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.welcomeText}>WELCOME</Text>
          <Text style={styles.subtitleText}>NEW HOPE CHURCH</Text>
        </View>
        
        {/* Featured Announcement */}
        <View style={styles.featuredCard}>
          <Text style={styles.featuredTitle}>SUNDAY SERVICE</Text>
          <Text style={styles.featuredDetails}>Join us every Sunday at 10:00 AM</Text>
          <TouchableOpacity style={styles.featuredButton}>
            <Text style={styles.featuredButtonText}>LEARN MORE</Text>
          </TouchableOpacity>
        </View>
        
        {/* Announcements Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>ANNOUNCEMENTS</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Announcements')}>
              <Text style={styles.seeAllText}>SEE ALL</Text>
            </TouchableOpacity>
          </View>
          
          {announcements.length === 0 ? (
            <View style={styles.emptyState}>
              <FontAwesome5 name="bell-slash" size={24} color={theme.colors.primary} />
              <Text style={styles.emptyStateText}>No announcements yet</Text>
            </View>
          ) : (
            <FlatList
              data={announcements}
              renderItem={renderAnnouncementItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.announcementsList}
            />
          )}
        </View>
        
        {/* Upcoming Events Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>UPCOMING EVENTS</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Events')}>
              <Text style={styles.seeAllText}>SEE ALL</Text>
            </TouchableOpacity>
          </View>
          
          {events.length === 0 ? (
            <View style={styles.emptyState}>
              <FontAwesome5 name="calendar-times" size={24} color={theme.colors.primary} />
              <Text style={styles.emptyStateText}>No upcoming events</Text>
            </View>
          ) : (
            <FlatList
              data={events}
              renderItem={renderEventItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.eventsList}
            />
          )}
        </View>
        
        {/* Menu Grid */}
        <View style={styles.menuGrid}>
          {menuItems.map(renderMenuItem)}
        </View>
        
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('CreateEvent')}
          >
            <FontAwesome5 name="calendar-plus" size={20} color={theme.colors.button.text} />
            <Text style={styles.actionButtonText}>CREATE EVENT</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('CreateMinistry')}
          >
            <FontAwesome5 name="users" size={20} color={theme.colors.button.text} />
            <Text style={styles.actionButtonText}>CREATE GROUP</Text>
          </TouchableOpacity>
        </View>

        {/* Add some padding at the bottom to ensure scrollability */}
        <View style={styles.bottomPadding} />
      </ScrollView>
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
  },
  contentContainer: {
    padding: theme.spacing.md,
  },
  welcomeSection: {
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: theme.spacing.md,
  },
  welcomeText: {
    ...theme.typography.header,
    marginBottom: theme.spacing.xs,
  },
  subtitleText: {
    ...theme.typography.title,
    marginBottom: theme.spacing.lg,
  },
  featuredCard: {
    ...theme.components.card,
    alignItems: 'center',
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  featuredTitle: {
    ...theme.typography.title,
    marginBottom: theme.spacing.sm,
  },
  featuredDetails: {
    ...theme.typography.body,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  featuredButton: {
    ...theme.components.button.primary,
    marginTop: theme.spacing.sm,
  },
  featuredButtonText: {
    ...theme.typography.button,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.title,
    fontSize: 18,
  },
  seeAllText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '600',
    letterSpacing: 1,
  },
  emptyState: {
    ...theme.components.card,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  emptyStateText: {
    ...theme.typography.body,
    marginTop: theme.spacing.sm,
  },
  // Announcements styles
  announcementsList: {
    paddingRight: theme.spacing.md,
  },
  announcementCard: {
    ...theme.components.card,
    width: 280,
    marginRight: theme.spacing.md,
    padding: 0,
  },
  announcementImage: {
    width: '100%',
    height: 120,
  },
  imagePlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: theme.colors.placeholder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  announcementContent: {
    padding: theme.spacing.md,
  },
  announcementTitle: {
    ...theme.typography.title,
    fontSize: 16,
    marginBottom: theme.spacing.xs,
  },
  announcementDescription: {
    ...theme.typography.caption,
  },
  // Events styles
  eventsList: {
    paddingRight: theme.spacing.md,
  },
  eventCard: {
    ...theme.components.card,
    width: 200,
    marginRight: theme.spacing.md,
    padding: 0,
  },
  eventImage: {
    width: '100%',
    height: 100,
  },
  eventImagePlaceholder: {
    width: '100%',
    height: 100,
    backgroundColor: theme.colors.placeholder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventContent: {
    padding: theme.spacing.md,
  },
  eventTitle: {
    ...theme.typography.title,
    fontSize: 16,
    marginBottom: theme.spacing.xs,
  },
  eventDescription: {
    ...theme.typography.caption,
  },
  // Ministries styles
  ministriesList: {
    paddingRight: theme.spacing.md,
  },
  ministryCard: {
    ...theme.components.card,
    width: 120,
    marginRight: theme.spacing.md,
    padding: 0,
  },
  ministryImage: {
    width: '100%',
    height: 60,
  },
  ministryImagePlaceholder: {
    width: '100%',
    height: 60,
    backgroundColor: theme.colors.placeholder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ministryName: {
    ...theme.typography.title,
    fontSize: 16,
    marginBottom: theme.spacing.xs,
  },
  ministryDescription: {
    ...theme.typography.caption,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: theme.spacing.lg,
  },
  menuItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  menuIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    ...theme.shadows.medium,
  },
  menuItemText: {
    ...theme.typography.title,
    fontSize: 16,
    marginTop: theme.spacing.xs,
  },
});

export default HomeScreen;