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
import { userState } from '../recoil/atom';
import { BorderlessButton, ScrollView } from 'react-native-gesture-handler';
const My = () => {
  const [userIdx, setUserIdx] = useRecoilState<number>(userState);
  useEffect(() => {
    console.log('userIdx : ', userIdx);
  }, [userIdx]);

  const navigation = useNavigation();
  const open = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, []);
  const goDetails = useCallback((e: number) => {
    navigation.navigate('Details', { e });
  }, []);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const fetchNews = async () => {
    try {
      setList([]);
      setError(null);
      setLoading(true);
      const response = await axios.get(`http://15.165.67.130:9000/schedules/owner/1`); //사용자번호 넣으면 만든 일정 조회
      console.log('만든 일정 ', response.data.result);
      setList(response.data.result);
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
        <ScrollView style={[styles.view]}>
          <NavigationHeader
            title="내 일정들"
            Left={() => <Icon name="menu" size={30} onPress={open} />}
            Right={() => <Icon name="logout" size={30} color="white" />}
          />
          {/* 화면상단 문구 */}
          {/* <Text>일단 내가 만든 일정들 모음</Text>r */}
          {list.map((each, index) => (
            <TouchableOpacity key={index} onPress={() => goDetails(each.schedulesIdx)}>
              <View style={[styles.listView]}>
                <View style={[styles.leftList]}>
                  <Icon name="account-music-outline" size={40} color={Colors.lightBlue500} />
                </View>
                <View style={[styles.listBlockView]}>
                  <Text style={[styles.groupNameText]}>{each.groupName}</Text>
                  <Text style={[styles.datesText]}>{each.dates[0]} 에 만나요 📊</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
  groupNameText: {
    margin: 10,
    fontWeight: 'bold',
  },
  datesText: {
    margin: 10,
  },
});
