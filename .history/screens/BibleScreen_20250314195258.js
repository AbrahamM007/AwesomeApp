import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const BibleScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  
  const bibleBooks = [
    { id: 1, name: 'Genesis', chapters: 50 },
    { id: 2, name: 'Exodus', chapters: 40 },
    { id: 3, name: 'Leviticus', chapters: 27 },
    { id: 4, name: 'Numbers', chapters: 36 },
    { id: 5, name: 'Deuteronomy', chapters: 34 },
    { id: 6, name: 'Joshua', chapters: 24 },
    { id: 7, name: 'Judges', chapters: 21 },
    { id: 8, name: 'Ruth', chapters: 4 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#2c5282" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bible</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#2c5282" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#2c5282" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search the Bible"
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#2c5282"
        />
      </View>
      
      <ScrollView style={styles.booksContainer}>
        {bibleBooks.map((book) => (
          <TouchableOpacity key={book.id} style={styles.bookItem}>
            <Text style={styles.bookName}>{book.name}</Text>
            <Text style={styles.chapterCount}>{book.chapters} chapters</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.recentContainer}>
        <Text style={styles.recentTitle}>Recent</Text>
        <View style={styles.recentItems}>
          <TouchableOpacity style={styles.recentItem}>
            <Text style={styles.recentText}>John 3:16</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.recentItem}>
            <Text style={styles.recentText}>Psalm 23</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8eda8e',
    borderRadius: 20,
    margin: 15,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: '#2c5282',
    fontSize: 16,
  },
  booksContainer: {
    flex: 1,
    padding: 15,
  },
  bookItem: {
    backgroundColor: '#fffde7',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2c5282',
  },
  chapterCount: {
    fontSize: 14,
    color: '#2c5282',
    opacity: 0.7,
  },
  recentContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#8eda8e',
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c5282',
    marginBottom: 10,
  },
  recentItems: {
    flexDirection: 'row',
  },
  recentItem: {
    backgroundColor: '#8eda8e',
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
  },
  recentText: {
    color: '#2c5282',
    fontWeight: '500',
  },
});

export default BibleScreen;