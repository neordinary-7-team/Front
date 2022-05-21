import { View, Text, Switch as RNSwitch } from 'react-native';
import React, { ComponentProps, FC } from 'react';
import { useTheme } from '@react-navigation/native';
import { useToggleTheme } from '../../contexts';

export type SwitchProps = ComponentProps<typeof RNSwitch>;

export const Switch: FC<SwitchProps> = (props) => {
  const theme = useTheme();
  const toggleTheme = useToggleTheme();
  return <RNSwitch {...props} value={theme.dark} onValueChange={toggleTheme} />;
};
