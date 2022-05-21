import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import React, { ComponentProps, FC } from 'react';

export type SafeAreaViewProps = ComponentProps<typeof RNSafeAreaView>;

export const SafeAreaView: FC<SafeAreaViewProps> = ({
  style,
  children,
  ...props
}) => {
  return (
    <RNSafeAreaView style={[styles.flex, style]}>{children}</RNSafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
