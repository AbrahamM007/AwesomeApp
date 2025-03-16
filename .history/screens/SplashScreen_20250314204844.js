import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      
      // Wait for 2 seconds to show the splash screen
      setTimeout(() => {
        if (userData) {
          // User is logged in
          navigation.replace('Main');
        } else {
          // User is not logged in
          navigation.replace('Login');
        }
      }, 2000);
    } catch (error) {
      console.error('Error checking login status:', error);
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/icon.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Church Connect</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d4f5c9',
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c5282',
    marginTop: 20,
  },
});

export default SplashScreen;