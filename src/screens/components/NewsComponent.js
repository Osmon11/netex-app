import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ArrowLeft} from '../Svg';
import {useSelector} from 'react-redux';

const NewsComponent = props => {
  const back = useNavigation();
  const {NewsData} = useSelector(store => store.appReducer);
  const [visible, setVisible] = useState(false);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          backgroundColor: 'rgba(32,34,42,1)',
          paddingHorizontal: 28,
        }}>
        {/* ---------------Modal start--------------- */}
        <Modal visible={visible} transparent={true}>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{
              position: 'absolute',
              zIndex: 2,
              flex: 1,
              width: Dimensions.get('window').width,
              height: '100%',
              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: 'rgba(0,0,0,0.6)',
            }}>
            <Image
              style={{
                width: '90%',
                alignSelf: 'center',
                height: 230,
                borderRadius: 10,
              }}
              source={{uri: NewsData.preview}}
            />
          </TouchableOpacity>
        </Modal>
        {/* ---------------Modal end--------------- */}
        <TouchableOpacity
          style={{marginTop: 30, width: 50, height: 50}}
          onPress={() => back.goBack()}>
          <ArrowLeft />
        </TouchableOpacity>
        <Text
          style={{
            color: 'white',
            fontWeight: '700',
            marginTop: 46,
            marginBottom: 30,
            fontSize: 18,
          }}>
          {NewsData.name}
        </Text>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Image
            style={{
              width: '100%',
              alignSelf: 'center',
              height: 230,
              borderRadius: 10,
            }}
            source={{uri: NewsData.preview}}
          />
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 20,
            color: 'white',
            lineHeight: 20,
          }}>
          {NewsData.description}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default NewsComponent;

const styles = StyleSheet.create({});
