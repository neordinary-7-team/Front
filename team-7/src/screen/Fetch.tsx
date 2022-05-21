import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as D from '../data';
import Country from './Country';
import { Colors } from 'react-native-paper';
import { useAsync } from '../hooks';

const Fetch = () => {
  const [countries, setCountries] = useState<D.ICountry[]>([]);
  const [error, resetError] = useAsync(async () => {
    setCountries([]);
    resetError();
    // Error 타입의 객체가 reject 되는 경우를 테스트 하려면 주석 제거
    // await Promise.reject(new Error('some error occurs'));
    const countries = await D.getCountries();
    setCountries(countries);
  });

  return (
    <View style={styles.view}>
      <Text style={styles.title}>Fetch</Text>
      {error && <Text>error : {error.message} </Text>}
      <FlatList
        data={countries}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Country country={item} />}
        keyExtractor={(notUsed, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default Fetch;

const styles = StyleSheet.create({
  view: { flex: 1, alignItems: 'center', backgroundColor: Colors.blue500 },
  title: { fontSize: 30, fontWeight: '600' },
  separator: { borderBottomColor: Colors.blue50, borderBottomWidth: 1 },
});
