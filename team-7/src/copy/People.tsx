import { FlatList, StyleSheet } from 'react-native';
import React, { useCallback, useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TopBar } from '../theme/navigation';
import * as D from '../data';
import Person from './Person';
import { useScrollEnabled, ScrollEnabledProvider } from '../contexts';

const people = () => {
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

  return (
    <SafeAreaView>
      <ScrollEnabledProvider>
        <View style={[styles.view]}>
          <TopBar>
            <Text onPress={addPerson} style={styles.text}>
              add
            </Text>
            <Text onPress={removeAllPersons} style={styles.text}>
              remove all
            </Text>
          </TopBar>
          <FlatList
            scrollEnabled={scrollEnabled}
            data={people}
            renderItem={({ item }) => (
              <Person person={item} deletePressed={deletePerson(item.id)} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollEnabledProvider>
    </SafeAreaView>
  );
};

export default people;

const styles = StyleSheet.create({
  view: { flex: 1 },
  text: { marginRight: 10, fontSize: 20 },
});
