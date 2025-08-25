import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import MyHeader from '../../components/Header/MyHeader';
import CalendarCustom from './components/CalendarCustom';
import {
  Colors,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
} from '../../theme';
import MyButton from '../../components/Button/MyButton';
import { useNavigation, useRoute } from '@react-navigation/native';

const SelectSchedule = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { goBack = false } = route.params || {};
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const [selected, setSelected] = useState(todayStr);

  return (
    <>
      <MyHeader headerTitle="Chọn lịch khám" />
      <View style={styles.container}>
        <CalendarCustom selectedDate={selected} setSelectedDate={setSelected} />
        <View style={styles.bottomContent}>
          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>Lưu ý</Text>
            <Text>
              Trường hợp Bệnh nhân muốn đặt lịch ngay cho ngày mai, vui lòng
              hoàn thành việc đăng ký trước 23:00 hôm nay. Bệnh nhân chỉ có thể
              huỷ phiếu khám muộn nhất vào 14:00 của ngày đặt khám. Sau thời
              gian này, bệnh nhân không thể huỷ lịch trên App/Website
            </Text>
          </View>
          <View style={styles.dateContainer}>
            <View
              style={[styles.dot, { backgroundColor: Colors.gray_neutral_300 }]}
            />
            <Text>Ngày không đặt khám được</Text>
          </View>
          <View style={styles.dateContainer}>
            <View
              style={[styles.dot, { backgroundColor: Colors.primary_600 }]}
            />
            <Text>Ngày hiện tại</Text>
          </View>
          <View style={styles.dateContainer}>
            <View style={[styles.dot, { backgroundColor: Colors.black }]} />
            <Text>Ngày đặt khám được</Text>
          </View>
          <View style={styles.dateContainer}>
            <View
              style={[styles.dot, { backgroundColor: Colors.warning_500 }]}
            />
            <Text>Ngày khám đã đầy lịch</Text>
          </View>
        </View>
        <MyButton
          onPress={() =>
            goBack
              ? navigation.goBack()
              : navigation.navigate('confirmBookingInfo')
          }
          label={'Tiếp tục'}
          style={styles.buttonContinue}
        />
      </View>
    </>
  );
};

export default SelectSchedule;

const styles = StyleSheet.create({
  container: {
    gap: parseSizeHeight(16),
    flex: 1,
  },
  bottomContent: {
    gap: parseSizeHeight(12),
  },
  noteContainer: {
    backgroundColor: Colors.warning_200,
    padding: parseSize(16),
    gap: parseSizeHeight(6),
  },
  noteText: {
    color: Colors.warning_500,
    fontWeight: 600,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseSizeWidth(8),
    paddingHorizontal: parseSizeWidth(16),
  },
  dot: {
    width: parseSizeWidth(8),
    height: parseSizeHeight(8),
    borderRadius: 9999,
  },
  buttonContinue: {
    position: 'absolute',
    bottom: 0,
    left: parseSizeWidth(16),
    right: parseSizeWidth(16),
    height: parseSizeHeight(44),
  },
});
