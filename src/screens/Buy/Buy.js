import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  Modal,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AddWalletThird from '../Balance/AddWalletThird';
import Buy2 from './Buy2';
import {Burger} from '../Svg';
import {createStackNavigator} from '@react-navigation/stack';
import ConfirmBuy from '../Buy/ConfirmBuy';
import BuyCheck from '../burgerScreen/Cheks/BuyCheck';
import ConclusionCheck from '../burgerScreen/Cheks/ConclusionCheck';
import ReplenishCheck from '../burgerScreen/Cheks/ReplenishCheck';
import SellCheck from '../burgerScreen/Cheks/SellCheck';

const Buy = nav => {
  // -------------------------------------------------------------------
  const drawer = useNavigation();

  // ---------------------------Home start----------------------------------------
  function Home({navigation}) {
    // -------------------------------------------------------------------
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'rgba(32,34,42,1)',
        }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="rgba(32,34,42,1)"
        />
        <View
          style={{
            marginTop: 10,
            marginBottom: 23,
            display: 'flex',
            flexDirection: 'row',
            marginLeft: 28,
            // justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              // backgroundColor: 'red',
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginLeft: -15,
            }}
            onPress={() => drawer.openDrawer()}>
            <Burger />
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              fontSize: 22,
              marginLeft: 20,
              alignSelf: 'center',
            }}>
            Купить
          </Text>
        </View>
        <AddWalletThird navigation={navigation} />
        <View style={{marginVertical: 20}} />
      </SafeAreaView>
    );
  }

  // ---------------------------Home End----------------------------------------
  const Stack = createStackNavigator();

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Buy2" component={Buy2} />
        <Stack.Screen name="ConfirmBuy" component={ConfirmBuy} />
        <Stack.Screen name="ConclusionCheck" component={ConclusionCheck} />
        <Stack.Screen name="BuyCheck" component={BuyCheck} />
        <Stack.Screen name="ReplenishCheck" component={ReplenishCheck} />
        <Stack.Screen name="SellCheck" component={SellCheck} />
      </Stack.Navigator>
    </>
  );
};

export default Buy;
