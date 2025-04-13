
// FILE: App.js (enhanced for wow UI)
// Note: Requires additional asset files (e.g., ./assets/lottie/glow-church.json)

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
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';

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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
  const [pressed, setPressed] = useState(null);
  const buttonScale = useRef(new Animated.Value(1)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [showRipple, setShowRipple] = useState(false);
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const handlePressIn = (index, event) => {
    if (event && event.nativeEvent) {
      setRipplePosition({ x: event.nativeEvent.locationX, y: event.nativeEvent.locationY });
      setShowRipple(true);
      setTimeout(() => setShowRipple(false), 600);
    }

    setPressed(index);
    Animated.parallel([
      Animated.spring(buttonScale, { toValue: 0.9, friction: 5, tension: 40, useNativeDriver: true }),
      Animated.timing(glowOpacity, { toValue: 1, duration: 200, useNativeDriver: true })
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(buttonScale, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }),
      Animated.timing(glowOpacity, { toValue: 0, duration: 200, useNativeDriver: true })
    ]).start(() => setPressed(null));
  };

  const handleDevotionalPress = () => {
    Animated.timing(rotateAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start(() => {
      rotateAnim.setValue(0);
      navigation.navigate('Devotional');
    });
  };

  const getIconColor = (index) => {
    if (state.index === index) return '#5e3b25';
    else if (pressed === index) return '#a9c25d';
    else return '#a0a0a0';
  };

  const getButtonBgColor = (index) => {
    if (state.index === index) return 'rgba(169, 194, 93, 0.15)';
    else if (pressed === index) return 'rgba(94, 59, 37, 0.1)';
    else return 'transparent';
  };

  return (
    <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center' }}>
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 90, backgroundColor: 'rgba(226, 240, 203, 0.7)', borderTopLeftRadius: 30, borderTopRightRadius: 30 }} />
      <BlurView intensity={70} tint="light" style={{ flexDirection: 'row', borderRadius: 40, height: 75, width: 330, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 8, paddingHorizontal: 20, paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.8)', bottom: 25, position: 'absolute', backgroundColor: 'transparent' }}>
        {state.routes.map((route, index) => {
          const isDevotional = route.name === 'Devotional';
          const IconComponent = route.name === 'Events' ? FontAwesome5 : Ionicons;
          const iconName = route.name === 'Home' ? 'home' : route.name === 'Events' ? 'calendar-alt' : route.name === 'Community' ? 'people' : route.name === 'Profile' ? 'person' : '';
          return isDevotional ? (
            <View key={index} style={{ zIndex: 10 }}>
              <TouchableOpacity onPress={handleDevotionalPress} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#a9c25d', borderRadius: 35, width: 70, height: 70, borderWidth: 4, borderColor: '#ffffff' }}>
                <LottieView source={require('./assets/lottie/glow-church.json')} autoPlay loop style={{ width: 90, height: 90, position: 'absolute', top: -10, zIndex: -1 }} />
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                  <FontAwesome5 name="church" size={28} color="#fff" />
                </Animated.View>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity key={index} onPress={() => navigation.navigate(route.name)} onPressIn={(e) => handlePressIn(index, e)} onPressOut={handlePressOut} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: getButtonBgColor(index), borderRadius: 25, width: 50, height: 50, overflow: 'hidden' }}>
              {showRipple && pressed === index && (
                <Animated.View style={{ position: 'absolute', width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(169, 194, 93, 0.3)', left: ripplePosition.x - 50, top: ripplePosition.y - 50, transform: [{ scale: buttonScale }] }} />
              )}
              <Animated.View style={{ transform: [{ scale: pressed === index ? buttonScale : (state.index === index ? 1.1 : 1) }, { translateY: state.index === index ? -2 : 0 }] }}>
                <IconComponent name={iconName} size={24} color={getIconColor(index)} />
              </Animated.View>
              {state.index === index && (
                <Animated.View style={{ position: 'absolute', top: -8, width: 40, height: 4, borderRadius: 2, backgroundColor: '#a9c25d', opacity: glowOpacity }} />
              )}
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Devotional" component={DevotionalScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#d4f5c9' }}>
    <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#8eda8e', justifyContent: 'center', alignItems: 'center' }}>
      <FontAwesome5 name="church" size={40} color="#2c5282" />
    </View>
    <Text style={{ fontSize: 24, color: '#2c5282', fontWeight: 'bold', marginTop: 10 }}>Loading...</Text>
  </View>
);

function AppContent() {
  const { isLoading, userToken } = useAuth();

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        await registerForPushNotificationsAsync();
        console.log('Notification setup bypassed');
      } catch (error) {
        console.error('Error in notification setup:', error);
      }
    };
    setupNotifications();
  }, []);

  if (isLoading) return <LoadingScreen />;

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

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </SafeAreaProvider>
  );
}