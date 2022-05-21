import React, { useState } from 'react';
import {
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
  Text,
  View,
} from 'react-native';
import moment from 'moment';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export default function TimePicker() {
  const [date, setDate] = useState('');
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(moment(currentDate).format('YYYY-MM-DD'));
  };
  console.log(date);

  return (
    <>
      <View>
        <RNDateTimePicker
          display="spinner"
          value={new Date()}
          onChange={onChange}
          locale="ko"
        />
      </View>
    </>
  );
}
