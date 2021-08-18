import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ArrowLeft} from '../Svg';
const About = ({navigation}) => {
  const back = useNavigation();

  const openOracle = () => Linking.openURL('https://odigital.app');

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          paddingRight: 5,
          backgroundColor: 'rgba(32,34,42,1)',
        }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="rgba(32,34,42,1)"
        />
        <TouchableOpacity
          style={{
            marginTop: 30,
            marginLeft: 25,
            marginBottom: 25,
            width: 50,
            height: 50,
          }}
          onPress={() => back.goBack()}>
          <ArrowLeft />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginHorizontal: 5}}>
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                fontWeight: '700',
                marginTop: 25,
                marginLeft: 20,
              }}>
              {'О ПРИЛОЖЕНИИ\n\n'}
            </Text>
            <Text
              style={{
                width: '90%',
                alignSelf: 'center',
                color: 'white',
                fontSize: 16,
                lineHeight: 19,
                textAlign: 'left',
              }}>
              {`Netex.kg - ваш персональный обменный сервис. Netex.kg позволяет совершать обмены электронных валют в огромное количество направлений. Совершать обмены с Netex.kg можно с любого устройства: мобильный телефон, планшет или компьютер. \n\n\nNetex.kg - система, созданная на базе современного программного обеспечения и содержащая весь набор необходимых функций для удобной и безопасной конвертации наиболее распространенных видов электронных денег.\n\n\nНаш обменник электронных валют создан для тех, кто хочет быстро, безопасно и по выгодному курсу обменять такие виды электронных валют как: Perfect Money, Payeer, AdvCash, Qiwi, Yandex, криптовалюты Bitcoin, Bitcoin Cash, Ethereum, Litecoin и другие.\n\n\nПреимуществом сервиса Netex.kg является не только его надежность, но и привлекательность курсов практически по всем направлениям обмена. На сайте круглосуточно работает онлайн-чат, где на любые вопросы отвечает служба поддержки. Кроме того с консультантами можно связаться по телефону.\n\n\nРепутация превыше всего! Главное кредо сервиса - абсолютная прозрачность и честность. Вы можете быть уверены в безопасности своих средств, производя обмен в Netex.kg.`}
            </Text>
            <Text
              style={{
                marginTop: 40,
                color: 'white',
                fontSize: 18,
                // marginHorizontal: 44,
                alignSelf: 'center',
              }}>
              {'Разработано и поддерживается\n                     компанией'}
            </Text>
            <TouchableOpacity onPress={openOracle}>
              <Image
                source={require('../../assets/OrIcon.png')}
                style={{
                  width: 180,
                  height: 80,
                  alignSelf: 'center',
                  marginTop: 13,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={openOracle}>
              <LinearGradient
                start={{x: 0.5, y: 0}}
                end={{x: 1, y: 2.5}}
                colors={['#0BD061', '#05D287']}
                style={{
                  width: Dimensions.get('window').width - 50,
                  height: 49,
                  marginTop: 74,
                  alignSelf: 'center',
                  backgroundColor: '#0039E6',
                  borderRadius: 20,
                  justifyContent: 'center',
                  marginBottom: 120,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    alignSelf: 'center',
                    color: 'white',
                  }}>
                  Версия приложения 1.9.20
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default About;
