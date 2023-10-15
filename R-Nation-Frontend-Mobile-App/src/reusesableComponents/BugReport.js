import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Device from 'expo-device';
import { ProfileInfo } from '../context/ProfileInfo';

const recipientEmail = 'tech.and.faith.contact@gmail.com';

const BugReport = ({ style, color }) => {
  const userProfileInfo = useContext(ProfileInfo);

  const openEmailApp = () => {
    const deviceInfo = `
Device: ${Device.modelName} 
Device OS: ${Device.osName} ${Device.osVersion}
Username: ${userProfileInfo[0].profile_name}`;

    const subject = 'Revealed Mysteries Bug Report';
    const body = `Thank you for reporting this bug. Please describe the error you encountered below:\n\nError Description:\n\n\n\n\n\n${deviceInfo}\n\n`;

    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoLink)
      .then(() => console.log('Email app opened'))
      .catch((error) => console.error('Error opening email app:', error));
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={openEmailApp} style={styles.touchableContainer}>
        <View style={styles.iconTextContainer}>
          <FontAwesome name="bug" size={24} color={color} style={styles.icon} />
          <Text style={{ color }}>Report a Bug</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BugReport;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Align to the far right
  },
  touchableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5, // Add right margin to separate from the right edge
  },
  icon: {
    marginRight: 5,
  },
});
