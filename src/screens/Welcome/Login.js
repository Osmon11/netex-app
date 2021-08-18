import React, {useState} from 'react';
import {
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BackLogin, Textnetex} from '../Svg';
import config from '../../api/config';
import {appAxios} from '../../api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {saveToken} from '../../store/action';
import {load, loader} from '../components/FullLoader';

const Login = props => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [emailRedtext, setEmailRedText] = useState('');
  const [loading, setloading] = useState(false);
  // ---------------------------------------------
  const [password, setPassword] = useState('');
  const [passRed, setPassRed] = useState(false);

  const onPressLogin = async () => {
    if (email === '') {
      setEmailRedText('Заполните все поля');
    } else if (password === '') {
      setPassRed(true);
      setEmailRedText('');
    } else {
      setloading(true);

      setPassRed(false);
      const data = new FormData();

      data.append('username', email.toLowerCase());
      data.append('password', password);

      appAxios
        .post('user/login', data)
        .then(({data, ...res}) => {
          // console.log(`login ${JSON.stringify(data)}`);
          if (data.result === 1) {
            setEmailRedText(false);
            setPassRed(false);
            dispatch(saveToken(data.data.token));
            AsyncStorage.setItem('Token', data.data.token);
            props.navigation.replace('Drawer');
            setloading(false);
          } else {
            setEmailRedText(data.message);
            setloading(false);
          }
        })
        .catch(e => {
          console.log(e);
        });
      setloading(false);
    }
  };

  return loading ? (
    loader
  ) : (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'rgb(50,52,63)',
      }}>
      <StatusBar barStyle="light-content" backgroundColor="rgb(50,52,63)" />
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <BackLogin />
          </View>
          <View
            style={{position: 'absolute', alignSelf: 'center', marginTop: 82}}>
            <Textnetex />
          </View>
          <View
            style={{
              width: '100%',
              backgroundColor: 'rgba(32,34,42,1)',
              marginTop: -20,
              // height: '120%',
              paddingTop: 90,
              paddingHorizontal: 28,
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
            }}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Логин или телефон"
              placeholderTextColor="rgb(187, 187, 187)"
              style={{
                alignSelf: 'center',
                width: 305,
                height: 44,
                backgroundColor: 'rgba(84, 88, 103, 1)',
                borderRadius: 10,
                paddingLeft: 20,
                color: 'white',
              }}
            />
            <Text
              style={[
                s.RedAttention,
                {display: Boolean(emailRedtext) ? 'flex' : 'none'},
              ]}>
              {emailRedtext}
            </Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Пароль"
              secureTextEntry={true}
              placeholderTextColor="rgb(187, 187, 187)"
              style={{
                alignSelf: 'center',
                marginTop: 20,
                width: 305,
                height: 44,
                backgroundColor: 'rgba(84, 88, 103, 1)',
                borderRadius: 10,
                paddingLeft: 20,
                color: 'white',
              }}
            />
            <Text
              style={[s.RedAttention, {display: passRed ? 'flex' : 'none'}]}>
              Введите правильно пароль
            </Text>

            <TouchableOpacity onPress={onPressLogin}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 2, y: 0}}
                colors={['#076cbc', '#0395d0', '#0039e6']}
                style={{
                  alignSelf: 'center',
                  width: 305,
                  height: 49,
                  marginTop: 43,
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
                  ВОЙТИ
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Recover');
              }}>
              <Text
                style={{
                  color: 'rgb(4, 143, 205)',
                  alignSelf: 'center',
                  marginTop: 43,
                }}>
                Не могу войти
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingTop: 20,
              }}>
              <Text style={{color: 'rgba(255,255,255,0.5)'}}>
                Нет аккаунта?{' '}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Signup');
                }}>
                <Text style={{color: 'rgb(4, 143, 205)', marginBottom: '140%'}}>
                  Зарегистрироваться
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const s = StyleSheet.create({
  RedAttention: {marginTop: 5, color: 'red', fontSize: 12, alignSelf: 'center'},
});
