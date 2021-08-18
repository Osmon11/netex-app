import React, {useState} from 'react';
import {Dimensions, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

const Graphic = () => {
  const {currentRate} = useSelector(store => store.appReducer);
  let [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });
  return (
    <SafeAreaView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{marginTop: 20, marginHorizontal: 10}}>
          <LineChart
            bezier
            verticalLabelRotation={0}
            data={{
              labels: [''],

              datasets: [
                {
                  data: currentRate.data.rates,
                  color: () => '#f27171',
                },
              ],
            }}
            decorator={() => {
              return tooltipPos.visible ? (
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 3, y: 1}}
                  colors={[
                    'rgba(94,98,115,0.5)',
                    'rgba(32,34,42,0.5)',
                    'rgba(196,196,196,0.5)',
                  ]}
                  style={{
                    alignSelf: 'center',
                    width: 125,
                    position: 'absolute',
                    borderRadius: 10,
                    left: tooltipPos.x,
                    top: tooltipPos.y + 5,
                    height: 60,
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: 'rgba(196, 196, 196, 0.36)',
                  }}>
                  <View style={{}}>
                    <Text style={{color: 'white'}}>
                      {moment
                        .unix(
                          currentRate.data.date[
                            currentRate.data.rates.indexOf(tooltipPos.value)
                          ],
                        )
                        .format('HH:mm')}
                    </Text>
                    <Text style={{color: 'white'}}>
                      Курс: ${tooltipPos.value}
                    </Text>
                  </View>
                </LinearGradient>
              ) : null;
            }}
            onDataPointClick={data => {
              let isSamePoint =
                tooltipPos.x === data.x && tooltipPos.y === data.y;

              isSamePoint
                ? setTooltipPos(previousState => {
                    return {
                      ...previousState,
                      value: data.value,
                      visible: !previousState.visible,
                    };
                  })
                : setTooltipPos({
                    x: data.x,
                    value: data.value,
                    y: data.y,
                    visible: true,
                  });
            }}
            height={220}
            width={Dimensions.get('window').width}
            // onDayPress={() => {}}
            segments={3}
            // withDots={false}
            withOuterLines={true}
            chartConfig={{
              backgroundGradientFrom: 'rgba(0,0,0,0.0)',
              backgroundGradientTo: 'rgba(0,0,0,0.0)',
              decimalPlaces: 1,
              backgroundGradientFromOpacity: 0,
              backgroundGradientToOpacity: 0,

              color: (opacity = 0) => `rgba(255,0,0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(185,193,217, ${opacity})`,
              strokeWidth: 1.5, // optional, default 3
              barPercentage: 2,
              useShadowColorFromDataset: true, // optional
              // propsForDots: {

              //   r: '6',
              //   strokeWidth: '2',
              //   stroke: '#ffa726',
              // },
            }}
            style={{alignSelf: 'center'}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Graphic;
