import { Alert, StyleSheet } from 'react-native';
import {
  SafeAreaView,
  View,
  Text,
  MaterialCommunityIcon as Icon,
  TopBar,
} from '../theme/navigation';
import React, { useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as D from '../data';
import NavigationHeader from '../theme/NavigationHeader';
import { LeftRightNavigation } from '../components';

const title = 'Home Right';
const HomeRight = () => {
  const navigation = useNavigation();
  const goBack = useCallback(
    () => navigation.canGoBack() && navigation.goBack(),
    []
  );
  const goHome = useCallback(() => navigation.navigate('Home'), []);

  const route = useRoute();
  return (
    <SafeAreaView>
      <View style={styles.view}>
        <NavigationHeader
          title={title}
          Left={() => (
            <Icon name="arrow-left-bold" size={50} onPress={goBack} />
          )}
          Right={() => (
            <Icon
              name="shield-airplane"
              size={30}
              onPress={() => Alert.alert('menu pressed')}
            />
          )}
        />
        <TopBar>
          <Text onPress={goBack}>go Left</Text>
          <Text onPress={goHome} style={{ marginLeft: 10 }}>
            go Right
          </Text>
        </TopBar>
        <LeftRightNavigation distance={40} onLeftToRight={goHome}>
          <View style={styles.content}>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.text}>
              route : {JSON.stringify(route, null, 2)}
            </Text>
          </View>
        </LeftRightNavigation>
      </View>
    </SafeAreaView>
  );
};

export default HomeRight;

const styles = StyleSheet.create({
  view: { flex: 1, padding: 5 },
  text: { fontSize: 20 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
