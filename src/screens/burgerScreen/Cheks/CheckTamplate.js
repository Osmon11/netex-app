import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {CheckList} from '../../Svg';

const CheckTamplate = ({
  date,
  title,
  textSumma,
  summa,
  summValuta,
  commission,
  paySistem,
  systemCommission,
  valuta,
  receipt,
  walletNum,
  received,
  paySistemTitle,
  requisites,
  requisitesNumber,
  buyValuta,
  buyValutaName,
  extraFees,
}) => {
  const DashedLine = (
    <View
      style={{
        width: 281,
        marginTop: 15,
        borderRadius: 1,
        borderBottomWidth: 1,
        height: 1,
        borderColor: 'white',
      }}
    />
  );
  return (
    <View style={{marginTop: 71, alignSelf: 'center'}}>
      <CheckList />
      <View style={{position: 'absolute', paddingHorizontal: 22}}>
        <Text
          style={{
            color: 'white',
            marginTop: 24,
            alignSelf: 'center',
            fontWeight: '700',
            fontSize: 18,
          }}>
          {title}
        </Text>
        {DashedLine}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Text style={{color: 'white', fontSize: 15}}>Дата</Text>
          <Text style={{color: 'white', fontSize: 15}}>{date}</Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 9,
            }}>
            <Text style={{color: 'white', fontSize: 15}}>Сумма</Text>
            <Text style={{color: 'white', fontSize: 15}}>{summa}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 9,
              display: summValuta == '' ? 'none' : 'flex',
            }}>
            <Text style={{color: 'white', fontSize: 15}}>Сумма в валюте</Text>
            <Text style={{color: 'white', fontSize: 15}}>{summValuta}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 9,
              display: commission == '' ? 'none' : 'flex',
            }}>
            <Text style={{color: 'white', fontSize: 15}}>Наша комиссия</Text>
            <Text style={{color: 'white', fontSize: 15}}>{commission}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 9,
              display: systemCommission == '' ? 'none' : 'flex',
            }}>
            <Text style={{color: 'white', fontSize: 15}}>Комиссия системы</Text>
            <Text style={{color: 'white', fontSize: 15}}>
              {systemCommission}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 9,
              display: extraFees == '' ? 'none' : 'flex',
            }}>
            <Text style={{color: 'white', fontSize: 15}}>Доп. комиссия</Text>
            <Text style={{color: 'white', fontSize: 15}}>{extraFees}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 9,
              display: valuta == '' ? 'none' : 'flex',
            }}>
            <Text style={{color: 'white', fontSize: 15}}>Валюта</Text>
            <Text style={{color: 'white', fontSize: 15}}>{valuta}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 9,
              marginBottom: 5,
              display: paySistem == '' ? 'none' : 'flex',
            }}>
            <Text style={{color: 'white', fontSize: 15}}>
              Платёжная система
            </Text>
            <Text style={{color: 'white', fontSize: 15}}>{paySistem}</Text>
          </View>
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              marginTop: 9,
              display: walletNum === '' ? 'none' : 'flex',
            }}>
            Реквизит:
          </Text>
          <TextInput
            value={walletNum}
            editable={true}
            numberOfLines={1}
            scrollEnabled
            style={{
              width: 280,
              zIndex: 1,
              height: 44,
              backgroundColor: 'rgba(84, 88, 103, 1)',
              borderRadius: 10,
              paddingHorizontal: 20,
              marginTop: 10,
              color: 'white',
              display: walletNum === '' ? 'none' : 'flex',
            }}
          />
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              marginTop: 9,
              marginBottom: 5,
              display: receipt == '' ? 'none' : 'flex',
            }}>
            Номер квитанции:
          </Text>
          <TextInput
            value={receipt}
            numberOfLines={1}
            scrollEnabled
            editable={true}
            style={{
              width: 280,
              zIndex: 1,
              height: 44,
              backgroundColor: 'rgba(84, 88, 103, 1)',
              borderRadius: 10,
              paddingHorizontal: 20,
              marginTop: 10,
              color: 'white',
              display: receipt == '' ? 'none' : 'flex',
            }}
          />
        </View>
        {DashedLine}
        {/*     <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 16,
                }}>
                <Text style={{color: 'white', fontSize: 15}}>Поступило</Text>
                <Text
                  style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                  Поступило
                </Text>
              </View> */}
      </View>
    </View>
  );
};

export default CheckTamplate;
