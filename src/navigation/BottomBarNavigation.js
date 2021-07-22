import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Balance from '../screens/Balance/Balance';
import Replenish from '../screens/Replenish/Replenish';
import Buy from '../screens/Buy/Buy';
import Profile from '../screens/Profile/Profile';
const BottomTab = createBottomTabNavigator();
import {BalanceIcon, BuyIcon, ProfileIcon, ReplenishIcon} from '../screens/Svg';
const BottomBarNavigation = () => (
  <BottomTab.Navigator
    initialRouteName="Balance"
    // screenOptions={{}}

    tabBarOptions={{
      keyboardHidesTabBar: true,
      activeTintColor: '#FFF',
      labelPosition: 'below-icon',
      // tabStyle: {justifyContent: 'center', alignContent: 'center'},
      style: {
        height: 70,
        backgroundColor: '#2E313F',
        paddingVertical: 10,

        borderTopColor: 'rgba(0,0,0,0.3)',
      },
      labelStyle: {marginBottom: 17, marginTop: -3},
    }}>
    <BottomTab.Screen
      name="Balance"
      component={Balance}
      options={{
        tabBarLabel: 'Баланс',
        tabBarIcon: () => <BalanceIcon />,
      }}
    />
    <BottomTab.Screen
      name="Replenish"
      component={Replenish}
      options={{
        tabBarLabel: 'Пополнить',
        tabBarIcon: () => <ReplenishIcon />,
      }}
    />
    <BottomTab.Screen
      name="Buy"
      component={Buy}
      options={{
        tabBarLabel: 'Купить',
        tabBarIcon: () => <BuyIcon />,
      }}
    />
    <BottomTab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarLabel: 'Профиль',
        tabBarIcon: () => <ProfileIcon />,
      }}
    />
  </BottomTab.Navigator>
);

export default BottomBarNavigation;
