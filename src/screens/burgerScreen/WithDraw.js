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

import {ArrowLeft} from '../Svg';
import {createStackNavigator} from '@react-navigation/stack';
import WithDraw2 from './WithDraw2';
import WithDraw3 from './WithDraw3';

const WithDraw = nav => {
  // ---------------------------Home start----------------------------------------
  function Home({navigation}) {
    // -------------------------------------------------------------------
    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 28,
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
          }}>
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            onPress={() => navigation.goBack()}>
            <ArrowLeft />
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              fontSize: 22,
              marginLeft: 20,
              alignSelf: 'center',
            }}>
            Вывод средств
          </Text>
        </View>

        <WithDraw2 navigation={navigation} />

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
        <Stack.Screen name="WithDraw2" component={WithDraw2} />
        <Stack.Screen name="WithDraw3" component={WithDraw3} />
      </Stack.Navigator>
    </>
  );
};

export default WithDraw;
