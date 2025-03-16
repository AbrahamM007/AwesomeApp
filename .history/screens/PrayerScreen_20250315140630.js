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
  ActivityIndicator,
  Alert
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppHeader from '../components/AppHeader';
import theme from '../styles/theme';

const PrayerScreen = () => {
  const navigation = useNavigation();
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPrayer, setNewPrayer] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Load prayers from AsyncStorage
  useEffect(() => {
    const loadPrayers = async () => {
      try {
        setLoading(true);
        const storedPrayers = await AsyncStorage.getItem('prayers');
        if (storedPrayers) {
          const parsedPrayers = JSON.parse(storedPrayers);
          // Sort by date (newest first)
          parsedPrayers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setPrayers(parsedPrayers);
        }
      } catch (error) {
        console.error('Error loading prayers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPrayers();

    // Add listener to refresh prayers when navigating back to this screen
    const unsubscribe = navigation.addListener('focus', loadPrayers);
    return unsubscribe;
  }, [navigation]);

  // Submit a new prayer request
  const handleSubmitPrayer = async () => {
    if (!newPrayer.trim()) {
      Alert.alert('Error', 'Please enter a prayer request');
      return;
    }

    try {
      setSubmitting(true);
      
      // Create new prayer object
      const prayer = {
        id: Date.now().toString(),
        text: newPrayer.trim(),
        createdAt: new Date().toISOString(),
        prayedFor: 0,
        isAnswered: false,
      };

      // Add to prayers array
      const updatedPrayers = [prayer, ...prayers];
      setPrayers(updatedPrayers);
      
      // Save to AsyncStorage
      await AsyncStorage.setItem('prayers', JSON.stringify(updatedPrayers));
      
      // Clear input
      setNewPrayer('');
    } catch (error) {
      console.error('Error submitting prayer:', error);
      Alert.alert('Error', 'Failed to submit prayer request');
    } finally {
      setSubmitting(false);
    }
  };

  // Mark a prayer as prayed for
  const handlePrayFor = async (id) => {
    try {
      const updatedPrayers = prayers.map(prayer => {
        if (prayer.id === id) {
          return { ...prayer, prayedFor: prayer.prayedFor + 1 };
        }
        return prayer;
      });
      
      setPrayers(updatedPrayers);
      await AsyncStorage.setItem('prayers', JSON.stringify(updatedPrayers));
    } catch (error) {
      console.error('Error updating prayer:', error);
    }
  };

  // Toggle answered status
  const toggleAnswered = async (id) => {
    try {
      const updatedPrayers = prayers.map(prayer => {
        if (prayer.id === id) {
          return { ...prayer, isAnswered: !prayer.isAnswered };
        }
        return prayer;
      });
      
      setPrayers(updatedPrayers);
      await AsyncStorage.setItem('prayers', JSON.stringify(updatedPrayers));
    } catch (error) {
      console.error('Error updating prayer:', error);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Render each prayer item
  const renderPrayerItem = ({ item }) => (
    <View style={[
      styles.prayerCard,
      item.isAnswered && styles.answeredPrayer
    ]}>
      <View style={styles.prayerHeader}>
        <Text style={styles.prayerDate}>{formatDate(item.createdAt)}</Text>
        {item.isAnswered && (
          <View style={styles.answeredBadge}>
            <Text style={styles.answeredText}>ANSWERED</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.prayerText}>{item.text}</Text>
      
      <View style={styles.prayerActions}>
        <TouchableOpacity 
          style={styles.prayButton}
          onPress={() => handlePrayFor(item.id)}
        >
          <FontAwesome5 name="pray" size={16} color={theme.colors.primary} />
          <Text style={styles.prayButtonText}>
            Pray {item.prayedFor > 0 ? `(${item.prayedFor})` : ''}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.toggleButton}
          onPress={() => toggleAnswered(item.id)}
        >
          <FontAwesome5 
            name={item.isAnswered ? "times-circle" : "check-circle"} 
            size={16} 
            color={theme.colors.primary} 
          />
          <Text style={styles.toggleButtonText}>
            {item.isAnswered ? 'Mark Unanswered' : 'Mark Answered'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <AppHeader 
        title="PRAYER" 
        showBackButton={true}
        backgroundColor={theme.colors.background}
        titleStyle={styles.headerTitle}
      />
      
      <View style={styles.container}>
        {/* Prayer input section */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your prayer request..."
            placeholderTextColor="#666666"
            value={newPrayer}
            onChangeText={setNewPrayer}
            multiline
            numberOfLines={3}
          />
          
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmitPrayer}
            disabled={submitting}
          >
            {submitting ? (
              <ActivityIndicator size="small" color="#000000" />
            ) : (
              <Text style={styles.submitButtonText}>SUBMIT</Text>
            )}
          </TouchableOpacity>
        </View>
        
        {/* Prayer list */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingText}>Loading prayers...</Text>
          </View>
        ) : prayers.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <FontAwesome5 name="pray" size={40} color="#000000" />
            </View>
            <Text style={styles.emptyText}>NO PRAYER REQUESTS</Text>
            <Text style={styles.emptySubText}>
              Submit a prayer request to get started
            </Text>
          </View>
        ) : (
          <FlatList
            data={prayers}
            renderItem={renderPrayerItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
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
  inputContainer: {
    marginBottom: theme.spacing.lg,
  },
  input: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    textAlignVertical: 'top',
    minHeight: 100,
    marginBottom: theme.spacing.sm,
  },
  submitButton: {
    ...theme.components.button.primary,
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  submitButtonText: {
    ...theme.typography.button,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: theme.spacing.md,
    color: theme.colors.primary,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  emptyIconContainer: {
    ...theme.components.iconContainer,
    marginBottom: theme.spacing.lg,
  },
  emptyText: {
    ...theme.typography.title,
    marginBottom: theme.spacing.sm,
  },
  emptySubText: {
    ...theme.typography.body,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: theme.spacing.xl,
  },
  prayerCard: {
    ...theme.components.card,
    marginBottom: theme.spacing.md,
  },
  answeredPrayer: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  prayerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  prayerDate: {
    ...theme.typography.caption,
    fontSize: 12,
  },
  answeredBadge: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: theme.borderRadius.small,
  },
  answeredText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  prayerText: {
    ...theme.typography.body,
    marginBottom: theme.spacing.md,
  },
  prayerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: theme.colors.cardBorder,
    paddingTop: theme.spacing.sm,
  },
  prayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
  },
  prayButtonText: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    marginLeft: theme.spacing.xs,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
  },
  toggleButtonText: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    marginLeft: theme.spacing.xs,
  },
});

export default PrayerScreen;