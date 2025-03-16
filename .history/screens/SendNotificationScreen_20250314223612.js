import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const SendNotificationScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [sendToAll, setSendToAll] = useState(true);
  
  // Mock data for groups
  const groups = [
    { id: '1', name: 'Young Adults' },
    { id: '2', name: 'Prayer Warriors' },
    { id: '3', name: 'Bible Study' },
    { id: '4', name: 'Worship Team' },
    { id: '5', name: 'Children\'s Ministry' },
    { id: '6', name: 'Youth Group' }
  ];
  
  const toggleGroup = (groupId) => {
    if (selectedGroups.includes(groupId)) {
      setSelectedGroups(selectedGroups.filter(id => id !== groupId));
    } else {
      setSelectedGroups([...selectedGroups, groupId]);
    }
  };
  
  const handleSendNotification = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a notification title');
      return;
    }
    
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter a notification message');
      return;
    }
    
    if (!sendToAll && selectedGroups.length === 0) {
      Alert.alert('Error', 'Please select at least one group or choose to send to all members');
      return;
    }
    
    // Here you would typically send the notification through your backend
    // For now, we'll just show a success message and navigate back
    
    let recipients = sendToAll ? 'all church members' : 'selected groups';
    
    Alert.alert(
      'Success',
      `Notification sent to ${recipients}!`,
      [
        { 
          text: 'OK', 
          onPress: () => navigation.goBack() 
        }
      ]
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={20} color="#2c5282" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Send Notification</Text>
        <View style={{ width: 20 }} />
      </View>
      
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Title *</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter notification title"
              placeholderTextColor="#a0aec0"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Message *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={message}
              onChangeText={setMessage}
              placeholder="Enter notification message"
              placeholderTextColor="#a0aec0"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>
          
          <View style={styles.toggleContainer}>
            <Text style={styles.inputLabel}>Urgent Notification</Text>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleText}>
                {urgent 
                  ? "This notification will appear as urgent" 
                  : "Standard notification"}
              </Text>
              <Switch
                trackColor={{ false: "#cbd5e0", true: "#feb2b2" }}
                thumbColor={urgent ? "#e53e3e" : "#a0aec0"}
                onValueChange={setUrgent}
                value={urgent}
              />
            </View>
          </View>
          
          <View style={styles.recipientsContainer}>
            <Text style={styles.inputLabel}>Recipients</Text>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleText}>Send to all church members</Text>
              <Switch
                trackColor={{ false: "#cbd5e0", true: "#90cdf4" }}
                thumbColor={sendToAll ? "#2c5282" : "#a0aec0"}
                onValueChange={setSendToAll}
                value={sendToAll}
              />
            </View>
            
            {!sendToAll && (
              <View style={styles.groupsContainer}>
                <Text style={styles.groupsLabel}>Select groups to notify:</Text>
                {groups.map(group => (
                  <TouchableOpacity 
                    key={group.id}
                    style={[
                      styles.groupOption,
                      selectedGroups.includes(group.id) && styles.groupOptionSelected
                    ]}
                    onPress={() => toggleGroup(group.id)}
                  >
                    <Text 
                      style={[
                        styles.groupOptionText,
                        selectedGroups.includes(group.id) && styles.groupOptionTextSelected
                      ]}
                    >
                      {group.name}
                    </Text>
                    {selectedGroups.includes(group.id) && (
                      <FontAwesome5 name="check" size={16} color="#2c5282" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          
          <TouchableOpacity 
            style={[styles.sendButton, urgent && styles.urgentButton]}
            onPress={handleSendNotification}
          >
            <FontAwesome5 
              name={urgent ? "bell" : "paper-plane"} 
              size={18} 
              color="#fff" 
              style={styles.sendButtonIcon} 
            />
            <Text style={styles.sendButtonText}>Send Notification</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
  toggleContainer: {
    marginBottom: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  toggleText: {
    fontSize: 14,
    color: '#4a5568',
  },
  recipientsContainer: {
    marginBottom: 30,
  },
  groupsContainer: {
    marginTop: 15,
  },
  groupsLabel: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 10,
  },
  groupOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  groupOptionSelected: {
    backgroundColor: '#ebf8ff',
    borderColor: '#90cdf4',
  },
  groupOptionText: {
    fontSize: 16,
    color: '#4a5568',
  },
  groupOptionTextSelected: {
    color: '#2c5282',
    fontWeight: 'bold',
  },
  sendButton: {
    flexDirection: 'row',
    backgroundColor: '#2c5282',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  urgentButton: {
    backgroundColor: '#e53e3e',
  },
  sendButtonIcon: {
    marginRight: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SendNotificationScreen;