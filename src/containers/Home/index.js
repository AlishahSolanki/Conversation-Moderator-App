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
import WaveForm from 'react-native-audiowaveform';
import SoundCloudWave from '../../reuseableComponents/SoundCloudWave'

const screenWidth = Dimensions.get('screen').width;

class Home extends Component {
  dirs = RNFetchBlob.fs.dirs;
  path = Platform.select({
    ios: 'hello.m4a',
    android: `${this.dirs.DownloadDir}/hello.wav`,
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
    playAudio:true,
    data:[],
    wave:false,
    waveform : []
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
  createWaves = (data) => {
    //const data = [38,38,38,36,34,32,28,29,22,109,83,124,74,97,98,125,77,122,130,98,98,97,129,98,100,103,114,104,97,100,107,116,102,101,98,133,98,99,100,133,106,98,93,126,124,94,101,99,118,96,108,98,115,98,99,100,122,96,97,103,100,123,99,96,102,120,102,103,96,113,100,102,100,122,107,103,102,99,121,101,103,105,124,115,112,100,128,98,99,97,115,102,98,98,117,112,96,94,104,125,97,97,92,116,97,104,108,113,116,103,92,94,124,96,96,96,113,97,100,103,126,107,103,100,107,117,105,95,92,133,98,99,98,123,117,102,95,97,121,99,101,100,110,101,96,96,129,101,98,100,98,118,123,110,111,128,107,109,92,76,77,70,56,82,78,79,70,79,87,126,113,101,132,100,105,79,78,73,63,65,47,77,77,67,77,74,69,127,100,105,128,113,112,73,74,69,68,71,75,70,66,77,76,74,119,107,100,121,88,101,75,77,67,69,73,74,66,69,65,80,80,118,120,105,127,98,118,78,68,76,67,71,83,74,64,73,72,79,79,122,113,102,124,103,97,76,79,71,58,47,76,69,71,70,65,81,124,114,105,123,99,94,62,76,60,72,70,65,71,67,63,77,84,112,114,102,121,96,114,68,79,76,77,44,96,100,96,102,96,98,99,100,83,116,114,105,111,123,108,111,106,124,93,116,109,109,115,101,119,100,116,120,109,111,111,112,114,106,123,98,131,113,104,120,105,124,105,100,116,105,107,104,132,102,100,125,127,103,127,105,106,130,123,110,106,130,109,114,107,129,101,115,100,129,104,129,120,108,114,105,106,110,111,109,111,114,102,118,116,109,118,104,121,113,98,120,115,122,100,97,121,109,104,104,120,114,107,115,106,104,117,100,111,112,129,118,104,126,99,108,107,115,107,122,100,120,109,112,107,109,117,107,115,105,116,108,127,121,99,116,106,119,117,110,102,121,121,117,101,100,100,116,118,126,108,98,95,99,95,96,97,91,97,102,101,83,127,106,98,130,102,106,101,77,74,66,59,61,73,74,63,68,60,122,110,107,140,105,106,96,73,76,76,77,81,75,76,80,66,81,116,127,112,134,112,101,105,62,71,74,74,74,70,73,77,66,83,84,128,115,108,136,101,113,72,71,65,71,70,69,74,68,82,79,76,122,110,108,121,96,109,105,73,63,71,82,67,74,75,74,71,76,95,120,101,123,100,95,102,74,74,64,75,83,73,73,79,76,68,94,131,115,104,137,90,106,73,62,73,68,76,70,73,79,74,82,81,113,112,104,115,97,112,70,79,73,72,71,95,102,108,106,108,99,94,95,86,131,109,105,115,133,108,116,107,137,99,126,103,105,117,119,106,100,131,114,105,120,100,128,113,100,124,103,134,98,95,123,113,121,99,119,105,101,109,108,127,110,108,120,99,117,109,102,112,104,118,108,106,120,112,112,104,122,109,131,103,122,100,122,107,101,123,108,97,111,129,107,111,105,118,101,107,116,120,110,130,107,99,119,116,116,100,120,110,112,110,105,116,104,98,117,110,120,111,99,114,98,121,105,94,111,98,117,103,126,101,116,98,124,102,130,98,104,115,100,108,105,127,108,119,106,127,103,101,123,122,99,105,122,126,108,107,99,93,127,99,117,101,96,98,97,101,101,106,109,107,103,109,114,112,104,101,120,118,119,104,107,113,107,111,104,124,115,123,133,118,103,104,115,108,108,114,109,105,118,123,121,124,110,110,107,119,105,102,102,108,114,111,109,102,115,126,114,109,112,116,131,103,113,104,106,114,118,118,113,117,117,104,114,112,113,107,117,131,107,107,116,119,118,121,117,116,116,117,109,126,116,116,123,124,102,117,118,103,123,121,122,119,121,125,125,115,104,112,112,116,114,115,101,100,115,115,117,125,111,106,111,118,114,129,119,110,115,131,112,117,115,127,121,128,127,124,120,115,125,124,119,116,115,119,113,106,121,107,108,130,112,121,116,114,113,117,120,126,106,116,120,126,97,113,106,105,117,123,112,123,119,108,113,121,119,119,110,120,120,107,120,122,111,123,124,123,128,123,114,112,128,120,121,120,121,131,121,103,120,106,105,116,121,126,120,116,105,117,122,123,98,116,114,118,105,118,110,110,116,111,121,123,117,113,116,125,136,115,115,121,121,117,116,118,105,117,123,125,118,128,116,117,124,122,131,102,126,120,129,104,114,113,116,109,132,129,129,122,117,114,129,125,122,115,115,130,111,123,103,103,119,120,121,126,111,111,124,118,110,105,108,130,117,117,123,104,96,114,100,120,100,99,132,108,127,100,113,113,106,106,109,116,107,112,112,98,116,99,95,114,99,129,90,113,109,114,101,115,102,113,105,115,105,94,111,112,127,105,118,104,110,109,105,115,105,110,102,105,122,99,116,108,95,127,104,115,99,133,97,104,101,119,107,104,99,100,121,127,105,110,108,129,121,122,135,100,120,125,100,98,101,122,104,96,88,105,126,111,100,122,121,105,102,96,127,109,92,116,113,99,99,125,99,111,98,101,126,107,120,101,109,118,128,120,122,103,105,120,130,109,111,106,119,118,102,103,106,128,116,118,107,128,123,110,116,110,114,119,133,97,101,97,117,103,94,98,107,120,131,108,99,110,125,107,104,139,105,120,122,122,102,112,133,101,112,110,113,116,103,113,126,112,117,104,111,113,125,128,106,126,101,102,132,102,110,96,104,108,111,129,102,106,102,119,109,95,101,106,117,135,103,100,97,103,101,105,105,96,131,107,128,132,102,125,118,130,122,111,112,126,94,96,100,118,111,101,104,100,128,129,104,104,109,120,106,107,98,106,125,127,99,101,104,127,104,106,103,103,125,104,109,120,122,117,110,120,113,120,133,132,124,102,98,100,98,133,101,96,98,104,114,95,112,106,128,107,114,102,130,93,128,108,101,121,117,128,106,92,128,90,110,98,99,128,103,106,117,94,122,111,101,123,104,121,111,103,130,95,112,100,126,127,98,110,123,102,116,109,92,115,103,120,103,91,129,96,107,100,130,97,106,102,107,95,123,109,86,82,119,115,108,129,95,105,96,81,73,60,64,66,55,56,73,67,66,68,115,106,113,128,112,106,63,61,62,70,70,68,70,77,66,60,78,132,107,106,126,105,120,73,68,65,61,63,72,68,71,76,70,76,130,110,106,121,107,105,58,62,69,64,66,71,52,79,64,77,69,126,108,104,127,106,109,76,70,76,74,72,68,65,68,72,76,69,117,112,109,128,107,116,72,61,76,67,61,77,72,67,67,69,66,71,135,109,110,131,105,92,71,62,63,71,65,76,63,81,71,74,77,122,108,103,124,97,92,78,65,73,70,71,73,105,109,96,103,104,97,98,89,117,107,114,108,102,128,107,111,127,108,121,110,98,125,108,129,111,98,130,105,108,111,120,104,118,106,122,102,122,107,99,122,106,101,95,126,103,107,104,123,107,104,104,113,92,116,98,96,119,112,120,104,123,105,108,103,104,129,117,105,118,103,131,100,104,123,102,100,109,116,125,107,110,107,117,116,105,129,102,108,115,100,99,132,129,106,94,119,111,104,103,118,95,111,96,114,99,117,109,95,119,110,104,93,125,98,105,103,99,117,102,116,128,101,115,100,103,111,96,114,104,104,125,93,120,102,124,101,112,138,106,104,114,117,128,107,108,112,109,122,112,107,123,117,114,111,110,126,124,121,105,122,112,115,111,120,123,103,115,104,125,116,129,115,123,125,129,108,109,126,114,119,108,118,125,128,113,122,122,121,109,122,110,116,121,110,121,120,118,114,116,130,118,105,117,117,123,116,107,118,109,118,112,97,117,102,108,103,109,112,120,112,115,116,122,115,119,123,122,110,114,117,116,121,117,118,113,125,119,124,118,114,108,118,128,123,114,125,122,108,116,113,115,109,115,106,111,123,123,118,117,109,122,117,114,109,107,105,107,112,108,107,131,113,115,126,101,118,126,104,107,121,125,111,105,95,100,122,105,114,105,98,110,110,104,107,114,108,108,107,104,99,118,117,105,120,91,100,77,42,40,39,35,15]
    
    // data = 
    // console.log("data",data)
    const peaks = data.filter(point => point >= 0)
    // peaks = [0, 0, 2, 5, 20, 55, 110, 20]
    const ratio = Math.max(...peaks) / 100
    // ratio = 1.1
    const normalized = peaks.map(point => Math.round(point / ratio))
    // normalized = [0, 0, 2, 5, 18, 50, 100, 18]
    //console.log("normalized",normalized)
    return data
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
  changestate = () => {
    console.log("changestate")
    this.setState({ playAudio: !this.state.playAudio });
  }
  setTime = (value) => {
    console.log("value",value)
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
      AudioEncoderAndroid: AudioEncoderAndroidType.DEFAULT,
      OutputFormatAndroid: OutputFormatAndroidType.MPEG_4,
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
      true
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
      var maxAudioSize = 32767.0
      var scaledHeight = e.maxAmplitude / maxAudioSize * (200 - 1)
      console.log(`length: ${this.state.data.length}`);
      this.setState({
        recordSecs: e.currentPosition,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
        data: [...this.state.data,scaledHeight],
        waveform : [...this.state.data,scaledHeight]
      });
    });
 
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
      wave:true
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
        { <SoundCloudWave 
            setTime={this.setTime} 
            percentPlayed={0} 
            waveform={this.state.waveform} 
            height={200} 
            width={Metrics.screenWidth}
         />}
        {/* {this.state.wave && <WaveForm 
            style={{height:60,width:"100%"}}
            source={{uri:this.state.uri}}  
            waveFormStyle={{waveColor:'red', scrubColor:'white'}}
          />} */}
        {/* <View style={{height: 200,
                      width: "90%",
                      flexDirection:'row',
                      alignItems:'center',
                    backgroundColor:"blue"}}
            >

      {this.state.data && this.createWaves(this.state.data).map(
        (p, i) => (
          <View
            key={`${p}-${i}`}

            style={{ height: p, backgroundColor:'red',width:5 }}
          />
        ),
      )}
    </View> */}
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
    backgroundColor: '#fff',
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
    color: 'black',
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
    color: 'black',
    fontSize: 20,
    textAlignVertical: 'center',
    fontWeight: '200',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 3,
  },
  txtCounter: {
    marginTop: 12,
    color: 'black',
    fontSize: 20,
    textAlignVertical: 'center',
    fontWeight: '200',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 3,
  },
});
