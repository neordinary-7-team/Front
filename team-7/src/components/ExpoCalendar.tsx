import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import moment from 'moment';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default function App() {
  const currentDate = moment().format('YYYY-MM-DD');
  return (
    <Calendar
      markingType={'period'}
      markedDates={{
        '2012-05-20': { textColor: 'green' },
        '2012-05-22': { startingDay: true, color: 'green' },
        '2012-05-23': {
          selected: true,
          endingDay: true,
          color: 'green',
          textColor: 'gray',
        },
        '2012-05-04': {
          disabled: true,
          startingDay: true,
          color: 'green',
          endingDay: true,
        },
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
