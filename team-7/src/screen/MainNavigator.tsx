import React from 'react';
import type FC from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './Login';
import SignUp from './SignUp';
import TabNavigator from './TabNavigator';
import Details from './Details';

import DrawerContent from './DrawerContent';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function MainNavigator() {
  return (
    <Drawer.Navigator
      useLegacyImplementation={true}
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="SignUp" component={SignUp} />
      <Drawer.Screen name="TabNavigator" component={TabNavigator} options={{ title: 'Home' }} />
      <Drawer.Screen name="Details" component={Details} options={{ title: 'Details' }} />
    </Drawer.Navigator>
  );
}
