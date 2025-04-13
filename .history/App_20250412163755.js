import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import your screens
import EventsScreen from './screens/EventsScreen';
import HomeScreen from './screens/HomeScreen';
import DevotionalScreen from './screens/DevotionalScreen';
import ProfileScreen from './screens/ProfileScreen';
import CommunityScreen from './screens/CommunityScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import GroupMembersScreen from './screens/GroupMembersScreen';
import ManageMembersScreen from './screens/ManageMembersScreen';
import EditGroupScreen from './screens/EditGroupScreen';
import CommentsScreen from './screens/CommentsScreen';
import MyGroupsScreen from './screens/MyGroupsScreen';
import CreateEventScreen from './screens/CreateEventScreen';
import CreateGroupScreen from './screens/CreateGroupScreen';
import AnnouncementsScreen from './screens/AnnouncementsScreen';
import CreateAnnouncementScreen from './screens/CreateAnnouncementScreen';
import { registerForPushNotificationsAsync } from './utils/NotificationHelper';
// Remove this import
// import * as Notifications from 'expo-notifications';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Custom Tab Bar component with integrated center button
// Custom Tab Bar component with floating logo that expands
function CustomTabBar({ state, descriptors, navigation }) {
  // Animation values
  const expandAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    // Toggle expansion state
    const newValue = !isExpanded;
    setIsExpanded(newValue);
    
    // Animate to new state
    Animated.spring(expandAnim, {
      toValue: newValue ? 1 : 0,
      friction: 7,
      tension: 40,
      useNativeDriver: false, // We need to animate width which requires false
    }).start();
  };

  const handleDevotionalPress = () => {
    // Start animation
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1.5,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Reset animations
      scaleAnim.setValue(1);
      opacityAnim.setValue(1);
      // Navigate to Devotional
      navigation.navigate('Devotional');
    });
  };

  // Calculate width based on animation value
  const containerWidth = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['25%', '90%']
  });

  // Calculate opacity for other buttons
  const buttonsOpacity = expandAnim.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0, 0, 1]
  });

  // Calculate scale for the logo
  const logoScale = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9]
  });

  // Calculate background color for the container
  const containerBgColor = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(169, 194, 93, 0.0)', '#ffffff']
  });

  // Calculate shadow for the floating effect
  const shadowOpacity = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.2]
  });

  return (
    <View style={{ 
      position: 'absolute', 
      bottom: 25, 
      left: 0, 
      right: 0, 
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Animated Tab Bar Container */}
      <Animated.View style={{
        width: containerWidth,
        flexDirection: 'row',
        backgroundColor: containerBgColor,
        borderRadius: 40,
        height: 80,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: shadowOpacity,
        shadowRadius: 8,
        elevation: 8,
        paddingHorizontal: expandAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 25]
        }),
        paddingVertical: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: expandAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1]
        }),
        borderColor: '#e2e8f0',
      }}>
        {/* Home Button */}
        <Animated.View style={{ 
          opacity: buttonsOpacity,
          width: 50,
          height: 50,
        }}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={state.index === 0 ? { selected: true } : {}}
            onPress={() => navigation.navigate('Home')}
            style={{ 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: state.index === 0 ? '#f9f2f2' : 'transparent',
              borderRadius: 25,
              width: 50,
              height: 50,
            }}
          >
            <Ionicons 
              name={state.index === 0 ? "home" : "home-outline"} 
              size={22} 
              color={state.index === 0 ? '#5e3b25' : '#d1d1d1'} 
            />
          </TouchableOpacity>
        </Animated.View>
        
        {/* Events Button */}
        <Animated.View style={{ 
          opacity: buttonsOpacity,
          width: 50,
          height: 50,
        }}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={state.index === 1 ? { selected: true } : {}}
            onPress={() => navigation.navigate('Events')}
            style={{ 
              alignItems: 'center', 
              justifyContent: 'center',
              width: 50,
              height: 50,
            }}
          >
            <FontAwesome5 
              name="calendar-alt" 
              size={22} 
              color={state.index === 1 ? '#5e3b25' : '#d1d1d1'} 
            />
          </TouchableOpacity>
        </Animated.View>
        
        {/* Center button - Church Logo */}
        <Animated.View style={{ 
          transform: [
            { scale: isExpanded ? scaleAnim : logoScale }
          ],
          opacity: opacityAnim,
          zIndex: 10,
          position: isExpanded ? 'relative' : 'absolute',
          alignSelf: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: isExpanded ? 0 : 0.3,
          shadowRadius: 5,
          elevation: isExpanded ? 0 : 5,
        }}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={state.index === 2 ? { selected: true } : {}}
            onPress={isExpanded ? handleDevotionalPress : toggleExpand}
            style={{ 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: '#a9c25d',
              borderRadius: 35,
              width: 70,
              height: 70,
              borderWidth: 4,
              borderColor: '#ffffff',
            }}
          >
            <FontAwesome5 
              name="church" 
              size={28} 
              color="#fff" 
            />
          </TouchableOpacity>
        </Animated.View>
        
        {/* Community Button */}
        <Animated.View style={{ 
          opacity: buttonsOpacity,
          width: 50,
          height: 50,
        }}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={state.index === 3 ? { selected: true } : {}}
            onPress={() => navigation.navigate('Community')}
            style={{ 
              alignItems: 'center', 
              justifyContent: 'center',
              width: 50,
              height: 50,
            }}
          >
            <Ionicons 
              name={state.index === 3 ? "people" : "people-outline"} 
              size={22} 
              color={state.index === 3 ? '#5e3b25' : '#d1d1d1'} 
            />
          </TouchableOpacity>
        </Animated.View>
        
        {/* Profile Button */}
        <Animated.View style={{ 
          opacity: buttonsOpacity,
          width: 50,
          height: 50,
        }}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={state.index === 4 ? { selected: true } : {}}
            onPress={() => navigation.navigate('Profile')}
            style={{ 
              alignItems: 'center', 
              justifyContent: 'center',
              width: 50,
              height: 50,
            }}
          >
            <Ionicons 
              name={state.index === 4 ? "person" : "person-outline"} 
              size={22} 
              color={state.index === 4 ? '#5e3b25' : '#d1d1d1'} 
            />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

