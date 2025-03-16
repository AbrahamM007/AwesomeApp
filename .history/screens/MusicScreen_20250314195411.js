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
            <Ionicons name={isPlaying ? "pause" : "play"} size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="play-skip-forward" size={24} color="#2c5282" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progressFill}></View>
        </View>
        <View style={styles.timeInfo}>
          <Text style={styles.timeText}>1:45</Text>
          <Text style={styles.timeText}>4:15</Text>
        </View>
      </View>
      
      <View style={styles.playlistHeader}>
        <Text style={styles.playlistTitle}>Songs</Text>
        <TouchableOpacity style={styles.shuffleButton}>
          <Ionicons name="shuffle" size={20} color="#2c5282" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.songsList}>
        {songs.map((song) => (
          <TouchableOpacity key={song.id} style={styles.songItem}>
            <View style={styles.songItemLeft}>
              <FontAwesome5 name="music" size={20} color="#2c5282" />
              <View style={styles.songItemInfo}>
                <Text style={styles.songItemTitle}>{song.title}</Text>
                <Text style={styles.songItemArtist}>{song.artist}</Text>
              </View>
            </View>
            <Text style={styles.songDuration}>{song.duration}</Text>
          </TouchableOpacity>
        ))}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#8eda8e',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2c5282',
  },
  menuButton: {
    padding: 5,
  },
  nowPlayingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#8eda8e',
    margin: 15,
    padding: 15,
    borderRadius: 15,
  },
  albumArt: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#fffde7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  songInfo: {
    flex: 1,
    marginLeft: 15,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c5282',
  },
  artistName: {
    fontSize: 14,
    color: '#2c5282',
    opacity: 0.8,
  },
  playControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2c5282',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  progressContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  progressBar: {
    height: 5,
    backgroundColor: '#fffde7',
    borderRadius: 2.5,
  },
  progressFill: {
    width: '40%',
    height: '100%',
    backgroundColor: '#2c5282',
    borderRadius: 2.5,
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  timeText: {
    fontSize: 12,
    color: '#2c5282',
  },
  playlistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  playlistTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c5282',
  },
  shuffleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8eda8e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  songsList: {
    flex: 1,
    paddingHorizontal: 15,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fffde7',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  songItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  songItemInfo: {
    marginLeft: 15,
  },
  songItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c5282',
  },
  songItemArtist: {
    fontSize: 14,
    color: '#2c5282',
    opacity: 0.7,
  },
  songDuration: {
    fontSize: 14,
    color: '#2c5282',
  },
});

export default MusicScreen;