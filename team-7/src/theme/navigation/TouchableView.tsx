import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { FC } from 'react';
import type { ViewProps } from './View';
import { View } from '../paper';
export type TouchableViewProps = ViewProps & {
  onPress?: () => void;
  touchableStyle?: StyleProp<ViewStyle>;
};

export const TouchableView: FC<TouchableViewProps> = ({
  children,
  onPress,
  touchableStyle,
  ...viewProps
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.touchable, touchableStyle]}
    >
      <View {...viewProps}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
