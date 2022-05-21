import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useCallback, useState } from 'react';
import { ScrollEnabledProvider } from '../contexts';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import NavigationHeader from '../theme/NavigationHeader';
import { SafeAreaView, View, MaterialCommunityIcon as Icon } from '../theme';
import { useEffect } from 'react';
import axios from 'axios';

const My = () => {
  const navigation = useNavigation();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const fetchNews = async () => {
    try {
      setList([]);
      setError(null);
      setLoading(true);
      const response = await axios.get('http://localhost:3001/mylist');
      console.log(response);
      // setList(response);
    } catch (e) {
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
            title="MyMyMy"
            Left={() => <Icon name="menu" size={30} />}
            // Right={() => <Icon name="logout" size={30} onPress={logout} />}
          />
          {/* 화면상단 문구 */}
          <Text>여어ㅓㅓㅓ어기에 만들어놓은 약속장소들으으으으</Text>
          {/* {list.map((user, index) => (
            <TouchableOpacity>
              <View key={index}>
                <Text>{user.userIdx}</Text>
              </View>
              <View key={index}>
                <Text>{user.groupName}</Text>
              </View>
              <View key={index}>
                <Text>{user.schedulesIdx}</Text>
              </View>
            </TouchableOpacity>
          ))} */}
        </View>
      </ScrollEnabledProvider>
    </SafeAreaView>
  );
};

export default My;

const styles = StyleSheet.create({
  view: { flex: 1 },
  text: { marginRight: 10, fontSize: 20 },
});
