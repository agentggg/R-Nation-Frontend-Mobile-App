import {QueryClient, QueryClientProvider} from 'react-query'
import { ProfileInfoSavedProvider } from "./src/context/ProfileInfoSaved";
import { ProfileInfoProvider } from "./src/context/ProfileInfo";
import * as Device from 'expo-device';
import * as Updates from 'expo-updates';
import React, {useEffect, useState } from 'react'
import { AppState, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from "./src/navigations/AppNavigator";
import NavigationContainer from "./src/navigations/AppNavigator";

AppNavigator
export default function App() {
  const [profileInfo, setProfileInfo] = useState({})

  const checkForUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        Alert.alert(
          "New Update Available💥",
          "The app needs to be rebooted.",
          [
            { 
              text: "Reboot App",
              onPress: async() => {
                await Updates.fetchUpdateAsync();
                await Updates.reloadAsync();
                await AsyncStorage.removeItem('authToken')
              }
            }
          ]
        )
      }
    }catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      console.log(error)
    }
  }
  

  useEffect(() => {
    const initializeApp = async() => { 
      const token = await AsyncStorage.getItem('authToken');
      const userProfileJsonObject = JSON.parse(token);
      setProfileInfo(userProfileJsonObject || {});
      if (Device.isDevice === false) {
          console.log('Running in local development environment');
          checkForUpdates();
          }
      else {
          (console.log('no updates avail on simulation devices'))
          }
    }
    initializeApp();

    AppState.addEventListener('change', (state) => {
      if (state === 'active' && Device.isDevice === true) {
        checkForUpdates();
      } 
      else {
        console.log('Running in local development environment, no updates')    
      }
    });
    return () => {
      AppState.removeEventListener('change');
    };
  }, []);

  const queryClient = new QueryClient()
  return (   
      <ProfileInfoSavedProvider>
        <ProfileInfoProvider value={profileInfo}>
          <QueryClientProvider client={queryClient}>
              <NavigationContainer/>
          </QueryClientProvider>
        </ProfileInfoProvider>
      </ProfileInfoSavedProvider>
  )
}
