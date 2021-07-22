import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import {Tabs} from 'react-native-collapsible-tab-view';
import {DownArrow2, UppArrow} from '../Svg';
import * as Animatable from 'react-native-animatable';
import config from '../../api/config';
import {useDispatch, useSelector} from 'react-redux';
import {appAxios} from '../../api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFAQ} from '../../store/action';
const HEADER_HEIGHT = 250;

const AccordionView = () => {
  const dispatch = useDispatch();
  const [questionsApi, setQuestionsApi] = useState('');
  const [active, setActive] = useState('Общие вопросы');
  const {questions} = useSelector(store => store.appReducer);

  useEffect(async () => {
    const tokenLocal = await AsyncStorage.getItem('Token');

    if (!Boolean(questions)) {
      appAxios
        .get('faq', {
          headers: {
            authorization: `Basic ${tokenLocal || token}`,
          },
        })
        .then(({data, ...res}) => {
          // console.log(`FAQ** ${JSON.stringify(data.data)}`);
          dispatch(getFAQ(data.data));
        })
        .catch(e => console.log(e));
    }
  });

  const _renderSectionTitle = section => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  const _renderHeader = (section, isActive, inActive) => {
    return (
      <Animatable.View
        duration={300}
        transition="backgroundColor"
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(32,34,42,1)',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            lineHeight: 20,
            maxWidth: '90%',
            alignSelf: 'center',
          }}>
          {section.question}
        </Text>
        <View style={{marginVertical: 15, alignSelf: 'flex-start'}}>
          {inActive ? <UppArrow /> : <DownArrow2 />}
        </View>
      </Animatable.View>
    );
  };

  const _renderContent = section => {
    return (
      <View style={{}}>
        <Text
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: 14,
            lineHeight: 16,
            marginTop: 10,
            paddingBottom: 10,
          }}>
          {section.answer}
        </Text>
      </View>
    );
  };

  _updateSections = activeSections => {
    // console.log(activeSections);
    setQuestionsApi(activeSections);
  };

  return questions ? (
    <View style={{paddingBottom: 30}}>
      {/* {/ <Text style={{color: 'white'}}>{faqData.map(item => item.name)}</Text> /} */}

      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginTop: 30,
          marginBottom: 50,
        }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Object.keys(questions).map(tab => (
            <TouchableOpacity onPress={() => setActive(tab)}>
              <Text
                style={{
                  color: active === tab ? 'white' : 'rgba(255,255,255,0.5)',
                  fontWeight: active === tab ? '700' : 'normal',
                  textTransform: active === tab ? 'uppercase' : 'lowercase',
                  fontSize: 18,
                  marginRight: 10,
                }}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Accordion
        sections={questions[active].faqs}
        activeSections={questionsApi}
        renderSectionTitle={_renderSectionTitle}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={this._updateSections}
      />
    </View>
  ) : (
    <ActivityIndicator size="large" color="#FFF" />
  );
};

const styles = StyleSheet.create({
  box: {
    height: 250,
    width: '100%',
  },
  boxA: {
    backgroundColor: 'white',
  },
  boxB: {
    backgroundColor: '#D8D8D8',
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: '#2196f3',
  },
});
export default AccordionView;
