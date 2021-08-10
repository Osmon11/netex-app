import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import AllCryptovalComponent from '../components/AllCryptovalComponent';
import {ArrowLeft} from '../Svg';
import images from './AddWalletComponents/AllImages';

const AllCryptoval = ({navigation}) => {
  const back = useNavigation();
  const {fiatKurse} = useSelector(store => store.appReducer);
  // -------------------------------------------------------------------------
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: 'rgba(32,34,42,1)',
            paddingBottom: 40,
          }}>
          <TouchableOpacity
            style={{
              marginVertical: 30,
              marginLeft: 28,
            }}
            onPress={() => back.goBack()}>
            <ArrowLeft />
          </TouchableOpacity>

          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {fiatKurse.map((item, key) => (
              <View
                key={key}
                style={{marginRight: 25, marginLeft: key === 0 ? 20 : 0}}>
                <View
                  style={{
                    marginTop: 20,
                    marginBottom: 10,
                    alignSelf: 'center',
                    height: 56,
                    width: 56,
                    borderRadius: 18,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgb(39,45,63)',
                  }}>
                  <Image
                    style={{
                      alignSelf: 'center',
                      width: 16,
                      height: 16,
                      borderRadius: 2,
                    }}
                    source={{
                      uri:
                        'https://netex.kg/assets/images/ps/fiat/' +
                        item.currency +
                        '.png',
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: 'white',
                    alignSelf: 'center',
                    fontSize: 16,
                  }}>
                  {item.currency.replace('USDT', '')}
                </Text>

                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 12,
                    color: 'rgb(10, 209, 105)',
                    marginBottom: 30,
                  }}>
                  {item.rate}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View
            style={{
              width: '95%',
              alignSelf: 'center',
              height: 1,
              marginBottom: 30,
              backgroundColor: '#707687',
            }}
          />
          <View>
            <Text
              style={{
                color: 'rgba(133,134,140,1)',
                marginLeft: 28,
                fontWeight: '600',
              }}>
              КУРСЫ
            </Text>
          </View>
          <AllCryptovalComponent navigation={navigation} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllCryptoval;
