import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
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
import { Calendar, DateData } from 'react-native-calendars';
import moment from 'moment';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil/atom';
import { Text } from '../theme';

type Iplay = {
  isSuccess: string;
  code: number;
  message: string;
  result: IResult[];
};

type IResult = {
  concertIdx: number;
  name: string;
  location: string;
  img: string;
  startDate: string;
  endDate: string;
};

const Details = (num: number) => {
  const [resultCode, setResultCode] = useState();
  const [userIdx, setUserIdx] = useRecoilState<number>(userState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [memberlist, setMemberlist] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState<string[]>([
    moment().format('YYYY-MM-DD').toString(),
  ]);
  const [playData, setPlayData] = useState<IResult[]>([]);

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
      console.log('------API get 결과-----');
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

  useEffect(() => {
    const obj = selectedDate.reduce(
      (c, v) =>
        Object.assign(c, {
          [v.toString()]: { selected: true },
        }),
      {},
    );
    setMarkedDates(obj);
  }, [selectedDate]);

  const handleDateClick = (day: DateData) => {
    if (selectedDate.includes(day.dateString)) {
      setSelectedDate(selectedDate.filter((dates) => dates !== day.dateString));
    } else {
      setSelectedDate([day.dateString]);
      const textreg = day.dateString.replace(/-/gi, '.');

      axios
        .get(`http://15.165.67.130:9000/concert?date=${textreg}`)
        .then(function ({ data }) {
          setPlayData(data.result);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    console.log(playData);
  }, [playData]);
  return (
    <SafeAreaView>
      <NavigationHeader
        title="자세히보기"
        Left={() => <Icon name="menu" size={30} onPress={open} />}
        Right={() => <Icon name="replay" size={30} onPress={goBack} />}
      />
      {/* 화면상단 문구 */}
      <View style={[styles.nameView]}>
        <Text style={[styles.name]}>{list.groupName}</Text>
      </View>
      <Calendar onDayPress={handleDateClick} markedDates={markedDates} />
      <ScrollView style={styles.playView}>
        {playData.map((val, idx) => (
          <View key={idx} style={styles.playItem}>
            <Image
              source={{
                uri: `${val.img}`,
              }}
              style={styles.logo}
            />
            <View style={styles.view}>
              <Text style={styles.playTitle}>{val.name}</Text>
              <Text style={styles.playText}>{val.location}</Text>
              <Text style={styles.playText}>시작일 : {val.startDate}</Text>
              <Text style={styles.playText}>종료일 : {val.endDate}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  view: { flex: 1 },
  playView: {
    flex: 1,
    padding: 10,
  },
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
  membersView: {},
  logo: {
    width: 120,
    height: 120,
    marginRight: 10,
    borderRadius: 10,
  },
  playItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  playTitle: {
    fontSize: 16,
    fontWeight: '700',
    paddingTop: 5,

    paddingBottom: 8,
  },
  playText: {
    color: Colors.grey800,
  },
});
