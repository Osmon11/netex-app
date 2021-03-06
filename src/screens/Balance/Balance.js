import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  PermissionsAndroid,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import AllCryptoval from './AllCryptoval';
import AllWallet from './AllWallet';
import HorFlat from '../components/HorFlat';
import Cryptoval from './Cryptoval';
import Notification from './Noification';
import Sell from '../Buy/Sell';
import AddWalletSecond from './AddWalletSecond';
import AddWallet from './AddWallet';
import {Burger, Unknown, T} from '../Svg';
import Buy2 from '../Buy/Buy2';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useDispatch, useSelector} from 'react-redux';
import {
  saveUserData,
  setLoading,
  getWallets,
  saveRates,
  saveAllRates,
  SellRates,
  getAllWallets,
  setUserHistory,
  FiatKurs,
  WithdrawRates,
} from '../../store/action';
import {appAxios} from '../../api/axios';
import AllCryptovalComponent from '../components/AllCryptovalComponent';
import Confirm from '../components/Confirm';
import Sell2 from '../Buy/Sell2';
import ConclusionCheck from '../burgerScreen/Cheks/ConclusionCheck';
import BuyCheck from '../burgerScreen/Cheks/BuyCheck';
import ReplenishCheck from '../burgerScreen/Cheks/ReplenishCheck';
import SellCheck from '../burgerScreen/Cheks/SellCheck';
import WithDraw2 from '../burgerScreen/WithDraw2';
import WithDraw3 from '../burgerScreen/WithDraw3';
import WithDraw from '../burgerScreen/WithDraw';

// запрашиваем разрешение на запись внешнему хранилищу
const checkAndroidPermission = async () => {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  await PermissionsAndroid.request(permission);
};

