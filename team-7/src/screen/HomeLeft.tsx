import { StyleSheet } from 'react-native';
import {
  SafeAreaView,
  View,
  Text,
  MaterialCommunityIcon as Icon,
} from '../theme/navigation';
import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as D from '../data';
import NavigationHeader from '../theme/NavigationHeader';
import { LeftRightNavigation } from '../components';

const title = '카메라 접근을 허가해 주세요.';

const HomeLeft = () => {
  const navigation = useNavigation();
  const goHome = useCallback(() => navigation.navigate('Home'), []);
  return (
    <SafeAreaView>
      <View style={styles.view}>
        <NavigationHeader
          Right={() => <Icon name="close" size={30} onPress={goHome} />}
        />
        <LeftRightNavigation distance={40} onRightToLeft={goHome}>
          <View style={styles.content}>
            <Text style={styles.text}>{title}</Text>
          </View>
        </LeftRightNavigation>
      </View>
    </SafeAreaView>
  );
};

export default HomeLeft;

const styles = StyleSheet.create({
  view: { flex: 1, padding: 5 },
  text: { fontSize: 20 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
