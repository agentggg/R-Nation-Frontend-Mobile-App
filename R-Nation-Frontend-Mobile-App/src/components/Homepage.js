import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Image, Dimensions, StatusBar, ScrollView, Animated, Easing, TouchableOpacity  } from 'react-native';
import PagerView from 'react-native-pager-view';
import axios from 'axios';
import getIpAddress from '../../config';
import * as Font from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';
import PercentageBar from '../reusesableComponents/PercentageBar';

const Homepage = () => {
  StatusBar.setHidden(true);
  const ipAddress = getIpAddress();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState()
  const [categoryCounts, setCategoryCounts] = useState()
  const { width, height } = Dimensions.get('window');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [translateX] = useState(new Animated.Value(-300)); // Initial position on the left
  const [pageIndex, setPageIndex] = useState(0);
  const pagerViewRef = useRef(null);
  const [percentage, setPercentage] = useState(0)
  const [goal, setGoal] = useState()
  useEffect(() => {
    fadeIn();
  }, []);
  const fadeIn = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2500,
        easing: Easing.ease,
        useNativeDriver: false,
      }),
      Animated.timing(translateX, {
        toValue: 0, // Move to the left (0 position)
        duration: 1500,
        easing: Easing.ease,
        useNativeDriver: false,
      }),
    ]).start();
  };
  const animatedStyle = {
    opacity: fadeAnim,
    transform: [{ translateX }],
  };
  useEffect(() => {
    async function fetchData() {
      try {
        await Font.loadAsync({
          'Cinzel': require('../../assets/fonts/Cinzel-SemiBold.ttf'),
        });
  
        let responseData = null;
        while (!responseData || responseData.images.length <= 1) {
          const postApiCall = await axios.post(`http://10.0.0.211:8001/soul_count`);
          responseData = JSON.parse(postApiCall.data); // Make sure to use the correct variable here
          setCategoryCounts(responseData.category_counts);
          setTotalCount(responseData.total_count);
          // Calculate the total category count
          let totalCategoryCount = 0;
          responseData.category_counts.forEach(category => {
            totalCategoryCount += category.category_count;
          });
          const upcount = totalCategoryCount + 45
          const upCountPercentage = (totalCategoryCount / upcount * 100)
          const upCountPercentageRounded = Math.round(upCountPercentage);
          await setGoal(upcount)
          await setPercentage(upCountPercentageRounded)
          const djangoImageUrl = `${ipAddress}/get_images`;
          const response = await axios.get(djangoImageUrl);
          if (response.status === 200) {
            responseData = response.data;
            setImages(responseData.images);
          } else {
            console.error('Failed to fetch images:', response.status, response.statusText);
          }
  
          // Sleep for a while before retrying (optional)
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
  
        setLoading(false);
      } catch (error) {
        console.error('Error:', error.message);
        setLoading(false);
      }
    }
  
    fetchData();
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
  useEffect(() => {
    const pageCount = images.length;
    const interval = setInterval(() => {
      setPageIndex((prevPageIndex) => {
        const nextPageIndex = (prevPageIndex + 1) % pageCount;
        if (pagerViewRef.current) {
          pagerViewRef.current.setPage(nextPageIndex);
        }
        return nextPageIndex;
      });
    }, 3000); // Change the page every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [images.length]);
  if (loading || images.length === 0) {
    return (
      <View style={styles.alertContainer}>
        <ActivityIndicator size="large" color="red" />
        <Text style={styles.alert}>Fetching data...</Text>
      </View>
    );
  }
  const PercentageBarData = [
    { label: 'Item 1', percentage: percentage },
  ];
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ alignItems: 'center', marginTop: 60, borderBottomWidth: 2, borderBottomColor: 'red', paddingBottom: 30 }}>
            <Animated.Text
              style={[
                { fontSize: width / 11, color: '#FFF', fontFamily: 'Cinzel'},
                animatedStyle,
              ]}
            >
              Featured Events
            </Animated.Text>
          </View>
          <PagerView
            style={[styles.viewPager, { height: height / 3, marginTop: 40  }]}
            initialPage={0}
            ref={pagerViewRef}
          >
            {images.map((imageData, index) => (
              <View style={[styles.page, { marginBottom: 40 }]} key={index}>
                <Image
                  source={{ uri: `data:${imageData.content_type};base64,${imageData.data.toString('base64')}` }}
                  style={{ width: width, height: height, aspectRatio: 0.6}}
                  resizeMode="contain"
                />
              </View>
            ))}
          </PagerView>
          <View style={{ borderTopWidth: 2, borderTopColor: 'red', paddingTop: 30}}>
            <Text style={{color: '#FFF', fontSize: 30, textAlign: 'center', paddingTop: 40}}>Goal for this season is {goal} street Evangelism encounters</Text>
              {PercentageBarData.map((item, index) => (
                <PercentageBar key={index} label={item.label} percentage={item.percentage} goal={goal} />
              ))}
          </View>
          <Text style={{color:"#FFF", fontSize: 24, textAlign:'center', alignItems:'center', marginTop: 30, letterSpacing: 3}}>I want to help win {goal} souls for Jesus through</Text>
          <Text style={{color:"#FFF", fontSize: 24, textAlign:'center', alignItems:'center', fontStyle: 'italic'}}>(select one)</Text>
          <View style={{flexDirection: 'row',  textAlign:'center', alignItems:'center', justifyContent:'space-around', marginTop: 30, borderBottomWidth: 2, borderBottomColor: '#FFF', paddingBottom: 34}}>
            <TouchableOpacity style={{color:"#FFF"}}>
              <Text style={{color:"#FFF", fontSize: 20, color:'red'}}>Discipleship</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{color:"#FFF"}}>
              <Text style={{color:"#FFF", fontSize: 20, color:'#FFF'}}>Intercession</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{color:"#FFF"}}>
              <Text style={{color:"#FFF", fontSize: 20, color:'red'}}>Evangelism</Text>
            </TouchableOpacity>
          </View>
            {categoryCounts && (
        <View style={{ flexDirection: 'column' }}>
          {/* Top row */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            {categoryCounts.slice(0, 2).map((category) => (
              <View
                key={category.renamed_category}
                style={{
                  width: '45%', // Take half of the row
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                  borderColor: '#FFF',
                  borderWidth: 2,
                  padding: 25,
                  paddingTop: 20,
                  paddingBottom: 20,
                  marginTop: 50,
                  borderColor: 'red'

                }}
              >
                <Text style={{ color: '#FFF', fontSize: width / 16, textAlign: 'center' }}>
                  {category.renamed_category}
                </Text>
                <Text style={{ color: '#FFF', fontSize: 20, paddingTop: 20, textAlign: 'center' }}>
                  {category.category_count}
                </Text>
              </View>
            ))}
          </View>

          {/* Bottom row */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            {categoryCounts.slice(2, 4).map((category) => (
              <View
                key={category.renamed_category}
                style={{
                  width: '45%', // Take half of the row
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                  borderColor: '#FFF',
                  borderWidth: 2,
                  padding: 25,
                  paddingTop: 40,
                  paddingBottom: 20,
                  marginTop: 50,
                  borderColor: 'red'
                }}
              >
                <Text style={{ color: '#FFF', fontSize: width / 15, textAlign: 'center' }}>
                  {category.renamed_category}
                </Text>
                <Text style={{ color: '#FFF', fontSize: 20, paddingTop: 20, textAlign: 'center' }}>
                  {category.category_count}
                </Text>
              </View>
            ))}
          </View>
        </View>
            )
              }
        </ScrollView>
      </SafeAreaView>
    )
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
