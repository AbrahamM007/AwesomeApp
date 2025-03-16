import 'react-native-gesture-handler'; // This must be the first import
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import WatchScreen from './screens/WatchScreen';
import AppsScreen from './screens/AppsScreen';

const Tab = createBottomTabNavigator();

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
          component={AppsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="th-large" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={HomeScreen} // Placeholder, replace with actual screen
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
