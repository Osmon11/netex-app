import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import {
  Ada,
  ArrowLeft,
  Bnb,
  Btc,
  Bth,
  Doge,
  Eos,
  Etc,
  Eth,
  Ltc,
  T,
  Xlm,
  Xmr,
  Xrp,
  Xrp2,
  Zec,
} from '../Svg';

const AddWallet = ({navigation}) => {
  const back = useNavigation();

  useEffect(() => {
    // dispatch({allWallet: DATA});
  }, []);

  let DATA = [
    {id: 0, img: <Btc />, name: 'BTC', alias: 'bitcoin'},
    {id: 1, img: <Bth />, name: 'BTH', alias: 'bitcoincash'},
    {id: 2, img: <T />, name: 'BTC', alias: 'bitcoincash'},
    {id: 3, img: <Eth />, name: 'ETH', alias: 'ethereum'},
    {id: 4, img: <Ada />, name: 'ADA', alias: 'cardano'},
    {id: 5, img: <Bnb />, name: 'BNB', alias: 'binance'},
    {id: 6, img: <Ltc />, name: 'LTC', alias: 'litecoin'},
    {id: 7, img: <Etc />, name: 'ETC', alias: 'etc'},
    {id: 8, img: <Xmr />, name: 'XMR', alias: 'monero'},
    //  ************************************
    {id: 9, img: <Xrp />, name: 'BTC', alias: 'bitcoincash'},
    //  ************************************
    {id: 10, img: <Doge />, name: 'DOGE', alias: 'dogecoin'},
    {id: 11, img: <Zec />, name: 'ZEC', alias: 'zcash'},
    {id: 12, img: <Xrp2 />, name: 'ZIL', alias: 'zilliqa'},
    {id: 13, img: <Eos />, name: 'EOS', alias: 'eoscoin'},
    {id: 14, img: <Xlm />, name: 'XLM', alias: 'stellar'},
  ];
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(32,34,42,1)',
        paddingHorizontal: 28,
      }}>
      <View
        style={{
          marginTop: 30,
          marginBottom: 40,
        }}>
        <TouchableOpacity onPress={() => back.goBack()}>
          <ArrowLeft />
        </TouchableOpacity>
      </View>
      <FlatList
        data={DATA}
        keyExtractor={item => `${item.id}`}
        numColumns={3}
        renderItem={({item}) => (
          <View style={{}}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AddWalletSecond', {id: item.id})
              }>
              <View
                style={{
                  marginTop: 20,
                  marginRight: 20,
                  marginBottom: 10,
                  marginLeft: 20,
                  height: 56,
                  width: 56,
                  borderRadius: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgb(39,45,63)',
                }}>
                {item.img}
              </View>
            </TouchableOpacity>
            <Text
              style={{
                color: 'white',
                alignSelf: 'center',
              }}>
              {item.name}
            </Text>
            {/* <Image source={item.imgg} /> */}
          </View>
        )}
      />
    </View>
  );
};
export default AddWallet;
