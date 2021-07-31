import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';

import config from '../../api/config';
import {ModalPickerBuy} from '../components/ModalPickerBuy';
import images from '../Balance/AddWalletComponents/AllImages';
import {ToastShow} from '../components/TosterShow';
import {ArrowLeft, Btc, DownArrow, MinSummIcon, ProcentIcon} from '../Svg';
import {Confirm, ConfirmBuy} from '../../store/action';
const Buy2 = ({navigation}) => {
  const {rates, BuyDefault, allWallets} = useSelector(
    store => store.appReducer,
  );
  const dispatch = useDispatch();
  const back = useNavigation();
  const [loading, setloading] = useState(false);
  const window = Dimensions.get('window');
  const screen = Dimensions.get('screen');

  useEffect(() => {
    if (!Boolean(text) && Boolean(rates)) {
      setText(BuyDefault);
      //  sellRates.filter(item => item.finance.currency === 'BTC')[0]
    }
    Dimensions.addEventListener('change', onChange);
  }, []);
  const [dimensions, setDimensions] = useState({window, screen});

  const onChange = ({window, screen}) => {
    setDimensions({window, screen});
  };

  // *************************************************

  // *************************************************
  const [text, setText] = useState('');
  // *************************************************
  const DataView = (
    <View
      style={{
        width: dimensions.window.width - 60,
        flexDirection: 'row',
        backgroundColor: '#272D3F',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 56,
        borderRadius: 20,
        paddingHorizontal: 15,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            justifyContent: 'flex-start',
            alignSelf: 'center',
            marginLeft: -10,
          }}>
          {(Boolean(text) && images[text?.finance?.currency]?.image) || <Btc />}
        </View>
        <Text
          style={{
            fontSize: 12,
            color: 'white',
            alignSelf: 'center',
          }}>
          {Boolean(text) && text.finance?.currency}
        </Text>
        <View style={{marginLeft: 20, alignSelf: 'center'}}>
          <DownArrow />
        </View>
      </View>
      <View style={{alignSelf: 'center'}}>
        <Text style={{color: 'white', fontSize: 16}}>
          {Boolean(text) && `$${text.rates[rates.length - 1].rate}`}
        </Text>
      </View>
    </View>
  );
  // *************************************************
  const [modalVisible2, setModalVisible2] = useState(false);

  const changeModalVisiblity = bool => {
    setModalVisible2(bool);
  };
  const setData = option => {
    setText(option);
  };
  const getProcents = () => {
    const arg0 = CryptoBuying / text?.rates[rates.length - 1].rate;
    const arg1 = (arg0 * text?.finance.commission) / 100;
    const arg2 = arg0 - arg1;
    const arg3 = (arg2 * text?.finance.gateway_fees) / 100;
    const arg4 = arg2 - arg3;
    return arg4;
  };

  const load = <ActivityIndicator size="large" color="#FFF" />;

  // *************************************************
  const [CryptoBuying, setCryptoBuying] = useState('0.00');
  const SendData = async () => {
    if (CryptoBuying === '') {
      ToastShow('Введите USDT!');
    } else if (text?.finance?.min > getProcents()) {
      ToastShow(
        `Минимальная сумма ${text?.finance?.min} ${text?.finance?.currency}`,
        1500,
      );
    } else {
      setloading(true);
      const data = new FormData();

      data.append('currency', text.finance.currency);
      data.append('currency_name', text.finance.alias);
      data.append('sum', CryptoBuying);
      const tokenLocal = await AsyncStorage.getItem('Token');

      if (tokenLocal !== null) {
        fetch(config.BASE_URL + 'user/buy/crypto', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Basic ' + tokenLocal,
          },
          body: data,
        })
          .then(response => response.json())
          .then(res => {
            // console.log(res.result === 1 ? true : false);
            if (res.result === 1) {
              dispatch(ConfirmBuy(res));
              navigation.navigate('ConfirmBuy');
              setloading(false);
            } else {
              ToastShow(res.message);
              setloading(false);
            }
          });
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Toast style={{zIndex: 1}} ref={ref => Toast.setRef(ref)} />
      <View
        style={{
          paddingHorizontal: 28,
          backgroundColor: 'rgba(32,34,42,1)',
        }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="rgba(32,34,42,1)"
        />
        <View
          style={{
            marginTop: 10,
            marginBottom: 23,
            display: 'flex',
            flexDirection: 'row',
            // justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              // backgroundColor: 'red',
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginLeft: -15,
            }}
            onPress={() => navigation.goBack()}>
            <ArrowLeft />
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              fontSize: 22,
              marginLeft: 20,
              alignSelf: 'center',
            }}>
            Купить
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={{marginTop: 15, width: dimensions.window.width - 60}}
            onPress={() => changeModalVisiblity(true)}>
            {Boolean(text) ? DataView : load}
            {/* {text[0].map(item => (
                  <Text>{item.name}</Text>
                ))} */}
          </TouchableOpacity>
          <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible2}
            onRequestClose={() => {
              changeModalVisiblity(false);
            }}>
            <ModalPickerBuy
              changeModalVisiblity={changeModalVisiblity}
              setData={setData}
            />
          </Modal>

          {Boolean(text) && (
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 3, y: 1}}
              colors={['#5E6273', '#20222A', '#C4C4C4']}
              style={{
                alignSelf: 'center',
                width: '100%',
                marginTop: 23,
                paddingVertical: 30,
                borderRadius: 20,
                borderRadius: 10,
                backgroundColor: 'rgba(0,0,0,0.9)',
                borderColor: 'rgba(196, 196, 196, 0.36)',
              }}>
              {/* *************************************************** */}
              <View style={{paddingHorizontal: 25}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'flex-start',
                  }}>
                  <MinSummIcon />
                  <Text style={{color: 'white', marginLeft: 18, marginTop: -3}}>
                    Ваш баланс:{' '}
                    {Boolean(allWallets) ? (
                      `${Number(
                        allWallets.filter(item => item.currency === 'USDT')[0]
                          .balance,
                      ).toFixed(2)} USDT`
                    ) : (
                      <ActivityIndicator size="large" color="#FFF" />
                    )}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 22,
                    alignSelf: 'flex-start',
                  }}>
                  <MinSummIcon />
                  <Text style={{color: 'white', marginLeft: 18, marginTop: -3}}>
                    Минимальная сумма:{' '}
                    {text?.finance?.min + ' ' + text?.finance?.currency}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'flex-start',
                    marginTop: 22,
                  }}>
                  <ProcentIcon />

                  <Text style={{color: 'white', marginLeft: 18, marginTop: -3}}>
                    Наша комиссия: {text?.finance?.commission}%
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'flex-start',
                    marginTop: 22,
                  }}>
                  <ProcentIcon />
                  <Text style={{color: 'white', marginLeft: 18, marginTop: -3}}>
                    Комиссия системы: {text?.finance?.gateway_fees}%
                  </Text>
                </View>
              </View>
            </LinearGradient>
          )}
          <View
            style={{
              flexDirection: 'column',
              marginTop: 40,
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{color: 'rgba(255,255,255,0.3)', fontSize: 10}}>
                Отдаю USDT
              </Text>
              <TextInput
                value={CryptoBuying}
                onChangeText={setCryptoBuying}
                keyboardType="number-pad"
                placeholder="0.00"
                placeholderTextColor="rgb(64, 66, 75)"
                style={{
                  width: '100%',
                  zIndex: 1,
                  height: 44,
                  backgroundColor: 'rgba(84, 88, 103, 0.0)',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.5)',
                  paddingLeft: 20,
                  marginTop: 10,
                  color: 'white',
                }}
              />
            </View>
            {Boolean(text) && (
              <View style={{marginTop: 20}}>
                <Text style={{color: 'rgba(255,255,255,0.3)', fontSize: 10}}>
                  Получаю {text.finance?.currency}
                </Text>
                <View
                  style={{
                    marginTop: 18,
                    height: 44,
                    paddingLeft: 20,
                    borderRadius: 10,
                    borderColor: 'rgba(255,255,255,0.5)',
                    borderWidth: 1,
                    color: 'white',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'white'}}>
                    {getProcents().toFixed(6)}
                  </Text>
                </View>
              </View>
            )}
          </View>
          {loading ? (
            <View style={{marginTop: 40}}>{load}</View>
          ) : (
            <TouchableOpacity
              style={{width: 128, alignSelf: 'center'}}
              onPress={SendData}>
              <LinearGradient
                start={{x: 0, y: 4}}
                end={{x: 3, y: 4}}
                colors={['#0bd061', '#05d287', '#fff', '#0039e6', 'white']}
                style={{
                  alignSelf: 'center',
                  height: 49,
                  width: 128,
                  backgroundColor: '#0039E6',
                  marginTop: 42,
                  marginBottom: 150,
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
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
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default Buy2;

const styles = StyleSheet.create({});
