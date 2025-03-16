import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
  Linking
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../components/AppHeader';
import theme from '../styles/theme';

const ConnectScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Handle form submission
  const handleSubmit = () => {
    // Validate form
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter a message');
      return;
    }
    
    // Submit form
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Thank You!',
        'Your message has been sent. We will get back to you soon.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Clear form
              setName('');
              setEmail('');
              setPhone('');
              setMessage('');
            }
          }
        ]
      );
    }, 1500);
  };
  
  // Open social media links
  const openLink = (url) => {
    Linking.openURL(url).catch(err => {
      console.error('Error opening link:', err);
      Alert.alert('Error', 'Could not open link');
    });
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <AppHeader 
        title="CONNECT" 
        showBackButton={true}
        backgroundColor={theme.colors.background}
        titleStyle={styles.headerTitle}
      />
      
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.introSection}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="users" size={40} color="#000000" />
          </View>
          <Text style={styles.introTitle}>GET CONNECTED</Text>
          <Text style={styles.introText}>
            We'd love to hear from you! Fill out the form below to get in touch with our team.
          </Text>
        </View>
        
        {/* Contact Form */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>CONTACT US</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>NAME</Text>
            <TextInput
              style={styles.input}
              placeholder="Your name"
              placeholderTextColor="#666666"
              value={name}
              onChangeText={setName}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>EMAIL</Text>
            <TextInput
              style={styles.input}
              placeholder="Your email address"
              placeholderTextColor="#666666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>PHONE (OPTIONAL)</Text>
            <TextInput
              style={styles.input}
              placeholder="Your phone number"
              placeholderTextColor="#666666"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>MESSAGE</Text>
            <TextInput
              style={[styles.input, styles.messageInput]}
              placeholder="How can we help you?"
              placeholderTextColor="#666666"
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
          
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#000000" />
            ) : (
              <Text style={styles.submitButtonText}>SEND MESSAGE</Text>
            )}
          </TouchableOpacity>
        </View>
        
        {/* Church Info */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>VISIT US</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <FontAwesome5 name="map-marker-alt" size={20} color={theme.colors.primary} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoHeading}>ADDRESS</Text>
                <Text style={styles.infoText}>123 Main Street, Anytown, CA 12345</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <FontAwesome5 name="clock" size={20} color={theme.colors.primary} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoHeading}>SERVICE TIMES</Text>
                <Text style={styles.infoText}>Sundays at 10:00 AM</Text>
                <Text style={styles.infoText}>Wednesday Bible Study at 7:00 PM</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <FontAwesome5 name="phone" size={20} color={theme.colors.primary} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoHeading}>CONTACT</Text>
                <Text style={styles.infoText}>Phone: (123) 456-7890</Text>
                <Text style={styles.infoText}>Email: info@nuevaesperanza.org</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Social Media */}
        <View style={styles.socialSection}>
          <Text style={styles.sectionTitle}>FOLLOW US</Text>
          
          <View style={styles.socialButtons}>
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => openLink('https://facebook.com/nuevaesperanza')}
            >
              <FontAwesome5 name="facebook" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => openLink('https://instagram.com/nuevaesperanza')}
            >
              <FontAwesome5 name="instagram" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => openLink('https://youtube.com/nuevaesperanza')}
            >
              <FontAwesome5 name="youtube" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => openLink('https://twitter.com/nuevaesperanza')}
            >
              <FontAwesome5 name="twitter" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    padding: theme.spacing.md,
  },
  headerTitle: {
    ...theme.typography.header,
  },
  introSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  iconContainer: {
    ...theme.components.iconContainer,
    marginBottom: theme.spacing.md,
  },
  introTitle: {
    ...theme.typography.title,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  introText: {
    ...theme.typography.body,
    textAlign: 'center',
  },
  formCard: {
    ...theme.components.card,
    marginBottom: theme.spacing.lg,
  },
  formTitle: {
    ...theme.typography.title,
    marginBottom: theme.spacing.md,
  },
  inputContainer: {
    marginBottom: theme.spacing.md,
  },
  inputLabel: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  input: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.small,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    padding: theme.spacing.md,
    color: '#ffffff',
  },
  messageInput: {
    minHeight: 120,
  },
  submitButton: {
    ...theme.components.button.primary,
    marginTop: theme.spacing.sm,
  },
  submitButtonText: {
    ...theme.typography.button,
  },
  sectionTitle: {
    ...theme.typography.title,
    marginBottom: theme.spacing.md,
  },
  infoSection: {
    marginBottom: theme.spacing.lg,
  },
  infoCard: {
    ...theme.components.card,
    marginBottom: theme.spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  infoHeading: {
    ...theme.typography.title,
    fontSize: 16,
    marginBottom: theme.spacing.xs,
  },
  infoText: {
    ...theme.typography.body,
    marginBottom: theme.spacing.xs,
  },
  socialSection: {
    marginBottom: theme.spacing.xl,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
});

export default ConnectScreen;