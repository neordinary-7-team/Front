import React from 'react';
import { StyleSheet, View } from 'react-native';
import MyStack from './components/Navigation';

export default function App() {
  return (
    <View>
      <MyStack />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
