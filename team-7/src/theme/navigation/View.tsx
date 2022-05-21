import { View as RNView, Text } from 'react-native';
import React, { ComponentProps, FC } from 'react';
import { useTheme } from '@react-navigation/native';

export type ViewProps = ComponentProps<typeof RNView> & {
  border?: boolean;
  card?: boolean;
  primary?: boolean;
  notification?: boolean;
};

export const View: FC<ViewProps> = ({
  border,
  card,
  primary,
  notification,
  style,
  ...props
}) => {
  const { colors } = useTheme();
  const backgroundColor = card
    ? colors.card
    : primary
    ? colors.primary
    : notification
    ? colors.notification
    : colors.background;

  const borderColor = border ? colors.border : undefined;
  const borderWidth = border ? 1 : undefined;
  return (
    <RNView
      style={[{ backgroundColor, borderColor, borderWidth }, style]}
      {...props}
    />
  );
};
