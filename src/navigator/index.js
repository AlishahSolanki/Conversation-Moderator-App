//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:14:05 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import React, {forwardRef, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './Drawer';
import {AuthStack} from './Stacks';
import {LoginContext} from '../contexts';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const rootNavigator = forwardRef((props, ref) => {
  const {isLogin} = useContext(LoginContext);
  return (
    <NavigationContainer ref={ref}>
      <Stack.Navigator headerMode="none">
        {true ? (
          <Stack.Screen
            name="MainStack"
            component={MainStack}
            options={{
              animationEnabled: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
            options={{
              animationEnabled: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default rootNavigator;
