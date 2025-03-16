// ... existing code ...

const MinistriesScreen = () => {
  const navigation = useNavigation();
  const [ministries, setMinistries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Load real ministries data from AsyncStorage
  useEffect(() => {
    const loadMinistries = async () => {
      try {
        setLoading(true);
        const storedMinistries = await AsyncStorage.getItem('ministries');
        if (storedMinistries) {
          const parsedMinistries = JSON.parse(storedMinistries);
          // Sort alphabetically by name
          parsedMinistries.sort((a, b) => 
            a.name.localeCompare(b.name)
          );
          setMinistries(parsedMinistries);
        } else {
          setMinistries([]);
        }
      } catch (error) {
        console.error('Error loading ministries:', error);
        setMinistries([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadMinistries();
    
    // Set up a refresh interval
    const refreshInterval = setInterval(loadMinistries, 5000);
    
    // Clean up
    return () => clearInterval(refreshInterval);
  }, []);
  
  // ... rest of the component
// ... existing code ...