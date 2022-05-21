import { StyleSheet, Text as RNText } from 'react-native';
import React, { ComponentProps, FC } from 'react';
import { useTheme } from '@react-navigation/native';
export type TextProps = ComponentProps<typeof RNText>;
export const Text: FC<TextProps> = ({ style, ...props }) => {
  const { colors } = useTheme();
  return (
    <RNText
      style={[{ color: colors.text, textDecorationColor: colors.text }, style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({});
