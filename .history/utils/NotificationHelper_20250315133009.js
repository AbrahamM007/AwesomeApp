import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Simple function that doesn't try to get a push token
export const registerForPushNotificationsAsync = async () => {
  try {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    // Just request permissions without getting a token
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.log('Error setting up notifications:', error);
    return false;
  }
};

// Local notification function that doesn't require push tokens
export const sendLocalNotification = async (title, body, data = {}) => {
  try {
    // First check if we have permission
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      console.log('No notification permission');
      return false;
    }

    // Schedule a local notification
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
      },
      trigger: null, // null means send immediately
    });
    
    console.log('Notification scheduled:', id);
    return true;
  } catch (error) {
    console.error('Error sending notification:', error);
    return false;
  }
};