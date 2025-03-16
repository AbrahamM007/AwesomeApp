import { Alert, Platform } from 'react-native';

// Simple mock function that doesn't use native modules
export const registerForPushNotificationsAsync = async () => {
  console.log('Notification registration bypassed');
  return true;
};

// Simple function to show an alert instead of a notification
export const sendLocalNotification = async (title, body) => {
  try {
    // Just show an alert instead of a real notification
    if (Platform.OS !== 'web') {
      Alert.alert(title, body);
    }
    console.log('Notification alert shown:', { title, body });
    return true;
  } catch (error) {
    console.error('Error showing notification alert:', error);
    return false;
  }
};