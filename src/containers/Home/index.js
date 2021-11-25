// @flow
import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  processColor,
  View,
  Button,
  Dimensions,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {push} from '../../services/NavigationService';
import {Metrics} from '../../theme';
import {request, logout, multipleRequest} from '../../actions/ServiceAction';
import {LOGIN, SIGNUP} from '../../actions/ActionTypes';
import constant from '../../constants';
import {Images, AppStyles} from '../../theme';
import {ImageButton, AppButton} from '../../reuseableComponents';
import {pop, popToTop, toggleDrawer} from '../../services/NavigationService';
import HttpServiceManager from '../../services/HttpServiceManager';
import DocumentPicker from 'react-native-document-picker';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  PlayBackType,
  RecordBackType,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';

const screenWidth = Dimensions.get('screen').width;

class Home extends Component {
  dirs = RNFetchBlob.fs.dirs;
  path = Platform.select({
    ios: 'hello.m4a',
    android: `${this.dirs.DownloadDir}/hello.awb`,
  });

  audioRecorderPlayer = null;

  state = {
    isLoaded: false,
    isLoggingIn: false,
    recordSecs: 0,
    recordTime: '00:00:00',
    currentPositionSec: 0,
    currentDurationSec: 0,
    playTime: '00:00:00',
    duration: '00:00:00',
    uri: '',
  };
  constructor(props) {
    super(props);
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.1); // optional. Default is 0.5
  }
  componentDidMount() {
    this.props.navigation.setOptions({
      //   headerLeft: this.renderHeaderRight,
      title: 'Conversation Moderator',
    });
  }
  componentDidUpdate(prevProps, prevState) {}
  getDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });
      console.log(res);
      let formdata = new FormData();
      formdata.append('file', {
        uri: res[0].uri,
        name: res[0].name,
        type: res[0].type,
      });
      formdata.append('encoding', 'AMR_WB');
      formdata.append('sampleRateHertz', 16000);
      this.getData(formdata);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  getData = data => {
    // let data = {
    //   file: require('../../assets/audio/commercial_mono.wav'),
    // };
    HttpServiceManager.getInstance()
      .request(constant.posts, data, 'post')
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log({error});
      });
  };
  renderHeaderRight = () => {
    return (
      <ImageButton
        source={Images.icMenu}
        style={AppStyles.headerMargin}
        onPress={toggleDrawer}
      />
    );
  };

  render() {
    let playWidth =
      (this.state.currentPositionSec / this.state.currentDurationSec) *
      (screenWidth - 56);

    if (!playWidth) {
      playWidth = 0;
    }

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.titleTxt}>Audio Recorder Player</Text>
        <Text style={styles.txtRecordCounter}>{this.state.recordTime}</Text>
        <View style={styles.viewRecorder}>
          <View style={styles.recordBtnWrapper}>
            <Button
              title="Record"
              style={[styles.btn, styles.txt]}
              onPress={this.onStartRecord}></Button>
            <Button
              title={'Pause'}
              style={[
                styles.btn,
                {
                  marginLeft: 12,
                },
                styles.txt,
              ]}
              onPress={this.onPauseRecord}></Button>
            <Button
              title="Resume"
              style={[
                styles.btn,
                {
                  marginLeft: 12,
                },
                styles.txt,
              ]}
              onPress={this.onResumeRecord}></Button>
            <Button
              style={[styles.btn, {marginLeft: 12}, styles.txt]}
              onPress={this.onStopRecord}
              title="Stop"></Button>
          </View>
        </View>
        <View style={styles.viewPlayer}>
          <TouchableOpacity
            style={styles.viewBarWrapper}
            onPress={this.onStatusPress}>
            <View style={styles.viewBar}>
              <View style={[styles.viewBarPlay, {width: playWidth}]} />
            </View>
          </TouchableOpacity>
          <Text style={styles.txtCounter}>
            {this.state.playTime} / {this.state.duration}
          </Text>
          <View style={styles.playBtnWrapper}>
            <Button
              title="Play"
              style={[styles.btn, styles.txt]}
              onPress={this.onStartPlay}></Button>
            <Button
              style={[
                styles.btn,
                {
                  marginLeft: 12,
                },
                styles.txt,
              ]}
              onPress={this.onPausePlay}
              title="Pause"></Button>
            <Button
              style={[
                styles.btn,
                {
                  marginLeft: 12,
                },
                styles.txt,
              ]}
              onPress={this.onResumePlay}
              title="Resume"></Button>
            <Button
              style={[
                styles.btn,
                {
                  marginLeft: 12,
                },
                styles.txt,
              ]}
              onPress={this.onStopPlay}
              title="Stop"></Button>
          </View>
          <Button
            style={[
              styles.btn,
              {
                marginLeft: 12,
              },
              styles.txt,
            ]}
            onPress={this.getDocument}
            title="Picker"></Button>
        </View>
      </SafeAreaView>
    );
  }

  onStatusPress = e => {
    const touchX = e.nativeEvent.locationX;
    console.log(`touchX: ${touchX}`);
    const playWidth =
      (this.state.currentPositionSec / this.state.currentDurationSec) *
      (screenWidth - 56);
    console.log(`currentPlayWidth: ${playWidth}`);

    const currentPosition = Math.round(this.state.currentPositionSec);

    if (playWidth && playWidth < touchX) {
      const addSecs = Math.round(currentPosition + 1000);
      this.audioRecorderPlayer.seekToPlayer(addSecs);
      console.log(`addSecs: ${addSecs}`);
    } else {
      const subSecs = Math.round(currentPosition - 1000);
      this.audioRecorderPlayer.seekToPlayer(subSecs);
      console.log(`subSecs: ${subSecs}`);
    }
  };

  onStartRecord = async () => {
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
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AMR_WB,
      OutputFormatAndroid: OutputFormatAndroidType.AMR_WB,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      //   AudioEncodingBitRateAndroid: 128000,
      AudioSamplingRateAndroid: 16000,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    console.log('audioSet', audioSet);
    //? Custom path
    const uri = await this.audioRecorderPlayer.startRecorder(
      this.path,
      audioSet,
    );

    //? Default path
    // const uri = await this.audioRecorderPlayer.startRecorder(
    //   undefined,
    //   audioSet,
    // );
    this.setState({
      uri,
    });
    this.audioRecorderPlayer.addRecordBackListener(e => {
      console.log('record-back', e);
      this.setState({
        recordSecs: e.currentPosition,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
      });
    });
    console.log(`uri: ${uri}`);
  };

  onPauseRecord = async () => {
    try {
      await this.audioRecorderPlayer.pauseRecorder();
    } catch (err) {
      console.log('pauseRecord', err);
    }
  };

  onResumeRecord = async () => {
    await this.audioRecorderPlayer.resumeRecorder();
  };

  onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });
    console.log(result);
  };

  onStartPlay = async () => {
    console.log('onStartPlay', this.state.uri);
    //? Custom path
    // const msg = await this.audioRecorderPlayer.startPlayer(this.path);

    //? Default path
    const msg = await this.audioRecorderPlayer.startPlayer(this.state.uri);
    const volume = await this.audioRecorderPlayer.setVolume(1.0);
    console.log(`file: ${msg}`, `volume: ${volume}`);

    this.audioRecorderPlayer.addPlayBackListener(e => {
      this.setState({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
    });
  };

  onPausePlay = async () => {
    await this.audioRecorderPlayer.pausePlayer();
  };

  onResumePlay = async () => {
    await this.audioRecorderPlayer.resumePlayer();
  };

  onStopPlay = async () => {
    console.log('onStopPlay');
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  };
}
const actions = {
  request,
  logout,
  multipleRequest,
};
const mapStateToProps = state => ({});

export default connect(mapStateToProps, actions)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455A64',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleTxt: {
    marginTop: 100,
    color: 'white',
    fontSize: 28,
  },
  viewRecorder: {
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
  },
  recordBtnWrapper: {
    flexDirection: 'row',
  },
  viewPlayer: {
    marginTop: 60,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  viewBarWrapper: {
    marginTop: 28,
    marginHorizontal: 28,
    alignSelf: 'stretch',
  },
  viewBar: {
    backgroundColor: '#ccc',
    height: 4,
    alignSelf: 'stretch',
  },
  viewBarPlay: {
    backgroundColor: 'white',
    height: 4,
    width: 0,
  },
  playStatusTxt: {
    marginTop: 8,
    color: '#ccc',
  },
  playBtnWrapper: {
    flexDirection: 'row',
    marginTop: 40,
  },
  btn: {
    borderColor: 'white',
    borderWidth: 1,
  },
  txt: {
    color: 'white',
    fontSize: 14,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  txtRecordCounter: {
    marginTop: 32,
    color: 'white',
    fontSize: 20,
    textAlignVertical: 'center',
    fontWeight: '200',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 3,
  },
  txtCounter: {
    marginTop: 12,
    color: 'white',
    fontSize: 20,
    textAlignVertical: 'center',
    fontWeight: '200',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 3,
  },
});
