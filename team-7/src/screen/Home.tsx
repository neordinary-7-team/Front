import { StyleSheet } from 'react-native';
import React, { useCallback } from 'react';
import { ScrollEnabledProvider } from '../contexts';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import NavigationHeader from '../theme/NavigationHeader';
import ExpoCalendar from '../components/ExpoCalendar'
import {
  SafeAreaView,
  View,
  MaterialCommunityIcon as Icon,
} from '../theme';

const Home = () => {
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
            title="홈"
            Left={() => <Icon name="menu" size={30} onPress={open} />}
            Right={() => <Icon name="logout" size={30} onPress={logout} />}
          />
          <ExpoCalendar />
        </View>
      </ScrollEnabledProvider>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  view: { flex: 1 },
  text: { marginRight: 10, fontSize: 20 },
});
