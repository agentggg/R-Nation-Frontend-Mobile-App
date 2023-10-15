import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { ProfileInfoSaved } from '../context/ProfileInfoSaved';

const NavigationContainer = () => {
  const [isLoggedIn] = useContext(ProfileInfoSaved);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default NavigationContainer;
