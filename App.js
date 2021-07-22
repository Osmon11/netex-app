import React, {Component} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import DrawerNavigation from './src/navigation/DrawerNavigation';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreenComponent from './src/screens/components/SplashScreen';
import Onboarding from './src/screens/Welcome/Onboarding';
import Login from './src/screens/Welcome/Login';
import LoginNavigation from './src/navigation/LoginNavigation';
import {Provider} from 'react-redux';
import {store} from './src/store';

export default class App extends Component {
  // componentDidMount() {
  //   SplashScreen.hide();
  // }
  render() {
    const MyTheme = {
      ...DefaultTheme,

      colors: {
        ...DefaultTheme.colors,
        background: 'rgba(32,34,42,1)',
      },
    };
    const Stack = createStackNavigator();
    return (
      <Provider store={store}>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
              name="Drawer"
              component={DrawerNavigation}
              options={{
                header: () => null,
              }}
            />
            <Stack.Screen
              name="Splash"
              component={SplashScreenComponent}
              options={{
                header: () => null,
              }}
            />
            <Stack.Screen
              name="Login"
              component={LoginNavigation}
              options={{
                header: () => null,
              }}
            />
            {/* <Stack.Screen
              name="Main"
              component={Main}
              options={{
                header: () => null,
              }}
            /> */}
          </Stack.Navigator>
          {/* <DrawerNavigation /> */}
        </NavigationContainer>
      </Provider>
    );
  }
}
