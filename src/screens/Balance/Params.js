import React from 'react';
import {StatusBar, Text, View} from 'react-native';

const Params = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(32,34,42,1)',
      }}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(32,34,42,1)" />
      <Text style={{color: 'white'}}>Params</Text>
    </View>
  );
};

export default Params;
