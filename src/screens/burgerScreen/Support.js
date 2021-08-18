import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {ArrowLeft} from '../Svg';
import {WebView} from 'react-native-webview';

const Support = () => {
  const back = useNavigation();
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{backgroundColor: 'rgba(32,34,42,1)', flex: 1}}>
        <TouchableOpacity
          style={{
            marginTop: 30,
            marginBottom: 28,
            marginLeft: 28,
            width: 50,
            height: 50,
          }}
          onPress={() => back.goBack()}>
          <ArrowLeft />
        </TouchableOpacity>

        <WebView
          source={{
            uri:
              'https://www.tidio.com/talk/zmz4xf67hxovu84vpl4blyc6snkws7c0#mobile-widget',
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export default Support;
