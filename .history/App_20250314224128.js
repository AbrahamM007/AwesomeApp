import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';

// Import your screens
import EventsScreen from './screens/EventsScreen';
import HomeScreen from './screens/HomeScreen';
import DevotionalScreen from './screens/DevotionalScreen';
import ProfileScreen from './screens/ProfileScreen';
import CommunityScreen from './screens/CommunityScreen';
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
          backgroundColor: '#a9c25d',
          width: 70,
          height: 70,
          borderRadius: 35,
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
        <FontAwesome5 name="bible" size={24} color="#fff" />
      </TouchableOpacity>
      
      {/* Tab Bar */}
      <View style={{
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 40,
        height: 80,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
        paddingHorizontal: 25,
        paddingVertical: 15,
        justifyContent: 'space-between',
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
        
        {/* Empty space for the center button */}
        <View style={{ width: 50 }} />
        
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
      <Tab.Screen name="Devotional" component={DevotionalScreen} />
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
function AppContent() {
  const { isLoading, userToken } = useAuth();

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

// Main app component
export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
