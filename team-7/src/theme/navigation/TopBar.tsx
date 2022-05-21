import { StyleSheet, Text } from 'react-native';
import React, { FC } from 'react';
import { ViewProps, View } from './View';
import { useTheme } from '@react-navigation/native';
import { Switch } from './Switch';

export type TopBarProps = ViewProps & {
  noSwitch?: boolean;
};
export const TopBar: FC<TopBarProps> = ({
  noSwitch,
  children,
  style,
  ...props
}) => {
  const { dark } = useTheme();
  return (
    <View card={!dark} primary={dark} style={[styles.topBar, style]} {...props}>
      {children}
      <View style={styles.flex} />
      {!noSwitch && <Switch />}
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  flex: { flex: 1 },
});
