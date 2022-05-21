import React, {
  ComponentProps,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useRef,
} from 'react';
import { TextInput as RNTextInput, Keyboard } from 'react-native';
import { TextInput } from '../theme/paper';

export type TextInputMethods = {
  focus: () => void;
  dismiss: () => void;
};

export type ImperativeTextInputProps = ComponentProps<typeof RNTextInput>;
const ImperativeTextInput: ForwardRefRenderFunction<
  TextInputMethods,
  ImperativeTextInputProps
> = (props, ref) => {
  const textInputRef = useRef<RNTextInput | null>(null);
  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        textInputRef.current?.focus();
      },
      dismiss: () => {
        Keyboard.dismiss();
      },
    }),
    []
  );

  return <TextInput ref={textInputRef} {...props} />;
};

export default forwardRef(ImperativeTextInput);
