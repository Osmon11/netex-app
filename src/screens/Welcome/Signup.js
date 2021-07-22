import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BackSignup, Textnetex} from '../Svg';
import config from '../../api/config';
import {appAxios} from '../../api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {saveToken, saveUserData} from '../../store/action';
import {useDispatch} from 'react-redux';
import {load, loader} from '../components/FullLoader';

const Signup = props => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  // --------------------------------------------------
  const [name, setName] = useState('');
  const [nameRed, setNameRed] = useState(false);
  // --------------------------------------------------
  const [lastname, setLastname] = useState('');
  const [lastnameRed, setLastnameRed] = useState(false);
  // --------------------------------------------------
  const [login, setLogin] = useState('');
  const [loginRed, setLoginRed] = useState(false);
  // --------------------------------------------------
  const [email, setEmail] = useState('');
  const [emailRed, setEmailRed] = useState(false);
  // --------------------------------------------------
  const [password, setPassword] = useState('');
  const [passRed, setPassRed] = useState(false);
  // --------------------------------------------------
  const [Pass2, setPass2] = useState('');
  const [Pass2Red, setPass2Red] = useState(false);

  const SignUp = () => {
    if (name === '') {
      setNameRed(true);
    } else if (lastname === '') {
      setNameRed(false);
      setLastnameRed(true);
    } else if (login === '') {
      setLastnameRed(false);
      setLoginRed(true);
    } else if (email === '') {
      setLoginRed(false);
      setEmailRed(true);
    } else if (password === '') {
      setEmailRed(false);
      setPassRed(true);
    } else if ((Pass2 === '', Pass2 !== password)) {
      setPassRed(false);
      setPass2Red(true);
    } else {
      setloading(true);
      setPass2Red(false);
      const data = new FormData();
      // -------------------------------------------------------------------
      data.append('firstname', name);
      data.append('lastname', lastname);
      data.append('username', login.toLowerCase());
      data.append('email', email.toLowerCase());
      data.append('password', password);
      data.append('password2', Pass2);
      // -------------------------------------------------------------------
      appAxios
        .post('user/registration', data)
        .then(({data}) => {
          // console.log(`registration**${JSON.stringify(data)}`);
          if (data.result === 1) {
            // set token to cookie
            dispatch(saveToken(data.data.token));
            dispatch(saveUserData(''));
            Alert.alert(data.message);
            AsyncStorage.setItem('Token', data.data.token);
            props.navigation.navigate('Drawer');
            setloading(false);
          } else {
            setloading(false);
            Alert.alert(data.message);
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  return loading ? (
    loader
  ) : (
    <SafeAreaView style={{flex: 1, backgroundColor: 'rgb(50,52,63)'}}>
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <BackSignup />
          </View>
          <View
            style={{position: 'absolute', marginHorizontal: 92, marginTop: 82}}>
            <Textnetex />
          </View>
          <View
            style={{
              marginTop: -50,
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              backgroundColor: 'rgba(32,34,42,1)',
            }}>
            <View
              style={{
                paddingVertical: 50,
                paddingHorizontal: 28,
              }}>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Имя"
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
                style={[s.RedAttention, {display: nameRed ? 'flex' : 'none'}]}>
                Введите правильно имя
              </Text>
              <TextInput
                value={lastname}
                onChangeText={setLastname}
                placeholder="Фамилия"
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
                style={[
                  s.RedAttention,
                  {display: lastnameRed ? 'flex' : 'none'},
                ]}>
                Введите правильно фамилию
              </Text>
              <TextInput
                value={login}
                onChangeText={setLogin}
                placeholder="Логин"
                placeholderTextColor="rgb(187, 187, 187)"
                style={s.InputStyle}
              />
              <Text
                style={[s.RedAttention, {display: loginRed ? 'flex' : 'none'}]}>
                Введите правильно логин
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Электронная почта"
                placeholderTextColor="rgb(187, 187, 187)"
                style={s.InputStyle}
              />
              <Text
                style={[s.RedAttention, {display: emailRed ? 'flex' : 'none'}]}>
                Введите правильно почту
              </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                placeholder="Пароль"
                placeholderTextColor="rgb(187, 187, 187)"
                style={s.InputStyle}
              />
              <Text
                style={[s.RedAttention, {display: passRed ? 'flex' : 'none'}]}>
                Введите правильно пароль
              </Text>
              <TextInput
                value={Pass2}
                onChangeText={setPass2}
                secureTextEntry={true}
                placeholder="Повторите пароль"
                placeholderTextColor="rgb(187, 187, 187)"
                style={s.InputStyle}
              />
              <Text
                style={[s.RedAttention, {display: Pass2Red ? 'flex' : 'none'}]}>
                Введите правильно повторный пароль
              </Text>

              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('https://netex.kg/ru/terms-of-use');
                }}>
                <Text
                  style={{
                    fontSize: 10,
                    color: 'rgb(187,187,187)',
                    alignSelf: 'center',
                    marginTop: 13,
                  }}>
                  {` Нажимая на кнопку «Регистрация», Вы принимаете 
            условия Пользовательского соглашения`}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={SignUp}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 2, y: 0}}
                  colors={['#076cbc', '#0395d0', '#0039e6']}
                  style={{
                    alignSelf: 'center',
                    width: 305,
                    height: 49,
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
                    ЗАРЕГИСТРИРОВАТЬСЯ
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingTop: 20,
                }}>
                <Text style={{color: 'rgba(255,255,255,0.5)'}}>
                  Уже есть профиль?{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Login');
                  }}>
                  <Text style={{color: 'rgb(4, 143, 205)'}}>Войти</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const s = StyleSheet.create({
  RedAttention: {marginTop: 5, color: 'red', fontSize: 12, alignSelf: 'center'},
  InputStyle: {
    alignSelf: 'center',
    width: 305,
    height: 44,
    backgroundColor: 'rgba(84, 88, 103, 1)',
    borderRadius: 10,
    paddingLeft: 20,
    color: 'white',
    marginTop: 20,
  },
});
