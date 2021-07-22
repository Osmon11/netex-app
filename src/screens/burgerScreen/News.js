import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import moment from 'moment';

import {NewsData} from '../../store/action';
import {ArrowLeft} from '../Svg';
import config from '../../api/config';

const News = ({navigation}) => {
  const dispatch = useDispatch();
  const [News, setNews] = useState([]);
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    setIsLoad(true);
    fetch(config.BASE_URL + 'news', {
      method: 'GET',
      headers: {},
    })
      .then(response => response.json())
      .then(res => {
        setNews(res.data.news);
      });
    setIsLoad(false);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'rgba(32,34,42,1)',
      }}>
      <TouchableOpacity
        style={{
          marginVertical: 30,
          marginLeft: 28,
        }}
        onPress={() => navigation.goBack()}>
        <ArrowLeft />
      </TouchableOpacity>
      <ScrollView>
        <View style={{paddingHorizontal: 28, paddingBottom: 30}}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="rgba(32,34,42,1)"
          />
          <Text
            style={{
              color: 'white',
              fontWeight: '700',
              marginVertical: 23,
            }}>
            НОВОСТИ
          </Text>
          {isLoad ? (
            <ActivityIndicator size="large" color="#FFF" />
          ) : (
            News.map((item, key) => {
              return (
                <View key={key}>
                  <TouchableOpacity
                    key={key}
                    onPress={() => {
                      dispatch(NewsData(item));
                      navigation.navigate('NewsComponent');
                    }}>
                    <Image
                      style={{
                        marginVertical: 10,
                        width: '100%',
                        alignSelf: 'center',
                        height: 230,
                        borderRadius: 10,
                      }}
                      source={{uri: item.preview}}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          // flex: 0.5,
                          width: '70%',
                          fontWeight: '700',
                          fontSize: 16,
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          color: 'rgba(255,255,255,0.5)',
                          fontSize: 12,
                          alignSelf: 'center',
                          marginBottom: 50,
                        }}>
                        {moment.unix(item.date_creation).format('MM.DD.YYYY')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default News;
