import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StatusBar,
  Alert,
  Linking,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation, useScrollToTop} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {LineChart} from 'react-native-chart-kit';

import Graphic from '../components/Graphic';
import {decimalAdjust} from '../components/AllCryptovalComponent';
import {ArrowLeft} from '../Svg';
import images from './AddWalletComponents/AllImages';
import {
  BuyDefault,
  SellDef,
  setCurrencyRecvisit,
  setCurrentRate,
} from '../../store/action';
import {load, loader} from '../components/FullLoader';

const Cryptoval = props => {
  const dispatch = useDispatch();
  const {currentRate, rates, sellRates, allRates} = useSelector(
    store => store.appReducer,
  );
  const back = useNavigation();
  const [SellNav, setSellNav] = useState('');
  const [BuyNav, setBuyNav] = useState('');
  const [loading, setloading] = useState(false);
  const window = Dimensions.get('window');
  const screen = Dimensions.get('screen');
  const [dimensions, setDimensions] = useState({window, screen});

  const onChange = ({window, screen}) => {
    setDimensions({window, screen});
  };

  const scrollRef = useRef();

  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  useEffect(() => {
    Dimensions.addEventListener('change', onChange);

    if (Boolean(sellRates)) {
      setSellNav(
        sellRates.filter(
          item => item.finance.currency === currentRate.finance.currency,
        ),
      );
      setBuyNav(
        allRates.filter(
          item => item.finance.currency === currentRate.finance.currency,
        ),
      );
    }
    onPressTouch();
  }, [currentRate]);

  return Boolean(!currentRate) ? (
    loader
  ) : (
    <SafeAreaView>
      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: 'rgba(32,34,42,1)',
            marginBottom: 50,
          }}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="rgba(32,34,42,1)"
          />
          <TouchableOpacity
            style={{
              marginTop: 30,
              marginBottom: 37,
              marginLeft: 28,
            }}
            onPress={() => back.goBack()}>
            <ArrowLeft />
          </TouchableOpacity>

          <View>
            <View
              style={{
                paddingBottom: 23,
                flexDirection: 'row',
                marginHorizontal: 28,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 20,
                    backgroundColor: 'rgba(39,45,63,1)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 15,
                  }}>
                  {images[currentRate.finance.currency].image}
                </TouchableOpacity>
                <View style={{justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 16,
                      color: 'white',
                    }}>
                    {currentRate.finance.currency}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 12,
                      color: 'rgba(185, 193, 217, 1)',
                    }}>
                    {currentRate.finance.name}
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    marginLeft: 19,
                    alignSelf: 'center',
                    fontWeight: '600',
                    fontSize: 16,
                    color: 'white',
                    marginTop: 20,
                  }}>
                  {`$${currentRate.rates.lenght-1}`}
                </Text>
              </View>
            </View>
          </View>

          <Graphic />
          <View
            style={{
              flexDirection: 'row',
              display: 'flex',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              onPress={() => {
                dispatch(SellDef(SellNav[0]));
                props.navigation.navigate('Sell');
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 2, y: 0}}
                colors={['#076cbc', '#0395d0', '#0039e6']}
                style={{
                  width: 128,
                  height: 49,
                  marginTop: 40,
                  backgroundColor: '#0039E6',
                  borderRadius: 10,

                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 16,
                    alignSelf: 'center',
                    color: 'white',
                  }}>
                  ПРОДАТЬ
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            {/* -------------------Sell------------------- */}
            <TouchableOpacity
              onPress={() => {
                dispatch(BuyDefault(BuyNav[0]));
                props.navigation.navigate('Buy2');
              }}>
              <LinearGradient
                start={{x: 2, y: 4}}
                end={{x: 3, y: 0}}
                colors={['#0bd061', '#05d287', '#fff', '#0039e6', 'white']}
                style={{
                  width: 128,
                  height: 49,
                  marginTop: 40,
                  backgroundColor: '#0039E6',
                  borderRadius: 10,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 16,
                    alignSelf: 'center',
                    color: 'white',
                  }}>
                  КУПИТЬ
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              display: 'flex',
              marginTop: 66,
              marginHorizontal: 28,
              justifyContent: 'space-between',
            }}>
            <Text style={{color: 'rgba(133,134,140,1)', fontWeight: '600'}}>
              КУРСЫ
            </Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('AllCryptoval');
              }}>
              <Text
                style={{
                  color: 'rgba(133,133,133,1)',
                  fontWeight: '400',
                }}>
                Все криптовалюты
              </Text>
            </TouchableOpacity>
          </View>
          {rates
            .filter(
              item => item.finance.currency !== currentRate.finance.currency,
            )
            .slice(0, 3)
            .map((item, key) => (
              <TouchableOpacity
                key={key}
                style={{marginHorizontal: 10}}
                onPress={() => {
                  setloading(true);
                  dispatch(setCurrentRate(item));
                  props.navigation.navigate('Cryptoval');
                  setTimeout(() => {
                    setloading(false);
                  }, 500);
                }}>
                <View
                  style={{
                    paddingVertical: 16,
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'space-around',
                    borderBottomWidth: 3 === key + 1 ? 0 : 1.5,
                    borderColor: 'rgba(185,193,217,0.2)',
                  }}>
                  <View
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 20,
                      backgroundColor: 'rgba(39,45,63,1)',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {images[item.finance.currency].image}
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 12,
                    }}>
                    <Text
                      style={{
                        fontWeight: '600',
                        fontSize: 16,
                        color: 'white',
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
                      width={dimensions.window.width - 150}
                      height={60}
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

                        color: (opacity = 1) =>
                          `rgba(255, 255, 255, ${opacity})`,
                      }}
                      style={{
                        alignSelf: 'center',
                        alignItems: 'center',
                        marginLeft: -30,
                      }}
                    />
                  </View>
                  <View
                    style={{flexDirection: 'column', justifyContent: 'center'}}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontWeight: '600',
                        fontSize: 16,
                        marginTop: 10,
                        color: 'white',
                      }}>
                      {`$${item.rates[0].rate}`}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Cryptoval;
