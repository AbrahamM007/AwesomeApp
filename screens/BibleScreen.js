import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../components/AppHeader';
import theme from '../styles/theme';

// Bible books data
const bibleBooks = [
  { id: 'genesis', name: 'Genesis', chapters: 50 },
  { id: 'exodus', name: 'Exodus', chapters: 40 },
  { id: 'leviticus', name: 'Leviticus', chapters: 27 },
  { id: 'numbers', name: 'Numbers', chapters: 36 },
  { id: 'deuteronomy', name: 'Deuteronomy', chapters: 34 },
  { id: 'joshua', name: 'Joshua', chapters: 24 },
  { id: 'judges', name: 'Judges', chapters: 21 },
  { id: 'ruth', name: 'Ruth', chapters: 4 },
  { id: '1samuel', name: '1 Samuel', chapters: 31 },
  { id: '2samuel', name: '2 Samuel', chapters: 24 },
  { id: '1kings', name: '1 Kings', chapters: 22 },
  { id: '2kings', name: '2 Kings', chapters: 25 },
  { id: '1chronicles', name: '1 Chronicles', chapters: 29 },
  { id: '2chronicles', name: '2 Chronicles', chapters: 36 },
  { id: 'ezra', name: 'Ezra', chapters: 10 },
  { id: 'nehemiah', name: 'Nehemiah', chapters: 13 },
  { id: 'esther', name: 'Esther', chapters: 10 },
  { id: 'job', name: 'Job', chapters: 42 },
  { id: 'psalms', name: 'Psalms', chapters: 150 },
  { id: 'proverbs', name: 'Proverbs', chapters: 31 },
  { id: 'ecclesiastes', name: 'Ecclesiastes', chapters: 12 },
  { id: 'songofsolomon', name: 'Song of Solomon', chapters: 8 },
  { id: 'isaiah', name: 'Isaiah', chapters: 66 },
  { id: 'jeremiah', name: 'Jeremiah', chapters: 52 },
  { id: 'lamentations', name: 'Lamentations', chapters: 5 },
  { id: 'ezekiel', name: 'Ezekiel', chapters: 48 },
  { id: 'daniel', name: 'Daniel', chapters: 12 },
  { id: 'hosea', name: 'Hosea', chapters: 14 },
  { id: 'joel', name: 'Joel', chapters: 3 },
  { id: 'amos', name: 'Amos', chapters: 9 },
  { id: 'obadiah', name: 'Obadiah', chapters: 1 },
  { id: 'jonah', name: 'Jonah', chapters: 4 },
  { id: 'micah', name: 'Micah', chapters: 7 },
  { id: 'nahum', name: 'Nahum', chapters: 3 },
  { id: 'habakkuk', name: 'Habakkuk', chapters: 3 },
  { id: 'zephaniah', name: 'Zephaniah', chapters: 3 },
  { id: 'haggai', name: 'Haggai', chapters: 2 },
  { id: 'zechariah', name: 'Zechariah', chapters: 14 },
  { id: 'malachi', name: 'Malachi', chapters: 4 },
  { id: 'matthew', name: 'Matthew', chapters: 28 },
  { id: 'mark', name: 'Mark', chapters: 16 },
  { id: 'luke', name: 'Luke', chapters: 24 },
  { id: 'john', name: 'John', chapters: 21 },
  { id: 'acts', name: 'Acts', chapters: 28 },
  { id: 'romans', name: 'Romans', chapters: 16 },
  { id: '1corinthians', name: '1 Corinthians', chapters: 16 },
  { id: '2corinthians', name: '2 Corinthians', chapters: 13 },
  { id: 'galatians', name: 'Galatians', chapters: 6 },
  { id: 'ephesians', name: 'Ephesians', chapters: 6 },
  { id: 'philippians', name: 'Philippians', chapters: 4 },
  { id: 'colossians', name: 'Colossians', chapters: 4 },
  { id: '1thessalonians', name: '1 Thessalonians', chapters: 5 },
  { id: '2thessalonians', name: '2 Thessalonians', chapters: 3 },
  { id: '1timothy', name: '1 Timothy', chapters: 6 },
  { id: '2timothy', name: '2 Timothy', chapters: 4 },
  { id: 'titus', name: 'Titus', chapters: 3 },
  { id: 'philemon', name: 'Philemon', chapters: 1 },
  { id: 'hebrews', name: 'Hebrews', chapters: 13 },
  { id: 'james', name: 'James', chapters: 5 },
  { id: '1peter', name: '1 Peter', chapters: 5 },
  { id: '2peter', name: '2 Peter', chapters: 3 },
  { id: '1john', name: '1 John', chapters: 5 },
  { id: '2john', name: '2 John', chapters: 1 },
  { id: '3john', name: '3 John', chapters: 1 },
  { id: 'jude', name: 'Jude', chapters: 1 },
  { id: 'revelation', name: 'Revelation', chapters: 22 },
];

const BibleScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bibleText, setBibleText] = useState('');
  
  // Filter books based on search query
  const filteredBooks = bibleBooks.filter(book => 
    book.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Generate array of chapter numbers for the selected book
  const chapters = selectedBook 
    ? Array.from({ length: selectedBook.chapters }, (_, i) => i + 1) 
    : [];
  
  // Handle book selection
  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setSelectedChapter(null);
    setBibleText('');
  };
  
  // Handle chapter selection
  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
    fetchBibleText(selectedBook.id, chapter);
  };
  
  // Fetch Bible text from API
  const fetchBibleText = async (bookId, chapter) => {
    setLoading(true);
    
    try {
      // This is a placeholder for an actual Bible API call
      // In a real app, you would use an API like Bible.api.bible or similar
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sample text (in a real app, this would come from the API)
      const sampleText = `This is sample text for ${selectedBook.name} chapter ${chapter}. In a real app, this would be fetched from a Bible API service. The text would include all verses from the chapter with proper formatting.

1 In the beginning God created the heaven and the earth.
2 And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.
3 And God said, Let there be light: and there was light.
4 And God saw the light, that it was good: and God divided the light from the darkness.
5 And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.`;
      
      setBibleText(sampleText);
    } catch (error) {
      console.error('Error fetching Bible text:', error);
      setBibleText('Error loading Bible text. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Render book item
  const renderBookItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.bookItem,
        selectedBook?.id === item.id && styles.selectedBookItem
      ]}
      onPress={() => handleBookSelect(item)}
    >
      <Text 
        style={[
          styles.bookName,
          selectedBook?.id === item.id && styles.selectedBookName
        ]}
      >
        {item.name}
      </Text>
      <Text style={styles.chapterCount}>{item.chapters} chapters</Text>
    </TouchableOpacity>
  );
  
  // Render chapter item
  const renderChapterItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.chapterItem,
        selectedChapter === item && styles.selectedChapterItem
      ]}
      onPress={() => handleChapterSelect(item)}
    >
      <Text 
        style={[
          styles.chapterNumber,
          selectedChapter === item && styles.selectedChapterNumber
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <AppHeader 
        title="BIBLE" 
        showBackButton={true}
        backgroundColor={theme.colors.background}
        titleStyle={styles.headerTitle}
      />
      
      <View style={styles.container}>
        {/* Search bar */}
        <View style={styles.searchContainer}>
          <FontAwesome5 name="search" size={16} color={theme.colors.primary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a book..."
            placeholderTextColor="#666666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <FontAwesome5 name="times-circle" size={16} color={theme.colors.primary} />
            </TouchableOpacity>
          ) : null}
        </View>
        
        {/* Bible navigation */}
        <View style={styles.bibleNavigation}>
          {/* Books list */}
          {!selectedBook ? (
            <FlatList
              data={filteredBooks}
              renderItem={renderBookItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.booksList}
              showsVerticalScrollIndicator={false}
              numColumns={2}
            />
          ) : (
            <View style={styles.chapterView}>
              {/* Book header with back button */}
              <View style={styles.bookHeader}>
                <TouchableOpacity 
                  style={styles.backButton}
                  onPress={() => setSelectedBook(null)}
                >
                  <FontAwesome5 name="arrow-left" size={16} color={theme.colors.primary} />
                  <Text style={styles.backButtonText}>Books</Text>
                </TouchableOpacity>
                <Text style={styles.selectedBookTitle}>{selectedBook.name}</Text>
              </View>
              
              {/* Chapters grid */}
              {!selectedChapter ? (
                <FlatList
                  data={chapters}
                  renderItem={renderChapterItem}
                  keyExtractor={item => item.toString()}
                  contentContainerStyle={styles.chaptersList}
                  showsVerticalScrollIndicator={false}
                  numColumns={5}
                />
              ) : (
                <View style={styles.bibleTextContainer}>
                  {/* Chapter header with back button */}
                  <View style={styles.chapterHeader}>
                    <TouchableOpacity 
                      style={styles.backButton}
                      onPress={() => setSelectedChapter(null)}
                    >
                      <FontAwesome5 name="arrow-left" size={16} color={theme.colors.primary} />
                      <Text style={styles.backButtonText}>Chapters</Text>
                    </TouchableOpacity>
                    <Text style={styles.selectedChapterTitle}>
                      {selectedBook.name} {selectedChapter}
                    </Text>
                  </View>
                  
                  {/* Bible text */}
                  {loading ? (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator size="large" color={theme.colors.primary} />
                      <Text style={styles.loadingText}>Loading scripture...</Text>
                    </View>
                  ) : (
                    <View style={styles.textContainer}>
                      <Text style={styles.bibleText}>{bibleText}</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          )}
        </View>
      </View>
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
    padding: theme.spacing.md,
  },
  headerTitle: {
    ...theme.typography.header,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: '#ffffff',
    fontSize: 16,
  },
  bibleNavigation: {
    flex: 1,
  },
  booksList: {
    paddingBottom: theme.spacing.lg,
  },
  bookItem: {
    ...theme.components.card,
    width: '48%',
    marginHorizontal: '1%',
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
  },
  selectedBookItem: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  bookName: {
    ...theme.typography.title,
    fontSize: 16,
    marginBottom: theme.spacing.xs,
  },
  selectedBookName: {
    color: theme.colors.primary,
  },
  chapterCount: {
    ...theme.typography.caption,
    fontSize: 12,
  },
  chapterView: {
    flex: 1,
  },
  bookHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
  },
  backButtonText: {
    ...theme.typography.body,
    color: theme.colors.primary,
    marginLeft: theme.spacing.xs,
  },
  selectedBookTitle: {
    ...theme.typography.title,
    marginLeft: theme.spacing.md,
  },
  chaptersList: {
    paddingBottom: theme.spacing.lg,
  },
  chapterItem: {
    width: '18%',
    aspectRatio: 1,
    margin: '1%',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.small,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  selectedChapterItem: {
    backgroundColor: theme.colors.primary,
  },
  chapterNumber: {
    ...theme.typography.title,
    fontSize: 16,
  },
  selectedChapterNumber: {
    color: '#000000',
  },
  bibleTextContainer: {
    flex: 1,
  },
  chapterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  selectedChapterTitle: {
    ...theme.typography.title,
    marginLeft: theme.spacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...theme.typography.body,
    marginTop: theme.spacing.md,
    color: theme.colors.primary,
  },
  textContainer: {
    ...theme.components.card,
    flex: 1,
    padding: theme.spacing.md,
  },
  bibleText: {
    ...theme.typography.body,
    lineHeight: 24,
  }
});

export default BibleScreen;