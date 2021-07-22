import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar, Text, View} from 'react-native';
import Onboarding from '../screens/Welcome/Onboarding';
import Login from '../screens/Welcome/Login';
import Signup from '../screens/Welcome/Signup';
import Recover from '../screens/Welcome/Recover';

const LoginStack = createStackNavigator();

const LoginNavigation = props => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{
          header: () => null,
        }}
      />

      <LoginStack.Screen
        name="Login"
        component={Login}
        options={{
          header: () => null,
        }}
      />
      <LoginStack.Screen
        name="Recover"
        component={Recover}
        options={{
          header: () => null,
        }}
      />

      <LoginStack.Screen
        name="Signup"
        component={Signup}
        options={{
          header: () => null,
        }}
      />
    </LoginStack.Navigator>
  );
};

export default LoginNavigation;
