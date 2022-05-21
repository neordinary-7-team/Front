import {
  findNodeHandle,
  Keyboard,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TextInputFocusEventData,
  View,
} from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import * as D from '../data';
import { useTheme } from 'react-native-paper';
import { AutoFocusProvider, useAutoFocus, useToggleTheme } from '../contexts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AutoFocus = () => {
  const [person, setPerson] = useState<D.IPerson>(D.createRandomPerson());
  const { dark, colors } = useTheme();
  const toggleTheme = useToggleTheme();

  const textInputRef = useRef<TextInput | null>(null);
  const setFocus = useCallback(
    () => textInputRef.current?.focus(),
    [textInputRef.current]
  );

  const textInputStyle = useMemo(
    () => [
      styles.textInput,
      { color: colors.text, borderColor: colors.placeholder },
    ],
    [colors.text, colors.placeholder]
  );

  const autoFocus = useAutoFocus();

  return (
    <View style={[styles.view, { backgroundColor: colors.surface }]}>
      <View style={[styles.topBar, { backgroundColor: colors.accent }]}>
        <Text style={[styles.textButton]} onPress={setFocus}>
          focus
        </Text>
        <Text style={[styles.textButton]} onPress={Keyboard.dismiss}>
          dismiss keyboard
        </Text>
        <View style={{ flex: 1 }}></View>
        <Switch value={dark} onValueChange={toggleTheme} />
      </View>
      <AutoFocusProvider contentContainerStyle={styles.flex}>
        <View style={styles.flex}></View>
        <View style={[styles.textView]}>
          <Text style={[styles.text, { color: colors.text }]}>email</Text>
          <TextInput
            style={textInputStyle}
            value={person.email}
            placeholder="enter your email"
            onChangeText={(email) =>
              setPerson((person) => ({ ...person, email }))
            }
            onFocus={autoFocus}
          />
        </View>
        <View style={[styles.textView]}>
          <Text style={[styles.text, { color: colors.text }]}>name</Text>
          <TextInput
            style={textInputStyle}
            value={person.email}
            placeholder="enter your name"
            onChangeText={(name) =>
              setPerson((person) => ({ ...person, name }))
            }
            onFocus={autoFocus}
          />
        </View>
      </AutoFocusProvider>
    </View>
  );
};

export default AutoFocus;

const styles = StyleSheet.create({
  view: { flex: 1 },
  topBar: { flexDirection: 'row', padding: 5 },
  textButton: { marginLeft: 10, fontSize: 20 },
  keyboardAvoidngView: { flex: 1, padding: 10 },
  textView: { padding: 5 },
  text: { fontSize: 24 },
  textInput: { fontSize: 24, borderWidth: 1, borderRadius: 5 },
  TextInput: { fontSize: 24, borderWidth: 1, borderRadius: 5 },
  flex: { flex: 1 },
});
