import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginView from '../components/Authenticate/LoginView';
import CreateAccount from '../components/Authenticate/CreateAccount';


const Stack = createStackNavigator();

const AuthFlowStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginView} options={{ headerShown: false }} />
        <Stack.Screen name="Create Account" component={CreateAccount} />
    </Stack.Navigator>
  );
};

export default AuthFlowStack;
