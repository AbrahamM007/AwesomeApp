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
  ActivityIndicator
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../components/AppHeader';
import theme from '../styles/theme';

const GivingScreen = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  
  // Predefined donation amounts
  const donationAmounts = [10, 25, 50, 100, 250, 500];
  
  // Handle donation submission
  const handleDonate = () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid donation amount');
      return;
    }
    
    setLoading(true);
    
    // Simulate donation processing
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Thank You!',
        `Your donation of $${amount} has been processed. Thank you for your generosity!`,
        [
          {
            text: 'OK',
            onPress: () => {
              setAmount('');
              navigation.navigate('Home');
            }
          }
        ]
      );
    }, 2000);
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <AppHeader 
        title="GIVING" 
        showBackButton={true}
        backgroundColor={theme.colors.background}
        titleStyle={styles.headerTitle}
      />
      
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.introSection}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="hand-holding-heart" size={40} color="#000000" />
          </View>
          <Text style={styles.introTitle}>SUPPORT OUR MINISTRY</Text>
          <Text style={styles.introText}>
            Your generous donations help us continue our mission and serve our community.
            All donations are tax-deductible.
          </Text>
        </View>
        
        <View style={styles.donationCard}>
          <Text style={styles.cardTitle}>SELECT AMOUNT</Text>
          
          <View style={styles.amountButtons}>
            {donationAmounts.map((value) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.amountButton,
                  amount === value.toString() && styles.selectedAmountButton
                ]}
                onPress={() => setAmount(value.toString())}
              >
                <Text 
                  style={[
                    styles.amountButtonText,
                    amount === value.toString() && styles.selectedAmountButtonText
                  ]}
                >
                  ${value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={styles.orText}>OR ENTER CUSTOM AMOUNT</Text>
          
          <View style={styles.customAmountContainer}>
            <Text style={styles.dollarSign}>$</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              placeholderTextColor="#666666"
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
            />
          </View>
          
          <Text style={styles.cardTitle}>PAYMENT METHOD</Text>
          
          <View style={styles.paymentMethods}>
            <TouchableOpacity
              style={[
                styles.paymentMethodButton,
                paymentMethod === 'card' && styles.selectedPaymentMethod
              ]}
              onPress={() => setPaymentMethod('card')}
            >
              <FontAwesome5 name="credit-card" size={20} color={paymentMethod === 'card' ? '#000000' : theme.colors.primary} />
              <Text 
                style={[
                  styles.paymentMethodText,
                  paymentMethod === 'card' && styles.selectedPaymentMethodText
                ]}
              >
                CREDIT CARD
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.paymentMethodButton,
                paymentMethod === 'paypal' && styles.selectedPaymentMethod
              ]}
              onPress={() => setPaymentMethod('paypal')}
            >
              <FontAwesome5 name="paypal" size={20} color={paymentMethod === 'paypal' ? '#000000' : theme.colors.primary} />
              <Text 
                style={[
                  styles.paymentMethodText,
                  paymentMethod === 'paypal' && styles.selectedPaymentMethodText
                ]}
              >
                PAYPAL
              </Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            style={styles.donateButton}
            onPress={handleDonate}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#000000" />
            ) : (
              <>
                <FontAwesome5 name="heart" size={16} color="#000000" solid />
                <Text style={styles.donateButtonText}>DONATE NOW</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>OTHER WAYS TO GIVE</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <FontAwesome5 name="church" size={20} color={theme.colors.primary} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoHeading}>IN PERSON</Text>
                <Text style={styles.infoDescription}>
                  Visit us during service times and place your gift in the offering box.
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <FontAwesome5 name="envelope" size={20} color={theme.colors.primary} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoHeading}>BY MAIL</Text>
                <Text style={styles.infoDescription}>
                  Send checks to: Nueva Esperanza Church, 123 Main St, Anytown, CA 12345
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <FontAwesome5 name="question-circle" size={20} color={theme.colors.primary} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoHeading}>QUESTIONS?</Text>
                <Text style={styles.infoDescription}>
                  Contact our finance team at finance@nuevaesperanza.org or call (123) 456-7890.
                </Text>
              </View>
            </View>
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
  donationCard: {
    ...theme.components.card,
    marginBottom: theme.spacing.lg,
  },
  cardTitle: {
    ...theme.typography.title,
    fontSize: 18,
    marginBottom: theme.spacing.md,
  },
  amountButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  amountButton: {
    width: '30%',
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.small,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    alignItems: 'center',
  },
  selectedAmountButton: {
    backgroundColor: theme.colors.primary,
  },
  amountButtonText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedAmountButtonText: {
    color: '#000000',
  },
  orText: {
    ...theme.typography.caption,
    textAlign: 'center',
    marginVertical: theme.spacing.sm,
  },
  customAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  dollarSign: {
    ...theme.typography.title,
    fontSize: 24,
    marginRight: theme.spacing.xs,
  },
  amountInput: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.small,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    padding: theme.spacing.md,
    color: '#ffffff',
    fontSize: 24,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  paymentMethodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.small,
    padding: theme.spacing.md,
  },
  selectedPaymentMethod: {
    backgroundColor: theme.colors.primary,
  },
  paymentMethodText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginLeft: theme.spacing.sm,
  },
  selectedPaymentMethodText: {
    color: '#000000',
  },
  donateButton: {
    ...theme.components.button.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
  },
  donateButtonText: {
    ...theme.typography.button,
    marginLeft: theme.spacing.sm,
  },
  infoSection: {
    marginBottom: theme.spacing.xl,
  },
  infoTitle: {
    ...theme.typography.title,
    fontSize: 18,
    marginBottom: theme.spacing.md,
  },
  infoCard: {
    ...theme.components.card,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
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
  infoDescription: {
    ...theme.typography.body,
  },
});

export default GivingScreen;