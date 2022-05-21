import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import type { FC } from 'react';
import { useClock } from '../hooks/useClock';
export const Time: FC = () => {
  const time = useClock();
  return (
    <View>
      <Text style={[styles.digitFont, styles.time]}>
        {time.toLocaleTimeString()}
      </Text>
      <Text style={styles.digitFont}>{time.toLocaleDateString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  digitFont: {
    fontFamily: 'DancingScript',
    fontWeight: '400',
  },
  time: {
    fontSize: 50,
  },
});
