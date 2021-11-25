import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../../containers';
import DrawerNav from '../Drawer';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ title: 'Login' }}
    />
  </Stack.Navigator>
)

const MainStack = ({ navigation }) => (
  <Stack.Navigator
    headerMode='none'>
    <Stack.Screen
      name="DrawerNav"
      component={DrawerNav}
    />
  </Stack.Navigator>
)

export {
  AuthStack,
  MainStack
}