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
            return <Ionicons name={iconName} size={24} color={focused ? '#2c5282' : '#A7A7A7'} />;
          } else if (route.name === 'Events') {
            return <FontAwesome5 name="calendar-alt" size={22} color={focused ? '#2c5282' : '#A7A7A7'} />;
          } else if (route.name === 'Community') {
            iconName = focused ? 'people' : 'people-outline';
            return <Ionicons name={iconName} size={24} color={focused ? '#2c5282' : '#A7A7A7'} />;
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
            return <Ionicons name={iconName} size={24} color={focused ? '#2c5282' : '#A7A7A7'} />;
          }
          return null;
        },
        tabBarActiveTintColor: '#2c5282',
        tabBarInactiveTintColor: '#A7A7A7',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          height: 70,
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 8,
          borderRadius: 35,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarShowLabel: false,
        headerShown: false,
      })}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Custom Tab Bar component with floating action button
const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={{ position: 'relative' }}>
      {/* Floating Action Button for Devotional */}
      <View style={{
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#8eda8e',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
        zIndex: 999,
      }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Devotional')}
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FontAwesome5 name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {/* Tab Bar */}
      <View style={{
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 35,
        height: 70,
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
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
          
          // Adjust layout for center button
          if (index === 2) {
            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                onPress={onPress}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
              >
                {options.tabBarIcon({ focused: isFocused })}
              </TouchableOpacity>
            );
          }
          
          // Adjust indices for the floating button
          const adjustedIndex = index >= 2 ? index + 1 : index;
          const iconIndex = adjustedIndex === 0 ? 0 : adjustedIndex === 1 ? 1 : adjustedIndex === 3 ? 2 : 3;
          
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            >
              {options.tabBarIcon({ focused: isFocused })}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

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
