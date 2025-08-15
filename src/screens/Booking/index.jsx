import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import MyHeader from '../../components/Header/MyHeader';
import { parseSizeHeight, parseSizeWidth } from '../../theme';
import SelectItem from './components/SelectItem';
import MyButton from '../../components/Button/MyButton';
import { useNavigation } from '@react-navigation/native';

const initData = [
  {
    title: 'Đặt khám theo gói khám',
    description: 'Chọn gói khám phù hợp - Sức khoẻ trọn gói, an tâm tuyệt đối',
    screen: 'selectfacility',
    checked: false,
  },
  {
    title: 'Đặt khám theo chuyên gia',
    description: 'Chọn chuyên gia mong muốn, liệu trình điều trị chuyên nghiệp',
    screen: 'selectfacility',
    checked: false,
  },
  {
    title: 'Đặt khám theo ngày',
    description: 'Đăng ký khám theo khung giờ tùy chọn',
    screen: 'selectfacility',
    checked: false,
  },
];

const Booking = () => {
  const navigation = useNavigation();
  const [checkedItem, setCheckedItem] = useState(null);

  return (
    <>
      <MyHeader headerTitle="Đặt khám" />
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {initData.map(item => (
            <SelectItem
              key={item.title}
              title={item.title}
              description={item.description}
              screen={item.screen}
              checked={checkedItem?.title === item?.title ? true : false}
              onPress={() => setCheckedItem(item)}
            />
          ))}
        </ScrollView>
        <MyButton
          onPress={() => navigation.navigate(checkedItem?.screen)}
          label={'Tiếp tục'}
          style={styles.button}
        />
      </View>
    </>
  );
};

export default Booking;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  scrollViewContent: {
    gap: parseSizeHeight(16),
    paddingBottom: parseSizeHeight(80),
    paddingHorizontal: parseSizeWidth(16),
  },
  button: {
    position: 'absolute',
    bottom: 0,
    left: parseSizeWidth(16),
    right: parseSizeWidth(16),
    height: parseSizeHeight(44),
  },
});
