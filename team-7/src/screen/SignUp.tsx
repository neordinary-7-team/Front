import { Alert, StyleSheet } from 'react-native';
import React, { useCallback, useState } from 'react';
import { AutoFocusProvider, useAutoFocus } from '../contexts';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, Text, TextInput, TouchableView, View } from '../theme';
import axios from 'axios';
import { Colors } from 'react-native-paper';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const focus = useAutoFocus();
  const navigation = useNavigation();
  const goLogin = useCallback(() => navigation.navigate('Login'), []);
  const goHomeNavigator = async () => {
    setUsername('');
    setEmail('');
    setPassword('');
    await axios
      .post('http://15.165.67.130:9000/users/signup', {
        name: username,
        email: email,
        password: password,
      })
      .then(function (response) {
        if (response.data.code == 2400) {
          Alert.alert('이미 가입한 이메일입니다༼;´༎ຶ۝༎ຶ༽');
        } else {
          navigation.navigate('TabNavigator');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <SafeAreaView>
      <View style={styles.view}>
        <AutoFocusProvider contentContainerStyle={styles.keyboardAwareFocus}>
          <View style={styles.textView}>
            <Text style={styles.loginsignin}>SIGN UP</Text>
            <Text style={styles.text}>UserName</Text>
            <View border style={styles.textInputView}>
              <TextInput
                onFocus={focus}
                style={styles.textInput}
                value={username}
                onChangeText={(username) => setUsername(username)}
                placeholder="what is your name?"
              />
            </View>
          </View>
          <View style={styles.textView}>
            <Text style={styles.text}>Email</Text>
            <View border style={styles.textInputView}>
              <TextInput
                onFocus={focus}
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                placeholder="enter your email"
              />
            </View>
          </View>
          <View style={styles.textView}>
            <Text style={styles.text}>Password</Text>
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
            <Text style={styles.text}>SIGN UP</Text>
          </TouchableView>
          <TouchableView style={styles.anotherTouchableView} onPress={goLogin}>
            <Text style={[styles.text]}>LOG IN</Text>
          </TouchableView>
        </AutoFocusProvider>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
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
    backgroundColor: Colors.lightBlue500,
    marginBottom: 15,
  },
  anotherTouchableView: {
    borderWidth: 1,
    borderRadius: 9,
    borderColor: Colors.lightBlue500,
    flexDirection: 'row',
    height: 50,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginsignin: {
    textAlign: 'center',
    fontSize: 35,
  },
});
