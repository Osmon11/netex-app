import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../api/config';
import {ToastShow} from '../components/TosterShow';
import {ArrowLeft, Ava} from '../Svg';

const ChangeName = props => {
  // ------------------------------------
  const back = useNavigation();
  // ------------------------------------
  const {userData, token, UserHistory, isLoading} = useSelector(
    store => store.appReducer,
  );
  // ------------------------------------

  const [name, setName] = useState(userData.firstname || '');
  const [phoneNumber, setPhoneNumber] = useState(userData.phone || '');
  const [lastName, setLastName] = useState(userData.lastname || '');
  const [PickPhoto, setPickPhoto] = useState([]);
  // ------------------------Send Data Start------------------------
  const SendData = async () => {
    if (name === '') {
      ToastShow('Введите имя!', 500);
      // -------------------------
    } else if (lastName === '') {
      ToastShow('Введите фамилию!', 500);
      // -------------------------
    } else if (phoneNumber === '') {
      ToastShow('Введите номер телефона!', 500);
      // -------------------------
    } else {
      // ------------------------------------------------

      const data = new FormData();
      data.append('firstname', name);
      data.append('lastname', lastName);
      data.append('phone', phoneNumber);

      PickPhoto.length !== 0 &&
        data.append('photo', {
          uri: PickPhoto.uri,
          type: PickPhoto.type,
          name: PickPhoto.fileName,
        });
      // ------------------------------------------------
      const tokenLocal = await AsyncStorage.getItem('Token');

      if (tokenLocal !== null) {
        fetch(config.BASE_URL + 'user/profile/save', {
          method: 'POST',
          headers: {
            Authorization: 'Basic ' + tokenLocal || token,
            'Content-Type': 'multipart/form-data',
          },

          body: data,
        })
          .then(response => response.json())
          .then(res => {
            if (res.result === 1) {
              ToastShow(res.message, 900, 'success');

              setTimeout(() => {
                back.goBack();
              }, 1000);
            } else {
              Alert.alert(res.message);
            }
          })
          .catch(err => console.log(err));
      }
    }
  };
  // -------------------------Send Data End-------------------------

  // ------------------------------------
  const PickPhotoLocal = () => {
    launchImageLibrary({mediaType: 'photo'}, res => {
      try {
        setPickPhoto(res.assets[0]);
      } catch (e) {
        console.log(e);
      }
    });
  };
  // ------------------------------------
  const avaLoading = (
    <View
      style={{
        width: 63,
        height: 63,
        alignSelf: 'center',
        borderColor: 'rgba(84, 88, 103, 1)',
        backgroundColor: 'rgba(84, 88, 103, 1)',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Ava />
    </View>
  );
  const avaLoaded = (
    <Image
      style={{
        alignSelf: 'center',
        width: 65,
        height: 65,
        borderRadius: 2,
      }}
      source={{uri: PickPhoto.uri || userData.photo}}
    />
  );
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
            marginBottom: 25,
          }}
          onPress={() => back.goBack()}>
          <ArrowLeft />
        </TouchableOpacity>
        <ScrollView>
          <TouchableOpacity
            style={{alignSelf: 'center', alignContent: 'center', marginTop: 25}}
            onPress={PickPhotoLocal}>
            {PickPhoto.uri ? avaLoaded : avaLoading}

            <Text style={{color: 'rgb(95, 101, 120)', marginTop: 11}}>
              Загрузить изображение
            </Text>
          </TouchableOpacity>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Имя"
            placeholderTextColor="rgb(126, 133,152)"
            style={{
              height: 45,
              backgroundColor: 'rgb(39, 45, 63)',
              borderRadius: 20,
              marginTop: 33,
              color: 'white',
              paddingLeft: 20,
            }}
          />
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            placeholder="Фамилия"
            placeholderTextColor="rgb(126, 133,152)"
            style={{
              backgroundColor: 'rgb(39, 45, 63)',
              height: 45,
              borderRadius: 20,
              marginTop: 25,
              color: 'white',
              paddingLeft: 20,
            }}
          />
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            maxLength={10}
            keyboardType="number-pad"
            placeholder="Телефон номер"
            placeholderTextColor="rgb(126, 133,152)"
            style={{
              backgroundColor: 'rgb(39, 45, 63)',
              borderRadius: 20,
              height: 45,
              marginTop: 25,
              color: 'white',
              paddingLeft: 20,
            }}
          />

          <TouchableOpacity onPress={SendData}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 2, y: 0}}
              colors={['#076cbc', '#0395d0', '#0039e6']}
              style={{
                alignSelf: 'center',
                width: '40%',
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
                СОХРАНИТЬ
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ChangeName;
