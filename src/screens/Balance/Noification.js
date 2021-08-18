import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Linking,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ArrowLeft, Whatsapp} from '../Svg';

const Notification = ({navigation}) => {
  const back = useNavigation();

  let DATA = [
    {
      id: 1,
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad...',
      date: '15.03.2021г, 16:40',
    },
    {
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad...',
      date: '15.03.2021г, 16:40',
    },
    {
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad...',
      date: '15.03.2021г, 16:40',
    },
    {
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad...',
      date: '15.03.2021г, 16:40',
    },
    {
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad...',
      date: '15.03.2021г, 16:40',
    },
    {
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad...',
      date: '15.03.2021г, 16:40',
    },
    {
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad...',
      date: '15.03.2021г, 16:40',
    },
  ];
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(32,34,42,1)',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingBottom: 40}}>
          <View
            style={{
              marginTop: 30,
              marginBottom: 40,
            }}>
            <TouchableOpacity
              onPress={() => back.goBack()}
              style={{width: 50, height: 50}}>
              <ArrowLeft />
            </TouchableOpacity>
          </View>
          <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
            УВЕДОМЛЕНИЯ
          </Text>
          {DATA.map((item, key) => (
            <View
              key={key}
              style={{
                // height: 112,
                marginTop: item.id === 1 ? 10 : 34,
                backgroundColor: 'rgb(92, 96, 112)',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  marginTop: 15,
                  marginRight: 20,
                  marginBottom: 30,
                  marginLeft: 15,
                }}>
                {item.text}
              </Text>
              <Text
                style={{
                  color: 'rgb(156,156,156)',
                  alignSelf: 'flex-end',
                  marginRight: 10,
                  marginBottom: 10,
                  //   marginLeft: 15,
                }}>
                {item.date}
              </Text>
            </View>
          ))}
          <TouchableOpacity>
            <LinearGradient
              start={{x: 2, y: 4}}
              end={{x: 3, y: 0}}
              colors={['#0bd061', '#05d287', '#fff', '#0039e6', 'white']}
              style={{
                // marginHorizontal: 90,
                alignSelf: 'center',
                width: '40%',
                height: 49,
                marginTop: 40,
                backgroundColor: '#0039E6',
                borderRadius: 10,
                borderColor: 'rgba(255, 255, 255, 0.45)',
                borderWidth: 1,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 16,
                  alignSelf: 'center',
                  color: 'white',
                }}>
                ПРИВЯЗАТЬ
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;
