import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  StatusBar,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';

import {
  ArrowUpGreen,
  Line,
  Line2,
  ArrowLeft,
  ParamsIcon,
  ArrowDownRed,
} from '../Svg';
import AllImages from '../Balance/AddWalletComponents/AllImages';
import {setCurrencyRecvisit} from '../../store/action';

const AllWallet = ({navigation}) => {
  const back = useNavigation();
  // ----------------------------------------------------------------
  const dispatch = useDispatch();
  const {allWallets, allRates, rates} = useSelector(store => store.appReducer);
  // ----------------------------------------------------------------

  function decimalAdjust(type, value, exp) {
    // Если степень не определена, либо равна нулю...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Если значение не является числом, либо степень не является целым числом...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Сдвиг разрядов
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
    // Обратный сдвиг
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
  }

  return Boolean(allWallets) ? (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(32,34,42,1)',
        paddingHorizontal: 10,
      }}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(32,34,42,1)" />

      {/* -------------------Header Start------------------- */}

      <TouchableOpacity
        style={{
          marginTop: 40,
          marginBottom: 25,
          marginLeft: 20,
          width: 50,
          height: 50,
        }}
        onPress={() => back.goBack()}>
        <ArrowLeft />
      </TouchableOpacity>
      {/* -------------------Header End------------------- */}

      <ScrollView showsVerticalScrollIndicator={false}>
        {allWallets
          .filter(item => item.currency !== 'USDT')
          .map((item, index) => {
            return (
              <LinearGradient
                key={index}
                start={{x: 0.2, y: 0.2}}
                end={{x: 1.8, y: 2}}
                colors={[
                  '#C4C4C4',
                  '#5E6273',
                  '#20222A',
                  'black',
                  'black',
                  'black',
                ]}
                style={{
                  width: '90%',
                  paddingVertical: 1,
                  marginHorizontal: 20,
                  borderRadius: 10,
                  marginBottom: 20,
                  alignSelf: 'center',
                  alignItems: 'center',
                  display: item.status === '1' ? 'flex' : 'none',
                }}>
                <LinearGradient
                  key={index}
                  start={{x: 0.2, y: 0.2}}
                  end={{x: 3, y: 2}}
                  colors={[
                    'rgba(94, 98, 115, 1)',
                    'rgba(32, 34, 42, 1)',
                    '#22242d',
                    '#5E6273',
                  ]}
                  style={{
                    width: '99.5%',
                    borderRadius: 10,
                    paddingLeft: 20,
                    paddingTop: 28,
                    paddingRight: 20,
                    paddingBottom: 21,
                  }}>
                  {Boolean(rates) ? (
                    allRates.map((itemm, key) =>
                      itemm.finance?.currency === item.currency ? (
                        <View
                          key={key}
                          style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                          }}>
                          <View>
                            <View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <View style={{marginLeft: -13}}>
                                  {AllImages[itemm.finance.currency].image}
                                </View>
                                <View
                                  style={{
                                    marginRight: 7,
                                    alignSelf: 'center',
                                  }}>
                                  {decimalAdjust(
                                    'floor',
                                    itemm.rates[0].rate - itemm.rates[1].rate,
                                    -2,
                                  ) > 0 ? (
                                    <ArrowUpGreen />
                                  ) : decimalAdjust(
                                      'floor',
                                      itemm.rates[0].rate - itemm.rates[1].rate,
                                      -2,
                                    ) === 0 ? (
                                    <View />
                                  ) : (
                                    <ArrowDownRed />
                                  )}
                                </View>

                                <View>
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      color:
                                        decimalAdjust(
                                          'floor',
                                          itemm.rates[0].rate -
                                            itemm.rates[1].rate,
                                          -2,
                                        ) > 0
                                          ? '#7BEF8E'
                                          : decimalAdjust(
                                              'floor',
                                              itemm.rates[0].rate -
                                                itemm.rates[1].rate,
                                              -2,
                                            ) === 0
                                          ? '#EFC17B'
                                          : '#F27171',
                                    }}>
                                    {`${
                                      decimalAdjust(
                                        'floor',
                                        itemm.rates[0].rate -
                                          itemm.rates[1].rate,
                                        -2,
                                      ) > 0
                                        ? '+'
                                        : ''
                                    }${decimalAdjust(
                                      'floor',
                                      itemm.rates[0].rate - itemm.rates[1].rate,
                                      -2,
                                    )}`}
                                  </Text>
                                </View>
                              </View>
                              <View style={{marginTop: 5, marginLeft: -8}}>
                                {decimalAdjust(
                                  'floor',
                                  itemm.rates[0].rate - itemm.rates[1].rate,
                                  -2,
                                ) > 0 ? (
                                  <Line />
                                ) : decimalAdjust(
                                    'floor',
                                    itemm.rates[0].rate - itemm.rates[1].rate,
                                    -2,
                                  ) === 0 ? (
                                  <Line />
                                ) : (
                                  <Line2 />
                                )}
                              </View>
                            </View>
                            <Text
                              style={{
                                color: 'rgba(121, 121, 121, 1)',
                                marginTop: 10,
                              }}>
                              {itemm.finance?.name} wallet
                            </Text>
                            <Text
                              ellipsizeMode="middle"
                              numberOfLines={1}
                              style={{
                                color: 'white',
                                fontWeight: '700',
                                marginTop: 8,
                                width: 150,
                              }}>
                              {item.wallet_num === ''
                                ? 'не задан'
                                : item.wallet_num}
                            </Text>
                          </View>

                          <View>
                            <View style={{marginTop: 5}}>
                              <TouchableOpacity
                                onPress={() => {
                                  dispatch(setCurrencyRecvisit(item));
                                  navigation.navigate('AddWalletSecond');
                                }}
                                style={{alignSelf: 'flex-end'}}>
                                <ParamsIcon />
                              </TouchableOpacity>
                              <View
                                style={{flexDirection: 'row', marginTop: 13}}>
                                <Text style={{color: 'white', fontSize: 17}}>
                                  {Number(item.balance).toFixed(6)}
                                </Text>
                                <Text
                                  style={{
                                    color: 'rgba(255,255,255,0.5)',
                                    fontSize: 12,
                                    marginVertical: 2,
                                    marginLeft: 15,
                                  }}>
                                  {item.currency}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      ) : (
                        <View key={key}></View>
                      ),
                    )
                  ) : (
                    <ActivityIndicator size="large" color="#FFF" />
                  )}
                </LinearGradient>
              </LinearGradient>
            );
          })}
      </ScrollView>
    </View>
  ) : (
    <ActivityIndicator size="large" color="#FFF" />
  );
};

export default AllWallet;
