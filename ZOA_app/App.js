/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  View,
  Text,
  Button,
  PermissionsAndroid,
  BackHandler,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Linking,
  Platform,
  Toast,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ActionSheet from 'react-native-actions-sheet';
import {selectContactPhone} from 'react-native-select-contact';
import SendIntentAndroid from 'react-native-send-intent';
import {useRef, useState, useEffect} from 'react';

const App = () => {
  const [canGoBack, setCanGoBack] = useState(false);
  const [command, setCommand] = useState('');
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
  }, [canGoBack]);

  const camOpt = {
    mediaType: 'photo',
    quality: 1,
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
    let message = event.nativeEvent.data;
    if (message.includes(',')) {
      const messages = message.split(',');
      message = messages[0];
      setCommand(messages[1]);
    }
    switch (message) {
      case 'imagePicker':
        actionSheetRef.current.show();
        break;
      case 'navigationStateChange':
        setCanGoBack(event.nativeEvent.canGoBack);
        break;
      case 'inviteSMS':
        sendSMS();
        break;
      default:
        break;
    }
  };

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

  const requestPackageQueryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.requestPackageQueryPermission,
        {
          title: '패키지 쿼리 사용 권한 요청',
          message:
            '패키지를 쿼리하기 위한 권한이 필요합니다.' +
            '패키지를 쿼리하길 원하면 예를 눌러주세요.',
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

  const getPhotoFromCamera = async event => {
    if (await requestCameraPermission()) {
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
    }
  };

  const getPhotoFromGallery = async () => {
    if (await requestCameraPermission()) {
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
    if (requestContactPermission()) {
      // 보낼 사람 선택 -> 한명 or 여러명?
      const selected = await selectContactPhone();
      if (!selected) {
        return null;
      }
      // 선택한 사람에게 문자 보내기
      let {contact, selectedPhone} = selected;
      Linking.openURL(`sms:${selectedPhone.number}?body=${command}`);
    } else {
      console.log('거부하셨습니다.');
    }
  };

  const onShouldStartLoadWithRequest = event => {
    if (Platform.OS === 'android') {
      if (event.url.includes('intent')) {
        SendIntentAndroid.openAppWithUri(event.url)
          .then(isOpened => {
            // 앱이 열렸을 때
            webViewRef.current.goBack(); // (임시) 이동되고나서, 전에 보던 페이지를 보기 위해
            if (!isOpened) {
              alert('앱 실행이 실패했습니다');
            }
          })
          .catch(err => {
            console.log(err);
            console.log('ERROR!!!');
          });
        return true;
      }
    }
    return false;
  };

  return (
    <View style={{flex: 1}}>
      <WebView
        ref={webViewRef}
        onLoadStart={() => webViewRef.current.injectJavaScript(INJECTED_CODE)}
        originWhitelist={['*']}
        renderLoading={loadingSpinner}
        startInLoadingState={true}
        style={{flex: 1}}
        source={url}
        onMessage={getMessage}
        scrollEnabled={false}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
      />

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
    </View>
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

export default App;