// Main tab navigation after login
function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen 
        name="Devotional" 
        component={DevotionalScreen}
        options={{
          // Add transition animation for the Devotional screen
          cardStyleInterpolator: ({ current }) => {
            return {
              cardStyle: {
                opacity: current.progress,
                transform: [
                  {
                    scale: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  },
                ],
              },
            };
          },
        }}
      />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Create a custom loading screen component with improved design
const LoadingScreen = () => (
  <View style={{ 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#d4f5c9' 
  }}>
    <View style={{
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#8eda8e',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
      marginBottom: 20,
    }}>
      <FontAwesome5 name="church" size={40} color="#2c5282" />
    </View>
    <Text style={{ 
      fontSize: 24, 
      color: '#2c5282', 
      fontWeight: 'bold',
      marginTop: 10,
    }}>Loading...</Text>
  </View>
);

// App content with authentication state
// Find the part where you have the Stack.Navigator in the AppContent function
// and update it to include the new screens

// App content with authentication state
function AppContent() {
  const { isLoading, userToken } = useAuth();
  
  // Simplified notification setup that doesn't use native modules
  useEffect(() => {
    const setupNotifications = async () => {
      try {
        // Just log that we're bypassing notifications
        await registerForPushNotificationsAsync();
        console.log('Notification setup bypassed');
      } catch (error) {
        console.error('Error in notification setup:', error);
      }
    };
    
    setupNotifications();
  }, []);
  
  console.log('AppContent rendering with userToken:', userToken);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#d4f5c9" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {userToken == null ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Main" component={MainTabs} />
              <Stack.Screen name="GroupMembers" component={GroupMembersScreen} />
              <Stack.Screen name="ManageMembers" component={ManageMembersScreen} />
              <Stack.Screen name="EditGroup" component={EditGroupScreen} />
              <Stack.Screen name="Comments" component={CommentsScreen} />
              <Stack.Screen name="MyGroups" component={MyGroupsScreen} />
              <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="CreateGroup" component={CreateGroupScreen} />
              <Stack.Screen name="Announcements" component={AnnouncementsScreen} />
              <Stack.Screen name="CreateAnnouncement" component={CreateAnnouncementScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

// Main app component
export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

// Remove everything below this line
