import axios from 'axios';
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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {appAxios} from '../../api/axios';
import config from '../../api/config';
import {load, loader} from '../components/FullLoader';
import {BackLogin, Textnetex} from '../Svg';

const Recover = props => {
  const [loading, setloading] = useState(false);
  // --------------------------------------------
  const [email, setEmail] = useState('');
  const [emailRed, setEmailRed] = useState(false);
  // --------------------------------------------

  const RecoverUser = () => {
    const data = new FormData();
    data.append('email', email.toLowerCase());

    if (email === '') {
      setEmailRed(true);
    } else {
      setloading(true);
      setEmailRed(false);

      appAxios
        .post('user/recover', data)
        .then(({data}) => {
          Alert.alert(data.message);
          setloading(false);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };
  return loading ? (
    load
  ) : (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'rgb(50,52,63)',
      }}>
      <ScrollView>
        <StatusBar barStyle="light-content" backgroundColor="rgb(50,52,63)" />
        <View>
          <BackLogin />
        </View>
        <View
          style={{position: 'absolute', marginHorizontal: 92, marginTop: 82}}>
          <Textnetex />
        </View>
        <View
          style={{
            paddingBottom: '71%',
            backgroundColor: 'rgba(32,34,42,1)',
            marginTop: -50,
            paddingTop: 140,
            paddingHorizontal: 28,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          }}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Введите адрес электронной почты"
            placeholderTextColor="rgb(187, 187, 187)"
            style={{
              width: 305,
              alignSelf: 'center',
              height: 44,
              backgroundColor: 'rgba(84, 88, 103, 1)',
              borderRadius: 10,
              paddingLeft: 20,
              color: 'white',
            }}
          />
          <Text
            style={{
              display: emailRed ? 'flex' : 'none',
              alignSelf: 'center',
              marginTop: 5,
              color: 'red',
              fontSize: 12,
            }}>
            Введите адрес электронной почты
          </Text>

          <TouchableOpacity onPress={RecoverUser}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 2, y: 0}}
              colors={['#076cbc', '#0395d0', '#0039e6']}
              style={{
                width: 305,
                alignSelf: 'center',
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
                ВОССТАНОВИТЬ
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Signup');
            }}>
            <Text
              style={{
                color: 'rgb(4, 143, 205)',
                alignSelf: 'center',
                marginTop: 43,
              }}>
              Регистрация
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Recover;
