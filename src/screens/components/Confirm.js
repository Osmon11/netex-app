import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {appAxios} from '../../api/axios';
import {ChekData} from '../../store/action';
import {ArrowLeft} from '../Svg';
import {load} from './FullLoader';

const Confirm = ({navigation}) => {
  const back = useNavigation();
  const dispatch = useDispatch();
  const {confirmBuy, token} = useSelector(store => store.appReducer);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    // console.log(confirm.data.finance_param.sum);
    // console.log(confirm);
    // console.log(navigation);
  }, []);
  const SendData = async () => {
    setloading(true);
    const tokenLocal = await AsyncStorage.getItem('Token');
    const data = new FormData();

    data.append('currency', confirm.data.finance_param.currency);
    data.append('currency_name', confirm.data.currency_name);
    data.append('guid', confirm.data.finance_param.guid);

    appAxios
      .post('user/confirm/crypto', data, {
        headers: {
          authorization: tokenLocal || token,
        },
      })
      .then(({data, ...res}) => {
        if (res.result === 1) {
          ToastShow(res.message, '', 'success');
          // dispatch(Confirm(res));
          dispatch(ChekData(data));
          navigation.navigate('История');
          setloading(false);
        } else {
          // ToastShow(res.message);
          setloading(false);
        }
        console.log(`wallets**${JSON.stringify(data)}`);
        // console.log(`wallets**${JSON.stringify(res)}`);
      })
      .catch(e => console.log(e.message));
  };
  return (
    <View style={{paddingHorizontal: 28}}>
      <TouchableOpacity
        style={{
          marginTop: 30,
          marginBottom: 52,
          width: 50,
          height: 50,
        }}
        onPress={() => back.goBack()}>
        <ArrowLeft />
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: '#5c6070',
          paddingLeft: 20,
          paddingVertical: 18,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'white',
        }}>
        <Text style={s.first_text}>Сумма отправления</Text>
        <Text style={s.second_text}>
          {
            confirm.data.finance_param.sum +
              ' ' +
              //  confirm.data.finance_param.name !==
              // 'Покупка'
              'USDT'
            // : confirm.data.finance_param.currency}
          }
        </Text>
        {/* --------------------------------------------------------------- */}
        <Text style={s.first_text}>Сумма к зачислению </Text>
        <Text style={s.second_text}>
          {confirm.data.finance_param?.credit +
            ' ' +
            confirm.data.finance_param.currency}
        </Text>
        {/* --------------------------------------------------------------- */}
        <Text style={s.first_text}>Наша комиссия</Text>
        <Text style={s.second_text}>
          {confirm.data.finance_param?.commission +
            ' ' +
            confirm.data.finance_param.currency}
        </Text>
        {/* --------------------------------------------------------------- */}
        <Text style={s.first_text}>Комиссия системы</Text>
        <Text style={s.second_text}>
          {confirm.data.finance_param?.gateway_fees +
            ' ' +
            confirm.data.finance_param.currency}
        </Text>
        {/* --------------------------------------------------------------- */}
        <Text style={s.first_text}>Примечание</Text>
        <Text style={s.second_text}>{confirm.data.finance_param?.memo}</Text>
      </View>
      {loading ? (
        load
      ) : (
        <TouchableOpacity onPress={SendData}>
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
              ПРОДОЛЖИТЬ
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Confirm;

const s = StyleSheet.create({
  first_text: {color: 'rgba(255,255,255,0.6)'},
  second_text: {color: 'white', fontSize: 15, marginTop: 0, marginBottom: 15},
});
