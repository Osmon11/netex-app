import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {saveToken} from '../../store/action';
import {SplashScreenIcon} from '../Svg';

const SplashScreenComponent = nav => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(async () => {
      try {
        const value = await AsyncStorage.getItem('Token');
        if (value !== null) {
          dispatch(saveToken(value));
          nav.navigation.replace('Drawer');
          // console.log(nav);
          // value previously stored
        } else {
          dispatch(saveToken(value));
          nav.navigation.replace('Login');
        }
      } catch (e) {
        console.log(e);
      }
    }, 2000);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#32343f',
        justifyContent: 'center',
      }}>
      <View style={{alignSelf: 'center'}}>
        <SplashScreenIcon />
      </View>
    </View>
  );
};

export default SplashScreenComponent;
