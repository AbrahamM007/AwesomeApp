import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StatusBar } from 'react-native';

// Import your screens
import EventsScreen from './screens/EventsScreen';
import HomeScreen from './screens/HomeScreen';
import DevotionalScreen from './screens/DevotionalScreen';
import ProfileScreen from './screens/ProfileScreen';
import CommunityScreen from './screens/CommunityScreen';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
// You'll need to create these screens based on your mockups

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Main tab navigation after login
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Events') {
            return <FontAwesome5 name="calendar-alt" size={size} color={color} />;
          } else if (route.name === 'Devotional') {
            return <FontAwesome5 name="bible" size={size} color={color} />;
          } else if (route.name === 'Community') {
            iconName = focused ? 'people' : 'people-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#2c5282',
        tabBarInactiveTintColor: '#A7A7A7',
        tabBarStyle: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderTopWidth: 0,
          borderRadius: 30,
          position: 'absolute',
          bottom: 25,
          left: 15,
          right: 15,
          elevation: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
          height: 70,
          paddingBottom: 10,
          paddingTop: 5,
          borderWidth: 1.5,
          borderColor: 'rgba(255, 255, 255, 0.8)',
        },
        tabBarItemStyle: {
          margin: 5,
          height: 50,
          borderRadius: 25,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          marginTop: -3,
        },
        tabBarActiveBackgroundColor: 'rgba(142, 218, 142, 0.2)',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ 
              color: focused ? '#2c5282' : '#A7A7A7',
              fontSize: 11,
              fontWeight: focused ? '700' : '500',
              opacity: focused ? 1 : 0.8,
            }}>
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Events" 
        component={EventsScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ 
              color: focused ? '#2c5282' : '#A7A7A7',
              fontSize: 11,
              fontWeight: focused ? '700' : '500',
              opacity: focused ? 1 : 0.8,
            }}>
              Events
            </Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Devotional" 
        component={DevotionalScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ 
              color: focused ? '#2c5282' : '#A7A7A7',
              fontSize: 11,
              fontWeight: focused ? '700' : '500',
              opacity: focused ? 1 : 0.8,
            }}>
              Devotional
            </Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Community" 
        component={CommunityScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ 
              color: focused ? '#2c5282' : '#A7A7A7',
              fontSize: 11,
              fontWeight: focused ? '700' : '500',
              opacity: focused ? 1 : 0.8,
            }}>
              Community
            </Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ 
              color: focused ? '#2c5282' : '#A7A7A7',
              fontSize: 11,
              fontWeight: focused ? '700' : '500',
              opacity: focused ? 1 : 0.8,
            }}>
              Profile
            </Text>
          ),
        }}
      />
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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const bootstrapAsync = async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userData');
      } catch (e) {
        console.log('Failed to get user token');
      }
      setUserToken(userToken);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

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
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
