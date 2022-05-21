import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Colors } from 'react-native-paper';
import * as D from '../data';
import { Avatar } from '../components';
import { useInterval, useToggle } from '../hooks';

type IdAndAvatar = Pick<D.IPerson, 'id' | 'avatar'>;

const Interval = () => {
  const [avatars, setAvatars] = useState<IdAndAvatar[]>([]);
  const [start, toggleStart] = useToggle(true);
  const ClearAvatar = useCallback(() => setAvatars((notUsed) => []), []);

  useInterval(
    () => {
      if (start) {
        setAvatars((avatars) => [
          ...avatars,
          { id: D.randomId(), avatar: D.randomAvatarUrl() },
        ]);
      }
    },
    1000,
    [start]
  );

  //prettier-ignore
  const children = avatars.map(({id,avatar}) => (
    <Avatar key={id} uri={avatar} size={70} viewStyle={styles.avatarViewStyle} />
  ));

  return (
    <View style={styles.view}>
      <View style={styles.topBar}>
        <Text onPress={toggleStart} style={styles.topBarText}>
          {start ? 'stop' : 'start'}
        </Text>
        <Text onPress={ClearAvatar} style={styles.topBarText}>
          clear avatars
        </Text>
      </View>
      <Text style={styles.title}>Interval</Text>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        {children}
      </ScrollView>
    </View>
  );
};

export default Interval;

const styles = StyleSheet.create({
  view: { flex: 1, alignItems: 'center', backgroundColor: Colors.lime300 },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
    backgroundColor: Colors.blue900,
  },
  topBarText: { fontSize: 20, color: 'white' },
  contentContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  title: { fontSize: 30, fontWeight: '600' },
  avatarViewStyle: { padding: 5 },
});
