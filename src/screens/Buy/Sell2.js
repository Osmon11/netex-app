import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {BuyDefault, SellDef, WithdrawDef} from '../../store/action';
import images from '../Balance/AddWalletComponents/AllImages';
import {ArrowLeft} from '../Svg';

const Sell2 = ({navigation}) => {
  const {sellRates, rates} = useSelector(store => store.appReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(allRates);
  }, []);
  return (
    <SafeAreaView>
      <View style={{alignSelf: 'center'}}>
        <View
          style={{
            marginTop: 10,
            marginBottom: 23,
            display: 'flex',
            flexDirection: 'row',
            marginLeft: 28,
          }}>
          <TouchableOpacity
            style={{
              // backgroundColor: 'red',
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginLeft: -15,
            }}
            onPress={() => navigation.goBack()}>
            <ArrowLeft />
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              fontSize: 22,
              marginLeft: 20,
              alignSelf: 'center',
            }}>
            Продать
          </Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={sellRates}
          keyExtractor={item => `${item.finance.id}`}
          numColumns={3}
          style={{marginHorizontal: 10}}
          // marginBottom: sellRates.length === key + 1 ? 0 : 1.5,
          renderItem={({item, index}) => (
            <View
              style={{
                width: '33.33%',
                alignItems: 'center',
                marginBottom: sellRates.length === index + 1 ? 50 : 0,
              }}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(SellDef(item));
                  navigation.navigate('Sell');
                }}>
                <View
                  style={{
                    marginTop: 20,
                    marginBottom: 10,
                    height: 56,
                    width: 56,
                    borderRadius: 18,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgb(39,45,63)',
                  }}>
                  {images[item.finance.currency].image}
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  alignSelf: 'center',
                  fontSize: 16,
                }}>
                {item.finance.currency}
              </Text>

              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 12,
                  color: 'rgb(10, 209, 105)',
                }}>
                {item.finance.sell_fees}%
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Sell2;
