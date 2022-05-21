import { StyleSheet, Text } from 'react-native';
import React, { useCallback } from 'react';
import { ScrollEnabledProvider } from '../contexts';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import NavigationHeader from '../theme/NavigationHeader';
import { SafeAreaView, View, MaterialCommunityIcon as Icon } from '../theme';

const My = () => {
  const navigation = useNavigation();

  const logout = useCallback(() => {
    navigation.navigate('Login');
  }, []);
  const open = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, []);

  return (
    <SafeAreaView>
      <ScrollEnabledProvider>
        <View style={[styles.view]}>
          <NavigationHeader
            title="MyMyMy"
            Left={() => <Icon name="menu" size={30} onPress={open} />}
            // Right={() => <Icon name="logout" size={30} onPress={logout} />}
          />
          {/* 화면상단 문구 */}
          <Text>여어ㅓㅓㅓㅓㅓㅓㅓㅓㅓ어기에 만들어놓은 약속장소들으으으으</Text>
        </View>
      </ScrollEnabledProvider>
    </SafeAreaView>
  );
};

export default My;

const styles = StyleSheet.create({
  view: { flex: 1 },
  text: { marginRight: 10, fontSize: 20 },
});
