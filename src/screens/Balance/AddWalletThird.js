import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {BuyDefault} from '../../store/action';

import images from './AddWalletComponents/AllImages';

const AddWalletThird = ({navigation}) => {
  const {sellRates} = useSelector(store => store.appReducer);
  const dispatch = useDispatch();
  return (
    <View style={{alignSelf: 'center', paddingBottom: 80}}>
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
                dispatch(BuyDefault(item));
                navigation.navigate('Buy2');
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
              {item.finance.commission}%
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default AddWalletThird;
