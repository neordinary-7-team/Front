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
import { useRecoilState } from 'recoil';

const My = () => {
  // const [userIdx, setUserIdx] = useRecoilState(1);

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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  // console.log(ListData.mylist);

  const fetchNews = async () => {
    try {
      setList([]);
      setError(null);
      setLoading(true);
      const response = await axios.get('http://15.165.67.130:9000/schedules/1');
      console.log(response.data.result);
      setList(response.data.result); //api잘모슸ㅁ ㅋㅋ수정해여해
    } catch (e) {
      console.log('err');
      console.log(e);
      //setError(e);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchNews();
  }, []);
  return (
    <SafeAreaView>
      <ScrollEnabledProvider>
        <View style={[styles.view]}>
          <NavigationHeader
            title="내 일정들"
            Left={() => <Icon name="menu" size={30} onPress={open} />}
            Right={() => <Icon name="logout" size={30} color="white" />}
          />
          {/* 화면상단 문구 */}
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
  view: { flex: 1 },
  text: { marginRight: 10, fontSize: 20 },
  listView: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.lightBlue500,
    // width: '100%',
    padding: 5,
    marginBottom: 7,
    marginTop: 7,
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
