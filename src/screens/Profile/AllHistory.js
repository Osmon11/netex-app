import React, {useState, useEffect, useRef} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {ArrowLeft, Filter, Ltc, $Icon} from '../Svg';
import LinearGradient from 'react-native-linear-gradient';
import config from '../../api/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setLoading} from '../../store/action';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {appAxios} from '../../api/axios';
import {convertToDateObj} from '../burgerScreen/HistoryPage';
import {load} from '../components/FullLoader';

const AllHistory = ({navigation}) => {
  const [dataa, setDataa] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [pageCurrent, setpageCurrent] = useState(1);
  const {token} = useSelector(store => store.appReducer);

  useEffect(async () => {
    setisLoading(true);
    const tokenLocal = await AsyncStorage.getItem('Token');
    appAxios
      .get(`user/actions`, {
        headers: {
          authorization: `Basic ${tokenLocal || token}`,
        },
      })
      .then(({data, ...res}) => {
        if (data.result === 0) {
          setisLoading(false);
        } else {
          setDataa(data.data.user_actions);
          setisLoading(false);
        }
        setisLoading(false);
      });
    return () => {};
  }, []);

  const getData = async () => {
    setpageCurrent(pageCurrent + 1);
    const tokenLocal = await AsyncStorage.getItem('Token');

    appAxios
      .get(`user/actions?page=${pageCurrent}`, {
        headers: {
          authorization: `Basic ${tokenLocal || token}`,
        },
      })
      .then(({data, ...res}) => {
        if (data.result === 0) {
          setisLoading(false);
        } else {
          setisLoading(true);

          setDataa(dataa.concat(data.data.user_actions));
          setisLoading(false);
        }
      });
  };
  // -----------------Body-----------------
  const renderItem = ({item, index}) => {
    return (
      <View
        key={index}
        style={{
          flexDirection: 'row',
          marginTop: 15,
          paddingHorizontal: 28,
                        marginBottom: dataa.length === index + 1 ? 20 : 0,

        }}>
        <Text style={[styles.AllHistoryText, {width: '30%'}]}>
          {moment.unix(item.date).format('DD.MM.YYYY HH:mm')}
        </Text>
        <Text style={[styles.AllHistoryText, {width: '40%'}]}>{item.name}</Text>
        <Text style={[styles.AllHistoryText, {textAlign: 'left'}]}>
          {item.ip}
        </Text>
      </View>
    );
  };

  const Header = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 38,
          paddingBottom: 15,
          borderBottomColor: 'rgba(112, 118, 135, 1)',
          borderBottomWidth: 1,
          marginHorizontal: 28,
        }}>
        <Text
          style={{
            color: 'rgb(112, 118, 135)',
            fontSize: 10,
            width: '30%',
          }}>
          Дата
        </Text>
        <Text
          style={{
            color: 'rgb(112, 118, 135)',
            fontSize: 10,
            width: '40%',
          }}>
          Действие
        </Text>
        <Text
          style={{
            color: 'rgb(112, 118, 135)',
            fontSize: 10,
            width: '20%',
          }}>
          IP адрес
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 10,
          marginLeft: 15,
        }}
        onPress={() => navigation.goBack()}>
        <ArrowLeft />
      </TouchableOpacity>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={Header}
        data={dataa}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={() =>
          isLoading && <View style={{marginVertical: 10}}>{load}</View>
        }
        onEndReached={getData}
        onEndReachedThreshold={0}
      />
    </SafeAreaView>
  );
};

export default AllHistory;

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
  AllHistoryText: {
    color: 'rgb(112, 118, 135)',
    fontSize: 10,
  },
});
