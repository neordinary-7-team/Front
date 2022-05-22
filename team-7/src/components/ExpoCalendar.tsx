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
    Alert.alert('일정 공유링크가 복사되었습니다');
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
            // Initially visible month. Default = now
            current={moment().format('YYYY-MM-DD').toString()}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={'2012-05-10'}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={'2012-05-30'}
            // Handler which gets executed on day press. Default = undefined

            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={(day) => {
              console.log('selected day', day);
            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'yyyy MM'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined

            // Hide month navigation arrows. Default = false
            hideArrows={true}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={true}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
            firstDay={1}
            // Hide day names. Default = false
            hideDayNames={true}
            // Show week numbers to the left. Default = false
            showWeekNumbers={true}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={(subtractMonth) => subtractMonth()}
            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
            onPressArrowRight={(addMonth) => addMonth()}
            // Disable left arrow. Default = false
            disableArrowLeft={true}
            // Disable right arrow. Default = false
            disableArrowRight={true}
            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
            disableAllTouchEventsForDisabledDays={true}
            // Replace default month and year title with custom one. the function receive a date as parameter

            // Enable the option to swipe between months. Default = false
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
