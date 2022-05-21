import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useCallback, useState } from 'react';
import { ScrollEnabledProvider } from '../contexts';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import NavigationHeader from '../theme/NavigationHeader';
import { SafeAreaView, View, MaterialCommunityIcon as Icon } from '../theme';
import { useEffect } from 'react';
import axios from 'axios';
import ListData from '../../db.json';

const My = () => {
  const navigation = useNavigation();
  const open = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, []);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  // console.log(ListData.mylist);

  // const fetchNews = async () => {
  //   try {
  //     setList([]);
  //     setError(null);
  //     setLoading(true);
  //     const response = await axios.get('http://localhost:3001/mylist');
  //     console.log(response);
  //     // setList(response);
  //   } catch (e) {
  //     console.log('err');
  //     console.log(e);
  //     //setError(e);
  //   }
  //   setLoading(false);
  // };
  // useEffect(() => {
  //   fetchNews();
  // }, []);
  const onPress = () => alert('상세정보');
  return (
    <SafeAreaView>
      <ScrollEnabledProvider>
        <View style={[styles.view]}>
          <NavigationHeader
            title="MyMyMy"
            Left={() => <Icon name="menu" size={30} onPress={open} />}
            // Right={() => <Icon name="logout" size={30} onPress={logout} />}
          />
          {/* 화면상단 문구 */}
          <Text>자신이 참여한 약속장소들 모음</Text>
          {ListData.mylist.map((user, index) => (
            <TouchableOpacity key={index} onPress={onPress}>
              <View style={[styles.listView]}>
                {/* <Text>모임장 구분 번호 : {user.userIdx}</Text> */}
                <Text>모임 구분 번호 {user.schedulesIdx}</Text>
                <Text>모임 이름 : {user.groupName}</Text>
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
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'blue',
    // width: '100%',
    padding: 5,
    marginBottom: 15,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
