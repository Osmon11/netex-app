import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  ArrowUpGreen,
  Arrow2,
  Line,
  Line2,
  ParamsIcon,
  ArrowDownRed,
} from '../Svg';
import {useDispatch, useSelector} from 'react-redux';
import AllImages from '../Balance/AddWalletComponents/AllImages';
import {setCurrencyRecvisit, setLoading} from '../../store/action';
import {load} from './FullLoader';

// import moduleName from '../'
const HorFlat = navigation => {
  const [text, setText] = useState('');
  useEffect(() => {
    if (!Boolean(text) && Boolean(allRates)) {
      setText(rates.filter(item => item.rates[0]));
    }
  }, []);

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

  const dispatch = useDispatch();
  const {wallets, token, allRates, sellRates, rates, isLoading} = useSelector(
    store => store.appReducer,
  );

  return !Boolean(wallets) ? (
    <ActivityIndicator size="large" color="#FFF" />
  ) : (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor="rgba(32,34,42,1)" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Boolean(sellRates) &&
          sellRates
            .filter(
              item =>
                item.finance.currency === 'BTC' ||
                item.finance.currency === 'ETH' ||
                item.finance.currency === 'LTC' ||
                item.finance.currency === 'BCH' ||
                item.finance.currency === 'ETC' ||
                item.finance.currency === 'ZEC',
            )
            .map((item, key) => (
              <LinearGradient
                key={key}
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
                  width: 243,
                  padding: 1,

                  // key === 0 ? 36 : 20,
                  marginRight: 20,
                  marginLeft: key === 0 ? 28 : 0,
                  borderRadius: 10,
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <LinearGradient
                  start={{x: 0.2, y: 0.2}}
                  end={{x: 3, y: 2}}
                  colors={[
                    'rgba(94, 98, 115, 1)',
                    'rgba(32, 34, 42, 1)',
                    '#22242d',
                    '#5E6273',
                  ]}
                  style={{
                    width: 241,
                    borderRadius: 10,
                    paddingLeft: 17,
                    paddingTop: 20,
                    paddingRight: 20,
                    paddingBottom: 16,
                  }}>
                  {Boolean(rates) ? (
                    rates.map(
                      (itemm, key) =>
                        itemm.finance?.currency === item.finance.currency && (
                          <View key={`container-${key}`}>
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
                                        itemm.rates[0].rate -
                                          itemm.rates[1].rate,
                                        -2,
                                      ) > 0 ? (
                                        <ArrowUpGreen />
                                      ) : decimalAdjust(
                                          'floor',
                                          itemm.rates[0].rate -
                                            itemm.rates[1].rate,
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
                                              ? '#7BEF8E' // Green
                                              : decimalAdjust(
                                                  'floor',
                                                  itemm.rates[0].rate -
                                                    itemm.rates[1].rate,
                                                  -2,
                                                ) === 0
                                              ? '#EFC17B' // Orange
                                              : '#F27171', // Red
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
                                          itemm.rates[0].rate -
                                            itemm.rates[1].rate,
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
                                        itemm.rates[0].rate -
                                          itemm.rates[1].rate,
                                        -2,
                                      ) === 0 ? (
                                      <Line />
                                    ) : (
                                      <Line2 />
                                    )}
                                  </View>
                                </View>
                                <Text
                                  ellipsizeMode="tail"
                                  numberOfLines={1}
                                  style={{
                                    color: 'rgba(121, 121, 121, 1)',
                                    marginTop: 10,
                                    width: 90,
                                  }}>
                                  {itemm.finance?.name} wallet
                                </Text>
                              </View>
                              <View>
                                <View style={{marginTop: 5}}>
                                  {isLoading ? (
                                    load
                                  ) : (
                                    <TouchableOpacity
                                      onPress={() => {
                                        dispatch(setLoading(true));
                                        dispatch(
                                          setCurrencyRecvisit(item.finance),
                                        );
                                        navigation.navigation.navigate(
                                          'AddWalletSecond',
                                        );

                                        dispatch(setLoading(false));

                                        // console.log(item);
                                      }}
                                      style={{alignSelf: 'flex-end'}}>
                                      <ParamsIcon />
                                    </TouchableOpacity>
                                  )}
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      marginTop: 13,
                                    }}>
                                    <Text
                                      style={{color: 'white', fontSize: 17}}>
                                      {Number(item.finance.balance).toFixed(6)}
                                    </Text>
                                    <Text
                                      style={{
                                        color: 'rgba(255,255,255,0.5)',
                                        fontSize: 12,
                                        marginVertical: 2,
                                        marginLeft: 15,
                                      }}>
                                      {item.finance.currency}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                            <Text
                              ellipsizeMode="middle"
                              numberOfLines={1}
                              key={`Text-${key}`}
                              style={{
                                color: 'white',
                                fontWeight: '700',
                                marginTop: 8,
                                // width:
                              }}>
                              {item.finance.wallet_num === ''
                                ? 'не задан'
                                : item.finance.wallet_num}
                            </Text>
                          </View>
                        ),
                    )
                  ) : (
                    <ActivityIndicator size="large" color="#FFF" />
                  )}
                </LinearGradient>
              </LinearGradient>
            ))}
      </ScrollView>
      {/* <FlatList
        showsHorizontalScrollIndicator={false}
        data={wallets}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          
        )} */}
      {/* /> */}
    </SafeAreaView>
  );
};

export default HorFlat;
