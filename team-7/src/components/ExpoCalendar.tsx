import React, { useEffect, useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { View, Text, TextInput, TouchableView } from '../theme';
import moment from 'moment';
import axios from 'axios';
import { Colors } from 'react-native-paper';
import * as Clipboard from 'expo-clipboard';
import { Alert } from 'react-native';

export default function App() {
  const [selectedDate, setSelectedDate] = useState<string[]>([
    moment().format('YYYY-MM-DD').toString(),
  ]);
  const [text, setText] = useState('');
  const [resultCode, setResultCode] = useState();
  const [markedDates, setMarkedDates] = useState({});
  const [copiedText, setCopiedText] = useState('');
  const [createSchedule, setCreateSchedule] = useState(false);

  const copyToClipboard = async (text: string) => {
    await Clipboard.setString(text);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };

  const handleDateClick = (day: DateData) => {
    if (selectedDate.includes(day.dateString)) {
      setSelectedDate(selectedDate.filter((dates) => dates !== day.dateString));
    } else {
      setSelectedDate((dates) => [...dates, day.dateString]);
    }
  };

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

  const handleMakeSchedule = () => {
    axios
      .post('http://15.165.67.130:9000/schedules', {
        groupName: text,
        userIdx: 1,
        dateList: selectedDate,
      })
      .then(function (response) {
        setCreateSchedule(true);
        console.log(response.data);
        setResultCode(response.data.result);
        Alert.alert('일정이 생성되었습니다. 날짜를 골라주세요.!');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleShareSchedule = () => {
    setCreateSchedule(false);
    const route = `34.64.230.17:3000/${resultCode}`;
    copyToClipboard(route);
    Alert.alert(route);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textInputView}>
        <TextInput
          style={styles.textInput}
          placeholder="그룹명을 입력해주세요"
          placeholderTextColor={'gray'}
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? Colors.lightBlue600 : Colors.lightBlue500,
            },
            styles.btn,
          ]}
          onPress={handleMakeSchedule}
        >
          <Text style={styles.text}>일정 생성하기</Text>
        </Pressable>
      </View>
      {createSchedule ? (
        <Calendar onDayPress={handleDateClick} markedDates={markedDates} />
      ) : (
        <View onTouchStart={() => Alert.alert('일정을 먼저 생성해주세요.')}>
          <Calendar
            current={moment().format('YYYY-MM-DD').toString()}
            minDate={'2000-05-10'}
            maxDate={'2000-05-30'}
            monthFormat={'yyyy MM'}
            hideArrows={true}
            hideExtraDays={true}
            disableMonthChange={true}
            firstDay={1}
            hideDayNames={true}
            showWeekNumbers={true}
            disableArrowLeft={true}
            disableArrowRight={true}
            disableAllTouchEventsForDisabledDays={true}
            enableSwipeMonths={true}
          />
        </View>
      )}

      <View style={styles.flex} />
      <View style={styles.btnView}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? Colors.lightBlue600 : Colors.lightBlue500,
            },
            styles.btn,
          ]}
          onPress={() => setSelectedDate([])}
        >
          <Text style={styles.text}>선택된 날짜 모두 지우기</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? Colors.lightBlue600 : Colors.lightBlue500,
            },
            styles.btn,
          ]}
          onPress={handleShareSchedule}
        >
          <Text style={styles.text}>일정 공유하기</Text>
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
  flex: {
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
  btnView: {
    padding: 10,
  },
  btn: {
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  textInputView: {
    padding: 10,
  },
  textInput: {
    height: 40,
    padding: 10,
  },
  text: {
    color: 'white',
  },
});
