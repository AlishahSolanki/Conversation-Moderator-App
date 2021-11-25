import React, {useCallback, useContext} from 'react';
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {logout, request} from '../../actions/ServiceAction';
import constant from '../../constants';
import {LoginContext} from '../../contexts';
import {ButtonView} from '../../reuseableComponents';
import {
  closeDrawer,
  navigate,
  toggleDrawer,
} from '../../services/NavigationService';
import {Images, Metrics} from '../../theme';
import styles from './styles';

const drawerRoutes = [
  {
    title: 'Bitcoin',
    route: 'BTC',
    image: Images.icbtc,
  },
  {
    title: 'Ethereum',
    route: 'ETH',
    image: Images.iceth,
  },
  {
    title: 'Shiba Inu',
    route: 'SHIB',
    image: Images.icshib,
  },
  {
    title: 'Solana',
    route: 'Sol',
    image: Images.icsol,
  },
  {
    title: 'Dogecoin',
    route: 'Doge',
    image: Images.icdoge,
  },
  {
    title: 'XRP',
    route: 'XRP',
    image: Images.icxrp,
  },
  {
    title: 'Polkadot',
    route: 'Dot',
    image: Images.icdot,
  },
  {
    title: 'Cardano',
    route: 'ADA',
    image: Images.icada,
  },
  {
    title: 'Binance Coin',
    route: 'BNB',
    image: Images.icbnb,
  },
  {
    title: 'eCash',
    route: 'XEC',
    image: Images.icecash,
  },
];
//save kar done
const index = props => {
  const {request} = props;
  const {setLogin} = useContext(LoginContext);
  const dispatch = useDispatch();
  const _renderItem = ({item, index}) => (
    <DrawerCell item={item} index={index} />
  );

  const DrawerCell = ({item, index}) => {
    const onPress = useCallback(() => {
      toggleDrawer();
      navigate('Home', {coin: item});
    }, []);

    return (
      <ButtonView
        key={`${index}`}
        style={styles.cellContainer}
        onPress={() => onPress()}>
        <Image
          source={item.image}
          resizeMode="contain"
          style={{width: 30, height: 30}}
        />
        <Text style={styles.txtTitle}>{item.title}</Text>
      </ButtonView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginTop: Metrics.heightRatio(50)}}>
        <FlatList
          data={drawerRoutes}
          renderItem={_renderItem}
          contentContainerStyle={{paddingVertical: 15}}
          keyExtractor={item => item.title}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {/* <ButtonView
        style={{
          position: 'absolute',
          top:
            Platform.OS === 'ios'
              ? Metrics.heightRatio(50)
              : Metrics.heightRatio(20),
          right: Metrics.widthRatio(20),
        }}
        onPress={() => closeDrawer()}>
        <Image source={Images.icCross} resizeMode="contain" />
      </ButtonView> */}
    </SafeAreaView>
  );
};

const actions = {request};
const mapStateToProps = ({}) => {
  return {};
};

export default connect(mapStateToProps, actions)(index);
