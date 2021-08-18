import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

import {appAxios} from '../../api/axios';
import {
  ChekData,
  getOperations,
  getOperationsFiltered,
} from '../../store/action';
import {ArrowLeft, FilterIcon} from '../Svg';
import {load, noData} from '../components/FullLoader';

export function convertToDateObj(time) {
  let ISODate = new Date(new Date().getTime() - time).toISOString().split('T');
  return `${ISODate[0].split('-').reverse().join('.')} ${ISODate[1].substr(
    0,
    5,
  )}`;
}
export const navigationObj = {
  Продажа: 'SellCheck',
  Покупка: 'BuyCheck',
  Вывод: 'ConclusionCheck',
  Пополнение: 'ReplenishCheck',
};

const History = ({navigation}) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const [dataa, setDataa] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [pageCurrent, setpageCurrent] = useState(1);
  const {token} = useSelector(store => store.appReducer);

  useEffect(() => {
    setisLoading(true);
    getData();
    return () => {};
  }, [pageCurrent]);

  const getData = async () => {
    setRefreshing(true);

    const tokenLocal = await AsyncStorage.getItem('Token');
    appAxios
      .post(
        `user/operations?page=${pageCurrent}`,
        {},
        {
          headers: {
            authorization: `Basic ${tokenLocal || token}`,
          },
        },
      )
      .then(({data, ...res}) => {
        if (data.result === 1) {
          setDataa(dataa.concat(data.data.operations));
          dispatch(getOperations(data.data.operations));
          dispatch(getOperationsFiltered(data.data.operations));
        } else {
          setDataa([]);
          dispatch(getOperations());
          dispatch(getOperationsFiltered());
        }
        setRefreshing(false);
        setisLoading(false);
      })
      .catch(e => console.log(e));
  };

  // -----------------Start render-----------------
  const renderItem = dataa.map((item, key) => {
    return (
      <TouchableOpacity
        key={key}
        onPress={() => {
          item.status === '2' &&
            (dispatch(ChekData(item)),
            navigation.navigate(navigationObj[item.name]));
        }}
        style={{
          backgroundColor: 'rgb(92,96,112)',
          borderRadius: 10,
          marginTop: item.id === 0 ? 36 : 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 14,
              color: 'rgb(224,224,224)',
              fontWeight: '700',
              marginTop: 15,
              marginLeft: 16,
            }}>
            {item.name}
          </Text>
          <View
            style={{
              width: 7,
              height: 7,
              backgroundColor:
                item.status === '2'
                  ? // Green
                    '#54F36D'
                  : item.status === '3'
                  ? // Red
                    '#F82727'
                  : // Orange
                    '#EAD40E',
              borderRadius: 10,
              marginRight: 10,
              marginTop: 10,
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 14,

            color:
              item.operation === '1'
                ? // Green
                  '#7BEF8E'
                : item.operation === '3'
                ? // Green
                  '#7BEF8E'
                : // Orange
                  '#F27171',
            alignSelf: 'flex-start',
            marginLeft: 15,
            marginVertical: 3,
          }}>
          {`${item.sum} ${item.currency}`}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 12,
              color: 'rgb(156,156,156)',
              // marginTop: -5,
              marginBottom: 20,
              marginLeft: 16,
              alignSelf: 'center',
            }}>
            {moment.unix(item.date_creation).format('DD.MM.YYYY, HH:mm')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  });
  // -----------------End render-----------------

  const handleLoadMore = () => {
    setpageCurrent(pageCurrent + 1);
    setisLoading(true);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'rgba(32,34,42,1)',
      }}>
      <ScrollView
        onMomentumScrollEnd={handleLoadMore}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getData} />
        }>
        <View style={{paddingBottom: 37, paddingHorizontal: 28}}>
          <View
            style={{
              marginTop: 30,
              marginBottom: 52,
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Balance')}
              style={{width: 50, height: 50}}>
              <ArrowLeft />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
              <FilterIcon />
            </TouchableOpacity>
          </View>
          <Text style={{color: 'white', fontWeight: '600'}}>
            ИСТОРИЯ ОПЕРАЦИИ
          </Text>
          {dataa.length !== 0 ? renderItem : noData}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;
