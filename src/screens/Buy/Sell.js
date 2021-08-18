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
import {ModalPicker} from '../components/ModalPicker';
import images from '../Balance/AddWalletComponents/AllImages';
import {appAxios} from '../../api/axios';
import {ToastShow} from '../components/TosterShow';
import {ArrowLeft, Btc, DownArrow, MinSummIcon, ProcentIcon} from '../Svg';
import {ConfirmSell, SellRates} from '../../store/action';

const Sell = ({navigation}) => {
  const {token, sellRates, sellDef} = useSelector(store => store.appReducer);
  const back = useNavigation();
  const dispatch = useDispatch();
  const window = Dimensions.get('window');
  const screen = Dimensions.get('screen');
  // *************************************************
  useEffect(() => {
    setText(sellDef);

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

  const DataView = Boolean(text) && (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#272D3F',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 56,
        borderRadius: 20,
        paddingHorizontal: 15,
        width: dimensions.window.width - 55,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            justifyContent: 'flex-start',
            alignSelf: 'center',
            marginLeft: -10,
          }}>
          {images[text?.finance.currency].image}
          {/* {images[text.currency].image} */}
        </View>
        <Text
          style={{
            fontSize: 12,
            color: 'white',
            alignSelf: 'center',
          }}>
          {text?.finance.currency}
          {text.currency}
        </Text>
        <View style={{marginLeft: 20, alignSelf: 'center'}}>
          <DownArrow />
        </View>
      </View>
      <View
        style={{
          alignSelf: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
          }}>{`$${text?.rates[text.rates.length - 1].rate}`}</Text>
      </View>
    </View>
  );
  // *************************************************
  const [modalVisible2, setModalVisible2] = useState(false);
  const [loading, setloading] = useState(false);

  const changeModalVisiblity = bool => {
    setModalVisible2(bool);
  };

  const setData = option => {
    setText(option);
  };
  const getProcents = () => {
    const arg0 = CryptoSelling * text?.rates[text.rates.length - 1].rate;
    const arg1 = (arg0 * text?.finance.sell_fees) / 100;
    const arg2 = arg0 - arg1;
    return arg2;
  };

  const load = <ActivityIndicator size="large" color="#FFF" />;

  // *************************************************
  const [CryptoSelling, setCryptoSelling] = useState('');

  const SendData = async () => {
    if (CryptoSelling === '') {
      ToastShow(`Введите сумму в ${text?.finance?.currency}`);
    } else if (text?.finance?.min > CryptoSelling) {
      ToastShow(
        `Минимальная сумма ${text?.finance?.min} ${text?.finance?.currency}`,
        1500,
      );
    } else {
      setloading(true);
      const data = new FormData();

      data.append('currency', text.finance.currency);
      data.append('currency_name', text.finance.alias);
      data.append('sum', CryptoSelling);

      const tokenLocal = await AsyncStorage.getItem('Token');

      if (tokenLocal !== null) {
        fetch(config.BASE_URL + 'user/sell/crypto', {
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
            // console.log(CryptoSelling);
            if (res.result === 1) {
              setloading(false);
              dispatch(ConfirmSell(res));
              navigation.navigate('ConfirmSell');
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
            marginTop: 30,
            marginBottom: 37,
            display: 'flex',
            flexDirection: 'row',
            // justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{alignSelf: 'center', width: 50, height: 50}}
            onPress={() => back.goBack()}>
            <ArrowLeft />
          </TouchableOpacity>
          <Text style={{color: 'white', fontSize: 22, marginLeft: 20}}>
            Продать
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={{marginTop: 15, width: dimensions.window.width - 35}}
            onPress={() => changeModalVisiblity(true)}>
            {Boolean(text) ? (
              DataView
            ) : (
              <View style={{alignSelf: 'center'}}>{load}</View>
            )}
          </TouchableOpacity>
          <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible2}
            onRequestClose={() => {
              changeModalVisiblity(false);
            }}>
            <ModalPicker
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
              <View style={{paddingHorizontal: 25}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'flex-start',
                  }}>
                  <MinSummIcon />
                  <Text style={{color: 'white', marginLeft: 20}}>
                    Ваш баланс:{' '}
                    {text.finance.balance + ' ' + text.finance.currency}
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
                  <Text style={{color: 'white', marginLeft: 20}}>
                    Минимальная сумма:{' '}
                    {text.finance.min + ' ' + text.finance.currency}
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
                  <Text style={{color: 'white', marginLeft: 18}}>
                    Комиссия: {text.finance.sell_fees}%
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
                Отдаю {text.finance?.currency}
              </Text>
              <TextInput
                value={CryptoSelling}
                onChangeText={setCryptoSelling}
                keyboardType="number-pad"
                placeholder={text?.finance?.balance}
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
                  Получаю USDT
                </Text>
                <View
                  style={{
                    marginTop: 9.5,
                    height: 44,
                    paddingLeft: 20,
                    borderRadius: 10,
                    borderColor: 'rgba(255,255,255,0.5)',
                    borderWidth: 1,
                    color: 'white',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'white'}}>
                    {getProcents().toFixed(2)}
                  </Text>
                </View>
              </View>
            )}
          </View>
          {loading ? (
            <View style={{marginTop: 40}}>{load}</View>
          ) : (
            <TouchableOpacity onPress={SendData}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 2, y: 0}}
                colors={['#076cbc', '#0395d0', '#0039e6']}
                style={{
                  alignSelf: 'center',
                  width: 128,
                  height: 49,
                  marginTop: 40,
                  marginBottom: 150,
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
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default Sell;

const styles = StyleSheet.create({});
