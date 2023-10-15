import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import axios from 'axios';
import { ProfileInfo } from '../context/ProfileInfo';
import getIpAddress from '../../config';
import DeactivateAccountButton from '../reuseableComponents/DeactivateAccountButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import BugReport from '../reuseableComponents/BugReport';

const Profile = ({navigation}) => {
  const ipAddress = getIpAddress();
  const userProfileInfo = useContext(ProfileInfo)
  const [data, setData] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileName, setProfileName] = useState('');
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(`${ipAddress}/user_profile`, { username: userProfileInfo[0].username});
      const userData = response.data[0];
      setData(userData);
      setFirstName(userData.first_name);
      setLastName(userData.last_name);
      setEmail(userData.email);
      setProfileName(userData.username);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  const backToLoging = () =>{
    navigation.navigate('Login')
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <BugReport style={{ paddingRight: 25, paddingBottom: 55}} color="red"/>
        <View style={styles.profileContainer}>
          <View style={styles.profileHeader}>
            <Text style={styles.profileHeaderText}>Profile Information</Text>
          </View>
          <View style={styles.profileInfo}>
            {renderProfileInfo('First Name', firstName)}
            {renderProfileInfo('Last Name', lastName)}
            {renderProfileInfo('Email', email)}
            {renderProfileInfo('Profile Name', profileName)}
          </View>
        </View>
        <DeactivateAccountButton loginScreen={backToLoging} />
      </ScrollView>
    </SafeAreaView>
  );
};

const renderProfileInfo = (label, value) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  profileContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  profileHeader: {
    marginBottom: 15,
  },
  profileHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileInfo: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 15,
  },
  infoItem: {
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
  },
});

export default Profile;


