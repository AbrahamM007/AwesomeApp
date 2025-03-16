import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const devotionals = [
  {
    id: '1',
    title: 'Finding Peace in Troubled Times',
    verse: 'John 14:27',
    content: 'Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.',
    reflection: 'In a world filled with uncertainty and chaos, Jesus offers us a peace that transcends all understanding. This peace is not dependent on our circumstances but on our relationship with Him. When we trust in God, we can experience true peace even in the midst of life\'s storms.',
    date: 'Today',
  },
  {
    id: '2',
    title: 'The Power of Faith',
    verse: 'Hebrews 11:1',
    content: 'Now faith is confidence in what we hope for and assurance about what we do not see.',
    reflection: 'Faith allows us to believe in God\'s promises even when we cannot see them fulfilled yet. It gives us the strength to persevere through difficult times, knowing that God is working all things together for our good. By exercising our faith daily, we grow stronger in our relationship with God.',
    date: 'Yesterday',
  },
  {
    id: '3',
    title: 'Living with Purpose',
    verse: 'Ephesians 2:10',
    content: 'For we are God\'s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.',
    reflection: 'God has created each of us with unique gifts and talents for a specific purpose. When we discover and embrace this purpose, we find fulfillment and joy in serving others and glorifying God. Take time today to reflect on how you can use your gifts to make a difference in the world.',
    date: '2 days ago',
  },
];

const DevotionalScreen = () => {
  const [selectedDevotional, setSelectedDevotional] = useState(devotionals[0]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Daily Devotional</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#2c5282" />
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.devotionalCard}>
          <View style={styles.devotionalHeader}>
            <View style={styles.devotionalTitleContainer}>
              <Text style={styles.devotionalTitle}>{selectedDevotional.title}</Text>
              <Text style={styles.devotionalDate}>{selectedDevotional.date}</Text>
            </View>
            <TouchableOpacity style={styles.bookmarkButton}>
              <Ionicons name="bookmark-outline" size={24} color="#2c5282" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.verseContainer}>
            <View style={styles.quoteIconContainer}>
              <FontAwesome5 name="quote-left" size={20} color="#8eda8e" />
            </View>
            <Text style={styles.verseText}>{selectedDevotional.content}</Text>
            <Text style={styles.verseReference}>{selectedDevotional.verse}</Text>
          </View>
          
          <View style={styles.reflectionContainer}>
            <Text style={styles.reflectionTitle}>Reflection</Text>
            <Text style={styles.reflectionText}>{selectedDevotional.reflection}</Text>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-social-outline" size={20} color="#2c5282" />
              <Text style={styles.actionButtonText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="heart-outline" size={20} color="#2c5282" />
              <Text style={styles.actionButtonText}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="chatbubble-outline" size={20} color="#2c5282" />
              <Text style={styles.actionButtonText}>Comment</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={styles.previousTitle}>Previous Devotionals</Text>
        
        {devotionals.slice(1).map(devotional => (
          <TouchableOpacity 
            key={devotional.id} 
            style={styles.previousCard}
            onPress={() => setSelectedDevotional(devotional)}
          >
            <View style={styles.previousContent}>
              <Text style={styles.previousCardTitle}>{devotional.title}</Text>
              <Text style={styles.previousCardVerse}>{devotional.verse}</Text>
              <Text style={styles.previousCardDate}>{devotional.date}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#2c5282" />
          </TouchableOpacity>
        ))}
        
        {/* Bottom padding to account for the floating tab bar */}
        <View style={{height: 100}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4f5c9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 10,
  },
  devotionalCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  devotionalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  devotionalTitleContainer: {
    flex: 1,
    marginRight: 10,
  },
  devotionalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c5282',
    marginBottom: 5,
  },
  devotionalDate: {
    fontSize: 14,
    color: '#666',
  },
  bookmarkButton: {
    padding: 5,
  },
  verseContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    position: 'relative',
  },
  quoteIconContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  verseText: {
    fontSize: 18,
    color: '#333',
    fontStyle: 'italic',
    lineHeight: 26,
    marginBottom: 10,
    paddingLeft: 25,
  },
  verseReference: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c5282',
    textAlign: 'right',
  },
  reflectionContainer: {
    marginBottom: 20,
  },
  reflectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c5282',
    marginBottom: 10,
  },
  reflectionText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  actionButtonText: {
    marginLeft: 5,
    color: '#2c5282',
    fontWeight: '500',
  },
  previousTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c5282',
    marginBottom: 15,
  },
  previousCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  previousContent: {
    flex: 1,
  },
  previousCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c5282',
    marginBottom: 5,
  },
  previousCardVerse: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  previousCardDate: {
    fontSize: 12,
    color: '#999',
  },
});

export default DevotionalScreen;