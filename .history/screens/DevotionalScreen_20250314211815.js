import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
// Remove LinearGradient import
// import { LinearGradient } from 'expo-linear-gradient';

const devotionals = [
  {
    id: '1',
    title: 'Finding Peace in Troubled Times',
    verse: 'John 14:27',
    content: 'Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.',
    reflection: 'In a world filled with uncertainty and chaos, Jesus offers us a peace that transcends all understanding. This peace is not dependent on our circumstances but on our relationship with Him. When we trust in God, we can experience true peace even in the midst of life\'s storms.',
    image: require('../assets/devotional1.jpg'),
  },
  {
    id: '2',
    title: 'The Power of Faith',
    verse: 'Hebrews 11:1',
    content: 'Now faith is confidence in what we hope for and assurance about what we do not see.',
    reflection: 'Faith allows us to believe in God\'s promises even when we cannot see them fulfilled yet. It gives us the strength to persevere through difficult times, knowing that God is working all things together for our good. By exercising our faith daily, we grow stronger in our relationship with God.',
    image: require('../assets/devotional1.jpg'),
  },
  {
    id: '3',
    title: 'Living with Purpose',
    verse: 'Ephesians 2:10',
    content: 'For we are God\'s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.',
    reflection: 'God has created each of us with unique gifts and talents for a specific purpose. When we discover and embrace this purpose, we find fulfillment and joy in serving others and glorifying God. Take time today to reflect on how you can use your gifts to make a difference in the world.',
    image: require('../assets/devotional1.jpg'),
  },
];

const DevotionalScreen = () => {
  const [selectedDevotional, setSelectedDevotional] = useState(devotionals[0]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Daily Devotional</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.devotionalCard}>
          <Image 
            source={selectedDevotional.image} 
            style={styles.devotionalImage}
            resizeMode="cover"
          />
          {/* Replace LinearGradient with a View */}
          <View
            style={[styles.imageOverlay, {backgroundColor: 'rgba(0,0,0,0.4)'}]}
          />
          <View style={styles.devotionalTitleContainer}>
            <Text style={styles.devotionalTitle}>{selectedDevotional.title}</Text>
            <Text style={styles.devotionalVerse}>{selectedDevotional.verse}</Text>
          </View>
          
          <View style={styles.contentContainer}>
            <View style={styles.verseContainer}>
              <FontAwesome5 name="quote-left" size={16} color="#2c5282" style={styles.quoteIcon} />
              <Text style={styles.verseText}>{selectedDevotional.content}</Text>
              <FontAwesome5 name="quote-right" size={16} color="#2c5282" style={[styles.quoteIcon, styles.quoteRight]} />
            </View>
            
            <Text style={styles.reflectionTitle}>Reflection</Text>
            <Text style={styles.reflectionText}>{selectedDevotional.reflection}</Text>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="bookmark-outline" size={22} color="#2c5282" />
                <Text style={styles.actionButtonText}>Save</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="share-social-outline" size={22} color="#2c5282" />
                <Text style={styles.actionButtonText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <Text style={styles.moreDevotionalsTitle}>More Devotionals</Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.devotionalsList}
        >
          {devotionals.map((devotional) => (
            <TouchableOpacity 
              key={devotional.id}
              style={[
                styles.devotionalItem,
                selectedDevotional.id === devotional.id && styles.selectedDevotionalItem
              ]}
              onPress={() => setSelectedDevotional(devotional)}
            >
              <Image 
                source={devotional.image} 
                style={styles.devotionalItemImage}
                resizeMode="cover"
              />
              {/* Replace LinearGradient with a View */}
              <View
                style={[styles.devotionalItemOverlay, {backgroundColor: 'rgba(0,0,0,0.4)'}]}
              />
              <Text style={styles.devotionalItemTitle}>{devotional.title}</Text>
              <Text style={styles.devotionalItemVerse}>{devotional.verse}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <View style={styles.prayerSection}>
          <Text style={styles.prayerTitle}>Prayer of the Day</Text>
          <View style={styles.prayerCard}>
            <Text style={styles.prayerText}>
              Dear Lord, thank you for your guidance and love. Help me to apply today's devotional to my life and grow closer to you. Give me strength to face the challenges ahead and wisdom to make decisions that honor you. In Jesus' name, Amen.
            </Text>
            <TouchableOpacity style={styles.prayNowButton}>
              <Text style={styles.prayNowButtonText}>Pray Now</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  scrollContainer: {
    padding: 20,
  },
  devotionalCard: {
    backgroundColor: '#fffde7',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  devotionalImage: {
    width: '100%',
    height: 200,
  },
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 200,
  },
  devotionalTitleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
  },
  devotionalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  devotionalVerse: {
    fontSize: 16,
    color: '#fff',
    fontStyle: 'italic',
  },
  contentContainer: {
    padding: 20,
  },
  verseContainer: {
    backgroundColor: '#f0f8ff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  quoteIcon: {
    marginBottom: 10,
  },
  quoteRight: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 0,
  },
  verseText: {
    fontSize: 18,
    color: '#333',
    fontStyle: 'italic',
    lineHeight: 26,
    textAlign: 'center',
  },
  reflectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c5282',
    marginBottom: 10,
  },
  reflectionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f7ff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  actionButtonText: {
    color: '#2c5282',
    fontWeight: '600',
    marginLeft: 5,
  },
  moreDevotionalsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c5282',
    marginBottom: 15,
  },
  devotionalsList: {
    paddingBottom: 10,
  },
  devotionalItem: {
    width: 150,
    height: 200,
    borderRadius: 15,
    marginRight: 15,
    overflow: 'hidden',
  },
  selectedDevotionalItem: {
    borderWidth: 3,
    borderColor: '#8eda8e',
  },
  devotionalItemImage: {
    width: '100%',
    height: '100%',
  },
  devotionalItemOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  devotionalItemTitle: {
    position: 'absolute',
    bottom: 30,
    left: 10,
    right: 10,
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  devotionalItemVerse: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: '#fff',
    fontSize: 12,
    fontStyle: 'italic',
  },
  prayerSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  prayerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c5282',
    marginBottom: 15,
  },
  prayerCard: {
    backgroundColor: '#f0f8ff',
    borderRadius: 15,
    padding: 20,
  },
  prayerText: {
    fontSize: 16,
    color: '#333',
    fontStyle: 'italic',
    lineHeight: 24,
  },
  prayNowButton: {
    backgroundColor: '#8eda8e',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 15,
  },
  prayNowButtonText: {
    color: '#2c5282',
    fontWeight: '600',
  },
});

export default DevotionalScreen;