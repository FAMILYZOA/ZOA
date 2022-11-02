/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {View, Alert} from 'react-native';
import {WebView, ReactNativeWebview} from 'react-native-webview';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {CheckAudioPermission} from './src/audio';

import {useRef, useState} from 'react';

const App = () => {
  const url = {uri: 'http://10.0.2.2:3000'};
  const Ref = useRef();

  const camOpts = {
    mediaType: 'photo',
    quality: 1,
    cameraType: 'back',
    includeBase64: true,
  };

  const gallOpts = {
    mediaType: 'photo',
    quality: 1,
  };

  const getMessage = async event => {
    const message = event.nativeEvent.data;
    switch (message) {
      case 'hello':
        alert(message);
        break;
      case 'camera':
        launchCamera(camOpts, res => {
          alert(res.assets);
        });
        break;
      case 'gallery':
        launchImageLibrary(gallOpts, res => {
          if (res.didCancel) {
            alert('선택하지 않았습니다.');
          } else {
            alert(res.assets);
          }
        });
        break;
      case 'audio':
        CheckAudioPermission();
        break;
      case 'push':
        break;
      default:
        break;
    }
  };
  // const onLoadMethod = () => {
  //   Ref.r.postMessage('WEBVIEW!!!!!!!!!!!');
  // };

  return (
    <WebView
      ref={r => {
        Ref.r = r;
      }}
      style={{flex: 1}}
      source={url}
      onMessage={getMessage}
      //onLoad={onLoadMethod}
    />
  );
};

export default App;
