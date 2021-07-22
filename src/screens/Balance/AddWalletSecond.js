import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Alert,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';

import config from '../../api/config';
import {ToastShow} from '../components/TosterShow';
import images from './AddWalletComponents/AllImages';
import {ArrowLeft, NotVerifyIcon, VerifyIcon} from '../Svg';
import {appAxios} from '../../api/axios';
import {AddwalletRead, setLoading} from '../../store/action';
import {load} from '../components/FullLoader';

export function ucFirst(str) {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}

const AddWalletSecond = props => {
  const {currencyRecvisit, token, addwalletRead} = useSelector(
    store => store.appReducer,
  );
  const back = useNavigation();
  const dispatch = useDispatch();
  // ------------------------------------
  const [num, setNum] = useState(currencyRecvisit.wallet_num || '');
  const [loading, setloading] = useState(false);

  // const {id} = props.route.params;
  // const {state} = useGlobalContext();
  // const {allWallets} = state;
  // const wallet = allWallets.find(item => String(item.id) === String(id));

  // ------------------------------------
  const sendData = () => {
    if (num === '') {
      ToastShow('Вставьте номер кошелька!', 1000);
    } else {
      setloading(true);
      const data = new FormData();
      data.append('wallet_alias', currencyRecvisit?.alias || '');
      data.append('wallet_num', num);

      appAxios
        .post('user/wallet/add', data, {
          headers: {
            authorization: `Basic ${token}`,
          },
        })
        .then(({data, ...res}) => {
          // console.log(`login ${JSON.stringify(data)}`);
          // console.log(`login ${JSON.stringify(res)}`);
          if (data.result === 1) {
            setloading(false);

            ToastShow('Успешно', 1000, 'success');
            setNum('');

            setTimeout(() => {
              props.navigation.navigate('Home');
            }, 10);
          } else {
            // console.log(`login fail** ${JSON.stringify(data)}`);
            ToastShow(JSON.stringify(data.message), 1000);
            setloading(false);
          }
          //console.log(res.data.token);
        })
        .catch(e => {
          console.log(`Error: ${e}`);
        });
    }
  };
  // ------------------------------------
  const [modalVisible, setModalVisible] = useState(addwalletRead);
  const ModalWindow = (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1.8, y: 2}}
      colors={[
        'rgba(94, 98, 115, 0.6)',
        'rgba(32, 34, 42, 0.1)',
        '#22242d',
        'rgba(32, 34, 42, 1)',
      ]}
      style={{
        backgroundColor: 'rgba(0,0,0,0.9)',
        marginHorizontal: 34,
        marginTop: 300,
        borderRadius: 10,
      }}>
      <View style={{}}>
        <View style={{alignSelf: 'flex-end', marginTop: 15, marginRight: 15}}>
          <NotVerifyIcon />
        </View>
        <Text
          style={{
            color: 'rgb(187, 187, 187)',
            fontSize: 18,
            alignSelf: 'center',
          }}>
          Внимание!
        </Text>
        <Text
          style={{
            color: 'rgb(187, 187, 187)',
            fontSize: 14,
            alignSelf: 'center',
            marginHorizontal: 28,
            marginTop: 8,
            textAlign: 'center',
          }}>
          {`Пожалуйста, будьте внимательны\nпри вводе своих платежных реквизитов.`}
        </Text>
        <TouchableOpacity
          onPress={() => {
            dispatch(AddwalletRead(false));
            setModalVisible(!modalVisible);
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 2, y: 0}}
            colors={['#B30000', '#FC5656', '#fff', '#0039E6']}
            style={{
              width: 144,
              height: 49,
              marginHorizontal: 87,
              marginVertical: 20,
              backgroundColor: '#0039E6',
              borderRadius: 10,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 16,
                alignSelf: 'center',
                color: 'white',
              }}>
              ПРОЧИТАЛ
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
  // ******************************************************************************************

  return (
    <SafeAreaView style={{flex: 1}}>
      <Toast ref={ref => Toast.setRef(ref)} />
      <View
        style={{
          backgroundColor: 'rgba(32,34,42,1)',
          paddingHorizontal: 28,
        }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="rgba(32,34,42,1)"
        />
        <View
          style={{
            marginTop: 30,
            marginBottom: 40,
          }}>
          <View
            style={{
              marginBottom: 43,
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <TouchableOpacity onPress={() => back.goBack()}>
              <ArrowLeft />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <VerifyIcon />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                marginRight: 22,
                marginBottom: 29,
                height: 56,
                width: 56,
                borderRadius: 18,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgb(39,45,63)',
              }}>
              {images[currencyRecvisit.currency]?.image}
            </View>
            <View style={{marginVertical: 10}}>
              <Text style={{color: 'white'}}>
                {currencyRecvisit.name || ucFirst(currencyRecvisit.alias)}
              </Text>
              <Text style={{color: 'rgb(185,193,217)', fontSize: 12}}>
                {currencyRecvisit.currency}
              </Text>
            </View>
          </View>
          <TextInput
            value={num}
            onChangeText={setNum}
            placeholder="Вставьте номер кошелка"
            placeholderTextColor="rgb(187, 187, 187)"
            style={{
              width: '100%',
              alignSelf: 'center',
              height: 44,
              backgroundColor: 'rgba(84, 88, 103, 1)',
              borderRadius: 10,
              paddingLeft: 20,
              color: 'white',
            }}
          />
          {loading ? (
            <View style={{marginTop: 40}}>{load}</View>
          ) : (
            <TouchableOpacity onPress={sendData}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 2, y: 0}}
                colors={['#076cbc', '#0395d0', '#0039e6']}
                style={{
                  width: 144,
                  height: 49,
                  alignSelf: 'center',
                  marginTop: 20,
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
                  СОХРАНИТЬ
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            {ModalWindow}
          </Modal>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddWalletSecond;
