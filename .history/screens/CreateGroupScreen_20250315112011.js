import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// Remove all duplicate useNavigation imports

const CreateGroupScreen = () => {
  const navigation = useNavigation();
  // Rest of your component remains the same