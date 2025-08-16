import { FlatList, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import MyHeader from '../../components/Header/MyHeader';
import { parseSizeHeight, parseSizeWidth } from '../../theme';
import TimeCard from './components/TimeCard';
import MyButton from '../../components/Button/MyButton';
import { useNavigation, useRoute } from '@react-navigation/native';

const data = [
  { date: 'Thứ 2 - 17/08/2025', time: '8:00 - 9:00' },
  { date: 'Thứ 2 - 17/08/2025', time: '9:00 - 10:00' },
  { date: 'Thứ 2 - 17/08/2025', time: '10:00 - 11:00' },
  { date: 'Thứ 2 - 17/08/2025', time: '13:00 - 14:00' },
  { date: 'Thứ 2 - 17/08/2025', time: '14:00 - 15:00' },
  { date: 'Thứ 2 - 17/08/2025', time: '16:00 - 17:00' },
];

const SelectTime = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { goBack = false } = route.params || {};
  const [checkedItem, setCheckedItem] = useState(null);
  return (
    <>
      <MyHeader headerTitle="Chọn giờ khám" />
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => item.time}
          data={data}
          renderItem={({ item }) => (
            <TimeCard
              timeData={item}
              checked={checkedItem?.time === item?.time ? true : false}
              onPress={() => setCheckedItem(item)}
            />
          )}
          style={styles.flatListStyle}
        />
        <MyButton
          onPress={() =>
            goBack
              ? navigation.goBack()
              : navigation.navigate('bookingInformation')
          }
          label={'Tiếp tục'}
          style={styles.buttonContinue}
        />
      </View>
    </>
  );
};

export default SelectTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListStyle: {
    paddingHorizontal: parseSizeWidth(16),
  },
  buttonContinue: {
    position: 'absolute',
    bottom: 0,
    left: parseSizeWidth(16),
    right: parseSizeWidth(16),
    height: parseSizeHeight(44),
  },
});
