import React from 'react';
import {View, ActivityIndicator} from 'react-native';

const ListFooter = ({showLoader}) => (
  <View
    style={{
      height: 80,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    {showLoader && <ActivityIndicator animating />}
  </View>
);

export default ListFooter;