const Balance = ({navigation}) => {
  const width = Dimensions.get('window').width;
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const {userData, token, allWallets, allRates} = useSelector(
    store => store.appReducer,
  );
  useEffect(() => {
    getBalance();
    getData();
    checkAndroidPermission();
  }, [getBalance, getData]);
  // ----------------------------------------------------------
  const getBalance = useCallback(async () => {
    const tokenLocal = await AsyncStorage.getItem('Token');

    if (Boolean(token) && tokenLocal) {
      appAxios
        .get('user/wallets', {
          headers: {
            authorization: tokenLocal || token,
          },
        })
        .then(({data}) => {
          let filteredArr = data.data.wallets.filter(
            item => item.status === '1',
          );
          let wallets = filteredArr.filter(item => item.currency !== null);
          // console.log(wallets);
          // console.log(`wallets**${JSON.stringify(data.data.wallets)}`);

          dispatch(getWallets(wallets));
          dispatch(getAllWallets(wallets));
          dispatch(setLoading(false));
        })
        .catch(e => console.log(e.message));
    }
    // -------------------------------------------
    if (Boolean(token) && tokenLocal) {
      appAxios
        .get('rates', {
          headers: {
            authorization: tokenLocal || token,
          },
        })
        .then(({data: resData}) => {
          let withdrawArr = [];
          for (let currency in resData.data) {
            withdrawArr.push(resData.data[currency]);
          }
          let arr = withdrawArr
            .filter(
              currency =>
                currency.finance.status === '1' &&
                currency.finance.currency !== 'USDT',
            )
            .map(item => {
              let data = {
                rates: [],
                date: [],
              };
              item.rates.forEach(obj => {
                data.rates.push(obj.rate);
                data.date.push(obj.date_creation);
              });

              item.data = data;
              return item;
            });
          dispatch(WithdrawRates(withdrawArr));
          dispatch(SellRates(arr));
        })
        .catch(e => console.log(e.message));
    }
  }, [dispatch, token]);
  // ----------------------------------------------------------
  const getData = useCallback(async () => {
    setRefreshing(true);

    const tokenLocal = await AsyncStorage.getItem('Token');

    if (Boolean(token) && tokenLocal) {
      dispatch(setLoading(true));

      appAxios
        .get('user/profile', {
          headers: {
            authorization: `Basic ${tokenLocal || token}`,
          },
        })
        .then(({data, ...res}) => {
          if (data.result !== 1) {
            AsyncStorage.removeItem('Token');
            navigation.replace('Login');
          }
          dispatch(saveUserData(data.data.user_data));
        })
        .catch(e => console.log(e.message));
    }
    // -------------------------------------------
    if (!allRates && tokenLocal) {
      appAxios
        .get('rates')
        .then(({data: resData}) => {
          let arr = [];
          for (let currency in resData.data) {
            if (resData.data[currency].finance.currency !== 'USDT') {
              arr.push(resData.data[currency]);
            }
          }
          arr.map(item => {
            let data = {
              rates: [],
              date: [],
            };
            item.rates.forEach(obj => {
              data.rates.push(obj.rate);

              data.date.push(obj.date_creation);
            });

            item.data = data;
            return item;
          });
          let rates = arr.splice(0, 10);
          dispatch(saveRates(rates));
          dispatch(saveAllRates(arr.concat(rates)));
        })
        .catch(e => console.log(e.message));
    }
    // -------------------------------------------

    // fiat-valute-rates
    if (Boolean(token) && tokenLocal) {
      dispatch(setLoading(true));

      appAxios
        .get('fiat-valute-rates', {
          headers: {
            authorization: `Basic ${tokenLocal || token}`,
          },
        })
        .then(({data, ...res}) => {
          dispatch(FiatKurs(data.data));
        })
        .catch(e => console.log(e.message));
    }
    // -------------------------------------------

    if (!userData && tokenLocal) {
      appAxios
        .get('user/actions', {
          headers: {
            authorization: tokenLocal || token,
          },
        })
        .then(({data}) => {
          dispatch(setUserHistory(data.data.user_actions));
        })
        .catch(e => console.log(e.message));
    }

    dispatch(setLoading(false));
    setRefreshing(false);
  }, [userData, allRates, token, dispatch, navigation]);

  // *************************Home Start*************************
  function Home() {
    const drawer = useNavigation();

    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              tintColor="#fff"
              refreshing={refreshing}
              onRefresh={getData}
            />
          }>
          <View
            style={{
              backgroundColor: 'rgba(32,34,42,1)',
              paddingBottom: 40,
            }}>
            <StatusBar
              barStyle="light-content"
              backgroundColor="rgba(32,34,42,1)"
            />

            <View
              style={{
                marginHorizontal: 28,
                marginTop: 10,
                marginBottom: 23,
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: -15,
                }}
                onPress={() => drawer.openDrawer()}>
                <Burger />
              </TouchableOpacity>
              <TouchableOpacity
                style={{display: 'none'}}
                onPress={() => {
                  navigation.navigate('Notification');
                }}>
                <Unknown />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Replenish');
              }}
              style={{
                flexDirection: 'row',
                marginBottom: 42,
                height: 60,
                backgroundColor: 'rgba(84,88,103,1)',
                borderRadius: 10,
                // paddingVertical: 23,
                paddingHorizontal: 20,
                marginHorizontal: 28,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  alignSelf: 'center',
                  color: 'white',
                }}>
                Ваш Баланс
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'white',
                  }}>
                  {Boolean(allWallets) ? (
                    `${Number(
                      allWallets.filter(item => item.currency === 'USDT')[0]
                        .balance,
                    ).toFixed(2)} USDT`
                  ) : (
                    <ActivityIndicator size="large" color="#FFF" />
                  )}
                </Text>
                <View style={{alignSelf: 'center'}}>
                  <T />
                </View>
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 20,
                marginHorizontal: 28,
              }}>
              <Text style={{color: 'rgba(133,134,140,1)', fontWeight: '600'}}>
                ВАШИ КОШЕЛЬКИ
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AllWallet');
                }}>
                <Text
                  style={{
                    color: 'rgba(133,133,133,1)',
                  }}>
                  Все кошельки
                </Text>
              </TouchableOpacity>
            </View>
            <HorFlat navigation={navigation} />
            <View
              style={{
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 63,
                marginHorizontal: 28,
              }}>
              <Text style={{color: 'rgba(133,134,140,1)', fontWeight: '600'}}>
                КУРСЫ
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AllCryptoval');
                }}>
                <Text
                  style={{
                    color: 'rgba(133,133,133,1)',
                  }}>
                  Все криптовалюты
                </Text>
              </TouchableOpacity>
            </View>
            <AllCryptovalComponent navigation={navigation} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  // }
  // *************************Home End*************************
  const Stack = createStackNavigator();
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Balance" component={Home} />
        <Stack.Screen name="AllWallet" component={AllWallet} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="AllCryptoval" component={AllCryptoval} />
        <Stack.Screen name="AddWalletSecond" component={AddWalletSecond} />
        <Stack.Screen name="Cryptoval" component={Cryptoval} />
        <Stack.Screen name="AddWallet" component={AddWallet} />
        <Stack.Screen name="Buy2" component={Buy2} />
        <Stack.Screen name="Sell" component={Sell} />
        <Stack.Screen name="Sell2" component={Sell2} />
        <Stack.Screen name="WithDraw2" component={WithDraw2} />
        <Stack.Screen name="WithDraw3" component={WithDraw3} />
        <Stack.Screen name="WithDraw" component={WithDraw} />
        <Stack.Screen name="HorFlat" component={HorFlat} />
        <Stack.Screen name="Confirm" component={Confirm} />
        <Stack.Screen name="ConclusionCheck" component={ConclusionCheck} />
        <Stack.Screen name="BuyCheck" component={BuyCheck} />
        <Stack.Screen name="ReplenishCheck" component={ReplenishCheck} />
        <Stack.Screen name="SellCheck" component={SellCheck} />
      </Stack.Navigator>
    </>
  );
};
export default Balance;
