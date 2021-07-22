import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {appAxios} from '../../api/axios';

import images from '../Balance/AddWalletComponents/AllImages';

const ModalPicker = props => {
  const {sellRates} = useSelector(store => store.appReducer);

  const onPressItem = option => {
    props.changeModalVisiblity(false);
    props.setData(option);
  };
  const option =
    Boolean(sellRates) &&
    sellRates.map((item, key) => {
      return (
        <TouchableOpacity
          style={{}}
          key={key}
          style={{
            justifyContent: 'space-between',
          }}
          onPress={() => {
            onPressItem(item);
          }}>
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
              {images[item?.finance.currency].image}
            </View>
            <Text key={`name - ${key}`} style={styles.text}>
              {item.finance.currency}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  // .filter(item => item.currency !== 'USDT')
  // .map((item, key) => {
  //   return (
  //     <View key={key}>
  //       {Boolean(allRates)
  //         ? allRates.map((itemm, key) =>
  //             itemm.finance?.currency === item.currency ? (
  //               <TouchableOpacity
  //                 style={{}}
  //                 key={key}
  //                 style={{
  //                   justifyContent: 'space-between',
  //                 }}
  //                 onPress={() => {
  //                   // onPressItem(item);
  //                   console.log(itemm);
  //                   // dispatch(FaqData(itemm));
  //                 }}>
  //                 <View
  //                   key={key}
  //                   style={{
  //                     flexDirection: 'row',
  //                     justifyContent: 'space-between',
  //                     width: 100,
  //                   }}>
  //                   <View
  //                     style={{
  //                       alignSelf: 'center',
  //                       justifyContent: 'flex-start',
  //                       marginTop: 5,
  //                     }}>
  //                     {images[item.currency].image}
  //                   </View>
  //                   <Text key={`name - ${key}`} style={styles.text}>
  //                     {item.currency}
  //                   </Text>
  //                 </View>
  //               </TouchableOpacity>
  //             ) : null,
  //           )
  //         : null}
  //     </View>
  //   );
  // });
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

export {ModalPicker};

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

// const ModalPicker = props => {
//   const onPressItem = option => {
//     props.changeModalVisiblity(false);
//     props.setData(option);
//   };
//   const option = OPTIONS.map((item, index) => {
//     return (
//       <TouchableOpacity
//         style={{
//           justifyContent: 'space-between',
//         }}
//         key={index}
//         onPress={() => onPressItem(item)}>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             width: 100,
//           }}>
//           <View
//             style={{
//               alignSelf: 'center',
//               justifyContent: 'flex-start',
//               marginTop: 5,
//             }}>
//             {item.img}
//           </View>
//           <Text key={`name - ${index}`} style={styles.text}>
//             {item.name}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   });
//   // const WIDTH = Dimensions.get(window).width;
//   // const HEIGHT = Dimensions.get(window).height;
//   return (
//     <TouchableOpacity
//       style={{flex: 1}}
//       onPress={() => props.changeModalVisiblity(false)}>
//       <TouchableOpacity
//         onPress={() => props.changeModalVisiblity(false)}
//         style={styles.container}>
//         <View style={[styles.modal, {height: 350}]}>
//           <ScrollView showsVerticalScrollIndicator={false}>{option}</ScrollView>
//         </View>
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );
// };

// export {ModalPicker};

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     top: 160,
//     width: '50%',
//     height: 400,
//     alignSelf: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#272d3f',
//     borderRadius: 20,
//   },
//   modal: {backgroundColor: 'rgba(0,0,0,0.0)', borderRadius: 10, color: 'white'},
//   option: {color: 'white'},
//   text: {
//     marginTop: 5,
//     fontSize: 20,
//     color: 'white',
//     alignSelf: 'center',
//     justifyContent: 'flex-end',
//     // alignSelf: 'baseline',
//   },
// });
