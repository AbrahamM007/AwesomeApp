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
          <TextInput
            style={styles.input}
            value={category}
            onChangeText={setCategory}
            placeholder="E.g., Bible Study, Prayer, Youth, etc."
            placeholderTextColor="#a0aec0"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Description *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe what your group is about"
            placeholderTextColor="#a0aec0"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
        
        <View style={styles.privacyContainer}>
          <Text style={styles.inputLabel}>Privacy Setting</Text>
          <View style={styles.privacyOptions}>
            <TouchableOpacity 
              style={[
                styles.privacyOption, 
                !isPrivate && styles.privacyOptionSelected
              ]}
              onPress={() => setIsPrivate(false)}
            >
              <FontAwesome5 
                name="globe" 
                size={16} 
                color={!isPrivate ? "#2c5282" : "#718096"} 
              />
              <Text style={[
                styles.privacyOptionText,
                !isPrivate && styles.privacyOptionTextSelected
              ]}>Public</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.privacyOption, 
                isPrivate && styles.privacyOptionSelected
              ]}
              onPress={() => setIsPrivate(true)}
            >
              <FontAwesome5 
                name="lock" 
                size={16} 
                color={isPrivate ? "#2c5282" : "#718096"} 
              />
              <Text style={[
                styles.privacyOptionText,
                isPrivate && styles.privacyOptionTextSelected
              ]}>Private</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.privacyDescription}>
            {isPrivate 
              ? "Private groups are only visible to members and require approval to join." 
              : "Public groups are visible to everyone and anyone can join."}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.createButton}
          onPress={handleCreateGroup}
        >
          <Text style={styles.createButtonText}>Create Group</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#d4f5c9',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  backButton: {
    padding: 5,
  },
  formContainer: {
    padding: 20,
  },
  imagePickerContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#e2e8f0',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  groupImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    marginTop: 10,
    color: '#718096',
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a5568',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2d3748',
  },
  textArea: {
    minHeight: 120,
    paddingTop: 12,
  },
  privacyContainer: {
    marginBottom: 30,
  },
  privacyOptions: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  privacyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 15,
  },
  privacyOptionSelected: {
    borderColor: '#2c5282',
    backgroundColor: '#ebf8ff',
  },
  privacyOptionText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#718096',
  },
  privacyOptionTextSelected: {
    color: '#2c5282',
    fontWeight: '600',
  },
  privacyDescription: {
    fontSize: 14,
    color: '#718096',
    marginTop: 8,
  },
  createButton: {
    backgroundColor: '#2c5282',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateGroupScreen;