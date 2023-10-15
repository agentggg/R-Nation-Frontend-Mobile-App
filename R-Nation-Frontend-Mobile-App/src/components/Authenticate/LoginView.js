import React, { useContext, useEffect, useState } from 'react';
import {StyleSheet, Text, View, Image, Alert, TextInput, Linking, ImageBackground, Dimensions, TouchableWithoutFeedback, Animated, Easing} from 'react-native';
import axios from 'axios';
import getIpAddress from '../../../config';
import * as Device from 'expo-device';
import { ProfileInfoSaved } from '../../context/ProfileInfoSaved';
import { ProfileInfo } from '../../context/ProfileInfo';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import BugReport from '../../reusesableComponents/BugReport';
import EnableNotification from '../../reusesableComponents/EnableNotification';

const Login = ({ navigation }) => {
  const ipAddress = getIpAddress();
  const [username, setUsername] = useState('agentofgod')
  const [password, setPassword] = useState('StevensonGerard')
  const [expoPushToken, setExpoPushToken] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useContext(ProfileInfoSaved);
  const [profileInfo, setProfileInfo] = useContext(ProfileInfo)
  const [colorChange, setColorChange] = useState('#FFF')
  const [placeholderText, setPlaceholderText] = useState('#000')
  const [isImageVisible, setImageVisible] = useState(true);
  const fadeAnim = new Animated.Value(1);
  const scaleAnim = new Animated.Value(0);
  const opacityAnim = new Animated.Value(0);

  useEffect(()=> {
    const retrieveToken = async () => {
      const token = await EnableNotification()
      await setExpoPushToken(token)
    }
    retrieveToken()
  },[])
  const saveAuthToken = async (token) => {
  try {
    await AsyncStorage.setItem('authToken', token);
    const userProfileJsonObject = JSON.parse(token);
    setProfileInfo(userProfileJsonObject)
  } catch (error) {
  }
  };
  const postApiResponse = async () => {
      try {  
          const pushTokenData = {username:username, deviceMake:Device.brand, deviceModel:Device.modelName, token:expoPushToken}
          const postApiCall = await axios.post(`${ipAddress}/users/login_verification`,{username:username, password:password})
          console.log(postApiCall.status)
          if (!postApiCall.status === 200){
            Alert.alert('❌', 'Username and/or password is invalid. Please try again.')
          }
          const apiResponseEncode = await JSON.stringify(postApiCall.data)
          saveAuthToken(apiResponseEncode)
          const pushTokenApiCall = await axios.post(`${ipAddress}/save_push_token`,pushTokenData)
          const activeUser = postApiCall.data['active'] === 'true'
          const activeToken = pushTokenApiCall.data === 'successful'
          if (activeUser || activeToken) {
              setIsLoggedIn(true)
              navigation.navigate('Homepage')
          }else{
              Alert.alert('❌', 'Username and/or password is invalid. Please try again.')
              }
      }
      catch (err) {
          console.log(err)
          Alert.alert('❌', 'Username and/or password is invalid. Please try again.')
        }   
  }
  const PasswordReset = async() => {
      const url = `${ipAddress}/accounts/password_reset`;
      const supported = await Linking.canOpenURL(url);
    
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log(`Cannot open URL: ${url}`);
      }
  }
  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000, // Animation duration in milliseconds
        easing: Easing.ease, // Easing function (optional)
        useNativeDriver: false, // Set to true if using native driver (not supported for scale)
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1, // Animation duration in milliseconds
        easing: Easing.ease, // Easing function (optional)
        useNativeDriver: false, // Set to true if using native driver (not supported for opacity)
      }),
    ]).start();
  },[]);
  

  const handleScreenPress = () => {
    setColorChange('#FFF')
    setPlaceholderText('#000')
  };
  const styleChange = () => {
    setColorChange('#000')
    setPlaceholderText('#FFF')
  }
  return (
    <TouchableWithoutFeedback onPress={handleScreenPress}>
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../../assets/homepageBackground.jpg')} style={styles.backgroundImage}>
          <KeyboardAwareScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
            <View>
                <BugReport style={{ paddingRight: 0, marginBottom: '25%' }} color="#D70040" />  
                <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: opacityAnim, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../../assets/loginScreenPicture.png')} style={styles.image}/>
                </Animated.View>
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    style={{ ...styles.input, backgroundColor: colorChange, color: placeholderText }}
                    value={username}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text) => setUsername(text)}
                    placeholder="Username"
                    placeholderTextColor={placeholderText}
                    textAlign="left"
                    onPressIn={()=>styleChange()}
                  />
                  <TextInput
                    style={{ ...styles.input, backgroundColor: colorChange, color: placeholderText }}
                    value={password}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text) => setPassword(text)}
                    placeholder="Password"
                    placeholderTextColor={placeholderText}
                    secureTextEntry={!showPassword}
                    textAlign="left"
                    onPressIn={()=>styleChange()}
                  />
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={windowHeight / 35}
                    color="#000"
                    style={styles.icon}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                <TouchableOpacity
                  style={{...styles.loginButton, borderColor: colorChange}}
                  onPress={postApiResponse}
                >
                  <Text style={{...styles.buttonText, color: colorChange}}>Login</Text>
                </TouchableOpacity>
                <View style={styles.linksContainer}>
                  <TouchableOpacity
                    style={styles.link}
                    onPress={() => navigation.navigate('Create Account')}
                  >
                    <Text style={{...styles.linkText, color: colorChange}}>Create Account</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.link} onPress={PasswordReset}>
                    <Text style={{...styles.linkText, color: colorChange}}>Forgot Password</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </ImageBackground>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
  };

  const windowHeight = Dimensions.get('window').height;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      maxHeight: windowHeight
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      height: windowHeight
    },
    contentContainer: {
      justifyContent: 'center',
    },
    passwordInputContainer: {
      marginTop: windowHeight / 5,
      flexDirection: 'column',
      alignItems: 'center'
    },
    input: {
      height: windowHeight / 20,
      borderColor: '#FFF',
      borderWidth: 2,
      borderRadius: 10,
      fontSize: 14,
      marginBottom: 20,
      paddingLeft: '5%',
      width: windowHeight / 3
    },
    imageContainer:{
      justifyContent: 'center',
      alignItems: 'center',
    },
    image:{
      width: windowHeight / 5,
      height: windowHeight / 5,
    },
    icon: {
      left: windowHeight / 8,
      bottom: windowHeight / 15.5,
    },
    loginButton: {
      borderRadius: 40,
      paddingVertical: windowHeight / 108,
      alignItems: 'center',
      marginBottom: windowHeight / 75,
      borderWidth: 1,
      borderColor: '#FFF',
      width: windowHeight / 5
    },
    buttonText: {
      color: '#FFFF',
      fontWeight: 'bold',
      fontSize: 14,
    },
    linksContainer: {
      alignItems: 'center',
    },
    link: {
      marginTop: 22,
      padding: 5,
    },
    linkText: {
      color: '#FFFF',
      fontSize: 14,
      fontWeight: 'bold',
    },
  });
  

export default Login;
