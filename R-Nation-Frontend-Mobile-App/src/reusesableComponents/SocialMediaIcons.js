import React from 'react';
import { View, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SocialMediaIcons = () => {
  // Define social media profile links
  const socialMediaLinks = {
    instagram: 'https://www.instagram.com/your-instagram-profile',
    facebook: 'https://www.facebook.com/your-facebook-page',
    youtube: 'https://www.youtube.com/your-youtube-channel',
    tiktok: 'https://www.tiktok.com/@your-tiktok-profile',
    website: 'https://www.your-website.com',
  };

  // Function to open a social media link
  const openSocialMediaLink = (socialMedia) => {
    const url = socialMediaLinks[socialMedia];
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => openSocialMediaLink('instagram')}>
        <Feather name="instagram" size={30} color="purple" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openSocialMediaLink('facebook')}>
        <Feather name="facebook" size={30} color="blue" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openSocialMediaLink('youtube')}>
        <Feather name="youtube" size={30} color="red" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openSocialMediaLink('tiktok')}>
        <Feather name="instagram" size={30} color="black" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openSocialMediaLink('website')}>
        <Feather name="globe" size={30} color="green" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  icon: {
    marginHorizontal: 20,
  },
});

export default SocialMediaIcons;
