import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AppsScreen = () => {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerTitle}>Apps</Text>
        
        <View style={styles.appsGrid}>
          {/* Row 1 */}
          <View style={styles.appRow}>
            <TouchableOpacity 
              style={[styles.appCard, styles.appCardWide]}
              onPress={() => navigation.navigate('Ministry')}
            >
              <FontAwesome5 name="seedling" size={28} color="#2c5282" />
              <Text style={styles.appText}>Ministry</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.appCard}
              onPress={() => navigation.navigate('Bible')}
            >
              <FontAwesome5 name="bible" size={28} color="#2c5282" />
            </TouchableOpacity>
          </View>
          
          {/* Row 2 */}
          <View style={styles.appRow}>
            <TouchableOpacity 
              style={styles.appCard}
              onPress={() => navigation.navigate('Donation')}
            >
              <FontAwesome5 name="donate" size={28} color="#2c5282" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.appCard, styles.appCardWide]}
              onPress={() => navigation.navigate('Events')}
            >
              <FontAwesome5 name="calendar-check" size={28} color="#2c5282" />
              <Text style={styles.appText}>Events</Text>
            </TouchableOpacity>
          </View>
          
          {/* Row 3 */}
          <View style={styles.appRow}>
            <TouchableOpacity 
              style={[styles.appCard, styles.appCardWide]}
              onPress={() => navigation.navigate('Music')}
            >
              <FontAwesome5 name="music" size={28} color="#2c5282" />
              <Text style={styles.appText}>Music</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.appCard}>
              <FontAwesome5 name="wallet" size={28} color="#2c5282" />
            </TouchableOpacity>
          </View>
          
          {/* Row 4 */}
          <View style={styles.appRow}>
            <TouchableOpacity 
              style={styles.appCard}
              onPress={() => navigation.navigate('PrayerRequest')}
            >
              <FontAwesome5 name="comment" size={28} color="#2c5282" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.appCard, styles.appCardWide]}
              onPress={() => navigation.navigate('LifeGroups')}
            >
              <View style={styles.appContent}>
                <Text style={styles.appText}>Life{'\n'}Groups</Text>
                <FontAwesome5 name="leaf" size={28} color="#2c5282" style={styles.rightIcon} />
              </View>
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
    backgroundColor: '#d4f5c9', // Light green background
  },
  scrollContainer: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c5282', // Dark blue color
    textAlign: 'center',
    marginVertical: 20,
  },
  appsGrid: {
    marginTop: 30,
  },
  appRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  appCard: {
    backgroundColor: '#8eda8e',
    borderRadius: 20,
    width: '30%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    paddingHorizontal: 15,
  },
  appCardWide: {
    width: '65%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 25,
  },
  appText: {
    color: '#2c5282',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 15,
  },
  appContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  rightIcon: {
    marginLeft: 10,
  }
});

export default AppsScreen;