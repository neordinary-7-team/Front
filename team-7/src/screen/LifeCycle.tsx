import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useLayout } from '../hooks';
import { Colors } from 'react-native-paper';

const LifeCycle = () => {
  const [layout, setLayout] = useLayout();
  return (
    <View onLayout={setLayout} style={styles.view}>
      <Text style={styles.title}>LifeCycle</Text>
      <Text>layout : {JSON.stringify(layout, null, 2)}</Text>
    </View>
  );
};

export default LifeCycle;

const styles = StyleSheet.create({
  view: { flex: 1, alignItems: 'center', backgroundColor: Colors.blue100 },
  title: { fontSize: 30, fontWeight: '600' },
});
