import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MyHeader from '../../components/Header/MyHeader';
import { Colors, parseSizeHeight, parseSizeWidth, Sizes } from '../../theme';
import MyButton from '../../components/Button/MyButton';
import { useNavigation } from '@react-navigation/native';

const InformationLine = ({ label, value }) => {
  return (
    <View style={styles.infoLineContainer}>
      <Text style={styles.labelText}>{label}:</Text>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  );
};

const ConfirmBookingInfo = () => {
  const navigation = useNavigation();
  return (
    <>
      <MyHeader headerTitle="Xác nhận thông tin" />
      <View style={styles.container}>
        <Text style={styles.title}>Hệ thống đã sắp xếp lịch cho quý khách</Text>
        <InformationLine label="Khách hàng" value="Trần Lê Tiến Hoà" />
        <InformationLine label="Ngày sinh" value="18/08/2000" />
        <InformationLine label="Dịch vụ" value="Đăng ký theo gói khám" />
        <InformationLine
          label="Cơ sở khám"
          value="Bệnh viện Ung Bướu - Cơ sở 2"
        />
        <InformationLine
          label="Khu khám"
          value="Tầng 1 - Khu khám chuyên gia"
        />
        <InformationLine label="Ngày khám" value="20/08/2025" />
        <InformationLine label="Dự kiến" value="8:00 - 9:00" />
      </View>
      <View style={styles.buttonContainer}>
        <MyButton
          variant="outline"
          label="Quay lại"
          labelColor={Colors.primary_600}
          style={styles.buttonStyle}
          onPress={() => navigation.goBack()}
        />
        <MyButton
          onPress={() => navigation.navigate('appointmentSuccessful')}
          label="Đặt hẹn"
          style={styles.buttonStyle}
        />
      </View>
    </>
  );
};

export default ConfirmBookingInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: parseSizeHeight(16),
    paddingHorizontal: parseSizeWidth(16),
    gap: parseSizeHeight(16),
  },
  infoLineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelText: {
    fontWeight: 500,
  },
  valueText: {
    fontWeight: 600,
    color: Colors.primary_600,
  },
  buttonContainer: {
    position: 'absolute',
    paddingHorizontal: parseSizeWidth(16),
    gap: parseSizeHeight(16),
    bottom: 0,
    width: '100%',
  },
  buttonStyle: {
    height: parseSizeHeight(44),
  },
  title: {
    fontSize: Sizes.text_h6,
    textTransform: 'uppercase',
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.success_700,
  },
});
