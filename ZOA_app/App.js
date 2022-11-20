/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';

import {
  View,
  Text,
  PermissionsAndroid,
  BackHandler,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Linking,
  Platform,
  ToastAndroid,
  Image,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ActionSheet from 'react-native-actions-sheet';
import {selectContactPhone} from 'react-native-select-contact';
import SendIntentAndroid from 'react-native-send-intent';
import NetInfo from '@react-native-community/netinfo';
import LinearGradient from 'react-native-linear-gradient';
import {request, PERMISSIONS, check} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import {useRef, useState, useEffect} from 'react';

const App = () => {
  const [canGoBack, setCanGoBack] = useState(false);
  const [message, setMessage] = useState('');
  const [command, setCommand] = useState('');
  const [connection, toggleConnection] = useState(false);
  const [os, setOs] = useState('');
  const url = {uri: 'https://familyzoa.com'};
  const webViewRef = useRef();
  const actionSheetRef = useRef();

  useEffect(() => {
    const onPress = () => {
      if (canGoBack) {
        // 뒤로 갈 수 있는 상태라면 이전 웹페이지로 이동한다
        webViewRef.current.goBack();
        return true;
      } else {
        return false;
      }
    };

    // 안드로이드 백버튼이 눌렸을 때 이벤트 리스너를 등록한다.
    BackHandler.addEventListener('hardwareBackPress', onPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onPress);
    };

    // iOS 뒤로가기 스와이프에 이벤트 리스너를 등록한다.
  }, [canGoBack]);

  const camOpt = {
    mediaType: 'photo',
    quality: 0.7,
    cameraType: 'back',
    includeBase64: true,
    saveToPhoto: true,
  };

  const gallOpt = {
    mediaType: 'photo',
    quality: 1,
    includeBase64: true,
  };

  const getMessage = async event => {
    console.dir(event);
    if (event.nativeEvent.data.includes(',')) {
      const messages = event.nativeEvent.data.split(',');
      setMessage(messages[0]);
      setCommand(messages[1]);
    } else {
      setMessage(event.nativeEvent.data);
      if (event.nativeEvent.data === 'navigationStateChange') {
        setCanGoBack(event.nativeEvent.canGoBack);
      }
    }
  };

  useEffect(() => {
    console.log(message);
    console.log(command);
    switch (message) {
      case 'imagePicker':
        actionSheetRef.current.show();
        break;
      case 'inviteSMS':
        sendSMS();
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, command]);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: '카메라 사용 권한 요청',
          message:
            '사진을 사용하기 위한 권한이 필요합니다.' +
            '사진을 사용하길 원하면 예를 눌러주세요.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestContactPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: '연락처 사용 권한 요청',
          message:
            '연락처를 사용하기 위한 권한이 필요합니다.' +
            '연락처를 사용하길 원하면 예를 눌러주세요.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getPhotoFromCamera = async () => {
    console.log('camera on');
    if (os === 'ios') {
      request(PERMISSIONS.IOS.CAMERA).then(result => {
        launchCamera(camOpt, res => {
          if (res.didCancel) {
            actionSheetRef.current.hide();
          }
          if (res.assets) {
            console.log(res.assets[0].height);
            console.log(res.assets[0].width);
            webViewRef.current.postMessage(
              JSON.stringify({from: command, photo: res.assets[0].base64}),
            );
            actionSheetRef.current.hide();
          }
        });
      });
    } else {
      console.log('A');
      launchCamera(camOpt, res => {
        if (res.didCancel) {
          actionSheetRef.current.hide();
        }
        if (res.assets) {
          webViewRef.current.postMessage(
            JSON.stringify({from: command, photo: res.assets[0].base64}),
          );
          actionSheetRef.current.hide();
        }
      });
      console.log('done');
    }
  };

  const getPhotoFromGallery = async () => {
    if (os === 'ios') {
      request(PERMISSIONS.IOS.MEDIA_LIBRARY).then(result => {
        launchImageLibrary(gallOpt, res => {
          if (res.didCancel) {
            actionSheetRef.current.hide();
          }
          if (res.assets) {
            webViewRef.current.postMessage(
              JSON.stringify({from: command, photo: res.assets[0].base64}),
            );
            actionSheetRef.current.hide();
          }
        });
      });
    } else {
      launchImageLibrary(gallOpt, res => {
        if (res.didCancel) {
          actionSheetRef.current.hide();
        }
        if (res.assets) {
          webViewRef.current.postMessage(
            JSON.stringify({from: command, photo: res.assets[0].base64}),
          );
          actionSheetRef.current.hide();
        }
      });
    }
  };

  const INJECTED_CODE = `
(function() {
  function wrap(fn) {
    return function wrapper() {
      var res = fn.apply(this, arguments);
      window.ReactNativeWebView.postMessage('navigationStateChange');
      return res;
    }
  }

  history.pushState = wrap(history.pushState);
  history.replaceState = wrap(history.replaceState);
  window.addEventListener('popstate', function() {
    window.ReactNativeWebView.postMessage('navigationStateChange');
  });
})();

true;
`;
  const loadingSpinner = () => {
    const spinnerStyle = {
      position: 'absolute',
      height: '100%',
      width: '100%',
    };
    return (
      <ActivityIndicator size="large" color={'#FF787F'} style={spinnerStyle} />
    );
  };

  const sendSMS = async () => {
    // 권한 요청
    if (os === 'ios') {
      request(PERMISSIONS.IOS.CONTACTS).then(async () => {
        const selected = await selectContactPhone();
        if (!selected) {
          return null;
        }
        // 선택한 사람에게 문자 보내기
        let {contact, selectedPhone} = selected;
        //SendIntentAndroid.sendSms(selectedPhone.number, command);
        Linking.openURL(`sms:${selectedPhone.number}&body=${command}`);
      });
    } else {
      const isPermitted = await requestContactPermission();
      if (isPermitted) {
        // 보낼 사람 선택 -> 한명 or 여러명?

        const selected = await selectContactPhone();
        if (!selected) {
          return null;
        }
        // 선택한 사람에게 문자 보내기
        let {contact, selectedPhone} = selected;
        //SendIntentAndroid.sendSms(selectedPhone.number, command);
        Linking.openURL(`sms:${selectedPhone.number}?body=${command}`);
      } else {
        console.log('거부하셨습니다.');
      }
    }
  };

  const onShouldStartLoadWithRequest = event => {
    if (os === 'android') {
      if (event.url.includes('intent')) {
        SendIntentAndroid.openAppWithUri(event.url)
          .then(isOpened => {
            // 앱이 열렸을 때
            //webViewRef.current.goBack();
            //console.log('opened'); // (임시) 이동되고나서, 전에 보던 페이지를 보기 위해
            if (!isOpened) {
              // 플레이스토어 링크 제공
              if (event.url.includes('kakao')) {
                ToastAndroid.show(
                  '카카오톡이 설치되어 있지 않습니다. Google Play Store로 이동합니다.',
                  ToastAndroid.SHORT,
                );
                Linking.openURL('market://details?id=com.kakao.talk');
              }
            }
          })
          .catch(err => {
            console.log(err);
            console.log('ERROR!!!');
          });
        return false;
      } else if (event.url.includes('sms')) {
        return false;
      }
      return true;
    } else if (os === 'ios') {
      if (event.url.includes('kakaolink')) {
        //console.log(event.url);
        Linking.openURL(event.url);
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        toggleConnection(true);
      }
    });
    setOs(Platform.OS);
    //requestAudioPermission();
  }, []);

  const sendToken = () => {
    const FCM = async () => {
      //await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();

      //console.log(token);

      webViewRef.current.postMessage(
        JSON.stringify({from: 'fcmToken', token: token}),
      );
    };

    const FCM_iOS = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        FCM();
      } else {
        console.log('refused');
      }
    };
    if (os === 'ios') {
      FCM_iOS();
    } else {
      FCM();
    }
  };

  return (
    <Fragment>
      <SafeAreaView style={{backgroundColor: '#FFCDBE'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        {os === 'ios' ? <StatusBar color={'#ffcdbe'} /> : <View />}
        {connection ? (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <WebView
              ref={webViewRef}
              onLoadStart={() =>
                webViewRef.current.injectJavaScript(INJECTED_CODE)
              }
              originWhitelist={['*']}
              renderLoading={loadingSpinner}
              startInLoadingState={true}
              style={{flex: 1}}
              source={url}
              onMessage={getMessage}
              scrollEnabled={true}
              onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
              allowsBackForwardNavigationGestures={true}
              onLoadEnd={sendToken}
              mediaPlaybackRequiresUserAction={false}
              allowInlineMediaPlayback={true}
            />
          </KeyboardAvoidingView>
        ) : (
          <LinearGradient
            colors={['#FFEBE5', '#D8F1ED']}
            angle={179.94}
            style={errorStyle.errorView}>
            <Image
              source={require('./assets/error.png')}
              style={errorStyle.img}
            />
            <Image
              source={require('./assets/error_desc.png')}
              style={errorStyle.desc}
            />
            <Image
              source={require('./assets/logo_color.png')}
              style={errorStyle.logo}
            />
          </LinearGradient>
        )}

        <ActionSheet
          ref={actionSheetRef}
          containerStyle={actionSheetStyle.indicator}>
          <View>
            <Pressable
              style={actionSheetStyle.gallery}
              onPress={getPhotoFromGallery}>
              <Text style={actionSheetStyle.text}>사진첩에서 불러오기</Text>
            </Pressable>
            <Pressable
              style={actionSheetStyle.camera}
              onPress={getPhotoFromCamera}>
              <Text style={actionSheetStyle.text}>사진 촬영</Text>
            </Pressable>
            <Pressable
              style={actionSheetStyle.cancel}
              onPress={() => {
                actionSheetRef.current.hide();
              }}>
              <Text style={actionSheetStyle.cancelText}>취소</Text>
            </Pressable>
          </View>
        </ActionSheet>
      </SafeAreaView>
    </Fragment>
  );
};

const actionSheetStyle = StyleSheet.create({
  indicator: {
    marginBottom: 0,
  },
  gallery: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#E5E6FF',
    borderBottomWidth: 1,
    borderRadius: 16,
    height: 64,
  },
  camera: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#E5E6FF',
    borderBottomWidth: 1,
    borderRadius: 16,
    height: 64,
  },
  cancel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    height: 64,
  },

  text: {
    fontWeight: '500',
    fontSize: 24,

    color: '#1363FF',
  },

  cancelText: {
    fontWeight: '500',
    fontSize: 24,

    color: '#D82D34',
  },
});

const errorStyle = StyleSheet.create({
  errorView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  img: {
    resizeMode: 'center',
    width: 300,
    top: 125,
    padding: 0,
  },

  desc: {
    resizeMode: 'center',
    width: 300,
  },

  logo: {
    resizeMode: 'center',
    width: 100,
    bottom: 150,
  },
});

export default App;
