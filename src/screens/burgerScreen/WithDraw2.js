import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {WithdrawDef} from '../../store/action';
import images from '../Balance/AddWalletComponents/AllImages';

const WithDraw2 = ({navigation}) => {
  const {withdrawRates} = useSelector(store => store.appReducer);
  const [DATA, setDATA] = useState([]);

  useEffect(() => {
    setDATA(withdrawRates.filter(item => item.finance.cashout_status === '1'));
  }, [withdrawRates]);

  const dispatch = useDispatch();
  return (
    <View style={{alignSelf: 'center'}}>
      {Boolean(DATA) && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={DATA}
          keyExtractor={item => `${item.finance.id}`}
          numColumns={3}
          style={{marginHorizontal: -10}}
          renderItem={({item, index}) => (
            <View
              style={{
                width: '33.33%',
                alignItems: 'center',
                marginTop: 10,
                marginBottom: DATA.length === index + 1 ? 150 : 0,
              }}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(WithdrawDef(item));
                  navigation.navigate('WithDraw3');
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
                {item.finance.balance}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default WithDraw2;
