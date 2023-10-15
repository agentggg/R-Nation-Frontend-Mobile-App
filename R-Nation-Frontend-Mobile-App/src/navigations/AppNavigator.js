import React, {useContext, useEffect, useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthFlowStack from './AuthFlowStack';
import MainStackNavigation from './MainStackNavigation';
import { ProfileInfo } from '../../src/context/ProfileInfo';
import { ProfileInfoSaved } from '../context/ProfileInfoSaved';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import getIpAddress from '../../config';
import {View, Image} from 'react-native'

const AppNavigator = (props) => {

  const ipAddress = getIpAddress();
  
  const [isLoggedIn, setIsLoggedIn] = useContext(ProfileInfoSaved);
  const [profileInfo, setProfileInfo] = useContext(ProfileInfo)
  const [isLoading, setIsLoading] = useState(true);

  const tokenValidation = async(username, token) => {
    const postApiCall = await axios.post(`${ipAddress}/token_validation`,{username:username})
    // api call to validate token
    const apiResponseEncode = await JSON.stringify(postApiCall.data[0])
    // stringfy it and then removing the token from the array, and calling it alone
    if (apiResponseEncode === '"' + token + '"'){
      // apiResponseEncode from backend sends it with quotes, so I need to add the quotes to the token that is passed as 
      // argument to token
      setIsLoggedIn(true) 
      setIsLoading(false)
      console.log("pass auth 3.0, token in object and backend token match")
    }
    else {
      setIsLoggedIn(false) 
      setIsLoading(false)
      console.log("failed auth 2.0, token in object and backend token does not match")
    }
  }    

  useEffect(() => {
    const fetchData = async () => {
      // try {
        await AsyncStorage.removeItem('authToken')
        const token = await AsyncStorage.getItem('authToken');
        const userProfileJsonObject = await JSON.parse(token);
        if (token === null) {
          // cheking if the object that holds the user profile data exist".
          // if it does not exsit, it sends login to false
                setIsLoggedIn(false)
                setIsLoading(false)
                console.log("failed auth 1.0, token object does not exsist")
              }
        // if it does exist, run the following code
        else if (token !== null) {
                  console.log("pass auth 1.0, token object exsist")
                  if(userProfileJsonObject.token === undefined){
                    // checks if there is a token in the object. if it returns undefined, then redirect to login screen
                    setIsLoggedIn(false) 
                    console.log("failed auth 2.0, object exist, but not the token")
                  } 
                  else{
                    // if the object exist, and the token exist, next is to extract the token and run an API call to validate the integrity of the token with backend
                    setProfileInfo(userProfileJsonObject)
                    tokenValidation(userProfileJsonObject.username, userProfileJsonObject.token) 
                    console.log("pass auth 2.0, object and token exsist")
                  }
                }
    };

    fetchData();
  }, []);
  
  return (
    <NavigationContainer>
        {isLoading ? <View           
          style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 1)', // Dark background color with 50% opacity
        }}>
          <Image
            source={require('../../assets/splashPage.png')}
            style={{ width: 400, height: 400 }}
          />
        </View>:
        <>
      {isLoggedIn ? <><MainStackNavigation /></> : <AuthFlowStack />}
        </>
}
    </NavigationContainer>
  );
};

export default AppNavigator;
