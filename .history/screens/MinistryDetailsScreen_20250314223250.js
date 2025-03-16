import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const MinistryDetailsScreen = ({ route, navigation }) => {
  const { ministryId } = route.params;
  const { userInfo } = useAuth();
  const [isJoined, setIsJoined] = useState(false);
  
  // Mock data for the ministry
  const ministry = {
    id: ministryId,
    name: 'Worship Team',
    description: 'The Worship Team is dedicated to leading our congregation in worship through music, creating an atmosphere where people can encounter God. We value excellence, authenticity, and spiritual depth in our worship expressions.',
    longDescription: 'Our team consists of vocalists, instrumentalists, and tech volunteers who work together