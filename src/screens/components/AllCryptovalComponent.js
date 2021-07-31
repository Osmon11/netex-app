import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {LineChart} from 'react-native-chart-kit';

import {setCurrentRate} from '../../store/action';
import images from '../Balance/AddWalletComponents/AllImages';
import {appAxios} from '../../api/axios';

export function decimalAdjust(type, value, exp) {
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

const AllCryptovalComponent = navigation => {
  const dispatch = useDispatch();
  const {allRates, rates} = useSelector(store => store.appReducer);
  const window = Dimensions.get('window');
  const screen = Dimensions.get('screen');

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return;
  }, []);
  const [dimensions, setDimensions] = useState({window, screen});

  const onChange = ({window, screen}) => {
    setDimensions({window, screen});
  };
  // =========================================================================== //
  // api/v1.0/fiat-valute-rates
  return !Boolean(allRates) ? (
    <ActivityIndicator style={{marginTop: 50}} size="large" color="#FFF" />
  ) : (
    <View>
      {rates
        .filter(item => item.finance.status === '1')
        .map((item, key) => (
          <TouchableOpacity
            style={{marginHorizontal: 28}}
            key={key}
            onPress={() => {
              dispatch(setCurrentRate(item));
              navigation.navigation.navigate('Cryptoval');
            }}>
            <View
              style={{
                paddingVertical: 16,
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'space-around',
                borderBottomWidth: rates.length === key + 1 ? 0 : 1.5,

                borderColor: 'rgba(185,193,217,0.2)',
              }}>
              <TouchableOpacity
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 20,
                  backgroundColor: 'rgba(39,45,63,1)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                {/* <Btc /> */}
                {images[item.finance.currency].image}
              </TouchableOpacity>

              <View
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 25,
                  marginRight: 5,
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 16,
                    color: 'white',
                    width: '100%',
                    alignSelf: 'center',
                    marginLeft: 15,
                  }}>
                  {item.finance.currency}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color:
                      decimalAdjust(
                        'floor',
                        item.rates[0].rate - item.rates[1].rate,
                        -2,
                      ) > 0
                        ? '#7BEF8E' // Green
                        : decimalAdjust(
                            'floor',
                            item.rates[0].rate - item.rates[1].rate,
                            -2,
                          ) === 0
                        ? '#EFC17B' //Orange
                        : '#F27171', // Red
                  }}>
                  {`${
                    decimalAdjust(
                      'floor',
                      item.rates[0].rate - item.rates[1].rate,
                      -2,
                    ) > 0
                      ? '+'
                      : ''
                  }${decimalAdjust(
                    'floor',
                    item.rates[0].rate - item.rates[1].rate,
                    -2,
                  )}`}
                </Text>
              </View>
              <View style={{marginLeft: -15}}>
                <LineChart
                  data={{
                    datasets: [
                      {
                        data: item.data.rates,
                        color: (opacity = 1) =>
                          `rgba(255, 255, 255, ${opacity})`, // optional
                      },
                    ],
                  }}
                  height={60}
                  width={dimensions.window.width - 150}
                  withHorizontalLabels={false}
                  withVerticalLabels={false}
                  withDots={false}
                  withHorizontalLines={false}
                  withVerticalLines={false}
                  chartConfig={{
                    backgroundGradientFrom: 'rgba(0,0,0,1)',
                    backgroundGradientTo: 'rgba(0,0,0,1)',
                    decimalPlaces: 2,
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientToOpacity: 0,

                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  }}
                  style={{
                    alignSelf: 'center',
                    alignItems: 'center',
                    marginLeft: -30,
                  }}
                />
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    textAlign: 'left',
                    marginLeft: 19,
                    fontWeight: '600',
                    fontSize: 16,
                    color: '#fff',
                    width: '100%',
                  }}>
                  {`$${item.rates[item.rates.length - 1].rate}`}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default AllCryptovalComponent;

const styles = StyleSheet.create({});
