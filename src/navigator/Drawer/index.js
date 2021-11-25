import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Notifications from '../../containers/Drawer/Notifications';
import Settings from '../../containers/Drawer/Settings';
import Home from '../../containers/Home';
import ChangePassword from '../../containers/Drawer/ChangePassword';
import AppDrawer from '../../containers/Drawer';
import Tabs from '../Tabs';
import {Images} from '../../theme';
import {backButton, backImage, navButton} from '../navigatorHelper';
import {pop, popToTop, toggleDrawer} from '../../services/NavigationService';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);

export default DrawerNav = () => (
  <Drawer.Navigator drawerContent={props => <AppDrawer {...props} />}>
    <Drawer.Screen name="DrawerStack" component={DrawerStack} />
  </Drawer.Navigator>
);
