import {useBackHandler} from '@react-native-community/hooks';
import React, {useEffect} from 'react';
import {
  BackHandler,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {ArrowLeft, CheckList} from '../../Svg';
import {convertToDateObj} from '../HistoryPage';
import CheckTamplate from './CheckTamplate';

const SellCheck = props => {
  const {checks} = useSelector(store => store.appReducer);
  useBackHandler(() => {
    props.navigation.navigate('История');
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'rgba(32,34,42,1)',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {/* {console.log(checks)} */}
          <StatusBar
            barStyle="light-content"
            backgroundColor="rgba(32,34,42,1)"
          />

          <TouchableOpacity
            style={{
              marginTop: 30,
              marginLeft: 28,
              width: 50,
              height: 50,
            }}
            onPress={() => props.navigation.navigate('История')}>
            <ArrowLeft />
          </TouchableOpacity>

          <CheckTamplate
            date={convertToDateObj(checks?.date_creation)}
            title={checks.name.toUpperCase()}
            summa={checks.sum}
            summValuta={checks.debit}
            commission={checks.commission}
            walletNum=""
            systemCommission={checks.gateway_fees}
            valuta={checks.currency}
            extraFees={checks.extra_fees}
            paySistem={checks.method}
            receipt={checks.batch}
          />

          <TouchableOpacity
            style={{width: 128, alignSelf: 'center'}}
            onPress={() => props.navigation.navigate('Balance')}>
            <LinearGradient
              start={{x: 0, y: 4}}
              end={{x: 3, y: 4}}
              colors={['#0bd061', '#05d287', '#fff', '#0039e6', 'white']}
              style={{
                alignSelf: 'center',
                height: 49,
                width: 128,
                backgroundColor: '#0039E6',
                marginTop: 42,
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 16,
                  alignSelf: 'center',
                  color: 'white',
                }}>
                НА ГЛАВНУЮ
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text
            style={{
              color: 'white',
              marginTop: 60,
              alignSelf: 'center',
              fontWeight: '700',
              fontSize: 18,
            }}>
            ПРИМЕЧАНИЕ
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: 30,
              marginBottom: 70,
              alignSelf: 'center',
            }}>
            {checks.memo}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SellCheck;
