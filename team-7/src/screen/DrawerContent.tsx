import { StyleSheet } from 'react-native';

import React, { useCallback } from 'react';
import type { FC } from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { View, Text, MaterialCommunityIcon as Icon, Switch } from '../theme';
import { DrawerActions } from '@react-navigation/native';
import NavigationHeader from '../theme/NavigationHeader';
import { Avatar } from '../components';
import * as D from '../data';

const title = 'DrawerContent';
const loginUser = D.createRandomPerson();
const DrawerContent: FC<DrawerContentComponentProps> = (props) => {
  const { navigation } = props;
  const close = useCallback(
    () => navigation.dispatch(DrawerActions.closeDrawer()),
    []
  );
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={[styles.view]}>
      <NavigationHeader
        Right={() => <Icon name="close" size={24} onPress={close} />}
      />
      <View style={[styles.content]}>
        <View style={[styles.content]}>
          <Avatar uri={loginUser.avatar} size={40} />
          <Text style={[styles.text, styles.m]}>{loginUser.name}</Text>
        </View>
        <View style={[styles.row]}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.text, styles.m]}
          >
            {loginUser.email}
          </Text>
        </View>
        <View style={[styles.row, { marginTop: 20 }]}>
          <Switch />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  view: { flex: 1, padding: 5 },
  row: { flexDirection: 'row', padding: 5, alignItems: 'center' },
  m: { marginLeft: 5 },
  text: { fontSize: 20 },
  content: { flex: 1, padding: 5 },
});
