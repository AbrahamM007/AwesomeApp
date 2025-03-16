import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  SafeAreaView,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning,</Text>
            <Text style={styles.username}>Abraham</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications" size={24} color="#5D3FD3" />
          </TouchableOpacity>
        </View>
        
        {/* Featured Banner */}
        <TouchableOpacity style={styles.bannerContainer}>
          <Image 
            source={require('../assets/church-banner.jpg')} 
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.bannerGradient}
          >
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>Sunday Service</Text>
              <Text style={styles.bannerSubtitle}>Join us this Sunday at 9:00 AM</Text>
              <View style={styles.bannerButton}>
                <Text style={styles.bannerButtonText}>Learn More</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        
        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionItem}>
              <View style={[styles.quickActionIcon, {backgroundColor: '#FFE0E6'}]}>
                <FontAwesome5 name="pray" size={20} color="#FF4069" />
              </View>
              <Text style={styles.quickActionText}>Prayer</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionItem}>
              <View style={[styles.quickActionIcon, {backgroundColor: '#E0F5FF'}]}>
                <FontAwesome5 name="bible" size={20} color="#0095FF" />
              </View>
              <Text style={styles.quickActionText}>Bible</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionItem}>
              <View style={[styles.quickActionIcon, {backgroundColor: '#E6FFF1'}]}>
                <FontAwesome5 name="hand-holding-heart" size={20} color="#00C853" />
              </View>
              <Text style={styles.quickActionText}>Give</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionItem}>
              <View style={[styles.quickActionIcon, {backgroundColor: '#F5E0FF'}]}>
                <FontAwesome5 name="music" size={20} color="#9C27B0" />
              </View>
              <Text style={styles.quickActionText}>Worship</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Upcoming Events */}
        <View style={styles.eventsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Events')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.eventsScrollContent}
          >
            <TouchableOpacity style={styles.eventCard}>
              <View style={styles.eventDateBadge}>
                <Text style={styles.eventDateDay}>12</Text>
                <Text style={styles.eventDateMonth}>JUN</Text>
              </View>
              <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>Sunday Service</Text>
                <View style={styles.eventInfo}>
                  <Ionicons name="time-outline" size={14} color="#666" />
                  <Text style={styles.eventInfoText}>9:00 AM - 11:00 AM</Text>
                </View>
                <View style={styles.eventInfo}>
                  <Ionicons name="location-outline" size={14} color="#666" />
                  <Text style={styles.eventInfoText}>Main Sanctuary</Text>
                </View>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.eventCard}>
              <View style={styles.eventDateBadge}>
                <Text style={styles.eventDateDay}>15</Text>
                <Text style={styles.eventDateMonth}>JUN</Text>
              </View>
              <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>Bible Study</Text>
                <View style={styles.eventInfo}>
                  <Ionicons name="time-outline" size={14} color="#666" />
                  <Text style={styles.eventInfoText}>7:00 PM - 8:30 PM</Text>
                </View>
                <View style={styles.eventInfo}>
                  <Ionicons name="location-outline" size={14} color="#666" />
                  <Text style={styles.eventInfoText}>Fellowship Hall</Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        
        {/* Daily Verse */}
        <View style={styles.verseContainer}>
          <Text style={styles.sectionTitle}>Daily Verse</Text>
          <View style={styles.verseCard}>
            <Text style={styles.verseText}>
              "For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future."
            </Text>
            <Text style={styles.verseReference}>Jeremiah 29:11</Text>
            <TouchableOpacity style={styles.shareButton}>
              <Ionicons name="share-outline" size={20} color="#5D3FD3" />
              <Text style={styles.shareButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Space at bottom */}
        <View style={{height: 20}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0EAFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerContainer: {
    marginHorizontal: 20,
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 15,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    justifyContent: 'flex-end',
  },
  bannerContent: {
    padding: 20,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#FFF',
    marginTop: 5,
  },
  bannerButton: {
    backgroundColor: '#5D3FD3',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  bannerButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  quickActionsContainer: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  quickActionItem: {
    alignItems: 'center',
    width: (width - 40) / 4,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  eventsContainer: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAllText: {
    color: '#5D3FD3',
    fontWeight: '600',
  },
  eventsScrollContent: {
    paddingTop: 15,
    paddingBottom: 5,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    width: width - 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  eventDateBadge: {
    width: 50,
    height: 60,
    backgroundColor: '#F0EAFA',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  eventDateDay: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5D3FD3',
  },
  eventDateMonth: {
    fontSize: 12,
    color: '#5D3FD3',
    fontWeight: '600',
  },
  eventDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  eventInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventInfoText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  verseContainer: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  verseCard: