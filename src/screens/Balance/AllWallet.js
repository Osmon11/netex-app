import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  StatusBar,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';

import {
  ArrowUpGreen,
  Line,
  Line2,
  ArrowLeft,
  ParamsIcon,
  ArrowDownRed,
} from '../Svg';
import AllImages from '../Balance/AddWalletComponents/AllImages';
import {setCurrencyRecvisit} from '../../store/action';

const AllWallet = ({navigation}) => {
  const back = useNavigation();
  // ----------------------------------------------------------------
  const dispatch = useDispatch();
  const {allWallets, allRates, rates} = useSelector(store => store.appReducer);
  // ----------------------------------------------------------------

  function decimalAdjust(type, value, exp) {
    // Если степень не определена, либо равна нулю...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Если значение не является числом, либо степень не является целым числом...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Сдвиг разрядов
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
    // Обратный сдвиг
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
  }

  return Boolean(allWallets) ? (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(32,34,42,1)',
        paddingHorizontal: 10,
      }}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(32,34,42,1)" />

      {/* -------------------Header Start------------------- */}

      <TouchableOpacity
        style={{
          marginTop: 40,
          marginBottom: 25,
          marginLeft: 20,
        }}
        onPress={() => back.goBack()}>
        <ArrowLeft />
      </TouchableOpacity>
      {/* -------------------Header End------------------- */}

      <ScrollView showsVerticalScrollIndicator={false}>
        {allWallets
          .filter(item => item.currency !== 'USDT')
          .map((item, index) => {
            return (
              <LinearGradient
                key={index}
                start={{x: 0.2, y: 0.2}}
                end={{x: 1.8, y: 2}}
                colors={[
                  '#C4C4C4',
                  '#5E6273',
                  '#20222A',
                  'black',
                  'black',
                  'black',
                ]}
                style={{
                  width: '90%',
                  paddingVertical: 1,
                  marginHorizontal: 20,
                  borderRadius: 10,
                  marginBottom: 20,
                  alignSelf: 'center',
                  alignItems: 'center',
                  display: item.status === '1' ? 'flex' : 'none',
                }}>
                <LinearGradient
                  key={index}
                  start={{x: 0.2, y: 0.2}}
                  end={{x: 3, y: 2}}
                  colors={[
                    'rgba(94, 98, 115, 1)',
                    'rgba(32, 34, 42, 1)',
                    '#22242d',
                    '#5E6273',
                  ]}
                  style={{
                    width: '99.5%',
                    borderRadius: 10,
                    paddingLeft: 20,
                    paddingTop: 28,
                    paddingRight: 20,
                    paddingBottom: 21,
                  }}>
                  {Boolean(rates) ? (
                    allRates.map((itemm, key) =>
                      itemm.finance?.currency === item.currency ? (
                        <View
                          key={key}
                          style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                          }}>
                          <View>
                            <View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <View style={{marginLeft: -13}}>
                                  {AllImages[itemm.finance.currency].image}
                                </View>
                                <View
                                  style={{
                                    marginRight: 7,
                                    alignSelf: 'center',
                                  }}>
                                  {decimalAdjust(
                                    'floor',
                                    itemm.rates[0].rate - itemm.rates[1].rate,
                                    -2,
                                  ) > 0 ? (
                                    <ArrowUpGreen />
                                  ) : decimalAdjust(
                                      'floor',
                                      itemm.rates[0].rate - itemm.rates[1].rate,
                                      -2,
                                    ) === 0 ? (
                                    <View />
                                  ) : (
                                    <ArrowDownRed />
                                  )}
                                </View>

                                <View>
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      color:
                                        decimalAdjust(
                                          'floor',
                                          itemm.rates[0].rate -
                                            itemm.rates[1].rate,
                                          -2,
                                        ) > 0
                                          ? '#7BEF8E'
                                          : decimalAdjust(
                                              'floor',
                                              itemm.rates[0].rate -
                                                itemm.rates[1].rate,
                                              -2,
                                            ) === 0
                                          ? '#EFC17B'
                                          : '#F27171',
                                    }}>
                                    {`${
                                      decimalAdjust(
                                        'floor',
                                        itemm.rates[0].rate -
                                          itemm.rates[1].rate,
                                        -2,
                                      ) > 0
                                        ? '+'
                                        : ''
                                    }${decimalAdjust(
                                      'floor',
                                      itemm.rates[0].rate - itemm.rates[1].rate,
                                      -2,
                                    )}`}
                                  </Text>
                                </View>
                              </View>
                              <View style={{marginTop: 5, marginLeft: -8}}>
                                {decimalAdjust(
                                  'floor',
                                  itemm.rates[0].rate - itemm.rates[1].rate,
                                  -2,
                                ) > 0 ? (
                                  <Line />
                                ) : decimalAdjust(
                                    'floor',
                                    itemm.rates[0].rate - itemm.rates[1].rate,
                                    -2,
                                  ) === 0 ? (
                                  <Line />
                                ) : (
                                  <Line2 />
                                )}
                              </View>
                            </View>
                            <Text
                              style={{
                                color: 'rgba(121, 121, 121, 1)',
                                marginTop: 10,
                              }}>
                              {itemm.finance?.name} wallet
                            </Text>
                            <Text
                              ellipsizeMode="middle"
                              numberOfLines={1}
                              style={{
                                color: 'white',
                                fontWeight: '700',
                                marginTop: 8,
                                width: 150,
                              }}>
                              {item.wallet_num === ''
                                ? 'не задан'
                                : item.wallet_num}
                            </Text>
                          </View>

                          <View>
                            <View style={{marginTop: 5}}>
                              <TouchableOpacity
                                onPress={() => {
                                  dispatch(setCurrencyRecvisit(item));
                                  navigation.navigate('AddWalletSecond');
                                }}
                                style={{alignSelf: 'flex-end'}}>
                                <ParamsIcon />
                              </TouchableOpacity>
                              <View
                                style={{flexDirection: 'row', marginTop: 13}}>
                                <Text style={{color: 'white', fontSize: 17}}>
                                  {Number(item.balance).toFixed(6)}
                                </Text>
                                <Text
                                  style={{
                                    color: 'rgba(255,255,255,0.5)',
                                    fontSize: 12,
                                    marginVertical: 2,
                                    marginLeft: 15,
                                  }}>
                                  {item.currency}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      ) : (
                        <View key={key}></View>
                      ),
                    )
                  ) : (
                    <ActivityIndicator size="large" color="#FFF" />
                  )}
                </LinearGradient>
              </LinearGradient>
              // <TouchableOpacity
              //   onPress={() => {
              //     dispatch(setCurrencyRecvisit(item));
              //     // console.log(item);
              //     navigation.navigate('AddWalletSecond');
              //   }}
              //   key={`tab2 - ${index}`}
              //   // onPress={() => navigation.navigate('Cryptoval', {id: item.id})}
              //   style={{
              //     marginHorizontal: 28,
              //     display: item.currency === null ? 'none' : 'flex',
              //     justifyContent: 'space-between',
              //     marginTop: item.currency === 'BTC' ? 25 : 0,
              //     flexDirection: 'row',
              //   }}>
              // <LinearGradient
              //   key={index}
              //   start={{x: 0.2, y: 0.2}}
              //   end={{x: 1.8, y: 2}}
              //   colors={[
              //     '#C4C4C4',
              //     '#5E6273',
              //     '#20222A',
              //     'black',
              //     'black',
              //     'black',
              //     'black',
              //     'black',
              //   ]}
              //   style={{
              //     width: '100%',
              //     marginBottom: 20,
              //     borderRadius: 10,
              //     alignSelf: 'center',
              //     alignItems: 'center',
              //   }}>
              //     <LinearGradient
              //       key={`tab - ${index}`}
              //       start={{x: 0.2, y: 0.2}}
              //       end={{x: 3, y: 2}}
              //       colors={[
              //         'rgba(94, 98, 115, 1)',
              //         'rgba(32, 34, 42, 1)',
              //         '#22242d',
              //         '#5E6273',
              //       ]}
              //       style={{
              //         width: '100%',
              //         height: 160,
              //         // marginLeft: -2,
              //         borderRadius: 10,
              //         borderWidth: 1,
              //         borderColor: 'rgba(196, 196, 196, 0.36)',
              //         paddingLeft: 17,
              //         paddingTop: 20,
              //         paddingRight: 25,
              //         paddingBottom: 16,
              //       }}>
              //       {Boolean(rates) ? (
              //         rates.map((itemm, key) =>
              //           itemm.finance?.currency === item.currency ? (
              //             <View
              //               key={index}
              //               style={{
              //                 justifyContent: 'space-between',
              //                 flexDirection: 'row',
              //               }}>
              //               <View>
              //                 <View>
              //                   <View
              //                     style={{
              //                       flexDirection: 'row',
              //                       alignItems: 'center',
              //                     }}>
              //                     <View style={{marginLeft: -13}}>
              //                       {AllImages[itemm.finance.currency].image}
              //                     </View>
              //                     <View
              //                       style={{
              //                         marginRight: 7,
              //                         alignSelf: 'center',
              //                       }}>
              //                       {decimalAdjust(
              //                         'floor',
              //                         itemm.rates[0].rate - itemm.rates[1].rate,
              //                         -2,
              //                       ) > 0 ? (
              //                         <ArrowUpGreen />
              //                       ) : decimalAdjust(
              //                           'floor',
              //                           itemm.rates[0].rate - itemm.rates[1].rate,
              //                           -2,
              //                         ) === 0 ? (
              //                         <View />
              //                       ) : (
              //                         <ArrowDownRed />
              //                       )}
              //                     </View>

              //                     <View>
              //                       <Text
              //                         style={{
              //                           fontSize: 12,
              //                           color:
              //                             decimalAdjust(
              //                               'floor',
              //                               itemm.rates[0].rate -
              //                                 itemm.rates[1].rate,
              //                               -2,
              //                             ) > 0
              //                               ? '#7BEF8E'
              //                               : decimalAdjust(
              //                                   'floor',
              //                                   itemm.rates[0].rate -
              //                                     itemm.rates[1].rate,
              //                                   -2,
              //                                 ) === 0
              //                               ? '#EFC17B'
              //                               : '#F27171',
              //                         }}>
              //                         {`${
              //                           decimalAdjust(
              //                             'floor',
              //                             itemm.rates[0].rate -
              //                               itemm.rates[1].rate,
              //                             -2,
              //                           ) > 0
              //                             ? '+'
              //                             : ''
              //                         }${decimalAdjust(
              //                           'floor',
              //                           itemm.rates[0].rate - itemm.rates[1].rate,
              //                           -2,
              //                         )}`}
              //                       </Text>
              //                     </View>
              //                   </View>
              //                   <View style={{marginTop: 5, marginLeft: -8}}>
              //                     {decimalAdjust(
              //                       'floor',
              //                       itemm.rates[0].rate - itemm.rates[1].rate,
              //                       -2,
              //                     ) > 0 ? (
              //                       <Line />
              //                     ) : decimalAdjust(
              //                         'floor',
              //                         itemm.rates[0].rate - itemm.rates[1].rate,
              //                         -2,
              //                       ) === 0 ? (
              //                       <Line />
              //                     ) : (
              //                       <Line2 />
              //                     )}
              //                   </View>
              //                 </View>
              //                 <Text
              //                   style={{
              //                     color: 'rgba(121, 121, 121, 1)',
              //                     marginTop: 10,
              //                   }}>
              //                   {item.currency}
              //                 </Text>
              //                 <Text
              //                   style={{
              //                     color: 'white',
              //                     fontWeight: '700',
              //                     marginTop: 8,
              //                   }}>
              //                   {item.wallet_num === ''
              //                     ? 'не задан'
              //                     : item.wallet_num}
              //                 </Text>
              //               </View>

              //               <View>
              //                 <View style={{marginTop: 5}}>
              //                   <TouchableOpacity
              //                     onPress={() => {
              //                       dispatch(setCurrencyRecvisit(itemm.finance));
              //                       navigation.navigation.navigate(
              //                         'AddWalletSecond',
              //                       );
              //                       // console.log(item);
              //                     }}
              //                     style={{alignSelf: 'flex-end'}}>
              //                     <ParamsIcon />
              //                   </TouchableOpacity>
              //                   <View
              //                     style={{flexDirection: 'row', marginTop: 13}}>
              //                     <Text style={{color: 'white', fontSize: 17}}>
              //                       {Number(item.balance).toFixed(2)}
              //                     </Text>
              //                     <Text
              //                       style={{
              //                         color: 'rgba(255,255,255,0.5)',
              //                         fontSize: 12,
              //                         marginVertical: 2,
              //                         marginLeft: 15,
              //                       }}>
              //                       {item.currency}
              //                     </Text>
              //                   </View>
              //                 </View>
              //               </View>
              //             </View>
              //           ) : (
              //             <View key={key}></View>
              //           ),
              //         )
              //       ) : (
              //         <ActivityIndicator size="large" color="#FFF" />
              //       )}
              //     </LinearGradient>
              //   </LinearGradient>
              // </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  ) : (
    <ActivityIndicator size="large" color="#FFF" />
  );
};

