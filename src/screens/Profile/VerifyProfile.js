import React, {useState} from 'react';
import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import {ArrowLeft, FilterIcon, NotVerifyIcon, VerifyIcon} from '../Svg';
import Toast from 'react-native-toast-message';
import config from '../../api/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastShow} from '../components/TosterShow';
import DatePicker from 'react-native-datepicker';
import {useSelector} from 'react-redux';
import {appAxios} from '../../api/axios';

const VerifyProfile = ({navigation}) => {
  const {token} = useSelector(store => store.appReducer);

  // ------------------------------------

  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [IDnumber, setIDnumber] = useState('');
  const [INN, setINN] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [documentID, setDocumentID] = useState([]);
  const [addressDocument, setAddressDocument] = useState([]);
  const [disableButton, setDisableButton] = useState(false);
  // ------------------------Send Data Start------------------------
  const SendData = async () => {
    // --------------------------
    if (name === '') {
      ToastShow('Введите имя!');
      setDisableButton(false);
      // -------------------------
    } else if (birthday === '') {
      ToastShow('Введите дату рождения!');
      setDisableButton(false);
      // -------------------------
    } else if (IDnumber === '') {
      ToastShow('Введите номер паспорта!');
      setDisableButton(false);
      // -------------------------
    } else if ((INN === '', INN.length < 14)) {
      ToastShow('Введите ИНН!');
      setDisableButton(false);
      // -------------------------
    } else if (country === '') {
      ToastShow('Введите страну!');
      setDisableButton(false);
      // -------------------------
    } else if (city === '') {
      ToastShow('Введите город!');
      setDisableButton(false);
      // -------------------------
    } else if (address === '') {
      ToastShow('Введите адрес!');
      setDisableButton(false);
      // -------------------------
    } else if (documentID.length === 0) {
      ToastShow('Выберите документ, удостоверяющий личность!', 1000);
      setDisableButton(false);
      // -------------------------
    } else if (addressDocument.length === 0) {
      ToastShow('Выберите документ, подтверждающий адрес проживания!', 1000);
      setDisableButton(false);
      // -------------------------
    } else {
      setDisableButton(true);

      // ------------------------------------------------
      const data = new FormData();
      data.append('fullname', name);
      data.append('date_birth', birthday);
      data.append('password_number', IDnumber);
      data.append('inn', INN);
      data.append('country', country);
      data.append('city', city);
      data.append('address', address);

      data.append('personal_photo', {
        name: documentID.fileName,
        type: documentID.type,
        uri: documentID.uri,
      });
      data.append('living_info_photo', {
        name: addressDocument.fileName,
        type: addressDocument.type,
        uri: addressDocument.uri,
      });
      // ------------------------------------------------
      const tokenLocal = await AsyncStorage.getItem('Token');
      if (tokenLocal !== null) {
        appAxios
          .post('user/verification', data, {
            headers: {
              authorization: tokenLocal || token,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(({data, ...res}) => {
            console.log(JSON.stringify(data));
            if (data.result === 1) {
              ToastShow(data.message, 900, 'success');
              setTimeout(() => {
                navigation.goBack();
              }, 1000); // setName(''),
              //   setBirthday(''),
              //   setIDnumber(''),
              //   setINN(''),
              //   setCountry(''),
              //   setCity(''),
              //   setAddress(''),
              //   setDocumentID([]),
              //   setAddressDocument([]);
            } else {
              Alert.alert(data.message);
            }
          })
          .catch(err => {
            console.log('error: ', err);
          });
      }
    }
  };
  // -------------------------Send Data End-------------------------
  const back = useNavigation();
  // ------------------------------------
  const DocumentIDPick = () => {
    launchImageLibrary(
      {maxWidth: 1200, maxHeight: 800, mediaType: 'photo'},
      res => {
        try {
          setDocumentID(res.assets[0]);
        } catch (e) {
          console.log(e);
        }
      },
    );
  };
  const addressDocumentPick = () => {
    launchImageLibrary(
      {maxWidth: 1200, maxHeight: 800, mediaType: 'photo'},
      res => {
        try {
          setAddressDocument(res.assets[0]);
        } catch (e) {
          console.log(e);
        }
      },
    );
  };
  // ------------------------------------
  const [modalVisible, setModalVisible] = useState(false);
  const ModalWindow = (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 3, y: 1}}
      colors={['#5E6273', '#20222A', '#C4C4C4']}
      style={{
        alignSelf: 'center',
        width: 308,
        marginTop: 90,
        margin: 20,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.9)',
      }}>
      <View style={{}}>
        <View style={{alignSelf: 'flex-end', marginTop: 15, marginRight: 15}}>
          <NotVerifyIcon />
        </View>
        <Text
          style={{
            lineHeight: 17,
            textAlign: 'left',
            marginTop: 10,
            marginHorizontal: 25,
            color: 'white',
          }}>
          {`Идентификация счета необходима для предотвращения случаев мошенничества, противодействия отмыванию средств и финансирования терроризма.\n\n\n- В поле «документ, удостоверяющий \nличность» загрузите сканированную копию или фото внутреннего или загран паспорта, водительское удостоверение, военный билет.\n\n\n - В поле «документ, подтверждающий адрес проживания» загрузите сканированную копию \nили фото страницы прописки в паспорте \n (только если в качестве документа подтверждающего личность вы загрузили внутренний паспорт), либо любой официальный документ с печатью и адресом проживания на котором указаны ваши данные.`}
        </Text>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Text
            style={{
              fontSize: 12,
              alignSelf: 'flex-end',
              color: 'white',
              marginTop: 21,
              marginRight: 24,
              marginBottom: 24,
            }}>
            Прочитал
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'rgba(32,34,42,1)',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          {ModalWindow}
        </Modal>
        <Toast style={{zIndex: 1}} ref={ref => Toast.setRef(ref)} />
        <View style={{paddingHorizontal: 28}}>
          <View
            style={{
              marginTop: 30,
              marginBottom: 52,
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => back.goBack()}
              style={{width: 50, height: 50}}>
              <ArrowLeft />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <VerifyIcon />
            </TouchableOpacity>
          </View>
          <Text style={{color: 'white', fontWeight: '600'}}>
            ПЕРСОНАЛЬНЫЕ ДАННЫЕ
          </Text>
          <TextInput
            placeholder="ФИО"
            value={name}
            onChangeText={setName}
            placeholderTextColor="rgb(126, 133,152)"
            style={styles.TextInputStyle}
          />
          <DatePicker
            format="DD-MM-YYYY"
            date={birthday}
            onDateChange={setBirthday}
            androidMode="spinner"
            customStyles={{
              dateIcon: {
                display: 'none',
              },
              dateInput: {
                borderWidth: 0,
              },
              dateText: {color: 'white', alignSelf: 'flex-start'},
            }}
            style={styles.datePick}
          />
          <TextInput
            placeholder="Номер паспорта"
            value={IDnumber}
            onChangeText={setIDnumber}
            placeholderTextColor="rgb(126, 133,152)"
            style={styles.TextInputStyle}
          />
          <TextInput
            placeholder="ИНН"
            keyboardType="number-pad"
            value={INN}
            onChangeText={setINN}
            maxLength={14}
            placeholderTextColor="rgb(126, 133,152)"
            style={styles.TextInputStyle}
          />
          <Text
            style={{
              color: 'white',
              marginTop: 35,
              marginLeft: 5,
              fontWeight: '600',
            }}>
            АДРЕС ПРОЖИВАНИЯ
          </Text>
          <TextInput
            placeholder="Страна"
            value={country}
            onChangeText={setCountry}
            placeholderTextColor="rgb(126, 133,152)"
            style={styles.TextInputStyle}
          />
          <TextInput
            placeholder="Город"
            value={city}
            onChangeText={setCity}
            placeholderTextColor="rgb(126, 133,152)"
            style={styles.TextInputStyle}
          />
          <TextInput
            placeholder="Адрес"
            value={address}
            onChangeText={setAddress}
            placeholderTextColor="rgb(126, 133,152)"
            style={styles.TextInputStyle}
          />
          <TouchableOpacity onPress={DocumentIDPick}>
            <LinearGradient
              start={{x: 0, y: 2}}
              end={{x: 2, y: 0}}
              colors={['#0bd061', '#05d287', '#fff', '#0039e6']}
              style={{
                width: '100%',
                height: 49,
                marginTop: 50,
                backgroundColor: '#0039E6',
                borderRadius: 20,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 16,
                  alignSelf: 'center',
                  color: 'white',
                }}>
                {documentID.fileName || 'Документ, удостоверяющий личность'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={addressDocumentPick}>
            <LinearGradient
              start={{x: 0, y: 2}}
              end={{x: 2, y: 0}}
              colors={['#0bd061', '#05d287', '#fff', '#0039e6']}
              style={{
                width: '100%',
                height: 49,
                alignItems: 'center',
                marginTop: 24,
                backgroundColor: '#0039E6',
                borderRadius: 20,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 16,
                  alignSelf: 'center',
                  color: 'white',
                }}>
                {addressDocument.fileName ||
                  'Документ, подтверждающий адрес\n                         проживания'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={SendData}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 2, y: 0}}
              colors={[
                disableButton ? 'rgba(7,108,188,1)' : 'rgba(7,108,188,0)',
                disableButton ? 'rgba(3,149,208,1)' : 'rgba(3,149,208,0)',
                disableButton ? 'rgba(0,57,230,1)' : 'rgba(0,57,230,0)',
              ]}
              style={{
                alignSelf: 'center',
                width: '100%',
                height: 49,
                marginTop: 40,
                marginBottom: 30,
                // backgroundColor: disableButton
                //   ? 'rgba(0,57,230,0)'
                //   : 'rgba(0,57,230,1)',
                borderRadius: 10,
                borderColor: disableButton ? 'rgba(7,108,188,0)' : 'white',
                borderWidth: 1,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 16,
                  alignSelf: 'center',
                  color: 'white',
                }}>
                ОТПРАВИТЬ НА ПРОВЕРКУ
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyProfile;
const styles = StyleSheet.create({
  TextInputStyle: {
    backgroundColor: 'rgb(39, 45, 63)',
    borderRadius: 20,
    marginTop: 25,
    color: 'white',
    paddingLeft: 20,
  },
  datePick: {
    width: '100%',
    backgroundColor: 'rgb(39, 45, 63)',
    borderRadius: 20,
    marginTop: 25,
    paddingLeft: 20,
    height: 50,
    justifyContent: 'center',
  },
});
