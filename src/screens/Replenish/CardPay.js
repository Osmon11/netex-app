import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ArrowLeft} from '../Svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../api/config';
import {ToastShow} from '../components/TosterShow';
import Toast from 'react-native-toast-message';
import {WebView} from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';
import {appAxios} from '../../api/axios';
import {cardpayweb} from '../../store/action';
import {load} from '../components/FullLoader';
const CardPay = props => {
  const dispatch = useDispatch();
  const {userData, token, wallets, rates} = useSelector(
    store => store.appReducer,
  );

  const back = useNavigation();
  // -------------------------------

  const [summa, setSumma] = useState('');
  const [loading, setloading] = useState(false);
  // -------------------------------
  const sendData = async () => {
    if (summa === '') {
      ToastShow('Введите сумму!', '', '', 'top');
    } else {
      setloading(true);
      const tokenLocal = await AsyncStorage.getItem('Token');
      if (Boolean(token) && tokenLocal) {
        const data = new FormData();

        data.append('sum', summa);
        appAxios
          .post('user/refill', data, {
            headers: {
              authorization: `Basic ${tokenLocal || token}`,
            },
          })
          .then(({data, ...res}) => {
            if (data.result === 1) {
              setloading(false);
              props.navigation.navigate('CardPayWeb');
              dispatch(cardpayweb(data.data));
            } else {
              ToastShow(data.message, '', '', 'top');
              setloading(false);
            }
          })
          .catch(e => console.log(e.message));
      }
    }
  };
  return (
    <SafeAreaView>
      <Toast style={{zIndex: 1}} ref={ref => Toast.setRef(ref)} />
      <View
        style={{
          marginTop: 30,
          marginBottom: 40,
          marginLeft: 20,
        }}>
        <TouchableOpacity onPress={() => back.goBack()}>
          <ArrowLeft />
        </TouchableOpacity>
      </View>
      <ScrollView
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: 20,
          backgroundColor: 'rgba(32,34,42,1)',
        }}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
          Пополнить через Visa/Mastercard
        </Text>

        <View style={{}}>
          <Text
            style={{
              color: 'rgba(255,255,255,0.3)',
              fontSize: 16,
              marginTop: 53,
              alignSelf: 'flex-start',
            }}>
            Введите сумму в RUB
          </Text>
          <TextInput
            value={summa}
            onChangeText={setSumma}
            keyboardType="number-pad"
            placeholder="0.00"
            placeholderTextColor="rgb(64, 66, 75)"
            style={{
              marginTop: 10,
              alignSelf: 'center',
              width: '100%',
              fontSize: 18,
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: 'rgba(84, 88, 103, 1)',
              borderRadius: 3,
              color: 'white',
            }}
          />
        </View>
        {loading ? (
          <View style={{marginTop: 50}}>{load}</View>
        ) : (
          <TouchableOpacity onPress={sendData}>
            <LinearGradient
              start={{x: 2, y: 4}}
              end={{x: 3, y: 0}}
              colors={['#076cbc', '#0395d0', '#0039e6']}
              style={{
                width: 128,
                alignSelf: 'center',
                height: 49,
                marginTop: 40,
                marginBottom: 40,
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
                ПОПОЛНИТЬ
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CardPay;
