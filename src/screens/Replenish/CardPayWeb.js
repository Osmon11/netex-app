import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {useSelector} from 'react-redux';

import {ArrowLeft} from '../Svg';

const CardPayWeb = () => {
  const back = useNavigation();
  const {CardPayWeb} = useSelector(store => store.appReducer);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(32,34,42,1)',
        }}>
        <TouchableOpacity
          style={{
            marginTop: 30,
            marginBottom: 28,
            marginLeft: 28,
          }}
          onPress={() => back.goBack()}>
          <ArrowLeft />
        </TouchableOpacity>
        <WebView
          originWhitelist={['*']}
          source={{html: `${CardPayWeb}`}}
          sharedCookiesEnabled
          // onNavigationStateChange={() => {
          //   console.log(3);
          // }}
          // onMessage={() => {
          //   console.log(1);
          // }}
        />
      </View>
    </SafeAreaView>
  );
};
export default CardPayWeb;
