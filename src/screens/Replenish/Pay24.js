import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

import {ArrowLeft, DownArrow2} from '../Svg';

const Pay24 = ({navigation}) => {
  const back = useNavigation();
  const {userData} = useSelector(store => store.appReducer);

  // **********************************************
  function Steps({number, text, arrow}) {
    return (
      <View>
        <LinearGradient
          start={{x: 5, y: 0}}
          end={{x: 0, y: -3}}
          colors={['#5E6273', '#20222A', '#c4c4c4']}
          style={{
            alignSelf: 'center',
            width: 18,
            height: 18,
            backgroundColor: '#0039E6',
            borderRadius: 10,
            borderColor: 'rgba(255, 255, 255, 0.45)',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              alignSelf: 'center',
              color: 'white',
              fontWeight: '600',
              fontSize: 12,
            }}>
            {number}
          </Text>
        </LinearGradient>
        <Text style={{color: 'rgb(191, 184, 184)', alignSelf: 'center'}}>
          {text}
        </Text>
        <View
          style={{
            alignSelf: 'center',
            marginTop: 15,
            display: arrow ? 'flex' : 'none',
          }}>
          <DownArrow2 />
          {arrow}
        </View>
      </View>
    );
  }
  // **********************************************

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(32,34,42,1)',
      }}>
      <View
        style={{
          marginTop: 30,
          marginBottom: 52,
        }}>
        <TouchableOpacity onPress={() => back.goBack()}>
          <ArrowLeft />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: 'white',
            alignSelf: 'center',
          }}>
          ДЛЯ ОПЛАТЫ ЧЕРЕЗ ТЕРМИНАЛ "PAY24"
        </Text>
        <View
          style={{
            marginTop: 47,
          }}>
          <Steps
            arrow={true}
            number="1"
            text={`\n  Вам необходимо в терминале выбрать\n
              "Электронные кошельки"`}
          />
        </View>
        <View
          style={{
            marginTop: 23,
          }}>
          <Steps
            arrow={true}
            number="2"
            text={`\n  Выберите услугу "Netex - Пополнение баланса"`}
          />
        </View>
        <View
          style={{
            marginTop: 23,
          }}>
          <Steps
            number="3"
            text={`\n  Введите следующий реквизит  "${
              userData.phone === null ? 'Свой номер телефона' : userData.phone
            }"`}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Pay24;
