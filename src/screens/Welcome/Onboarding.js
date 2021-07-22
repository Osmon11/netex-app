import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Ava, Textnetex} from '../Svg';

const Onboarding = props => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'rgb(50,52,63)',
      }}>
      <StatusBar barStyle="light-content" backgroundColor="rgb(50,52,63)" />
      <View style={{marginTop: 116, alignSelf: 'center', alignItems: 'center'}}>
        <Image
          style={{width: 80, height: 90}}
          source={require('../../assets/bigLogo.png')}
        />
        <View style={{marginTop: 30, marginBottom: 20}}>
          <Textnetex />
        </View>
      </View>
      <Text style={{color: 'rgba(143, 143, 143, 1)', textAlign: 'center'}}>
        {`Простой и легкий доступ к криптовалютам\nБыстрый и безопасный способ покупки или обмена`}
      </Text>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Login');
        }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 2, y: 0}}
          colors={['#076cbc', '#0395d0', '#0039e6']}
          style={{
            height: 49,
            marginTop: 50,
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
          props.navigation.navigate('Signup');
        }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 2, y: 0}}
          colors={['#076cbc', '#0395d0', '#0039e6']}
          style={{
            height: 49,
            marginTop: 20,
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
            ЗАРЕГИСТРИРОВАТЬСЯ
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Onboarding;
