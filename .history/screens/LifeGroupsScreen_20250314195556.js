import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const LifeGroupsScreen = ({ navigation }) => {
  const groups = [
    {
      id: 1,
      name: 'Young Adults',
      members: 24,
      leader: 'Sarah Johnson',
      meetingTime: 'Tuesdays, 7:00 PM'
    },
    {
      id: 2,
      name: 'Married Couples',
      members: 18,
      leader: 'Mark & Lisa Thompson',
      meetingTime: 'Wednesdays, 6:30 PM'
    },
    {
      id: 3,
      name: 'Men\'s Group',
      members: 15,
      leader: 'David Wilson',
      meetingTime: 'Thursdays, 7:00 PM'
    },
    {
      id: 4,
      name: 'Women\'s Group',
      members: 20,
      leader: 'Jennifer Adams',
      meetingTime: 'Mondays, 6:00 PM'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#2c5282" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Life Groups</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#2c5282" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.banner}>
        <FontAwesome5 name="users" size={30} color="#2c5282" />
        <View style={styles.bannerText}>
          <Text style={styles.bannerTitle}>Join a Life Group</Text>
          <Text style={styles.bannerDescription}>Connect with others and grow in faith together</Text>
        </View>
      </View>
      
      <View style={styles.myGroupsHeader}>
        <Text style={styles.sectionTitle}>My Groups</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.groupsContainer}>
        {groups.map((group) => (
          <TouchableOpacity key={group.id} style={styles.groupCard}>
            <View style={styles.groupIconContainer}>
              <FontAwesome5 name="leaf" size={24} color="#2c5282" />
            </View>
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{group.name}</Text>
              <Text style={styles.groupDetails}>{group.members} members • {group.meetingTime}</Text>
              <Text style={styles.groupLeader}>Led by {group.leader}</Text>
            </View>
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <TouchableOpacity style={styles.createButton}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
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
  menuButton: {
    padding: 5,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8eda8e',
    margin: 15,
    padding: 15,
    borderRadius: 15,
  },
  bannerText: {
    marginLeft: 15,
    flex: 1,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c5282',
    marginBottom: 5,
  },
  bannerDescription: {
    fontSize: 14,
    color: '#2c5282',
  },
  myGroupsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c5282',
  },
  viewAllButton: {
    padding: 5,
  },
  viewAllText: {
    color: '#2c5282',
    fontWeight: '500',
  },
  groupsContainer: {
    flex: 1,
    padding: 15,
  },
  groupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffde7',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  groupIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8eda8e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupInfo: {
    flex: 1,
    marginLeft: 15,
  },
  groupName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c5282',
    marginBottom: 5,
  },
  groupDetails: {
    fontSize: 14,
    color: '#2c5282',
    marginBottom: 3,
  },
  groupLeader: {
    fontSize: 14,
    color: '#2c5282',
    opacity: 0.8,
  },
  joinButton: {
    backgroundColor: '#2c5282',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  createButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2c5282',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default LifeGroupsScreen;