import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Animated 
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const DevotionalScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isFocused) {
      // When screen comes into focus, animate in
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset animations when leaving
      scaleAnim.setValue(0.8);
      opacityAnim.setValue(0);
    }
  }, [isFocused]);

  // Sample devotional content
  const devotionalContent = {
    title: "Daily Devotional",
    verse: "Philippians 4:13",
    text: "I can do all things through Christ who strengthens me.",
    reflection: "Today's reflection reminds us that with God's strength, we can overcome any challenge. When we face difficult situations, we can find comfort in knowing that we are not alone. God's power works through our weaknesses, and His grace is sufficient for us.",
    prayer: "Lord, thank you for your strength that works in me. Help me to rely on you in all circumstances and to remember that with you, all things are possible. Amen."
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <FontAwesome5 name="arrow-left" size={20} color="#2c5282" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Daily Devotional</Text>
            <View style={{ width: 20 }} />
          </View>
          
          <View style={styles.devotionalContainer}>
            <Text style={styles.title}>{devotionalContent.title}</Text>
            <Text style={styles.verse}>{devotionalContent.verse}</Text>
            <Text style={styles.verseText}>"{devotionalContent.text}"</Text>
            
            <View style={styles.divider} />
            
            <Text style={styles.sectionTitle}>Reflection</Text>
            <Text style={styles.reflectionText}>{devotionalContent.reflection}</Text>
            
            <View style={styles.divider} />
            
            <Text style={styles.sectionTitle}>Prayer</Text>
            <Text style={styles.prayerText}>{devotionalContent.prayer}</Text>
            
            <TouchableOpacity style={styles.shareButton}>
              <FontAwesome5 name="share-alt" size={16} color="#fff" />
              <Text style={styles.shareButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a9c25d',
  },
  animatedContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#d4f5c9',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  devotionalContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 10,
    textAlign: 'center',
  },
  verse: {
    fontSize: 18,
    color: '#4a5568',
    marginBottom: 10,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  verseText: {
    fontSize: 20,
    color: '#2c5282',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 10,
  },
  reflectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4a5568',
  },
  prayerText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4a5568',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a9c25d',
});

export default DevotionalScreen;