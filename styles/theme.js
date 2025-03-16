// Theme configuration for Nueva Esperanza app
const theme = {
  // Colors
  colors: {
    primary: '#c1ff72',      // Lime green for primary elements
    background: '#000000',   // Black background
    card: '#111111',         // Dark gray for cards
    cardBorder: '#333333',   // Subtle border for cards
    text: {
      primary: '#c1ff72',    // Lime green text for headings
      secondary: '#ffffff',  // White text for normal content
      tertiary: '#cccccc',   // Light gray for less important text
    },
    icon: '#c1ff72',         // Icon color
    button: {
      background: '#c1ff72', // Button background
      text: '#000000',       // Button text
    },
    placeholder: '#222222',  // Placeholder background
  },
  
  // Typography
  typography: {
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      letterSpacing: 2,
      color: '#c1ff72',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      letterSpacing: 1,
      color: '#c1ff72',
    },
    body: {
      fontSize: 14,
      color: '#ffffff',
      fontWeight: '400',
    },
    caption: {
      fontSize: 14,
      color: '#cccccc',
      lineHeight: 20,
    },
    button: {
      fontSize: 16,
      fontWeight: 'bold',
      letterSpacing: 1,
      color: '#000000',
    },
  },
  
  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  
  // Shadows
  shadows: {
    small: {
      shadowColor: '#c1ff72',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    medium: {
      shadowColor: '#c1ff72',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    large: {
      shadowColor: '#c1ff72',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
    },
  },
  
  // Border radius
  borderRadius: {
    small: 8,
    medium: 12,
    large: 16,
    round: 50,
  },
  
  // Common component styles
  components: {
    card: {
      backgroundColor: '#111111',
      borderRadius: 12,
      overflow: 'hidden',
      shadowColor: '#c1ff72',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: '#333333',
      padding: 16,
      marginBottom: 16,
    },
    button: {
      primary: {
        backgroundColor: '#c1ff72',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
      },
      fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#c1ff72',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#c1ff72',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
      },
    },
    iconContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#c1ff72',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#c1ff72',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
    },
  }
};

export default theme;