import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Here you would typically make an API call to authenticate
      // For demo purposes, we'll just simulate a successful login
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set user info and token (in a real app, this would come from your API)
      const userData = {
        id: '123456',
        email: email,
        name: 'John Doe',
        // other user data
      };
      
      // Store user info and token
      setUserInfo(userData);
      setUserToken('sample-token-123');
      
      // Save to AsyncStorage for persistence
      await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
      await AsyncStorage.setItem('userToken', 'sample-token-123');
      
      console.log('Login successful, token set:', 'sample-token-123');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', 'An error occurred during login.');
    }
    setIsLoading(false);
  };

  // Check if user is logged in
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const userInfoString = await AsyncStorage.getItem('userInfo');
        
        if (token && userInfoString) {
          setUserToken(token);
          setUserInfo(JSON.parse(userInfoString));
        }
      } catch (e) {
        console.log('Failed to load user token', e);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      // In a real app, you would make an API call here
      // For demo purposes, we'll just simulate a successful login
      
      // Simple validation
      if (email !== 'user@example.com' && email !== 'test@test.com') {
        return { success: false, error: 'Invalid email or password' };
      }
      
      // Mock user data
      const userData = {
        id: '1',
        name: 'John Doe',
        email: email,
        profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
        role: 'member'
      };
      
      // Store user data
      await AsyncStorage.setItem('userToken', 'dummy-auth-token');
      await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
      
      // Update state
      setUserToken('dummy-auth-token');
      setUserInfo(userData);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'An error occurred during login' };
    }
  };

  // Signup function
  const signup = async (name, email, password) => {
    try {
      // In a real app, you would make an API call here
      // For demo purposes, we'll just simulate a successful signup
      
      // Mock user data
      const userData = {
        id: Date.now().toString(),
        name: name,
        email: email,
        profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
        role: 'member'
      };
      
      // Store user data
      await AsyncStorage.setItem('userToken', 'dummy-auth-token');
      await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
      
      // Update state
      setUserToken('dummy-auth-token');
      setUserInfo(userData);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'An error occurred during signup' };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userInfo');
      setUserToken(null);
      setUserInfo(null);
    } catch (e) {
      console.log('Error during logout', e);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isLoading, 
      userToken, 
      userInfo, 
      login, 
      logout,
      signup
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};