export default AllWallet;
//  <View key={`left - ${index}`}>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         // marginLeft: item.id === 1 ? 0 : -9,
//                       }}>
//                       <View>
//                         <Btc />
//                       </View>
//                       <View
//                         style={{
//                           marginRight: 7,
//                           alignSelf: 'center',
//                         }}>
//                         <Arrow />
//                       </View>
//                       <Text style={{alignSelf: 'center', color: 'white'}}>
//                         +12%
//                       </Text>
//                     </View>
//                     {/* <View style={{marginTop: 5}}>{item.line}</View> */}
//                     <Text
//                       style={{
//                         color: 'rgba(121, 121, 121, 1)',
//                         marginTop: 10,
//                       }}>
//                       {item.step_size}
//                     </Text>
//                     <Text
//                       style={{
//                         color: 'white',
//                         fontWeight: '700',
//                         marginTop: 8,
//                       }}>
//                       {item.money}
//                     </Text>
//                   </View>

//                   <View key={`right - ${index}`}>
//                     <View style={{}}>
//                       <View
//                         style={{
//                           flexDirection: 'row',
//                           justifyContent: 'flex-end',
//                         }}>
//                         <Text style={{color: 'white', fontSize: 18}}>
//                           {item.currency}
//                         </Text>
//                         <Text
//                           style={{
//                             color: 'rgba(255,255,255,0.5)',
//                             fontSize: 12,
//                             marginVertical: 2,
//                             marginLeft: 9,
//                           }}>
//                           {item.balance}
//                         </Text>
//                       </View>
//                       <Text
//                         style={{
//                           position: 'absolute',
//                           color: 'white',
//                           fontWeight: '700',
//                           marginTop: 70,
//                           fontSize: 20,
//                         }}>
//                         {/* {item.id} */}
//                         $106.0021
//                       </Text>
//                     </View>
//                   </View>
// import React, {useEffect, useState} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   Text,
//   View,
//   StatusBar,
//   FlatList,
//   ScrollView,
//   ActivityIndicator,
//   Dimensions,
// } from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import {useNavigation} from '@react-navigation/native';

// import LinearGradient from 'react-native-linear-gradient';

// import {Arrow, Unknown, Plus, ArrowLeft, Btc} from '../Svg';
// import {useDispatch, useSelector} from 'react-redux';

// import {ArrowUpGreen, Line, Line2, ParamsIcon, ArrowDownRed} from '../Svg';
// import AllImages from '../Balance/AddWalletComponents/AllImages';
// import {setCurrencyRecvisit} from '../../store/action';
// const AllWallet = ({navigation}, props) => {
//   const {allWallets, rates} = useSelector(store => store.appReducer);
//   const back = useNavigation();
//   // ----------------------------------------------------------------
//   const [DATA, setDATA] = useState([]);
//   // const {id} = props.route.params;
//   // ----------------------------------------------------------------
//   const dispatch = useDispatch();
//   useEffect(() => {
//     var a = new Set(allWallets);
//     console.log(a);
//     if (allWallets) {
//       allWallets.forEach(i => {
//         if (i.currency === null) {
//           console.log(true);
//         }
//       });
//     }
//   }, []);
//   function decimalAdjust(type, value, exp) {
//     // Если степень не определена, либо равна нулю...
//     if (typeof exp === 'undefined' || +exp === 0) {
//       return Math[type](value);
//     }
//     value = +value;
//     exp = +exp;
//     // Если значение не является числом, либо степень не является целым числом...
//     if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
//       return NaN;
//     }
//     // Сдвиг разрядов
//     value = value.toString().split('e');
//     value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
//     // Обратный сдвиг
//     value = value.toString().split('e');
//     return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
//   }

//   // ----------------------------------------------------------------
//   return !Boolean(rates, allWallets) ? (
//     <ActivityIndicator
//       style={{
//         position: 'absolute',
//         zIndex: 2,
//         flex: 1,
//         width: Dimensions.get('window').width,
//         height: '100%',
//         justifyContent: 'center',
//         alignSelf: 'center',
//         backgroundColor: 'rgba(32,34,42,1)',
//       }}
//       size="large"
//       color="#FFF"
//     />
//   ) : (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: 'rgba(32,34,42,1)',
//       }}>
//       <StatusBar barStyle="light-content" backgroundColor="rgba(32,34,42,1)" />

//       {/* -------------------Header Start------------------- */}

//       <TouchableOpacity
//         style={{
//           marginTop: 40,
//           marginBottom: 25,
//           marginLeft: 25,
//         }}
//         onPress={() => back.goBack()}>
//         <ArrowLeft />
//       </TouchableOpacity>
//       {/* -------------------Header End------------------- */}

//       <ScrollView showsVerticalScrollIndicator={false}>
//         {allWallets.map((item, index) => {
//           return (
//             <TouchableOpacity
//               key={`tab2 - ${index}`}
//               // onPress={() => navigation.navigate('Cryptoval', {id: item.id})}
//               style={{
//                 marginHorizontal: 28,
//                 justifyContent: 'space-between',
//                 marginTop: item.currency === 'BTC' ? 25 : 0,
//                 flexDirection: 'row',
//               }}>
//               <LinearGradient
//                 key={`tab3 - ${index}`}
//                 start={{x: 0.2, y: 0.2}}
//                 end={{x: 1.8, y: 2}}
//                 colors={[
//                   '#C4C4C4',
//                   '#5E6273',
//                   '#20222A',
//                   'black',
//                   'black',
//                   'black',
//                 ]}
//                 style={{
//                   width: 243,
//                   padding: 1,
//                   marginRight: 20,
//                   marginLeft: 20,
//                   borderRadius: 10,
//                   alignSelf: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <LinearGradient
//                   key={`tab4 - ${index}`}
//                   start={{x: 0.2, y: 0.2}}
//                   end={{x: 3, y: 2}}
//                   colors={[
//                     'rgba(94, 98, 115, 1)',
//                     'rgba(32, 34, 42, 1)',
//                     '#22242d',
//                     '#5E6273',
//                   ]}
//                   style={{
//                     width: 241,
//                     borderRadius: 10,
//                     paddingLeft: 17,
//                     paddingTop: 20,
//                     paddingRight: 20,
//                     paddingBottom: 16,
//                   }}>
//                   {rates?.map((itemm, key) =>
//                     itemm.finance?.currency === item.currency ? (
//                       <View
//                         key={key}
//                         style={{
//                           justifyContent: 'space-between',
//                           flexDirection: 'row',
//                         }}>
//                         <View>
//                           <View>
//                             <View style={{flexDirection: 'row'}}>
//                               <View style={{marginLeft: -13}}>
//                                 {AllImages[itemm.finance.currency].image}
//                               </View>
//                               <View
//                                 style={{
//                                   marginRight: 7,
//                                   marginLeft: 13,
//                                   alignSelf: 'center',
//                                 }}>
//                                 {decimalAdjust(
//                                   'floor',
//                                   itemm.rates[0].rate - itemm.rates[1].rate,
//                                   -2,
//                                 ) > 0 ? (
//                                   <ArrowUpGreen />
//                                 ) : decimalAdjust(
//                                     'floor',
//                                     itemm.rates[0].rate - itemm.rates[1].rate,
//                                     -2,
//                                   ) === 0 ? (
//                                   <ArrowUpGreen />
//                                 ) : (
//                                   <ArrowDownRed />
//                                 )}
//                               </View>

//                               <View>
//                                 <Text
//                                   style={{
//                                     fontSize: 12,
//                                     color:
//                                       decimalAdjust(
//                                         'floor',
//                                         itemm.rates[0].rate -
//                                           itemm.rates[1].rate,
//                                         -2,
//                                       ) > 0
//                                         ? 'rgb(10,209,105)'
//                                         : decimalAdjust(
//                                             'floor',
//                                             itemm.rates[0].rate -
//                                               itemm.rates[1].rate,
//                                             -2,
//                                           ) === 0
//                                         ? 'yellow'
//                                         : '#F27171',
//                                   }}>
//                                   {`${
//                                     decimalAdjust(
//                                       'floor',
//                                       itemm.rates[0].rate - itemm.rates[1].rate,
//                                       -2,
//                                     ) > 0
//                                       ? '+'
//                                       : ''
//                                   }${decimalAdjust(
//                                     'floor',
//                                     itemm.rates[0].rate - itemm.rates[1].rate,
//                                     -2,
//                                   )}`}
//                                 </Text>
//                               </View>
//                             </View>
//                             <View style={{marginTop: 5, marginLeft: -8}}>
//                               {decimalAdjust(
//                                 'floor',
//                                 itemm.rates[0].rate - itemm.rates[1].rate,
//                                 -2,
//                               ) > 0 ? (
//                                 <Line />
//                               ) : decimalAdjust(
//                                   'floor',
//                                   itemm.rates[0].rate - itemm.rates[1].rate,
//                                   -2,
//                                 ) === 0 ? (
//                                 <Line />
//                               ) : (
//                                 <Line2 />
//                               )}
//                             </View>
//                           </View>
//                           <Text
//                             style={{
//                               color: 'rgba(121, 121, 121, 1)',
//                               marginTop: 10,
//                             }}>
//                             {item.currency}
//                           </Text>
//                           <Text
//                             style={{
//                               color: 'white',
//                               fontWeight: '700',
//                               marginTop: 8,
//                             }}>
//                             {item.wallet_num === ''
//                               ? 'не задан'
//                               : item.wallet_num}
//                           </Text>
//                         </View>

