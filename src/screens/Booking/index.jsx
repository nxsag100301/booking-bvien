import { FlatList, StyleSheet, View } from 'react-native';
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
    screen: 'selectFacility',
    checked: false,
  },
  {
    title: 'Đặt khám theo chuyên gia',
    description: 'Chọn chuyên gia mong muốn, liệu trình điều trị chuyên nghiệp',
    screen: 'selectFacility',
    checked: false,
  },
  {
    title: 'Đặt khám theo ngày',
    description: 'Đăng ký khám theo khung giờ tùy chọn',
    screen: 'selectFacility',
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
        <FlatList
          keyExtractor={item => item.title}
          data={initData}
          renderItem={({ item }) => (
            <View style={styles.selectItemContainer}>
              <SelectItem
                key={item.title}
                title={item.title}
                description={item.description}
                screen={item.screen}
                checked={checkedItem?.title === item?.title ? true : false}
                onPress={() => setCheckedItem(item)}
              />
            </View>
          )}
          contentContainerStyle={styles.renderItemStyle}
          style={styles.flatlistStyle}
        />
        <MyButton
          onPress={() =>
            checkedItem?.screen && navigation.navigate(checkedItem.screen)
          }
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
  flatlistStyle: {
    paddingHorizontal: parseSizeWidth(16),
  },
  selectItemContainer: {
    marginVertical: parseSizeHeight(8),
  },
  button: {
    position: 'absolute',
    bottom: 0,
    left: parseSizeWidth(16),
    right: parseSizeWidth(16),
    height: parseSizeHeight(44),
  },
  renderItemStyle: {
    marginBottom: parseSizeHeight(60),
  },
});
