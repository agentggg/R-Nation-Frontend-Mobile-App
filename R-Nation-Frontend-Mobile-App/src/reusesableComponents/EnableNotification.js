import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';


const EnableNotification = () => {
    async function registerForPushNotificationsAsync() {
        let token;
        // creates a global variable
        if (Device.isDevice) {
            // checks if request coming from a physical device
            const { status } = await Notifications.getPermissionsAsync();
            // checks if permission is enabled
            if (status !== 'granted') {
                // if user does not notifications is not enabled, ask to enable
              const { status: newStatus } = await Notifications.requestPermissionsAsync();
            //request 
              if (newStatus !== 'granted') {
                // if the user declines
                return;
              }
            }
        
          token = (await Notifications.getExpoPushTokenAsync({ projectId: 'dc8f874c-7a25-4780-ad0f-72b15d766912' })).data;
        //   if user allows, it retrieves the device token and the project_id
        } else {
          console.log('development device');
        //   if the device is a simulator, there is no expo token
        }  
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
        // needed for android purposes
        return token;
      }
    return registerForPushNotificationsAsync();
}

export default EnableNotification

