import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ArrowLeft, Ava} from '../Svg';
import Toast from 'react-native-toast-message';
import {ToastShow} from '../components/TosterShow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../api/config';

const ChangePass = ({navigation}) => {
  const back = useNavigation();

  // -------------------------------------
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newPass2, setNewPass2] = useState('');

  const sendData = async () => {
    if (oldPass === '') {
      ToastShow('Введите старый пароль!');
    } else if (newPass === '') {
      ToastShow('Введите новый пароль!');
    } else if ((newPass2 === '', newPass2 != newPass)) {
      ToastShow('Введите корректно пароль');
    } else {
      // -------------------------------------------------
      const data = new FormData();
      data.append('old_password', oldPass);
      data.append('password', newPass);
      data.append('password2', newPass2);

      // -------------------------------------------------
      const tokenLocal = await AsyncStorage.getItem('Token');

      if (tokenLocal !== null) {
        fetch(config.BASE_URL + 'user/change/password', {
          method: 'POST',
          headers: {
            Authorization: 'Basic ' + tokenLocal,
            'Content-Type': 'multipart/form-data',
          },
          body: data,
        })
          .then(response => response.json())
          .then(res => {
            if (res.result === 1) {
              ToastShow(res.message, 1000, 'success');
              setTimeout(() => {
                navigation.goBack();
              }, 1000);
            } else {
              console.log('err');
              ToastShow(res.message, 1000);
            }
          })
          .catch(err => {
            console.log('error: ', err);
          });
      }
    }
  };
  // -------------------------------------
  return (
    <SafeAreaView style={{flex: 1}}>
      <Toast ref={ref => Toast.setRef(ref)} />
      <View
        style={{
          backgroundColor: 'rgba(32,34,42,1)',
          paddingHorizontal: 28,
        }}>
        <TouchableOpacity
          style={{
            marginTop: 30,
            marginBottom: 46,
          }}
          onPress={() => back.goBack()}>
          <ArrowLeft />
        </TouchableOpacity>
        <TextInput
          value={oldPass}
          onChangeText={setOldPass}
          placeholder="Старый пароль"
          placeholderTextColor="rgb(126, 133,152)"
          style={s.InputStyle}
        />
        <TextInput
          value={newPass}
          onChangeText={setNewPass}
          placeholder="Новый пароль"
          placeholderTextColor="rgb(126, 133,152)"
          style={s.InputStyle}
        />
        <TextInput
          value={newPass2}
          onChangeText={setNewPass2}
          placeholder="Повторите новый пароль"
          placeholderTextColor="rgb(126, 133,152)"
          style={s.InputStyle}
        />
        <TouchableOpacity onPress={sendData}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 2, y: 0}}
            colors={['#076cbc', '#0395d0', '#0039e6']}
            style={{
              alignSelf: 'center',
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
              ИЗМЕНИТЬ
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChangePass;

const s = StyleSheet.create({
  InputStyle: {
    backgroundColor: 'rgb(39, 45, 63)',
    borderRadius: 20,
    marginTop: 25,
    color: 'white',
    paddingLeft: 20,
    paddingVertical: 10,
  },
});
