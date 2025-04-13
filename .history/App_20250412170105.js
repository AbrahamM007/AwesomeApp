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
function CustomTabBar({ state, descriptors, navigation }) {
  // Animation values for interactive effects
  const [pressed, setPressed] = useState(null);
  const buttonScale = useRef(new Animated.Value(1)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [showRipple, setShowRipple] = useState(false);
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });
  
  // Pulse animation for the church icon
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
  
  // Rotation interpolation for the church icon
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  // Handle press animation for buttons
  const handlePressIn = (index, event) => {
    // Get the position for the ripple effect
    if (event && event.nativeEvent) {
      setRipplePosition({
        x: event.nativeEvent.locationX,
        y: event.nativeEvent.locationY,
      });
      setShowRipple(true);
      
      // Hide ripple after animation
      setTimeout(() => {
        setShowRipple(false);
      }, 600);
    }
    
    setPressed(index);
    Animated.parallel([
      Animated.spring(buttonScale, {
        toValue: 0.9,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(glowOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(buttonScale, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(glowOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start(() => setPressed(null));
  };

  // Special animation for devotional button
  const handleDevotionalPress = () => {
    // Rotate the church icon
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      rotateAnim.setValue(0);
      navigation.navigate('Devotional');
    });
  };

  // Get icon color based on active state with more vibrant colors
  const getIconColor = (index) => {
    if (state.index === index) {
      return '#5e3b25'; // Darker brown for active
    } else if (pressed === index) {
      return '#a9c25d'; // Green when pressed
    } else {
      return '#a0a0a0'; // Gray for inactive
    }
  };

  // Get background color for buttons
  const getButtonBgColor = (index) => {
    if (state.index === index) {
      return 'rgba(169, 194, 93, 0.15)'; // Light green bg for active
    } else if (pressed === index) {
      return 'rgba(94, 59, 37, 0.1)'; // Light brown when pressed
    } else {
      return 'transparent';
    }
  };

  return (
    <View style={{ 
      position: 'absolute', 
      bottom: 0,
      left: 0, 
      right: 0, 
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Gradient background for the bottom area */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 90,
        backgroundColor: 'rgba(226, 240, 203, 0.7)',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}>
        {/* Add subtle pattern to the background */}
        <View style={{
          position: 'absolute',
          top: 15,
          left: 30,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        }} />
        <View style={{
          position: 'absolute',
          top: 25,
          right: 40,
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
        }} />
      </View>

      {/* Tab Bar Container with glass effect */}
      <View style={{
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 40,
        height: 75,
        width: 330,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.8)',
        bottom: 25,
        position: 'absolute',
      }}>
        {/* Home Button */}
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityState={state.index === 0 ? { selected: true } : {}}
          onPress={() => navigation.navigate('Home')}
          onPressIn={(e) => handlePressIn(0, e)}
          onPressOut={handlePressOut}
          style={{ 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: getButtonBgColor(0),
            borderRadius: 25,
            width: 50,
            height: 50,
            overflow: 'hidden',
          }}
        >
          {showRipple && pressed === 0 && (
            <Animated.View style={{
              position: 'absolute',
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: 'rgba(169, 194, 93, 0.3)',
              left: ripplePosition.x - 50,
              top: ripplePosition.y - 50,
              transform: [{ scale: buttonScale }],
            }} />
          )}
          <Animated.View style={{
            transform: [{ scale: pressed === 0 ? buttonScale : 1 }]
          }}>
            <Ionicons 
              name="home" 
              size={24} 
              color={getIconColor(0)} 
            />
          </Animated.View>
          {state.index === 0 && (
            <View style={{
              position: 'absolute',
              bottom: -5,
              width: 5,
              height: 5,
              borderRadius: 2.5,
              backgroundColor: '#a9c25d',
            }} />
          )}
        </TouchableOpacity>
        
        {/* Events Button */}
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityState={state.index === 1 ? { selected: true } : {}}
          onPress={() => navigation.navigate('Events')}
          onPressIn={(e) => handlePressIn(1, e)}
          onPressOut={handlePressOut}
          style={{ 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: getButtonBgColor(1),
            borderRadius: 25,
            width: 50,
            height: 50,
            overflow: 'hidden',
          }}
        >
          {showRipple && pressed === 1 && (
            <Animated.View style={{
              position: 'absolute',
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: 'rgba(169, 194, 93, 0.3)',
              left: ripplePosition.x - 50,
              top: ripplePosition.y - 50,
              transform: [{ scale: buttonScale }],
            }} />
          )}
          <Animated.View style={{
            transform: [{ scale: pressed === 1 ? buttonScale : 1 }]
          }}>
            <FontAwesome5 
              name="calendar-alt" 
              size={22} 
              color={getIconColor(1)} 
            />
          </Animated.View>
          {state.index === 1 && (
            <View style={{
              position: 'absolute',
              bottom: -5,
              width: 5,
              height: 5,
              borderRadius: 2.5,
              backgroundColor: '#a9c25d',
            }} />
          )}
        </TouchableOpacity>
        
        {/* Center button - Church Logo */}
        <View style={{
          zIndex: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 10,
        }}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={state.index === 2 ? { selected: true } : {}}
            onPress={handleDevotionalPress}
            style={{ 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: '#a9c25d',
              borderRadius: 35,
              width: 70,
              height: 70,
              borderWidth: 4,
              borderColor: '#ffffff',
              overflow: 'hidden',
            }}
          >
            {/* Animated glow ring */}
            <Animated.View style={{
              position: 'absolute',
              width: 80,
              height: 80,
              borderRadius: 40,
              borderWidth: 2,
              borderColor: 'rgba(255, 255, 255, 0.7)',
              transform: [{ scale: pulseAnim }],
            }} />
            
            {/* Glow effect behind the icon */}
            <View style={{
              position: 'absolute',
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              opacity: state.index === 2 ? 0.8 : 0.3,
            }} />
            
            <Animated.View style={{
              transform: [{ rotate: spin }]
            }}>
              <FontAwesome5 
                name="church" 
                size={28}
                color="#fff"
              />
            </Animated.View>
            
            {/* Subtle radial gradient effect */}
            <View style={{
              position: 'absolute',
              top: -20,
              left: -20,
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }} />
            
            {/* Light beam effect */}
            {state.index === 2 && (
              <View style={{
                position: 'absolute',
                width: 100,
                height: 100,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: [{ rotate: '45deg' }],
              }} />
            )}
          </TouchableOpacity>
        </View>
        
        {/* Community Button */}
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityState={state.index === 3 ? { selected: true } : {}}
          onPress={() => navigation.navigate('Community')}
          onPressIn={(e) => handlePressIn(3, e)}
          onPressOut={handlePressOut}
          style={{ 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: getButtonBgColor(3),
            borderRadius: 25,
            width: 50,
            height: 50,
            overflow: 'hidden',
          }}
        >
          {showRipple && pressed === 3 && (
            <Animated.View style={{
              position: 'absolute',
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: 'rgba(169, 194, 93, 0.3)',
              left: ripplePosition.x - 50,
              top: ripplePosition.y - 50,
              transform: [{ scale: buttonScale }],
            }} />
          )}
          <Animated.View style={{
            transform: [{ scale: pressed === 3 ? buttonScale : 1 }]
          }}>
            <Ionicons 
              name="people" 
              size={24} 
              color={getIconColor(3)} 
            />
          </Animated.View>
          {state.index === 3 && (
            <View style={{
              position: 'absolute',
              bottom: -5,
              width: 5,
              height: 5,
              borderRadius: 2.5,
              backgroundColor: '#a9c25d',
            }} />
          )}
        </TouchableOpacity>
        
        {/* Profile Button */}
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityState={state.index === 4 ? { selected: true } : {}}
          onPress={() => navigation.navigate('Profile')}
          onPressIn={(e) => handlePressIn(4, e)}
          onPressOut={handlePressOut}
          style={{ 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: getButtonBgColor(4),
            borderRadius: 25,
            width: 50,
            height: 50,
            overflow: 'hidden',
          }}
        >
          {showRipple && pressed === 4 && (
            <Animated.View style={{
              position: 'absolute',
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: 'rgba(169, 194, 93, 0.3)',
              left: ripplePosition.x - 50,
              top: ripplePosition.y - 50,
              transform: [{ scale: buttonScale }],
            }} />
          )}
          <Animated.View style={{
            transform: [{ scale: pressed === 4 ? buttonScale : 1 }]
          }}>
            <Ionicons 
              name="person" 
              size={24} 
              color={getIconColor(4)} 
            />
          </Animated.View>
          {state.index === 4 && (
            <View style={{
              position: 'absolute',
              bottom: -5,
              width: 5,
              height: 5,
              borderRadius: 2.5,
              backgroundColor: '#a9c25d',
            }} />
          )}
        </TouchableOpacity>
      </View>
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
