import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Calendar, Picker} from 'react-native-plain-calendar';
import {useDispatch, useSelector} from 'react-redux';

import 'moment/locale/ru';
import {ArrowLeft} from '../Svg';
import Filter2 from './Filter2';
import {navigationObj} from './HistoryPage';
import {
  ChekData,
  getOperations,
  getOperationsFiltered,
} from '../../store/action';
import {appAxios} from '../../api/axios';
import moment from 'moment';
import {load, noData} from '../components/FullLoader';

const Filter = ({navigation}) => {
  const dispatch = useDispatch();
  const {filteredOperationsHistory, operations, token} = useSelector(
    store => store.appReducer,
  );
  // -------------------------All Data-------------------------
  useEffect(() => {
    setisLoading(true);
    getData();
    return () => {};
  }, [pageCurrent]);

  const [dataa, setDataa] = useState([]);
  const [visited, setVisited] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [pageCurrent, setpageCurrent] = useState(1);

  const getData = async () => {
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
        } else {
          setDataa([]);
        }
        setisLoading(false);
      })
      .catch(e => console.log(e));
  };

  // -----------------Start CalendarHeader-----------------

  const CalendarHeader = ({Next, Prev, Title}) => {
    return (
      <View style={{paddingHorizontal: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={Prev}>
            <Text style={{color: 'white'}}>
              {/* {ucFirst(
                moment().subtract(1, 'month').startOf('month').format('MMMM'),
              )} */}
              Предыдущий
            </Text>
          </TouchableOpacity>
          <Text style={{color: 'white', fontSize: 20, fontWeight: '500'}}>
            {Title}
          </Text>
          <TouchableOpacity onPress={Next}>
            <Text style={{color: 'white'}}>
              {/* {ucFirst(
                moment().subtract(-1, 'month').startOf('month').format('MMMM'),
              )} */}
              Следующий
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // -----------------End CalendarHeader-----------------
  const handleLoadMore = () => {
    setpageCurrent(pageCurrent + 1);
    setisLoading(true);
  };
  // -------------------------End All Data-------------------------

  const [options, setOptions] = useState({
    operation: '',
    date_from: '',
    date_to: '',
  });

  async function getFilteredData(opt) {
    const tokenLocal = await AsyncStorage.getItem('Token');
    const data = new FormData();

    Boolean(opt.operation) && data.append('operation', opt.operation);
    data.append('date_in', opt.date_from);
    data.append('date_out', opt.date_to);

    appAxios
      .post(`user/operations?page=${pageCurrent}`, data, {
        headers: {
          authorization: `Basic ${tokenLocal || token}`,
        },
      })
      .then(({data, ...res}) => {
        if (data.result === 1) {
          dispatch(getOperationsFiltered(data.data.operations));
          setDataa(data.data.operations);
        } else {
          dispatch(getOperationsFiltered('no_data'));
          setDataa();
        }
      })
      .catch(e => console.log(e));
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'rgba(32,34,42,1)',
      }}>
      <ScrollView
        onMomentumScrollEnd={handleLoadMore}
        showsVerticalScrollIndicator={false}>
        <View style={{paddingBottom: 20}}>
          <TouchableOpacity
            style={{
              marginTop: 30,
              marginBottom: 23,
              marginLeft: 28,
              width: 50,
              height: 50,
            }}
            onPress={() => navigation.goBack()}>
            <ArrowLeft />
          </TouchableOpacity>
          <Calendar.Picker
            initialDate={new Date()}
            maxDate={new Date()}
            headerDateFormat="MMMM yyyy"
            weekStartsOn={1}
            weekdays={['Вск', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']}
            dayTextStyle={{color: 'white'}}
            daySingleSelectedStyle={{backgroundColor: '#0493CF'}}
            dayStartSelectedStyle={{backgroundColor: '#0493CF'}}
            dayEndSelectedStyle={{backgroundColor: '#0493CF'}}
            dayIntermediateSelectedStyle={{backgroundColor: '#5C6070'}}
            todayStyle={{backgroundColor: '#0493CF', borderColor: '#0493CF'}}
            weekdayStyle={{color: '#5D5C71', fontSize: 12}}
            headerTitleStyle={{color: 'white', fontWeight: '500', fontSize: 18}}
            selectedType="single-range"
            onSelected={({selectedStart, selectedEnd}) => {
              if (selectedStart && selectedEnd) {
                let date_from = selectedStart
                  .toISOString()
                  .split('T')[0]
                  .split('-')
                  .reverse()
                  .join('.');
                let date_to = selectedEnd
                  .toISOString()
                  .split('T')[0]
                  .split('-')
                  .reverse()
                  .join('.');
                // getFilteredData({
                //   ...options,
                //   date_from,
                //   date_to,
                // });
                setOptions({
                  ...options,
                  date_from,
                  date_to,
                });
                setVisited(true);
              }
            }}
            HeaderComponent={({currentMonth, onPrevMonth, onNextMonth}) => (
              <CalendarHeader
                Next={onNextMonth}
                Prev={onPrevMonth}
                Title={currentMonth}
              />
            )}
          />

          <Filter2
            setOption={operation => {
              setOptions({...options, operation});
              getFilteredData({
                ...options,
                operation,
              });
            }}
          />
          <Text
            style={{
              color: 'white',
              fontWeight: '600',
              marginTop: 40,
              marginLeft: 28,
            }}>
            ИСТОРИЯ ОПЕРАЦИИ
          </Text>

          {Boolean(filteredOperationsHistory, dataa)
            ? // check pressed calendar if not checked, return allhistory
              visited
              ? filteredOperationsHistory === 'no_data'
                ? noData
                : filteredOperationsHistory
                    // .filter(item => item.operation === options.operation.toString())
                    .map((operation, key) => (
                      <TouchableOpacity
                        onPress={() => {
                          operation.status === '2' &&
                            (dispatch(ChekData(operation)),
                            navigation.navigate(navigationObj[operation.name]));
                        }}
                        key={key}
                        style={{
                          backgroundColor: 'rgb(92,96,112)',
                          borderRadius: 10,
                          marginHorizontal: 28,
                          // marginTop: key === 0 ? 36 : 20,
                          marginTop: 20,
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
                            {operation.name}
                          </Text>
                          <View
                            style={{
                              width: 7,
                              height: 7,
                              backgroundColor:
                                operation.status === '2'
                                  ? // Green
                                    '#54F36D'
                                  : operation.status === '3'
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
                              operation.operation === '1'
                                ? // Green
                                  '#7BEF8E'
                                : operation.operation === '3'
                                ? // Green
                                  '#7BEF8E'
                                : // Red
                                  '#F27171',
                            alignSelf: 'flex-start',
                            marginLeft: 15,
                            marginVertical: 3,
                          }}>
                          {`${operation.sum} ${operation.currency}`}
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
                            {moment
                              .unix(operation.date_creation)
                              .format('DD.MM.YYYY, h:mm')}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))
              : dataa.length !== 0
              ? // check for loader
                dataa.map((operation, key) => (
                  <TouchableOpacity
                    onPress={() => {
                      operation.status === '2'
                        ? (dispatch(ChekData(operation)),
                          navigation.navigate(navigationObj[operation.name]))
                        : null;
                    }}
                    key={key}
                    style={{
                      backgroundColor: 'rgb(92,96,112)',
                      borderRadius: 10,
                      marginHorizontal: 28,
                      // marginTop: key === 0 ? 36 : 20,
                      marginTop: 20,
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
                        {operation.name}
                      </Text>
                      <View
                        style={{
                          width: 7,
                          height: 7,
                          backgroundColor:
                            operation.status === '2'
                              ? // Green
                                '#54F36D'
                              : operation.status === '3'
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
                          operation.operation === '1'
                            ? // Green
                              '#7BEF8E'
                            : operation.operation === '3'
                            ? // Green
                              '#7BEF8E'
                            : // Red
                              '#F27171',
                        alignSelf: 'flex-start',
                        marginLeft: 15,
                        marginVertical: 3,
                      }}>
                      {`${operation.sum} ${operation.currency}`}
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
                        {moment
                          .unix(operation.date_creation)
                          .format('DD.MM.YYYY, h:mm')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))
              : load
            : noData}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Filter;
