import { forwardRef } from 'react';
import type { ForwardRefRenderFunction, ComponentProps } from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export type TextInputProps = ComponentProps<typeof RNTextInput>;

export const _TextInput: ForwardRefRenderFunction<
  RNTextInput,
  TextInputProps
> = ({ style, ...props }, ref) => {
  const { colors } = useTheme();
  return (
    <RNTextInput
      ref={ref}
      style={[
        { color: colors.text, borderColor: colors.text },
        styles.textInput,
        style,
      ]}
      placeholderTextColor={colors.text}
      {...props}
    />
  );
};

export const TextInput = forwardRef(_TextInput);
const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
  },
});
