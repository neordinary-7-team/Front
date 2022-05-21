import { StyleSheet } from 'react-native';
import React from 'react';

import Login from './Login';
import SignUp from './SignUp';
import HomeNavigator from './HomeNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from 'react-native-paper';
import type { RouteProp, ParamListBase } from '@react-navigation/native';
import MyNavigator from './MyNavigator';
type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

const icons: Record<string, string[]> = {
  HomeNavigator: ['home-circle', 'home-circle-outline'],
  My: ['account', 'account-outline'],
  Login: ['account-search', 'account-search-outline'],
  SignUp: ['account-clock', 'account-clock-outline'],
};

const screenOptions = ({ route }: { route: RouteProp<ParamListBase, string> }) => {
  return {
    headerShown: false,
    tabBarIcon: ({ focused, color, size }: TabBarIconProps) => {
      const { name } = route;
      const focusedSize = focused ? size + 6 : size;
      const focusedColor = focused ? Colors.lightBlue500 : color;
      const [icon, iconOutline] = icons[name];
      const iconName = focused ? icon : iconOutline;
      return <Icon name={iconName} size={focusedSize} color={focusedColor} />;
    },
  };
};

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{ tabBarLabel: 'Home', tabBarBadge: 3 }}
      />
      <Tab.Screen name="My" component={MyNavigator} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
