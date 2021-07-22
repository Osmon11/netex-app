import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  Button,
  StatusBar,
  Alert,
  Linking,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Burger, VisaMaster} from '../Svg';
import CardPay from './CardPay';
import CashPay from './CashPay';
import Pay24 from './Pay24';
import {appAxios} from '../../api/axios';
import CardPayWeb from './CardPayWeb';
import {ReplenishComponentData, ReplenishData} from '../../store/action';
import {load} from '../components/FullLoader';
import ReplenishComponent from './ReplenishComponent';

const Replenish = nav => {
  function Home({navigation}) {
    const {token, isLoading, replenishData} = useSelector(
      store => store.appReducer,
    );
    const [Visa, setVisa] = useState('');
    const dispatch = useDispatch();
    // ---------------------getData---------------------
    useEffect(async () => {
      const tokenLocal = await AsyncStorage.getItem('Token');
      if (Boolean(token) && tokenLocal) {
        appAxios
          .get('user/refills', {
            headers: {
              authorization: `Basic ${tokenLocal || token}`,
            },
          })
          .then(({data, ...res}) => {
            dispatch(
              ReplenishData(
                data.data.refills
                  .filter(
                    item => item.name !== 'Visa/MasterCard',
                    // item.status !== '1',
                  )
                  .filter(item => item.status === '1'),
              ),
            );
          })
          .catch(e => console.log(e.message));
        // --------------------VisaMaster--------------------
        appAxios
          .get('user/refills', {
            headers: {
              authorization: `Basic ${tokenLocal || token}`,
            },
          })
          .then(({data, ...res}) => {
            data.data.refills.map(
              item =>
                item.name === 'Visa/MasterCard' &&
                item.status === '1' &&
                setVisa(item),
            );
          })
          .catch(e => console.log(e.message));
      }
    }, []);

    // ------------------------VisaMaster-----------------------------
    const footer = () =>
      Boolean(Visa) ? (
        <View>
          <TouchableOpacity
            activeOpacity={1}
            style={{width: '50%', alignItems: 'center'}}
            onPress={() => {
              navigation.navigate('CardPay');
            }}>
            <View
              style={{
                backgroundColor: '#272d3f',
                width: '90%',
                height: 150,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Image
                style={{
                  marginVertical: 10,
                  width: 80,
                  alignSelf: 'center',
                  height: 68,
                  borderRadius: 10,
                }}
                source={{
                  uri: `https://netex.kg/assets/images/ps/visamastercard.png`,
                }}
              />
            </View>
            <View style={{marginTop: 5}}>
              <Text
                style={{
                  color: 'white',
                  alignSelf: 'center',
                  width: '70%',
                  fontWeight: '700',
                  fontSize: 16,
                }}>
                {'      VISA\nMasterCard'}
              </Text>
              <Text
                style={{
                  color: '#7BEF8E',
                  fontSize: 12,
                  alignSelf: 'center',
                  marginBottom: 50,
                }}>
                {Visa.commission}%
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: '100%',
              marginBottom: 30,
              marginTop: -30,
              borderRadius: 1,
              borderStyle: 'solid',
              borderWidth: 0.3,
              borderColor: 'white',
            }}
          />
        </View>
      ) : (
        <View></View>
      );
    // ------------------------VisaMaster-----------------------------
    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            backgroundColor: 'rgba(32,34,42,1)',
          }}>
          {/* {console.log(replenishData)} */}
          <View style={{paddingHorizontal: 20}}>
            <StatusBar
              barStyle="light-content"
              backgroundColor="rgba(32,34,42,1)"
            />

            <TouchableOpacity
              style={{
                // backgroundColor: 'red',
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
                marginLeft: -7,
                marginBottom: 10,
              }}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Burger />
            </TouchableOpacity>

            <Text style={{color: 'white', marginBottom: 25, marginLeft: 8}}>
              Выберите удобный способ оплаты
            </Text>
            {
              (!replenishData,
              !Visa ? (
                load
              ) : (
                <FlatList
                  data={replenishData}
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  ListHeaderComponent={footer}
                  keyExtractor={item => `${item.id}`}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      activeOpacity={1}
                      style={{
                        width: '50%',
                        alignItems: 'center',
                        marginBottom:
                          replenishData.length === index + 1 ? 260 : 0,
                      }}
                      onPress={() => {
                        dispatch(ReplenishComponentData(item));
                        navigation.navigate('ReplenishComponent');
                      }}>
                      <View
                        style={{
                          backgroundColor: '#272d3f',
                          width: '90%',
                          height: 150,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 10,
                        }}>
                        <Image
                          style={{
                            marginVertical: 10,
                            width: '50%',
                            alignSelf: 'center',
                            height: '50%',
                            borderRadius: 10,
                          }}
                          source={{
                            uri: `https://netex.kg/assets/images/ps/${item.logo}`,
                          }}
                        />
                      </View>
                      <View style={{marginTop: 5}}>
                        <Text
                          style={{
                            color: 'white',
                            // flex: 0.5,
                            width: '70%',
                            fontWeight: '700',
                            fontSize: 16,
                          }}>
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            color: '#7BEF8E',
                            fontSize: 12,
                            alignSelf: 'center',
                            marginBottom: 20,
                          }}>
                          {item.commission}%
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              ))
            }
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // -------------------------------------------------------------------------------------------
  const Stack = createStackNavigator();
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CardPay" component={CardPay} />
        <Stack.Screen name="CardPayWeb" component={CardPayWeb} />
        <Stack.Screen name="CashPay" component={CashPay} />
        <Stack.Screen
          name="ReplenishComponent"
          component={ReplenishComponent}
        />
        <Stack.Screen name="Pay24" component={Pay24} />
      </Stack.Navigator>
    </>
  );
};
export default Replenish;
