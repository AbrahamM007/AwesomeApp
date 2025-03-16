import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import theme from '../styles/theme';

const AppHeader = ({ 
  title, 
  showBackButton = true, 
  rightComponent = null, 
  backgroundColor = theme.colors.background,
  titleStyle = {}
}) => {
  const navigation = useNavigation();
  
  return (
    <View style={[styles.header, { backgroundColor }]}>
      {showBackButton ? (
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholderButton} />
      )}
      
      <Text style={[styles.headerTitle, titleStyle]}>{title}</Text>
      
      {rightComponent ? (
        rightComponent
      ) : (
        <View style={styles.placeholderButton} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerTitle: {
    ...theme.typography.header,
    textAlign: 'center',
    flex: 1,
  },
  backButton: {
    padding: 8,
  },
  placeholderButton: {
    width: 36,
    height: 36,
  }
});

export default AppHeader;