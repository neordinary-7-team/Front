import { StyleSheet } from 'react-native';
import React, { useCallback, useState } from 'react';
import * as D from '../data';
import { AutoFocusProvider, useAutoFocus } from '../contexts';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, Text, TextInput, TouchableView, View } from '../theme';
import TabNavigator from './TabNavigator';
const Login = () => {
  const [person, setPerson] = useState<D.IPerson>(D.createRandomPerson());
  const [password, setPassword] = useState<string>(D.random(100000, 1000000).toString());
  const focus = useAutoFocus();
  const navigation = useNavigation();
  const goHomeNavigator = useCallback(() => navigation.navigate('TabNavigator'), []);
  const goSingUp = useCallback(() => navigation.navigate('SignUp'), []);

  return (
    <SafeAreaView>
      <View style={styles.view}>
        <AutoFocusProvider contentContainerStyle={styles.keyboardAwareFocus}>
          <View style={styles.textView}>
            <Text style={styles.text}>email</Text>
            <View border style={styles.textInputView}>
              <TextInput
                onFocus={focus}
                style={styles.textInput}
                value={person.email}
                onChangeText={(email) => setPerson((person) => ({ ...person, email }))}
                placeholder="enter your email"
              />
            </View>
          </View>
          <View style={styles.textView}>
            <Text style={styles.text}>password</Text>
            <View border style={styles.textInputView}>
              <TextInput
                secureTextEntry
                onFocus={focus}
                style={styles.textInput}
                value={password}
                onChangeText={setPassword}
                placeholder="enter your password"
              />
            </View>
          </View>
          <TouchableView notification style={styles.TouchableView} onPress={goHomeNavigator}>
            <Text style={styles.text}>Login</Text>
          </TouchableView>
          <Text style={[styles.text, { marginTop: 15 }]} onPress={goSingUp}>
            Sign Up
          </Text>
        </AutoFocusProvider>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  keyboardAwareFocus: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textView: {
    width: '100%',
    padding: 5,
    marginBottom: 10,
  },
  textInput: {
    fontSize: 24,
    padding: 10,
  },
  textInputView: {
    marginTop: 5,
    borderRadius: 10,
  },
  TouchableView: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
