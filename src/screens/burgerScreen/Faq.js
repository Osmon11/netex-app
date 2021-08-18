import React from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';

import {ArrowLeft} from '../Svg';
import AccordionView from '../components/AccordionView';

const Faq = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'rgba(32,34,42,1)',
      }}>
      <View style={{paddingHorizontal: 28}}>
        <TouchableOpacity
          style={{
            marginTop: 30,
            width: 50,
            height: 50,
          }}
          onPress={() => navigation.goBack()}>
          <ArrowLeft />
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          <AccordionView />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Faq;
