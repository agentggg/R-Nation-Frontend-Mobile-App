import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const Podcast = () => {
  const [sound, setSound] = useState();

  useEffect(() => {
    const loadSound = async () => {
        try {
          console.log('Loading Sound');
          const { sound } = await Audio.Sound.createAsync({
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          });
          console.log(sound)
          setSound(sound);
          console.log('sound loaded')
        } catch (error) {
          console.error('Error loading sound:', error);
        }
      };
      

    loadSound();
    
    // Clean up the sound when the component unmounts
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const playSound = async () => {
    try {
      if (sound) {
        await sound.playAsync();
      } else {
        console.warn('Sound not loaded yet.');
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Podcast;
