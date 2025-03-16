import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import CreateEventScreen from '../screens/CreateEventScreen';
import GroupsScreen from '../screens/GroupsScreen';
import MinistryDetailsScreen from '../screens/MinistryDetailsScreen';
import GroupDetailsScreen from '../screens/GroupDetailsScreen';
import CreateGroupScreen from '../screens/CreateGroupScreen';
import ChurchFeedScreen from '../screens/ChurchFeedScreen';
import CreateFeedItemScreen from '../screens/CreateFeedItemScreen';
import SendNotificationScreen from '../screens/SendNotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import GroupMembersScreen from '../screens/GroupMembersScreen';
import ManageMembersScreen from '../screens/ManageMembersScreen';
import EditGroupScreen from '../screens/EditGroupScreen';
import CommentsScreen from '../screens/CommentsScreen';
import CommunityScreen from '../screens/CommunityScreen';

// Add these imports to your existing imports
import PrayerDetailsScreen from '../screens/PrayerDetailsScreen';
import DiscussionDetailsScreen from '../screens/DiscussionDetailsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Home Stack
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
      <Stack.Screen name="Comments" component={CommentsScreen} />
    </Stack.Navigator>
  );
};

// Events Stack
const EventsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EventsMain" component={EventsScreen} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
      <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
    </Stack.Navigator>
  );
};

// Groups Stack
const GroupsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GroupsMain" component={GroupsScreen} />
      <Stack.Screen name="GroupDetails" component={GroupDetailsScreen} />
      <Stack.Screen name="MinistryDetails" component={MinistryDetailsScreen} />
      <Stack.Screen name="CreateGroup" component={CreateGroupScreen} />
      <Stack.Screen name="Community" component={CommunityScreen} />
      <Stack.Screen name="GroupMembers" component={GroupMembersScreen} />
      <Stack.Screen name="ManageMembers" component={ManageMembersScreen} />
      <Stack.Screen name="EditGroup" component={EditGroupScreen} />
      <Stack.Screen name="PrayerDetails" component={PrayerDetailsScreen} />
      <Stack.Screen name="DiscussionDetails" component={DiscussionDetailsScreen} />
    </Stack.Navigator>
  );
};

// Feed Stack
const FeedStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FeedMain" component={ChurchFeedScreen} />
      <Stack.Screen name="CreateFeedItem" component={CreateFeedItemScreen} />
      <Stack.Screen name="SendNotification" component={SendNotificationScreen} />
      <Stack.Screen name="Comments" component={CommentsScreen} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
      <Stack.Screen name="PrayerDetails" component={PrayerDetailsScreen} />
      <Stack.Screen name="DiscussionDetails" component={DiscussionDetailsScreen} />
    </Stack.Navigator>
  );
};

// Profile Stack
const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

// Main Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Events') {
            iconName = 'calendar-alt';
          } else if (route.name === 'Groups') {
            iconName = 'users';
          } else if (route.name === 'Feed') {
            iconName = 'church';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2c5282',
        tabBarInactiveTintColor: '#718096',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Events" component={EventsStack} />
      <Tab.Screen name="Groups" component={GroupsStack} />
      <Tab.Screen name="Feed" component={FeedStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

// Main App Navigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;