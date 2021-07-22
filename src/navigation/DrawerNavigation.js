import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomBarNavigation from './BottomBarNavigation';
import SplashScreenComponent from '../screens/components/SplashScreen';
import NewsComponent from '../screens/components/NewsComponent';
import LoginNavigation from './LoginNavigation';
import AllCryptoval from '../screens/Balance/AllCryptoval';
import History from '../screens/burgerScreen/HistoryPage';
import Support from '../screens/burgerScreen/Support';
import About from '../screens/burgerScreen/About';
import Faq from '../screens/burgerScreen/Faq';
import News from '../screens/burgerScreen/News';
import Filter from '../screens/burgerScreen/Filter';
import Filter2 from '../screens/burgerScreen/Filter2';
import ConclusionCheck from '../screens/burgerScreen/Cheks/ConclusionCheck';
import BuyCheck from '../screens/burgerScreen/Cheks/BuyCheck';
import ReplenishCheck from '../screens/burgerScreen/Cheks/ReplenishCheck';
import SellCheck from '../screens/burgerScreen/Cheks/SellCheck';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Telegram,
  Whatsapp,
  Instagram,
  KurseValIcon,
  HistoryIcon,
  AboutIcon,
  FaqIcon,
  NewsIcon,
  ExitIcon,
  SupportIcon,
  WithdrawIcon,
  SellIcon,
  BuyMenuIcon,
  XForIos,
} from '../screens/Svg';
import config from '../api/config';
import {appAxios} from '../api/axios';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllWallets,
  getWallets,
  saveAllRates,
  saveRates,
  saveToken,
  saveUserData,
} from '../store/action';
import Confirm from '../screens/components/Confirm';
import {loader} from '../screens/components/FullLoader';
import ConfirmBuy from '../screens/Buy/ConfirmBuy';
import ConfirmSell from '../screens/Buy/ConfirmSell';
import ConfirmWithdraw from '../screens/Buy/ConfirmWithdraw';
export default DrawerNavigation = nav => {
  const Drawer = createDrawerNavigator();
  // -------------------------------------------------
  // |                 Start Drawer                  |
  // -------------------------------------------------
  const DrawerContent = props => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const {userData, token} = useSelector(store => store.appReducer);
    useEffect(() => {
      setIsLoading(true);
      appAxios
        .get('user/profile', {
          headers: {
            authorization: `Basic ${token}`,
          },
        })
        .then(({data, ...res}) => {
          // console.log(`actions ${JSON.stringify(res)}`);
          dispatch(saveUserData(data.data.user_data));
        })
        .catch(e =>
          e.message === 'Network Error'
            ? Alert.alert(
                'Похоже пропал интернет',
                'Проверьте интернет-соединение',
              )
            : console.log(e),
        );
      setIsLoading(false);
    }, []);
    const Exit = async () => {
      Alert.alert('Внимание!', 'Выйти из приложения?', [
        {
          text: 'Отмена',
          onPress: () => {},
        },
        {
          text: 'Выйти',
          onPress: () => {
            setIsLoading(true);
            // AsyncStorage.removeItem('Token');
            appAxios
              .post(
                'user/logout',
                {},
                {
                  headers: {
                    authorization: `Basic ${token}`,
                  },
                },
              )
              .then(({data, ...res}) => {
                // console.log(`logout**${JSON.stringify(res)}`);
                AsyncStorage.removeItem('Token');
                // remove from db
                dispatch(saveUserData(''));
                dispatch(saveToken(''));
                dispatch(saveAllRates(''));
                dispatch(saveRates(''));
                dispatch(saveUserData(''));
                dispatch(getWallets(''));
                dispatch(getAllWallets(''));

                nav.navigation.replace('Login');
                setIsLoading(false);
              })
              .catch(err => {
                console.log(err);
              });
          },
        },
      ]);
    };
    // ************************************************************************
    const load = <ActivityIndicator size="large" color="#FFF" />;
    return isLoading ? (
      loader
    ) : (
      <DrawerContentScrollView
        showsVerticalScrollIndicator={false}
        {...props}
        style={{
          backgroundColor: 'rgba(50,52,63,1)',
          paddingLeft: 32,
        }}>
        {Platform.OS === 'ios' && (
          <TouchableOpacity
            onPress={() => props.navigation.closeDrawer()}
            style={{
              alignSelf: 'flex-end',
              alignItems: 'center',
              justifyContent: 'center',
              width: 35,
              height: 35,
              marginRight: 5,
            }}>
            <XForIos />
          </TouchableOpacity>
        )}

        <View
          style={{
            marginTop: 32,
            marginBottom: 100,
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
                  {isLoading
                    ? load
                    : `${userData.firstname} ${userData.lastname}`}
                </Text>
                <Text style={styles.verify}>
                  {userData.u_verify === '1'
                    ? 'Не верифицирован'
                    : userData.u_verify === '2'
                    ? 'Верифицирован'
                    : userData.u_verify === '3'
                    ? 'На рассмотрении'
                    : 'Отклонено'}
                </Text>
              </View>
            </View>
          </View>

          <View style={{marginTop: 41}}>
            {/* Start */}
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Buy');
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.iconSize}>
                  <BuyMenuIcon />
                </View>
                <Text style={[styles.sideBarText]}>Купить</Text>
              </View>
            </TouchableOpacity>
            {/* ------ */}
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Sell2');
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.iconSize}>
                  <SellIcon />
                </View>
                <Text style={[styles.sideBarText]}>Продать</Text>
              </View>
            </TouchableOpacity>
            {/* ------ */}
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('WithDraw');
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.iconSize}>
                  <WithdrawIcon />
                </View>
                <Text style={[styles.sideBarText]}>Вывод</Text>
              </View>
            </TouchableOpacity>
            {/* ------ */}
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Курсы валют');
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.iconSize}>
                  <KurseValIcon />
                </View>
                <Text style={styles.sideBarText}>Курсы валют</Text>
              </View>
            </TouchableOpacity>
            {/* ------ */}
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('История');
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.iconSize}>
                  <HistoryIcon />
                </View>
                <Text style={styles.sideBarText}>История операций</Text>
              </View>
            </TouchableOpacity>
            {/* ------ */}
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Поддержка');
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.iconSize}>
                  <SupportIcon />
                </View>
                <Text style={styles.sideBarText}>Поддержка</Text>
              </View>
            </TouchableOpacity>
            {/* ------ */}
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('О приложении');
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.iconSize}>
                  <AboutIcon />
                </View>
                <Text style={styles.sideBarText}>О приложении</Text>
              </View>
            </TouchableOpacity>
            {/* ------ */}
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('faq');
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.iconSize}>
                  <FaqIcon />
                </View>
                <Text style={styles.sideBarText}>FAQ</Text>
              </View>
            </TouchableOpacity>
            {/* ------ */}
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Новости');
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.iconSize}>
                  <NewsIcon />
                </View>
                <Text style={styles.sideBarText}>Новости</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* End */}
        </View>
        <View>
          <Text
            style={{
              color: 'rgba(111,113,126,1)',
              marginBottom: 17,
              marginTop: -30,
            }}>
            Мы в социальных сетях
          </Text>

          <View
            style={{
              flexDirection: 'row',
              display: 'flex',
              alignContent: 'flex-start',
            }}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://t.me/joinchat/AAAAAFUo0Pgi2L_aDD1vFA');
              }}>
              <Telegram />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginLeft: 40, marginRight: 40}}
              onPress={() => {
                Linking.openURL('https://wa.me/996508241111');
              }}>
              <Whatsapp />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.instagram.com/netex.24/');
              }}>
              <Instagram />
            </TouchableOpacity>
          </View>
          {/* ------- */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginTop: 60,
              marginBottom: 30,
            }}
            onPress={Exit}>
            <ExitIcon />
            <Text
              style={{
                marginLeft: 30,
                color: 'rgba(215, 215, 215, 1)',
                fontSize: 18,
              }}>
              Выйти
            </Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    );
  };
  // -------------------------------------------------
  // |                  End Drawer                   |
  // -------------------------------------------------
  return (
    <>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerStyle={{
          width: '90%',
        }}
        drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={BottomBarNavigation} />
        <Drawer.Screen name="Курсы валют" component={AllCryptoval} />
        <Drawer.Screen name="История" component={History} />
        <Drawer.Screen name="Поддержка" component={Support} />
        <Drawer.Screen name="О приложении" component={About} />
        <Drawer.Screen name="faq" component={Faq} />
        <Drawer.Screen name="NewsComponent" component={NewsComponent} />
        <Drawer.Screen name="Новости" component={News} />
        <Drawer.Screen name="Filter" component={Filter} />
        <Drawer.Screen name="Filter2" component={Filter2} />
        <Drawer.Screen name="ConclusionCheck" component={ConclusionCheck} />
        <Drawer.Screen name="BuyCheck" component={BuyCheck} />
        <Drawer.Screen name="ReplenishCheck" component={ReplenishCheck} />
        <Drawer.Screen name="SellCheck" component={SellCheck} />
        <Drawer.Screen name="ConfirmWithdraw" component={ConfirmWithdraw} />
        <Drawer.Screen name="ConfirmBuy" component={ConfirmBuy} />
        <Drawer.Screen name="ConfirmSell" component={ConfirmSell} />
      </Drawer.Navigator>
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
    marginLeft: 15,
    marginBottom: 27,
  },
  iconSize: {width: 24, height: 24},
});
