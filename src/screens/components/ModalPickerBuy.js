import React, {useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';

import images from '../Balance/AddWalletComponents/AllImages';

const ModalPickerBuy = props => {
  const {sellRates} = useSelector(store => store.appReducer);
  const [value, setValue] = useState('');

  const onPressItem = option => {
    props.changeModalVisiblity(false);
    props.setData(option);
  };
  const option = sellRates.map((item, key) => {
    return (
      <TouchableOpacity
        key={key}
        style={{
          justifyContent: 'space-between',
        }}
        onPress={() => onPressItem(item)}>
        <View
          key={key}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 100,
          }}>
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'flex-start',
              marginTop: 5,
            }}>
            {images[item.finance.currency].image}
          </View>
          <Text key={`name - ${key}`} style={styles.text}>
            {item.finance.currency}
          </Text>
        </View>
      </TouchableOpacity>
      // </TouchableOpacity>
    );
  });
  // const WIDTH = Dimensions.get(window).width;
  // const HEIGHT = Dimensions.get(window).height;
  return (
    <TouchableOpacity
      style={{flex: 1}}
      onPress={() => props.changeModalVisiblity(false)}>
      <TouchableOpacity
        onPress={() => props.changeModalVisiblity(false)}
        style={styles.container}>
        <View style={[styles.modal, {height: 350}]}>
          <ScrollView showsVerticalScrollIndicator={false}>{option}</ScrollView>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export {ModalPickerBuy};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 160,
    width: '50%',
    height: 400,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#272d3f',
    borderRadius: 20,
  },
  modal: {backgroundColor: 'rgba(0,0,0,0.0)', borderRadius: 10, color: 'white'},
  option: {color: 'white'},
  text: {
    marginTop: 5,
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    // alignSelf: 'baseline',
  },
});
