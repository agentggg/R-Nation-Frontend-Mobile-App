import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Image, Dimensions, StatusBar } from 'react-native';
import PagerView from 'react-native-pager-view';
import axios from 'axios';
import getIpAddress from '../../config';
import * as Font from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';

const Homepage = () => {
  StatusBar.setHidden(true);
  const ipAddress = getIpAddress();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'monoline-script': require('../../assets/fonts/PaytoneOne-Regular.ttf'),
      });
    }

    loadFonts();
  }, []);


  useEffect(() => {
    const retrieveImages = async () => {
      const djangoImageUrl = `${ipAddress}/get_images`;
      try {
        const response = await axios.get(djangoImageUrl);
        if (response.status === 200) {
          const imageData = response.data.images;
          setImages(imageData);
          setLoading(false);
        } else {
          console.error('Failed to fetch images:', response.status, response.statusText);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching images:', error.message);
        setLoading(false);
      }
    };

    retrieveImages()
  }, []);

  if (loading) {
    return (
      <View style={styles.alertContainer}>
        <ActivityIndicator size="large" color="red" />
        <Text style={styles.alert}>Fetching images 📷</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <PagerView style={[styles.viewPager, { flex: 1 / 3 }]} initialPage={0}>
        {images.map((imageData, index) => (
          <View style={styles.page} key={index}>
            <Image
              source={{ uri: `data:${imageData.content_type};base64,${imageData.data.toString('base64')}` }}
              style={{ width: width, height: height, aspectRatio: 0.6 }}
              resizeMode="contain"
            />
          </View>
        ))}
      </PagerView>
      <View style={{ alignItems: 'center', marginBottom: 40}}>
        <Text  style={{ fontSize: width / 11, color: '#FFF', fontFamily: 'monoline-script'}}>Featured Events</Text>
      </View>
    </SafeAreaView>    
  );
};

const styles = StyleSheet.create({
  viewPager: {},
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    overflow: 'hidden'
  },
  alert: {
    fontSize: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 40,
  },
  alertContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 3,
  },
});

export default Homepage;
