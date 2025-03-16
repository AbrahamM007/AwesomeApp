import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const CommunityScreen = () => {
  const { userInfo } = useAuth();
  const [activeTab, setActiveTab] = useState('groups');
  
  // Mock data for groups
  const groups = [
    {
      id: '1',
      name: 'Young Adults',
      members: 42,
      description: 'A community for young adults (18-30) to connect, grow, and serve together.',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80'
    },
    {
      id: '2',
      name: 'Prayer Warriors',
      members: 28,
      description: 'Dedicated to praying for our church, community, and world needs.',
      image: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: '3',
      name: 'Bible Study',
      members: 35,
      description: 'In-depth study of Scripture with discussion and application.',
      image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: '4',
      name: '