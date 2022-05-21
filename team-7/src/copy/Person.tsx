import React, { FC, useCallback, useState } from 'react';
import { Image } from 'react-native';
import {
  View,
  Text,
  TouchableView,
  MaterialCommunityIcon as Icon,
} from '../theme/navigation';
import * as D from '../data';
import { styles } from './Person.style';
import moment from 'moment-with-locales-es6';
import { Colors } from 'react-native-paper';
import { Avatar } from '../components';

moment.locale('ko');

export type PersonProps = {
  person: D.IPerson;
  deletePressed: () => void;
};

const Person: FC<PersonProps> = ({ person: initialPerson, deletePressed }) => {
  const [person, setPerson] = useState<D.IPerson>(initialPerson);

  return (
    <View style={styles.view}>
      <View style={styles.leftView}>
        <Avatar imageStyle={styles.avatar} uri={person.avatar} size={50} />
      </View>
      <View style={styles.rightView}>
        <Text style={styles.name}>{person.name}</Text>
        <Text style={styles.email}>{person.email}</Text>
        <View style={styles.dateView}>
          <Text style={styles.text}>
            {moment(person.createDate).startOf('day').fromNow()}
          </Text>
          <Icon
            name="trash-can"
            size={30}
            color={Colors.lightBlue500}
            onPress={deletePressed}
          />
        </View>
        <Text
          numberOfLines={3}
          ellipsizeMode={'tail'}
          style={[styles.text, styles.comments]}
        >
          {person.comments}
        </Text>
        <Image style={styles.image} source={{ uri: person.image }} />
        <View style={styles.countsView}>
          <TouchableView style={styles.countView}>
            <Icon name="comment" size={24} color={Colors.blue500} />
            <Text>{person.counts.comment}</Text>
          </TouchableView>
          <TouchableView style={styles.countView}>
            <Icon name="retweet" size={24} color={Colors.purple500} />
            <Text>{person.counts.retweet}</Text>
          </TouchableView>
          <TouchableView style={styles.countView}>
            <Icon name="heart" size={24} color={Colors.red500} />
            <Text>{person.counts.heart}</Text>
          </TouchableView>
        </View>
      </View>
    </View>
  );
};

export default Person;