//                         <View>
//                           <View style={{marginTop: 5}}>
//                             <TouchableOpacity
//                               onPress={() => {
//                                 // console.log(itemm.finance);
//                                 dispatch(setCurrencyRecvisit(itemm.finance));
//                                 navigation.navigation.navigate(
//                                   'AddWalletSecond',
//                                 );
//                               }}
//                               style={{alignSelf: 'flex-end'}}>
//                               <ParamsIcon />
//                             </TouchableOpacity>
//                             <View style={{flexDirection: 'row', marginTop: 13}}>
//                               <Text style={{color: 'white', fontSize: 17}}>
//                                 {item.min_price}
//                               </Text>
//                               <Text
//                                 style={{
//                                   color: 'rgba(255,255,255,0.5)',
//                                   fontSize: 12,
//                                   marginVertical: 2,
//                                   marginLeft: 15,
//                                 }}>
//                                 {item.currency}
//                               </Text>
//                             </View>
//                           </View>
//                         </View>
//                       </View>
//                     ) : (
//                       <View key={key}></View>
//                     ),
//                   )}
//                 </LinearGradient>
//               </LinearGradient>
//             </TouchableOpacity>
//           );
//         })}
//         <LinearGradient
//           start={{x: 0, y: 0}}
//           end={{x: 1.8, y: 2}}
//           colors={[
//             'rgba(94, 98, 115, 0.6)',
//             'rgba(32, 34, 42, 0.1)',
//             '#22242d',
//             'rgba(32, 34, 42, 1)',
//           ]}
//           style={{
//             height: 160,
//             marginHorizontal: 28,
//             marginBottom: 40,
//             borderRadius: 10,
//             borderWidth: 1,
//             borderColor: 'rgba(196, 196, 196, 0.36)',
//             padding: 50,
//           }}>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('AddWallet')}
//             style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               flexDirection: 'row',
//             }}>
//             <View
//               style={{
//                 flex: 1,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <Plus />

//               <Text style={{color: 'rgba(142, 146, 157, 1)'}}>
//                 {'\nДобавить кошелек'}
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </LinearGradient>
//       </ScrollView>

//       {/* <FlatList
//         data={DATA}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => index.toString()}
//         ListFooterComponent={

//         }
//       /> */}
//     </View>
//   );
// };

// export default AllWallet;
