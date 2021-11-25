//
//  navigatorHelper.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:20:00 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import React from 'react';
import {Images, Metrics, AppStyles, Colors, Fonts} from '../theme';
import {Image, TouchableOpacity} from 'react-native';
import {ImageButton} from '../reuseableComponents';
import {HeaderBackButton} from '@react-navigation/stack';
import utility from '../utility';
import {pop} from '../services/NavigationService';

const headerColor = {
  headerStyle: {
    backgroundColor: Colors.secondary.azure,
    borderBottomWidth: 0,
  },
};
const removeBorder = {
  headerStyle: {
    borderBottomWidth: 0,
  },
};
const headerTransparent = {
  headerTransparent: true,
};
const backImage = (tintColor = Colors.secondary.azure) => {
  return {
    headerBackTitleVisible: false,
    headerBackImage: () => (
      <Image
        source={Images.icBack}
        style={{
          marginLeft: Metrics.baseMargin,
          //tintColor: tintColor
        }}
      />
    ),
  };
};
const title = title => ({
  title,
  headerTitleStyle: {
    color: Colors.secondary.azure,
    ...Fonts.font(
      Fonts.FontFamily.default,
      Fonts.Type.SemiBold,
      Fonts.Size.medium,
    ),
  },
});
const defaultNavOptions = navOptions => {
  return {
    defaultNavigationOptions: ({navigation}) => navOptions,
  };
};
const navOptions = navOptions => {
  return {
    navigationOptions: ({navigation}) => navOptions,
  };
};

const navButton = (image, key = 'headerRight', navOptions, style) => {
  return {
    navigationOptions: ({navigation}) => {
      return {
        [key]: () => (
          <ImageButton
            source={image}
            style={{
              justifyContent: 'center',
              marginHorizontal: Metrics.smallMargin,
              height: 40,
              ...style,
            }}
            onPress={navigation.getParam('onPress', () =>
              global.log('onPress'),
            )}
          />
        ),
        ...navOptions,
      };
    },
  };
};
const dyanimcTitle = (navOptions = {}) => {
  return {
    navigationOptions: ({navigation}) => {
      console.log('navigation-navButton', navigation);
      return {
        title: navigation.getParam('title', ''),
        ...navOptions,
      };
    },
  };
};

const backButton = (onPress = () => pop()) => {
  return {
    headerLeft: props => (
      <HeaderBackButton
        backImage={() => <Image source={Images.icBack} resizeMode="contain" />}
        labelVisible={false}
        onPress={onPress}
        style={{
          height: 30,
          width: 30,
          ...AppStyles.centerAligned,
          paddingHorizontal: utility.isPlatformAndroid() ? 0 : 16,
          marginLeft: utility.isPlatformAndroid() ? undefined : 8,
        }}
      />
    ),
  };
};

export {
  headerColor,
  removeBorder,
  headerTransparent,
  backImage,
  title,
  defaultNavOptions,
  navOptions,
  navButton,
  dyanimcTitle,
  backButton,
};
