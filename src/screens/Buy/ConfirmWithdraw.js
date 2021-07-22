import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {appAxios} from '../../api/axios';
import {ChekData} from '../../store/action';
import {ArrowLeft} from '../Svg';
import {load} from '../components/FullLoader';

const ConfirmWithdraw = props => {
  const back = useNavigation();
  const dispatch = useDispatch();
  const {confirmWithdraw, token} = useSelector(store => store.appReducer);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    // console.log(confirm.data.finance_param.sum);
    // console.log(confirmWithdraw);
    // console.log(navigation);
  }, []);
  const SendData = async () => {
    setloading(true);
    const tokenLocal = await AsyncStorage.getItem('Token');
    const data = new FormData();

    data.append('currency', confirmWithdraw.data.finance_param.currency);
    data.append('currency_name', confirmWithdraw.data.currency_name);
    data.append('guid', confirmWithdraw.data.finance_param.guid);

    appAxios
      .post('user/confirm/crypto', data, {
        headers: {
          authorization: tokenLocal || token,
        },
      })
      .then(({data, ...res}) => {
        if (data.result === 1) {
          dispatch(ChekData(confirmWithdraw.data.finance_param));
          setTimeout(() => {
            props.navigation.navigate('ConclusionCheck');
            setloading(false);
          }, 2000);
        } else {
          setloading(false);
          Alert.alert(data.message);
        }
        // console.log(`wallets**${JSON.stringify(data)}`);
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
          {confirmWithdraw.data.finance_param.sum + ' ' + 'USDT'}
        </Text>
        {/* --------------------------------------------------------------- */}
        <Text style={s.first_text}>Сумма к зачислению </Text>
        <Text style={s.second_text}>
          {confirmWithdraw.data.finance_param?.credit +
            ' ' +
            confirmWithdraw.data.finance_param.currency}
        </Text>
        {/* -------------------------commission------------------------- */}
        <Text
          style={[
            s.first_text,
            {
              display:
                confirmWithdraw.data.finance_param?.commission === ''
                  ? 'none'
                  : 'flex',
            },
          ]}>
          Наша комиссия
        </Text>
        <Text
          style={[
            s.second_text,
            {
              display:
                confirmWithdraw.data.finance_param?.commission === ''
                  ? 'none'
                  : 'flex',
            },
          ]}>
          {confirmWithdraw.data.finance_param?.commission +
            ' ' +
            confirmWithdraw.data.finance_param.currency}
        </Text>
        {/* -------------------------gateway_fees------------------------- */}
        <Text
          style={[
            s.first_text,
            ,
            {
              display:
                confirmWithdraw.data.finance_param?.gateway_fees === ''
                  ? 'none'
                  : 'flex',
            },
          ]}>
          Комиссия системы
        </Text>
        <Text
          style={[
            s.second_text,
            {
              display:
                confirmWithdraw.data.finance_param?.gateway_fees === ''
                  ? 'none'
                  : 'flex',
            },
          ]}>
          {confirmWithdraw.data.finance_param?.gateway_fees +
            ' ' +
            confirmWithdraw.data.finance_param.currency}
        </Text>
        {/* -------------------------extra_fees------------------------- */}
        <Text
          style={[
            s.first_text,
            {
              display:
                confirmWithdraw.data.finance_param?.extra_fees === ''
                  ? 'none'
                  : 'flex',
            },
          ]}>
          Дополнительная комиссия
        </Text>
        <Text
          style={[
            s.second_text,
            {
              display:
                confirmWithdraw.data.finance_param?.extra_fees === ''
                  ? 'none'
                  : 'flex',
            },
          ]}>
          {confirmWithdraw.data.finance_param?.extra_fees +
            ' ' +
            confirmWithdraw.data.finance_param.currency}
        </Text>
        {/* -------------------------End------------------------- */}
        <Text style={s.first_text}>Примечание</Text>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={[s.second_text, {width: '95%'}]}>
          {confirmWithdraw.data.finance_param?.memo}
        </Text>
      </View>
      {loading ? (
        <View style={{marginTop: 10}}>{load}</View>
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

export default ConfirmWithdraw;

const s = StyleSheet.create({
  first_text: {color: 'rgba(255,255,255,0.6)'},
  second_text: {color: 'white', fontSize: 15, marginTop: 0, marginBottom: 15},
});
