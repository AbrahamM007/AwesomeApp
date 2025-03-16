import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkLoginStatus = async () => {
      try {
        const userJson = await AsyncStorage.getItem('userInfo');
        if (userJson) {
          setUserInfo(JSON.parse(userJson));
        }
      } catch (error) {
        console.log('Error retrieving user info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const login = async (userData) => {
    try {
      // In a real app, you would validate credentials with your backend
      // For now, we'll just store the user data
      setUserInfo(userData);
      await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      console.log('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
      setUserInfo(null);
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const register = async (userData) => {
    try {
      // In a real app, you would send registration data to your backend
      // For now, we'll just store the user data
      setUserInfo(userData);
      await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      console.log('Registration error:', error);
      return { success: false, error: 'Registration failed' };
    }
  };

  // For demo purposes, let's create a mock user
  useEffect(() => {
    if (!userInfo && !isLoading) {
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'member',
        profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      };
      setUserInfo(mockUser);
      AsyncStorage.setItem('userInfo', JSON.stringify(mockUser));
    }
  }, [userInfo, isLoading]);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};