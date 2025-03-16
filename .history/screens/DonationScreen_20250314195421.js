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
  content: