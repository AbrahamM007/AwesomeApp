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
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../context/AuthContext';

const CreateGroupScreen = ({ navigation }) => {
  const { userInfo } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [isPrivate, setIsPrivate] = useState(false);
  
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please allow access to your photo library to select a group image.');
      return;
    }
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  
  const handleCreateGroup = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a group name');
      return;
    }
    
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a group description');
      return;
    }
    
    // Here you would typically send the data to your backend
    // For now, we'll just show a success message and navigate back
    Alert.alert(
      'Success',
      `Group "${name}" created successfully!`,
      [
        { 
          text: 'OK', 
          onPress: () => navigation.navigate('MyGroups') 
        }
      ]
    );
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={20} color="#2c5282" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create New Group</Text>
        <View style={{ width: 20 }} />
      </View>
      
      <View style={styles.formContainer}>
        <TouchableOpacity style={styles.imagePickerContainer} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.groupImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <FontAwesome5 name="image" size={40} color="#a0aec0" />
              <Text style={styles.imagePlaceholderText}>Tap to add a cover image</Text>
            </View>
          )}
        </TouchableOpacity>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Group Name *</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter group name"
            placeholderTextColor="#a0aec0"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Category</Text>