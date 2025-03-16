import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const MusicScreen = ({ navigation }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const songs = [
    { id: 1, title: 'Amazing Grace', artist: 'Church Choir', duration: '4:15' },
    { id: 2, title: 'How Great Is Our God', artist: 'Worship Team', duration: '5:02' },
    { id: 3, title: 'Oceans', artist: 'Praise Band', duration: '6:30' },
    { id: 4, title: '10,000 Reasons', artist: 'Worship Team', duration: '4:45' },
    { id: 5, title: 'What A Beautiful Name', artist: 'Church Choir', duration: '5:20' },
    { id: 6, title: 'Great Are You Lord', artist: 'Praise Band', duration: '4:10' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#2c5282" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Music</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#2c5282" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.nowPlayingContainer}>
        <View style={styles.albumArt}>
          <FontAwesome5 name="music" size={40} color="#2c5282" />
        </View>
        <View style={styles.songInfo}>
          <Text style={styles.songTitle}>Amazing Grace</Text>
          <Text style={styles.artistName}>Church Choir</Text>
        </View>
        <View style={styles.playControls}>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="play-skip-back" size={24} color="#2c5282" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.playButton}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <Ionicons name={isPlaying ? "pause" : "play"}