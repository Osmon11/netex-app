import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  FilterConclusionActive,
  FilterReplenishActive,
  FilterReplenishInActive,
  FilterConclusionInActive,
  FilterBuyActive,
  FilterBuyInActive,
  FilterSellActive,
  FilterSellInActive,
} from '../Svg';

const Filter2 = ({setOption}) => {
  const [status, setStatus] = useState('Пополнение');
  // ----------------------------------------------------
  const setStatusFilter = status => {
    setStatus(status);
  };

  const listTab = [
    {
      id: 1,
      name: 'Пополнение',
      iconActive: <FilterReplenishActive />,
      iconInActive: <FilterReplenishInActive />,
    },
    {
      id: 4,
      name: 'Вывод',
      iconActive: <FilterConclusionActive />,
      iconInActive: <FilterConclusionInActive />,
    },
    {
      id: 2,
      name: 'Покупка',
      iconActive: <FilterBuyActive />,
      iconInActive: <FilterBuyInActive />,
    },
    {
      id: 3,
      name: 'Продажа',
      iconActive: <FilterSellActive />,
      iconInActive: <FilterSellInActive />,
    },
  ];

  return (
    <SafeAreaView>
      <View
        style={{
          marginTop: 43,
          width: '90%',
          height: 80,
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: 'rgba(59, 64, 81, 1)',
          borderRadius: 10,
          alignSelf: 'center',
        }}>
        {listTab.map((e, key) => (
          <TouchableOpacity
            key={key}
            style={
              status === e.name
                ? {
                    width: '25%',
                    shadowColor: 'black',
                    shadowOpacity: 20,
                    shadowRadius: 20,
                    elevation: 0.1,
                    shadowOffset: {height: 2, width: 0},
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRightWidth: e.name === 'Продажа' ? 0 : 0.25,
                    borderRightColor: 'rgba(0,0,0,0.5)',
                  }
                : {
                    width: '25%',
                    backgroundColor: 'rgba(0,0,0,0)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRightWidth: e.name === 'Продажа' ? 0 : 0.25,
                    borderRightColor: 'rgba(0,0,0,0.5)',
                  }
            }
            onPress={() => {
              setStatusFilter(e.name);
              setOption(e.id);
              // console.log(e.name);
            }}>
            {status === e.name ? e.iconActive : e.iconInActive}

            <Text
              style={
                status === e.name
                  ? {marginTop: 8, fontSize: 12, color: 'rgb(202,202,202)'}
                  : {marginTop: 8, fontSize: 12, color: 'rgb(100,106,124)'}
              }>
              {e.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Filter2;
