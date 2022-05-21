import { forwardRef, useMemo } from 'react';
import type { ForwardRefRenderFunction, ComponentProps } from 'react';
import { useTheme } from 'react-native-paper';
import { TextInput as RNTextInput } from 'react-native';
export type TextInputProps = ComponentProps<typeof RNTextInput>;

export const _TextInput: ForwardRefRenderFunction<
  RNTextInput,
  TextInputProps
> = ({ style, ...props }, ref) => {
  const { colors } = useTheme();
  return (
    <RNTextInput
      ref={ref}
      style={[{ color: colors.text, borderColor: colors.placeholder }, style]}
      {...props}
    />
  );
};

export const TextInput = forwardRef(_TextInput);
