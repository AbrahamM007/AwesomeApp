import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const DonationScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(null);
  
  const presetAmounts = [10, 25, 50, 100];
  
  const handlePresetAmount = (value) => {
    setSelectedAmount(value);
    setAmount(value.toString());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#2c5282" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Donate</Text>
        <View style={{ width: 40 }} />
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.donationCard}>
          <FontAwesome5 name="hand-holding-heart" size={50} color="#2c5282" style={styles.donationIcon} />
          <Text style={styles.donationTitle}>Support Our Ministry</Text>
          <Text style={styles.donationDescription}>
            Your generous donations help us continue our mission and serve our community.
          </Text>
        </View>
        
        <Text style={styles.sectionTitle}>Choose Amount</Text>
        
        <View style={styles.amountButtons}>
          {presetAmounts.map((value) => (
            <TouchableOpacity 
              key={value} 
              style={[
                styles.amountButton,
                selectedAmount === value && styles.selectedAmountButton
              ]}
              onPress={() => handlePresetAmount(value)}
            >
              <Text 
                style={[
                  styles.amountButtonText,
                  selectedAmount === value && styles.selectedAmountText
                ]}
              >
                ${value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <Text style={styles.sectionTitle}>Custom Amount</Text>
        
        <View style={styles.customAmountContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="Enter amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholderTextColor="#2c5282"
          />
        </View>
        
        <Text style={styles.sectionTitle}>Payment Method</Text>
        
        <View style={styles.paymentMethods}>
          <TouchableOpacity style={styles.paymentMethod}>
            <FontAwesome5 name="credit-card" size={24} color="#2c5282" />
            <Text style={styles.paymentMethodText}>Credit Card</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.paymentMethod}>
            <FontAwesome5 name="paypal" size={24} color="#2c5282" />
            <Text style={styles.paymentMethodText}>PayPal</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.paymentMethod}>
            <FontAwesome5 name="apple-pay" size={24} color="#2c5282" />
            <Text style={styles.paymentMethodText}>Apple Pay</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.donateButton}>
          <Text style={styles.donateButtonText}>Donate Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4f5c9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#8eda8e',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2c5282',
  },
  content: {
      flex: 1,
      padding: 15,
    },
    donationCard: {
      backgroundColor: '#8eda8e',
      borderRadius: 15,
      padding: 20,
      alignItems: 'center',
      marginBottom: 20,
    },
    donationIcon: {
      marginBottom: 15,
    },
    donationTitle: {
      fontSize: 22,
      fontWeight: '600',
      color: '#2c5282',
      marginBottom: 10,
      textAlign: 'center',
    },
    donationDescription: {
      fontSize: 16,
      color: '#2c5282',
      textAlign: 'center',
      lineHeight: 22,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#2c5282',
      marginBottom: 15,
      marginTop: 10,
    },
    amountButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    amountButton: {
      backgroundColor: '#fffde7',
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 20,
      width: '22%',
      alignItems: 'center',
    },
    selectedAmountButton: {
      backgroundColor: '#2c5282',
    },
    amountButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#2c5282',
    },
    selectedAmountText: {
      color: '#fff',
    },
    customAmountContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fffde7',
      borderRadius: 10,
      paddingHorizontal: 15,
      marginBottom: 20,
    },
    currencySymbol: {
      fontSize: 20,
      fontWeight: '600',
      color: '#2c5282',
      marginRight: 5,
    },
    amountInput: {
      flex: 1,
      height: 50,
      fontSize: 18,
      color: '#2c5282',
    },
    paymentMethods: {
      marginBottom: 30,
    },
    paymentMethod: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fffde7',
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
    },
    paymentMethodText: {
      fontSize: 16,
      color: '#2c5282',
      marginLeft: 15,
    },
    donateButton: {
      backgroundColor: '#2c5282',
      borderRadius: 10,
      paddingVertical: 15,
      alignItems: 'center',
      marginBottom: 30,
    },
    donateButtonText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#fff',
    },
  });
  
  export default DonationScreen;