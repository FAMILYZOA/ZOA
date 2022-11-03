/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {View, Button} from 'react-native';
import Modal from 'react-native-modal';
import {WebView} from 'react-native-webview';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {useRef, useState} from 'react';

const App = () => {
  const [isImageModal, toggleImageModal] = useState(false);
  const url = {uri: 'http://10.0.2.2:3000'};
  const Ref = useRef();

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
    const message = event.nativeEvent.data;
    switch (message) {
      case 'imagePicker':
        toggleImageModal(true);
        break;
      default:
        break;
    }
  };

  const closeModals = () => {
    if (isImageModal) {
      toggleImageModal(false);
    }
  };

  const getPhotoFromCamera = async () => {
    launchCamera(camOpt).then(res => {
      if (res.didCancel) {
        toggleImageModal(false);
      }
      if (res.assets[0].base64) {
        alert(res.assets[0].base64)
        Ref.r.postMessage(res.assets[0].base64);
      }
    });
  };

  const getPhotoFromGallery = async () => {
    const res = await launchImageLibrary(gallOpt);

    if (res.didCancel) {
      toggleImageModal(false);
    }
    if (res.assets) {
      Ref.r.postMessage(res.assets[0].base64);
    }
  };

  return (
    <View style={{flex: 1}} onClick={closeModals}>
      <WebView
        ref={r => {
          Ref.r = r;
        }}
        style={{flex: 1}}
        source={url}
        onMessage={getMessage}
      />
      <Modal
        isVisible={isImageModal}
        onBackButtonPress={() => {
          toggleImageModal(false);
        }}
        onBackdropPress={() => {
          toggleImageModal(false);
        }}>
        <Button title="사진 촬영" onPress={getPhotoFromCamera} />
        <Button title="갤러리에서 가져오기" onPress={getPhotoFromGallery} />
      </Modal>
    </View>
  );
};

export default App;
