import 'react-native-gesture-handler'; // This must be the first import
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import WatchScreen from './screens/WatchScreen';
import AppsScreen from './screens/AppsScreen';
import ProfileScreen from './screens/ProfileScreen';
import MinistryScreen from './screens/MinistryScreen';
import PrayerRequestScreen from './screens/PrayerRequestScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Create stack navigators for each tab that needs nested screens
const AppsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AppsMain" component={AppsScreen} />
      <Stack.Screen name="Ministry" component={MinistryScreen} />
      <Stack.Screen name="PrayerRequest" component={PrayerRequestScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: '#2c5282',
          tabBarInactiveTintColor: '#2c5282',
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Watch" 
          component={WatchScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="tv" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Apps" 
          component={AppsStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="th-large" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
