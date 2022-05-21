import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { Colors } from 'react-native-paper';
import { useTimeout, useToggle } from '../hooks';

//prettier-ignore
const Timer = () => {
  const [loading, toggleLoading] = useToggle(true);
  useTimeout(() => loading && toggleLoading(), 3000, [loading]);

  return (
    <View style={styles.view}>
      <Text style={styles.title}>Timer</Text>
      <Text>loading : {loading.toString()}</Text>
      <Button onPress={toggleLoading} title= {loading ? 'stop loading' : 'start loading'}/>
      {loading && (<ActivityIndicator size='large' color={Colors.deepPurple700}/>)}
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  view: { flex: 1, alignItems: 'center', backgroundColor: Colors.yellow300 },
  title: { fontSize: 30, fontWeight: '600' },
});
