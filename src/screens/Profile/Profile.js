import React from 'react';
import {
  Image,
  Text,
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import {
  Burger,
  NotVerifyIcon,
  VerifyGreenIcon,
  VerifyWaitIcon,
  VerifyRedIcon,
} from '../Svg';
import {convertToDateObj} from '../burgerScreen/HistoryPage';
import AllHistory from './AllHistory';
import ChangeName from './ChangeName';
import ChangePass from './ChangePass';
import VerifyProfile from './VerifyProfile';
import {load, loader} from '../components/FullLoader';

const Profile = nav => {
  // -------------------------------------------------------------------
  const {userData, UserHistory} = useSelector(store => store.appReducer);
  const drawer = useNavigation();
  // -------------------------------------------------------------------
  function Home({navigation}) {
    return Boolean(!UserHistory) ? (
      loader
    ) : (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'rgba(32,34,42,1)',
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal: 28}}>
            <StatusBar
              barStyle="light-content"
              backgroundColor="rgba(32,34,42,1)"
            />
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
                marginLeft: -15,
                marginBottom: 10,
              }}
              onPress={() => drawer.openDrawer()}>
              <Burger />
            </TouchableOpacity>
            <Content />
          </View>
        </ScrollView>
      </SafeAreaView>
    );

    function Content() {
      const verifyText =
        userData.u_verify === '1'
          ? 'Не верифицирован'
          : userData.u_verify === '2'
          ? 'Верифицирован'
          : userData.u_verify === '3'
          ? 'На рассмотрении'
          : 'Отклонено';

      const verifyIcon =
        userData.u_verify === '1' ? (
          <VerifyRedIcon />
        ) : userData.u_verify === '2' ? (
          <VerifyGreenIcon />
        ) : userData.u_verify === '3' ? (
          <VerifyWaitIcon />
        ) : (
          <NotVerifyIcon />
        );

      return (
        <View>
          <View>
            <Text style={{color: 'white', fontWeight: '600'}}>
              ЛИЧНЫЙ КАБИНЕТ
            </Text>
            <View
              style={{
                backgroundColor: 'rgb(39,45,63)',
                borderRadius: 20,
                paddingLeft: 20,
                paddingTop: 20,
                paddingBottom: 13,
                marginTop: 30,
              }}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  {
                    <Image
                      style={{
                        alignSelf: 'center',
                        width: 65,
                        height: 65,
                        borderRadius: 2,
                      }}
                      source={{
                        uri: `${
                          userData.photo === 'https://netex.kg/uploads/users/'
                            ? userData.photo + 'default.jpg'
                            : userData.photo
                        }`,
                      }}
                    />
                  }

                  <View>
                    <Text style={styles.name}>
                      {Boolean(!userData)
                        ? load
                        : `${userData.firstname} ${userData.lastname}`}
                    </Text>
                    <Text style={styles.verify}>{verifyText}</Text>
                  </View>
                </View>
              </View>
              <View style={{marginTop: 24}}>
                <View style={{marginBottom: 10, flexDirection: 'row'}}>
                  <Image
                    style={{
                      width: 16,
                      height: 16,
                      alignSelf: 'center',
                      marginRight: 15,
                    }}
                    source={require('../../assets/phone.png')}
                  />
                  <View>
                    <Text style={{color: 'white'}}>
                      {userData.phone === null ? '-' : userData.phone}
                    </Text>
                    <Text
                      style={{
                        color: 'rgba(255,255,255,0.5)',
                      }}>
                      Номер телефона
                    </Text>
                  </View>
                </View>
                <View style={{marginBottom: 10, flexDirection: 'row'}}>
                  <Image
                    style={{
                      width: 16,
                      height: 16,
                      alignSelf: 'center',
                      marginRight: 15,
                    }}
                    source={require('../../assets/email.png')}
                  />
                  <View>
                    <Text style={{color: 'white'}}>{userData.email}</Text>

                    <Text
                      style={{
                        color: 'rgba(255,255,255,0.5)',
                      }}>
                      Электронная почта
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('ChangeName')}
                style={{
                  backgroundColor: 'rgb(45,55,82)',
                  borderRadius: 10,
                  marginTop: 21,
                  width: '50%',
                  paddingVertical: 10,
                  alignSelf: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                  marginLeft: -15,
                }}>
                <Text style={{color: 'white'}}>Изменить</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                backgroundColor: 'rgb(39,45,63)',
                borderRadius: 20,
                paddingLeft: 20,
                paddingTop: 24,
                paddingRight: 15,
                paddingBottom: 23,
                marginTop: 30,
              }}>
              {Boolean(
                UserHistory.filter(item => item.type === '5')[0]?.date,
              ) && (
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 30,
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: 'white'}}>Пароль был изменен</Text>
                  <Text style={{color: 'white'}}>
                    {moment
                      .unix(
                        UserHistory.filter(item => item.type === '5')[0]?.date,
                      )
                      .format('DD.MM.YYYY')}
                  </Text>
                </View>
              )}
              <TouchableOpacity
                onPress={() => navigation.navigate('ChangePass')}
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                  width: '51%',
                  borderRadius: 10,
                  paddingVertical: 10,
                  backgroundColor: 'rgb(45,55,82)',
                }}>
                <Text style={{color: 'white', alignSelf: 'center'}}>
                  Изменить пароль
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: 'rgb(39,45,63)',
                paddingBottom: 23,
                borderRadius: 20,
                alignItems: 'center',
                marginTop: 30,
                paddingVertical: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  borderRadius: 10,
                  borderColor: 'rgba(255,255,255,0.45)',
                  paddingVertical: 10,
                  paddingHorizontal: 25,
                }}>
                <Text
                  style={{
                    color: 'white',
                    marginRight: 10,
                    alignSelf: 'center',
                  }}>
                  {verifyText}
                </Text>
                {verifyIcon}
              </View>
              <TouchableOpacity
                style={{
                  display:
                    userData.u_verify === '1'
                      ? 'flex'
                      : userData.u_verify === '4'
                      ? 'flex'
                      : 'none',
                }}
                onPress={() => {
                  navigation.navigate('VerifyProfile');
                }}>
                <LinearGradient
                  start={{x: 2, y: 6.5}}
                  end={{x: 3, y: 0}}
                  colors={[
                    'rgba(11,208,97,1)',
                    'rgba(5,210,135,1)',
                    'rgba(0,57,230,1)',
                  ]}
                  style={{
                    alignSelf: 'center',
                    paddingVertical: 5,
                    paddingHorizontal: 25,
                    height: 49,
                    marginTop: 24,
                    backgroundColor: 'rgba(0,57,230,1)',
                    borderRadius: 10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 16,
                      alignSelf: 'center',
                      color: 'white',
                    }}>
                    ВЕРИФИЦИРОВАТЬ
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <Text style={{marginTop: 30, color: 'white', fontWeight: '500'}}>
              ИСТОРИЯ АККАУНТА
            </Text>
          </View>
          {/* --------------------------------------------------------------------------------------- */}
          <View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 38,
                paddingBottom: 15,
                borderBottomColor: 'rgba(112, 118, 135, 1)',
                borderBottomWidth: 1,
              }}>
              <Text
                style={{
                  color: 'rgb(112, 118, 135)',
                  fontSize: 10,
                  width: '30%',
                }}>
                Дата
              </Text>
              <Text
                style={{
                  color: 'rgb(112, 118, 135)',
                  fontSize: 10,
                  width: '40%',
                }}>
                Действие
              </Text>
              <Text
                style={{
                  color: 'rgb(112, 118, 135)',
                  fontSize: 10,
                  width: '20%',
                }}>
                IP адрес
              </Text>
            </View>
            {UserHistory?.slice(0, 3).map((item, index) => {
              return (
                <View key={index}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 15,
                    }}>
                    <Text style={[styles.AllHistoryText, {width: '30%'}]}>
                      {moment.unix(item.date).format('DD.MM.YYYY HH:mm')}
                    </Text>
                    <Text style={[styles.AllHistoryText, {width: '40%'}]}>
                      {item.name}
                    </Text>
                    <Text style={[styles.AllHistoryText, {textAlign: 'left'}]}>
                      {item.ip}
                    </Text>
                  </View>
                </View>
              );
            })}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AllHistory');
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 2, y: 0}}
                colors={['#076cbc', '#0395d0', '#0039e6']}
                style={{
                  height: 49,
                  width: 150,
                  alignSelf: 'center',
                  alignItems: 'center',
                  marginTop: 48,
                  marginBottom: 75,
                  backgroundColor: '#0039E6',
                  borderRadius: 10,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 16,
                    alignSelf: 'center',
                    color: 'white',
                  }}>
                  ВСЯ ИСТОРИЯ
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
  const Stack = createStackNavigator();

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ChangeName" component={ChangeName} />
        <Stack.Screen name="ChangePass" component={ChangePass} />
        <Stack.Screen name="AllHistory" component={AllHistory} />
        <Stack.Screen name="VerifyProfile" component={VerifyProfile} />
      </Stack.Navigator>
    </>
  );
};
const styles = StyleSheet.create({
  verify: {
    color: 'rgba(111, 113, 126, 1)',
    fontSize: 12,
    marginLeft: 15,
  },
  name: {
    color: 'rgba(215, 215, 215, 1)',
    fontSize: 18,
    marginVertical: 7,
    marginLeft: 15,
  },
  sideBarText: {
    color: 'rgba(215, 215, 215, 1)',
    fontSize: 18,
    marginLeft: 26,
    marginBottom: 27,
  },
  AllHistoryText: {
    color: 'rgb(112, 118, 135)',
    fontSize: 10,
  },
});
export default Profile;
