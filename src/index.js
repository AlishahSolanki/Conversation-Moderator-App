import _ from 'lodash';
import React, {createContext, Component} from 'react';
import {StatusBar, View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './store';
import RootNavigator from './navigator';
import {navigatorRef} from './services/NavigationService';
import singleton from './singleton';
import SplashScreen from 'react-native-splash-screen';
import {Colors, Metrics} from './theme';
import HttpServiceManager from './services/HttpServiceManager';
import constant from './constants';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import Spinner from 'react-native-globalspinner';
import Reachability from 'react-native-reachability-popup';
import {LoginContext} from './contexts';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.setLogin = this.setLogin.bind(this);
    this.state = {
      isLogin: false,
      setLogin: this.setLogin,
      isReduxLoaded: false,
    };
  }

  componentDidMount() {
    HttpServiceManager.initialize(constant.baseURL, {
      token: constant.applicationToken,
    });
    //set designedAtX verify it on Adobe XD Desgin file
    //Metrics.designedAtX = false;
  }

  setLogin = (isLogin = true) => this.setState({isLogin});

  onBeforeLift = () => {
    singleton.storeRef = store;

    this.setState({isReduxLoaded: true}, () => {
      SplashScreen.hide();
    });
  };

  render() {
    const {isReduxLoaded} = this.state;

    return (
      <Provider store={store}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.secondary.azure}
        />

        <PersistGate onBeforeLift={this.onBeforeLift} persistor={persistor}>
          {isReduxLoaded ? (
            <LoginContext.Provider value={this.state}>
              <RootNavigator ref={navigatorRef} />
            </LoginContext.Provider>
          ) : (
            <View />
          )}
        </PersistGate>

        <FlashMessage position="top" />

        <Spinner color={'black'} size={30} type="BallIndicator" />

        <Reachability />
      </Provider>
    );
  }
}
