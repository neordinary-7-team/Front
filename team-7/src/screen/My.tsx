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

const My = () => {
  const navigation = useNavigation();
  const open = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, []);
  const goDetails = useCallback((e: number) => {
    navigation.navigate('Details', { num: e });
    // console.log('-----------------');
    // console.log(e);
    // console.log('-----------------');
  }, []);
  return (
    <SafeAreaView>
      <ScrollEnabledProvider>
        <View style={[styles.view]}>
          <NavigationHeader
            title="내 일정들"
            Left={() => <Icon name="menu" size={30} onPress={open} />}
            // Right={() => <Icon name="logout" size={30} onPress={logout} />}
          />
          {/* 화면상단 문구 */}
          <Text>자신이 참여한 약속장소들 모음</Text>
          {ListData.mylist.map((user, index) => (
            <TouchableOpacity key={index} onPress={() => goDetails(user.schedulesIdx)}>
              <View style={[styles.listView]}>
                <View style={[styles.leftList]}>
                  <Icon name="account-music-outline" size={40} color={Colors.lightBlue500} />
                  {/* <Text>모임장 구분 번호 : {user.userIdx}</Text> */}
                </View>
                <View style={[styles.listBlockView]}>
                  <Text style={[styles.listEachText]}>모임 구분 번호 {user.schedulesIdx}</Text>
                  <Text style={[styles.listEachText]}>모임 이름 : {user.groupName}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollEnabledProvider>
    </SafeAreaView>
  );
};

export default My;

const styles = StyleSheet.create({
  view: { flex: 1, flexDirection: 'column', padding: 5 },
  text: { marginRight: 10, fontSize: 20 },
  listView: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.lightBlue500,
    // width: '100%',
    padding: 5,
    marginBottom: 15,
    alignSelf: 'center',
    // justifyContent: 'center',
  },
  leftList: {
    justifyContent: 'center',
  },
  listBlockView: {
    flexDirection: 'column',
  },
  listEachText: {
    margin: 10,
  },
});
