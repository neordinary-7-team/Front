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
import { block } from 'react-native-reanimated';

const Details = (num: number) => {
  //console.log(num.route.params.num); // 선택해서 넘어온 모임 구분번호
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [memberlist, setMemberlist] = useState([]);

  type ResponseData = {
    members: string[];
    groupName: string;
  };

  const fetchNews = async () => {
    try {
      setList([]);
      setError(null);
      setLoading(true);
      const response = await axios.get<ResponseData>('http://15.165.67.130:9000/schedules/1');
      //사용자userIdx로 숫자 바꿔줘야함.
      console.log("------API get 결과-----");
      console.log(response.data.result);
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
  const navigation = useNavigation();
  const open = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, []);
  const goBack = useCallback(() => {
    navigation.navigate('TabNavigator');
  }, []);

  return (
    <SafeAreaView>
      <ScrollEnabledProvider>
        <View style={[styles.view]}>
          <NavigationHeader
            title="자세히보기"
            Left={() => <Icon name="menu" size={30} onPress={open} />}
            Right={() => <Icon name="replay" size={30} onPress={goBack} />}
          />
          {/* 화면상단 문구 */}
          <View style={[styles.nameView]}>
            <Text style={[styles.name]}>{list.groupName}</Text>
          </View>
          {/* {list.members.map((each,index) => (
            <Text key={index}>{each}</Text>
          ))}
          <View style={[styles.membersView]}>
            <Text style={[styles.members]}>{list.members}</Text>
          </View> */}
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
  nameView: {
    borderWidth: 1,
    borderRadius: 15,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: Colors.lightBlue500,
  },
  name: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  members: {
    paddingTop: 15,
    width: '100%',
  },
  membersView: {
    
  }
});
