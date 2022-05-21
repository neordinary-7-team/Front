import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useCallback, useState } from 'react';
import { ScrollEnabledProvider } from '../contexts';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import NavigationHeader from '../theme/NavigationHeader';
import { SafeAreaView, View, MaterialCommunityIcon as Icon } from '../theme';
import { useEffect } from 'react';
import axios from 'axios';
import ListData from '../../db.json';
import { Colors } from 'react-native-paper';

const Details = (num: number) => {
//   console.log(num.route.params.num); // 선택해서 넘어온 모임 구분번호

  const navigation = useNavigation();
  const open = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, []);
  const logout = useCallback(() => {
    navigation.navigate('TabNavigator');
  }, []);

  return (
    <SafeAreaView>
      <ScrollEnabledProvider>
        <View style={[styles.view]}>
          <NavigationHeader
            title="자세히보기"
            Left={() => <Icon name="menu" size={30} onPress={open} />}
            Right={() => <Icon name="replay" size={30} onPress={logout} />}
          />
          {/* 화면상단 문구 */}
          <Text>{num.route.params.num}</Text>
        </View>
      </ScrollEnabledProvider>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  view: { flex: 1 },
  text: { marginRight: 10, fontSize: 20 },
  listView: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.lightBlue500,
    // width: '100%',
    padding: 5,
    marginBottom: 15,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
