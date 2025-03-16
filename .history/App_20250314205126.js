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
import BibleScreen from './screens/BibleScreen';
import EventsScreen from './screens/EventsScreen';
import MusicScreen from './screens/MusicScreen';
import DonationScreen from './screens/DonationScreen';
import LifeGroupsScreen from './screens/LifeGroupsScreen';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Main" component={EventsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
