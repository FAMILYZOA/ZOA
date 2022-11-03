import {PermissionsAndroid, Platform} from 'react-native';

export const CheckAudioPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);

      console.log('write external stroage', grants);

      if (
        grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Permissions granted');
      } else {
        console.log('All required permissions not granted');
        return;
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  }
};

export const onStartRecord = async audioRecorderPlayer => {
  const result = await audioRecorderPlayer.startRecorder();
  this.audioRecorderPlayer.addRecordBackListener(e => {
    this.setState({
      recordSecs: e.currentPosition,
      recordTime: this.audioRecorderPlayer.mmssss(
        Math.floor(e.currentPosition),
      ),
    });
    return;
  });
  console.log(result);
};

export const onStopRecord = async audioRecorderPlayer => {
  const result = await audioRecorderPlayer.stopRecorder();
  this.audioRecorderPlayer.removeRecordBackListener();
  this.setState({
    recordSecs: 0,
  });
  console.log(result);
};

export const onStartPlay = async audioRecorderPlayer => {
  console.log('onStartPlay');
  const msg = await audioRecorderPlayer.startPlayer();
  console.log(msg);
  this.audioRecorderPlayer.addPlayBackListener(e => {
    this.setState({
      currentPositionSec: e.currentPosition,
      currentDurationSec: e.duration,
      playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
    });
    return;
  });
};

export const onPausePlay = async audioRecorderPlayer => {
  await audioRecorderPlayer.pausePlayer();
};

export const onStopPlay = async audioRecorderPlayer => {
  console.log('onStopPlay');
  audioRecorderPlayer.stopPlayer();
  audioRecorderPlayer.removePlayBackListener();
};
