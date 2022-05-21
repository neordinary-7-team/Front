import { FlatList, StyleSheet } from 'react-native';
import React, { useCallback, useState, useEffect, useRef } from 'react';
import * as D from '../data';
import Person from './Person';
import { useScrollEnabled, ScrollEnabledProvider } from '../contexts';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import NavigationHeader from '../theme/NavigationHeader';
import { LeftRightNavigation, LeftRightNavigationMethods } from '../components';
import {
  SafeAreaView,
  View,
  Text,
  TopBar,
  MaterialCommunityIcon as Icon,
} from '../theme';

const title = 'Home';

const Home = () => {
  // navigation
  const navigation = useNavigation();
  const goLeft = useCallback(() => navigation.navigate('HomeLeft'), []);
  const goRight = useCallback(
    () => navigation.navigate('HomeRight', { name: 'Jack', age: 32 }),
    []
  );
  const logout = useCallback(() => {
    navigation.navigate('Login');
  }, []);
  const open = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, []);
  // for people
  const [scrollEnabled] = useScrollEnabled();
  const [people, setPeople] = useState<D.IPerson[]>([]);

  const addPerson = useCallback(() => {
    setPeople((people) => [D.createRandomPerson(), ...people]);
  }, []);

  const removeAllPersons = useCallback(() => {
    setPeople((notUsed) => []);
  }, []);

  const deletePerson = useCallback(
    (id: string) => () =>
      setPeople((people) => people.filter((person) => person.id != id)),
    []
  );

  useEffect(() => D.makeArray(5).forEach(addPerson), []);

  const leftRef = useRef<LeftRightNavigationMethods | null>(null);
  const flatListRef = useRef<FlatList | null>(null);

  return (
    <SafeAreaView>
      <ScrollEnabledProvider>
        <View style={[styles.view]}>
          <NavigationHeader
            title="Home"
            Left={() => <Icon name="menu" size={30} onPress={open} />}
            Right={() => <Icon name="logout" size={30} onPress={logout} />}
          />
          <TopBar>
            <Text onPress={goLeft} style={styles.text}>
              go Left
            </Text>
            <Text onPress={goRight} style={styles.text}>
              go Right
            </Text>
          </TopBar>

          <TopBar noSwitch>
            <Text onPress={addPerson} style={styles.text}>
              add
            </Text>
            <Text onPress={removeAllPersons} style={styles.text}>
              remove all
            </Text>
          </TopBar>
          <LeftRightNavigation
            ref={leftRef}
            distance={40}
            flatListRef={flatListRef}
            onLeftToRight={goLeft}
            onRightToLeft={goRight}
          >
            <FlatList
              ref={flatListRef}
              scrollEnabled={scrollEnabled}
              data={people}
              renderItem={({ item }) => (
                <Person person={item} deletePressed={deletePerson(item.id)} />
              )}
              keyExtractor={(item) => item.id}
            />
          </LeftRightNavigation>
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
