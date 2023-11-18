import * as Device from 'expo-device';

const ipAddress = {
  // physicalDevice: 'https://dreamers-agentofgod.pythonanywhere.com',
  physicalDevice: 'http://10.0.0.211:8000',
  simulator: 'http://10.0.0.211:8000'
  // simulator: 'https://dreamers-agentofgod.pythonanywhere.com'
}


const getIpAddress = () => {
  if (Device.isDevice === true){
    return ipAddress.physicalDevice
  }else{
    return ipAddress.simulator
  }
}


export default getIpAddress;
