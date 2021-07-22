import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {Rect, Text as TextSVG, Svg} from 'react-native-svg';
import moment from 'moment';

const weekDays = {
  Mon: 'Понедельник',
  Tue: 'Вторник',
  Wed: 'Среда',
  Thu: 'Четверг',
  Fri: 'Пятница',
  Sat: 'Суббота',
  Sun: 'Воскресенье',
};

const weekDays2 = {
  Mon: 'Пн',
  Tue: 'Вт',
  Wed: 'Ср',
  Thu: 'Чт',
  Fri: 'Пт',
  Sat: 'Сб',
  Sun: 'Вск',
};

function convertToDateObj(time) {
  let date = new Date(new Date().getTime() - time).toUTCString().split(' ');
  return `${weekDays[date[0].substr(0, 3)]} ${date[4].substr(0, 5)}`;
}

const Graphic = () => {
  const [active, setActive] = useState('7д');
  const {currentRate} = useSelector(store => store.appReducer);
  // let Data = [
  //   {id: 0, text: '1д'},
  //   {id: 1, text: '7д'},
  //   {id: 2, text: '1м'},
  //   {id: 3, text: '3м'},
  //   {id: 4, text: '1г'},
  //   {id: 5, text: 'Всё'},
  // ];
  let [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });
  return (
    <SafeAreaView>
      {/* <FlatList
        data={Data}
        horizontal={true}
        keyExtractor={item => `${item.id}`}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => setActive(item.text)}>
            <View
              style={{
                width: 40,
                height: 25,
                borderRadius: 20,
                backgroundColor:
                  active === item.text
                    ? 'rgba(185, 193, 217, 1)'
                    : 'rgba(39,45,63,1)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10.5,
                marginBottom: 20,
              }}>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 12,
                  color:
                    active === item.text
                      ? 'rgba(39, 45, 63, 1)'
                      : 'rgba(185,193,217,1)',
                }}>
                {item.text}
              </Text>
            </View>
          </TouchableOpacity>
        )}/>*/}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{marginTop: 20, marginHorizontal: 10}}>
          <LineChart
            // renderDotContent={<View style={{backgroundColor: 'red'}}></View>}
            // // <View>
            // {"dataset": {"data": [100, 110, 90, 130, 80, 103]}, "getColor": [Function getColor], "index": 3, "value": 130, "x": 237.7142857142857, "y": 16}
            bezier
            verticalLabelRotation={0}
            data={{
              labels: [''],
              //  currentRate.data.date.map(
              //   item =>
              //     // moment.unix(item).format('H:i:s'),
              //     weekDays2[
              //       new Date(new Date().getTime() - item)
              //         .toUTCString()
              //         .split(' ')[0]
              //         .substr(0, 3)
              //     ],
              // ),
              datasets: [
                {
                  data: currentRate.data.rates,
                  color: () => `#f27171`, // optional
                  // legendFontSize: 15
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
              decimalPlaces: 2,
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
