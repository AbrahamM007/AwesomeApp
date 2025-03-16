import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
  Image
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const { userInfo, logout } = useAuth();
  const navigation = useNavigation();
  
  const handleLogout = async () => {
    await logout();
    // Navigation will be handled by AppContent
  };
  
  // Navigation functions
  const navigateToMyGroups = () => {
    navigation.navigate('MyGroups');
  };
  
  const navigateToMyEvents = () => {
    navigation.navigate('Events');
  };
  
  const navigateToCreateGroup = () => {
    navigation.navigate('CreateGroup');
  };
  
  const navigateToCreateEvent = () => {
    navigation.navigate('CreateEvent');
  };
  
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [reminders, setReminders] = useState(true);
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImage}>
            <Text style={styles.profileInitial}>
              {userInfo?.name?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
        </View>
        <Text style={styles.profileName}>{userInfo?.name || 'User'}</Text>
        <Text style={styles.profileEmail}>{userInfo?.email || 'user@example.com'}</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Groups</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Events</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>28</Text>
            <Text style={styles.statLabel}>Prayers</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Content</Text>
        
        <TouchableOpacity style={styles.menuItem} onPress={navigateToMyGroups}>
          <View style={styles.menuItemLeft}>
            <FontAwesome5 name="users" size={20} color="#2c5282" style={styles.menuIcon} />
            <Text style={styles.menuText}>My Groups</Text>
          </View>
          <FontAwesome5 name="chevron-right" size={16} color="#a0aec0" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem} onPress={navigateToMyEvents}>
          <View style={styles.menuItemLeft}>
            <FontAwesome5 name="calendar-alt" size={20} color="#2c5282" style={styles.menuIcon} />
            <Text style={styles.menuText}>My Events</Text>
          </View>
          <FontAwesome5 name="chevron-right" size={16} color="#a0aec0" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem} onPress={navigateToCreateGroup}>
          <View style={styles.menuItemLeft}>
            <FontAwesome5 name="plus-circle" size={20} color="#2c5282" style={styles.menuIcon} />
            <Text style={styles.menuText}>Create New Group/Ministry</Text>
          </View>
          <FontAwesome5 name="chevron-right" size={16} color="#a0aec0" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem} onPress={navigateToCreateEvent}>
          <View style={styles.menuItemLeft}>
            <FontAwesome5 name="calendar-plus" size={20} color="#2c5282" style={styles.menuIcon} />
            <Text style={styles.menuText}>Create New Event</Text>
          </View>
          <FontAwesome5 name="chevron-right" size={16} color="#a0aec0" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingItemLeft}>
            <FontAwesome5 name="bell" size={20} color="#2c5282" style={styles.settingIcon} />
            <Text style={styles.settingText}>Notifications</Text>
          </View>
          <Switch
            trackColor={{ false: "#cbd5e0", true: "#90cdf4" }}
            thumbColor={notifications ? "#2c5282" : "#a0aec0"}
            onValueChange={setNotifications}
            value={notifications}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingItemLeft}>
            <FontAwesome5 name="moon" size={20} color="#2c5282" style={styles.settingIcon} />
            <Text style={styles.settingText}>Dark Mode</Text>
          </View>
          <Switch
            trackColor={{ false: "#cbd5e0", true: "#90cdf4" }}
            thumbColor={darkMode ? "#2c5282" : "#a0aec0"}
            onValueChange={setDarkMode}
            value={darkMode}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingItemLeft}>
            <FontAwesome5 name="clock" size={20} color="#2c5282" style={styles.settingIcon} />
            <Text style={styles.settingText}>Event Reminders</Text>
          </View>
          <Switch
            trackColor={{ false: "#cbd5e0", true: "#90cdf4" }}
            thumbColor={reminders ? "#2c5282" : "#a0aec0"}
            onValueChange={setReminders}
            value={reminders}
          />
        </View>
      </View>
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <FontAwesome5 name="sign-out-alt" size={20} color="#fff" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#d4f5c9',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  profileImageContainer: {
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#8eda8e',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  profileInitial: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  statLabel: {
    fontSize: 14,
    color: '#718096',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 15,
    width: 25,
  },
  menuText: {
    fontSize: 16,
    color: '#4a5568',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 15,
    width: 25,
  },
  settingText: {
    fontSize: 16,
    color: '#4a5568',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#e53e3e',
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  versionText: {
    fontSize: 14,
    color: '#a0aec0',
  },
});

export default ProfileScreen;


// Add this near the top of your component
useEffect(() => {
  // Check authentication state when component mounts
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      console.log('User is signed in:', user.uid);
      // You might want to update state here to reflect the user is logged in
      setIsLoggedIn(true);
      setUserData({
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        // Add other user properties you need
      });
    } else {
      console.log('No user is signed in.');
      setIsLoggedIn(false);
      setUserData(null);
    }
  });

  // Cleanup subscription on unmount
  return () => unsubscribe();
}, []);