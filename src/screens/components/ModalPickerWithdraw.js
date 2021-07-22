import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {appAxios} from '../../api/axios';

import images from '../Balance/AddWalletComponents/AllImages';

const ModalPickerWithdraw = props => {
  const {sellRates} = useSelector(store => store.appReducer);

  const onPressItem = option => {
    props.changeModalVisiblity(false);
    props.setData(option);
  };
  const option =
    Boolean(sellRates) &&
    sellRates
      .filter(item => item.finance.cashout_status === '1')
      .map((item, key) => {
        return (
          <TouchableOpacity
            style={{}}
            key={key}
            style={{
              justifyContent: 'space-between',
            }}
            onPress={() => {
              onPressItem(item);
            }}>
            <View
              key={key}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 100,
              }}>
              <View
                style={{
                  alignSelf: 'center',
                  justifyContent: 'flex-start',
                  marginTop: 5,
                }}>
                {images[item?.finance.currency].image}
              </View>
              <Text key={`name - ${key}`} style={styles.text}>
                {item.finance.currency}
              </Text>
            </View>
          </TouchableOpacity>
        );
      });

  return (
    <TouchableOpacity
      style={{flex: 1}}
      onPress={() => props.changeModalVisiblity(false)}>
      <TouchableOpacity
        onPress={() => props.changeModalVisiblity(false)}
        style={styles.container}>
        <View style={[styles.modal, {height: 350}]}>
          <ScrollView showsVerticalScrollIndicator={false}>{option}</ScrollView>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export {ModalPickerWithdraw};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 160,
    width: '50%',
    height: 400,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#272d3f',
    borderRadius: 20,
  },
  modal: {backgroundColor: 'rgba(0,0,0,0.0)', borderRadius: 10, color: 'white'},
  option: {color: 'white'},
  text: {
    marginTop: 5,
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    // alignSelf: 'baseline',
  },
});
