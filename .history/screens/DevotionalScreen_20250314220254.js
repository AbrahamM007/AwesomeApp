import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const DevotionalScreen = ({ route, navigation }) => {
  const devotionalId = route?.params?.devotionalId;
  const [bookmarked, setBookmarked] = useState(false);
  const { userInfo } = useAuth();
  
  // Mock devotional data
  const devotional = {
    id: '1',
    title: 'Finding Peace in Troubled Times',
    verse: 'John 14:27',
    verseText: 'Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.',
    content: `
In a world filled with chaos and uncertainty, peace can seem elusive. We often search for peace in external circumstances - in financial security, relationships, or achievements. But true peace, as Jesus teaches us, comes from a different source.

When Jesus says, "Peace I leave with you; my peace I give you," He's offering something profound. This isn't the temporary peace that the world offers - peace that depends on everything going right. This is a deep, abiding peace that remains steady even in the midst of life's storms.

Jesus continues by saying, "I do not give to you as the world gives." The world's peace is conditional and fleeting. It disappears at the first sign of trouble. But the peace Jesus offers is different. It's a peace that surpasses understanding, a peace that guards our hearts and minds (Philippians 4:7).

The command that follows is equally important: "Do not let your hearts be troubled and do not be afraid." Jesus isn't suggesting that we'll never face difficulties. Rather, He's reminding us that even in those difficult moments, we don't have to be overwhelmed by trouble or fear.

Today, whatever challenges you're facing, remember that you have access to the peace of Christ. It's not dependent on your circumstances changing. It's available right now, in the midst of whatever you're going through.

Take a moment to quiet your heart, to release your worries and fears to God, and to receive the peace that Jesus offers. Let it fill you, strengthen you, and guide you through this day.
    `,
    date: 'May 15, 2023',
    author: 'Pastor John Smith'
  };
  
  const handleShare = async () => {
    try {
      await Share.share({
        message: `${devotional.title}\n\n${devotional.verse}: ${devotional.verseText}\n\nFrom the AwesomeApp daily devotional`,
      });
    } catch (error) {
      console.log('Error sharing:', error.message);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={20} color="#2c5282" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daily Devotional</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => setBookmarked(!bookmarked)}
          >
            <FontAwesome5 
              name="bookmark" 
              solid={bookmarked}
              size={20} 
              color="#2c5282" 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={handleShare}
          >
            <FontAwesome5 name="share-alt" size={20} color="#2c5282" />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.devotionalHeader}>
          <Text style={styles.devotionalTitle}>{devotional.title}</Text>
          <Text style={styles.devotionalDate}>{devotional.date}</Text>
          <Text style={styles.devotionalAuthor}>By {devotional.author}</Text>
        </View>
        
        <View style={styles.verseContainer}>
          <Text style={styles.verseReference}>{devotional.verse}</Text>
          <Text style={styles.verseText}>"{devotional.verseText}"</Text>
        </View>
        
        <Text style={styles.devotionalContent}>{devotional.content}</Text>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome5 name="comment" size={18} color="#fff" />
            <Text style={styles.actionButtonText}>Comment</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome5 name="pray" size={18} color="#fff" />
            <Text style={styles.actionButtonText}>Prayer Request</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 5,
    marginLeft: 15,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  devotionalHeader: {
    marginBottom: 20,
  },
  devotionalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 10,
  },
  devotionalDate: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 5,
  },
  devotionalAuthor: {
    fontSize: 14,
    color: '#718096',
    fontStyle: 'italic',
  },
  verseContainer: {
    backgroundColor: '#e6f7ff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  verseReference: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c5282',
    marginBottom: 5,
  },
  verseText: {
    fontSize: 16,
    color: '#4a5568',
    fontStyle: 'italic',
    lineHeight: 24,
  },
  devotionalContent: {
    fontSize: 16,
    color: '#4a5568',
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 40,
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#2c5282',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.48,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default DevotionalScreen;