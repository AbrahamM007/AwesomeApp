import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';

// Import your screens
import EventsScreen from './screens/EventsScreen';
import HomeScreen from './screens/HomeScreen';
import DevotionalScreen from './screens/DevotionalScreen';
import ProfileScreen from './screens/ProfileScreen';
import CommunityScreen from './screens/CommunityScreen';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Custom Tab Bar component with floating action button
function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ position: 'absolute', bottom: 25, left: 20, right: 20 }}>
      {/* Floating Action Button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: -30,
          alignSelf: 'center',
          backgroundColor: '#8eda8e',
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 10,
          zIndex: 10,
        }}
        onPress={() => navigation.navigate('Devotional')}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
      
      {/* Tab Bar */}
      <View style={{
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 35,
        height: 70,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
        paddingHorizontal: 20,
      }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          
          let icon;
          if (route.name === 'Home') {
            icon = isFocused ? 
              <Ionicons name="home" size={24} color="#2c5282" /> : 
              <Ionicons name="home-outline" size={24} color="#A7A7A7" />;
          } else if (route.name === 'Events') {
            icon = <FontAwesome5 name="calendar-alt" size={22} color={isFocused ? "#2c5282" : "#A7A7A7"} />;
          } else if (route.name === 'Community') {
            icon = isFocused ? 
              <Ionicons name="people" size={24} color="#2c5282" /> : 
              <Ionicons name="people-outline" size={24} color="#A7A7A7" />;
          } else if (route.name === 'Profile') {
            icon = isFocused ? 
              <Ionicons name="person" size={24} color="#2c5282" /> : 
              <Ionicons name="person-outline" size={24} color="#A7A7A7" />;
          }
          
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={{ 
                flex: 1, 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: isFocused ? 'rgba(142, 218, 142, 0.15)' : 'transparent',
                borderRadius: 20,
                margin: 5,
                height: 50,
              }}
            >
              {icon}
            </TouchableOpacity>
          );
        })}
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
