import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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
    image: require('../assets/devotional2.jpg'),
  },
  {
    id: '3',
    title: 'Living with Purpose',
    verse: 'Ephesians 2:10',
    content: 'For we are God\'s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.',
    reflection: 'God has created each of us with unique gifts and talents for a specific purpose. When we discover and embrace this purpose, we find fulfillment and joy in serving others and glorifying God. Take time today to reflect on how you can use your gifts to make a difference in the world.',
    image: require('../assets/devotional3.jpg'),
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
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.imageOverlay}
          />
          <View style={styles.devotionalTitleContainer}>
            <Text style={styles.devotionalTitle}>{selectedDevotional.title}</Text>
            <Text style={styles.devotionalVerse}>{selectedDevotional.verse}</Text>
          </View>
          
          <View style={styles.contentContainer}></View>