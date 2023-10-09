import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  SafeAreaView,
  Image,
} from 'react-native';
import SocialMediaIcons from '../reusesableComponents/SocialMediaIcons'

const Homepage = () => {
  const [partner] = useState(false)
  const [scaleValue] = useState(new Animated.Value(1));
  const buttons = [
    {
      text: 'Announcements',
      color: '#3498db',
      isLong: true,
      imageSource: require('../../assets/homepage/announcements.png'),
      boxBackground: '#000',
      resizeMode: 'fill'
    },
    {
      text: 'Events',
      color: 'red',
      imageSource: require('../../assets/homepage/events.png'),
      boxBackground: '#e9e8e9',
    },
    {
      text: 'Podcast',
      color: '#f4c430',
      imageSource: require('../../assets/homepage/podcast.png'),
      boxBackground: '#000',
    },
    {
      text: 'Capturing the Moments',
      color: '#1da2d8',
      isLong: true,
      imageSource: require('../../assets/homepage/capturingthemoments.png'),
      boxBackground: '#FFF',
      resizeMode: 'contain'
    },
    {
      text: '25:35 Project',
      color: '#800020',
      imageSource: require('../../assets/homepage/2535.png'),
      boxBackground: '#000',
      resizeMode: 'contain'
    },
    {
      text: 'Forum',
      color: '#000',
      imageSource: require('../../assets/homepage/forum.png'),
      boxBackground: '#000',
    },
  ];


  if (partner) {
    buttons.unshift({
      text: 'Announcements',
      color: '#3498db',
      isLong: true,
      imageSource: require('../../assets/homepage/announcements.png'),
      boxBackground: '#000',
      resizeMode: 'fill',
    });
  }

  const startAnimation = (index) => {
    Animated.timing(scaleValue, {
      toValue: 1.2,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      scaleValue.setValue(1);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {buttons.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.widget,
            {
              backgroundColor: button.color,
              borderRadius: '25%',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.5,
              shadowRadius: 5,
              elevation: 5,
            },
            button.isLong && styles.longWidget,
          ]}
          onPress={() => startAnimation(index)}
        >
          <Image
            source={button.imageSource}
            style={[styles.buttonBackground, { backgroundColor: button.boxBackground }]}
            resizeMode={button.resizeMode}
          />
          <Animated.Text
            style={[
              styles.widgetText,
              {
                transform: [{ scale: scaleValue }],
              },
            ]}
          >
            {button.text}
          </Animated.Text>
        </TouchableOpacity>
      ))}
      <SocialMediaIcons />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '25%',
    borderWidth: 3,
    borderRadius: '20%',
  },
  widget: {
    width: '44%',
    height: 150,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  longWidget: {
    width: '80%',
  },
  widgetText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 24
  },
});

export default Homepage;