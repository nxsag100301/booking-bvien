import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MyHeader from '../../components/Header/MyHeader';
import CustomInput from './components/CustomInput';
import { Colors, parseSizeHeight, parseSizeWidth, Sizes } from '../../theme';
import MyButton from '../../components/Button/MyButton';
import { useNavigation } from '@react-navigation/native';

const BookingInformation = () => {
  const navigation = useNavigation();
  return (
    <>
      <MyHeader headerTitle="Thông tin đặt khám" />
      <View style={styles.container}>
        <Text style={styles.title}>Đặt khám theo gói</Text>
        <View style={styles.listInput}>
          <CustomInput
            label="Cơ sở khám"
            value="Cơ sở 1"
            screen="selectFacility"
          />
          <CustomInput
            label="Hồ sơ khám"
            value="Nguyễn Văn A"
            screen="selectProfile"
          />
          <CustomInput
            label="Gói khám"
            value="Gói người lớn"
            screen="bookAPakage"
          />
          <CustomInput
            label="Lịch khám"
            value=""
            error="Test error: Chưa chọn lịch khám"
            screen="selectSchedule"
          />
          <CustomInput
            label="Giờ khám"
            value="8:00 - 9:00"
            screen="selectTime"
          />
        </View>
        <MyButton
          onPress={() => navigation.navigate('confirmBookingInfo')}
          label={'Tiếp tục'}
          style={styles.buttonContinue}
        />
      </View>
    </>
  );
};

export default BookingInformation;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: parseSizeWidth(16),
    flex: 1,
  },
  title: {
    fontSize: Sizes.text_subtitle1,
    fontWeight: 600,
    color: Colors.primary_600,
    marginTop: parseSizeHeight(16),
    marginBottom: parseSizeHeight(24),
  },
  listInput: {
    gap: parseSizeHeight(16),
  },
  buttonContinue: {
    position: 'absolute',
    bottom: 0,
    left: parseSizeWidth(16),
    right: parseSizeWidth(16),
    height: parseSizeHeight(44),
  },
});
