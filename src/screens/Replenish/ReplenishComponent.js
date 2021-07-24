import React, {useEffect, useState} from 'react';
import {DarkTheme, useNavigation} from '@react-navigation/native';
import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ArrowLeft} from '../Svg';
import {useSelector} from 'react-redux';

const ReplenishComponent = props => {
  const back = useNavigation();
  const {replenishComponentData} = useSelector(store => store.appReducer);
  const [visible, setVisible] = useState(false);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          paddingHorizontal: 10,
          backgroundColor: 'rgba(32,34,42,1)',
        }}>
        <TouchableOpacity
          style={{
            marginTop: 30,
            marginLeft: 20,
          }}
          onPress={() => back.goBack()}>
          <ArrowLeft />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              color: 'white',
              fontWeight: '700',
              marginTop: 46,
              marginLeft: 20,
              marginBottom: 30,
              fontSize: 18,
            }}>
            {replenishComponentData.name}
          </Text>

          <View
            style={{
              backgroundColor: 'white',
              width: '90%',
              height: 180,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <Image
              style={{
                marginVertical: 10,
                width: 200,
                alignSelf: 'center',
                height: 150,
                borderRadius: 10,
                backgroundColor: 'white',
              }}
              source={{
                uri: `https://netex.kg/assets/images/ps/${replenishComponentData.logo}`,
              }}
            />
          </View>
          <Text
            style={{
              marginTop: 20,
              color: 'white',
              marginLeft: 22,
              fontSize: 16,
            }}>
            {replenishComponentData.description}
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ReplenishComponent;

const styles = StyleSheet.create({});
