import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

// Import your original DevotionalScreen component
// Assuming it's exported as default from another file
import OriginalDevotionalScreen from './OriginalDevotionalScreen';

const DevotionalScreen = (props) => {
  const isFocused = useIsFocused();
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isFocused) {
      // When screen comes into focus, animate in
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset animations when leaving
      scaleAnim.setValue(0.8);
      opacityAnim.setValue(0);
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <OriginalDevotionalScreen {...props} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a9c25d', // Match the button color for a seamless transition
  },
  animatedContainer: {
    flex: 1,
    backgroundColor: '#fff', // Or whatever your content background should be
    borderRadius: 20, // Optional: rounded corners for a nicer effect
    overflow: 'hidden',
  },
});

export default DevotionalScreen;