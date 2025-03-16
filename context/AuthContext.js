import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // In a real app, you would validate credentials with your backend
      // For demo purposes, we'll simulate a successful login with church member data
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Enhanced user data with church-specific information
      const userData = {
        id: '123456',
        email: email,
        name: email.split('@')[0], // Simple name extraction from email
        role: 'member', // Could be 'admin', 'pastor', 'member', etc.
        church: 'First Community Church',
        joinDate: '2022-01-15',
        groups: ['Youth Ministry', 'Choir'],
        preferences: {
          notifications: true,
          emailUpdates: true
        }
      };
      
      // Store user info and token
      setUserInfo(userData);
      setUserToken('sample-token-123');
      
      // Save to AsyncStorage for persistence
      await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
      await AsyncStorage.setItem('userToken', 'sample-token-123');
      
      console.log('Login successful, user data stored');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', 'An error occurred during login.');
    }
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Clear AsyncStorage
      await AsyncStorage.removeItem('userInfo');
      await AsyncStorage.removeItem('userToken');
      
      // Reset state
      setUserToken(null);
      setUserInfo(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      let userToken = await AsyncStorage.getItem('userToken');
      
      if(userInfo) {
        setUserInfo(JSON.parse(userInfo));
      }
      
      if(userToken) {
        setUserToken(userToken);
      }
      
      console.log('Checked login status, token:', userToken);
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        isLoading, 
        userToken, 
        userInfo,
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};