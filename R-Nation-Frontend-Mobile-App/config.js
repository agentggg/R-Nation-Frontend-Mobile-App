import * as Device from 'expo-device';

const ipAddress = {
  // physicalDevice: 'https://dreamers-agentofgod.pythonanywhere.com',
  physicalDevice: 'http://localhost:3001',
  simulator: 'http://localhost:3001'
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
