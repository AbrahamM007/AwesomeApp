import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // Initialize auth state
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        // Load user data from storage
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          setUserToken(parsedUserData.token);
          setUserInfo(parsedUserData.user);
        }
      } catch (e) {
        console.log('Failed to load user data', e);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  // Login function
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // In a real app, you would make an API call here
      // This is a mock implementation for demonstration
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const userData = {
        token: 'mock-token-' + Math.random().toString(36).substring(2),
        user: {
          id: '1',
          email: email,
          name: email.split('@')[0],
        }
      };
      
      // Store user data
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      
      // Update state
      setUserToken(userData.token);
      setUserInfo(userData.user);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Login failed. Please try again.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name, email, password, confirmPassword) => {
    setIsLoading(true);
    try {
      // Validation
      if (!name || !email || !password) {
        throw new Error('All fields are required');
      }
      
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      const userData = {
        token: 'mock-token-' + Math.random().toString(36).substring(2),
        user: {
          id: Math.random().toString(36).substring(2),
          email: email,
          name: name,
        }
      };
      
      // Store user data
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      
      // Update state
      setUserToken(userData.token);
      setUserInfo(userData.user);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Registration failed. Please try again.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    try {
      // Remove user data from storage
      await AsyncStorage.removeItem('userData');
      // Reset state
      setUserToken(null);
      setUserInfo(null);
    } catch (e) {
      console.log('Logout error', e);
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const authContext = {
    isLoading,
    userToken,
    userInfo,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};