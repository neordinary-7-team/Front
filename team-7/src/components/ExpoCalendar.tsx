import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Calendar, DateData } from 'react-native-calendars';
import { dateState } from '../recoil/atom';
import { View, Text, TextInput } from '../theme';
import { blue100 } from 'react-native-paper/lib/typescript/styles/colors';
import moment from 'moment';

export default function App() {
  const [selectedDate, setSelectedDate] = useState<String[]>([
    moment().format('YYYY-MM-DD').toString(),
  ]);
  const [markedDates, setMarkedDates] = useState({});
  const handleDateClick = (day: DateData) => {
    if (selectedDate.includes(day.dateString)) {
      setSelectedDate(selectedDate.filter((dates) => dates !== day.dateString));
    } else {
      setSelectedDate((dates) => [...dates, day.dateString]);
    }
  };
  useEffect(() => {
    let obj = selectedDate.reduce(
      (c, v) =>
        Object.assign(c, {
          [v.toString()]: { selected: true },
        }),
      {}
    );
    setMarkedDates(obj);
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <View style={styles.textInputView}>
        <TextInput
          style={styles.textInput}
          placeholder="그룹명을 입력해주세요"
          placeholderTextColor={'gray'}
        />
        <Pressable style={styles.btn}>
          <Text>일정 생성하기</Text>
        </Pressable>
      </View>
      <Calendar onDayPress={handleDateClick} markedDates={markedDates} />
      {/* <View style={styles.dateView}>
        <Text style={styles.dateTitle}>선택된 날짜</Text>
        {selectedDate.map((val, idx) => (
          <Text key={idx}>{val}</Text>
        ))}
      </View> */}
      <View style={styles.btnView}>
        <Pressable style={[styles.btn]} onPress={() => setSelectedDate([])}>
          <Text>선택된 날짜 모두 지우기</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => setSelectedDate([])}>
          <Text>일정 공유하기</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  dateView: {
    marginTop: 12,
    flex: 1,
  },
  dateTitle: {
    textAlign: 'center',
    fontSize: 24,
  },
  btnView: {},
  btn: {
    alignItems: 'center',
    padding: 10,
  },
  textInputView: {
    padding: 10,
  },
  textInput: {
    height: 40,
    padding: 10,
  },
});
