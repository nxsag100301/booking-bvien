import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MyHeader from '../../components/Header/MyHeader';
import { Colors, parseSizeHeight, parseSizeWidth, Sizes } from '../../theme';
import icons from '../../constants/icons';
import MyButton from '../../components/Button/MyButton';
import { useNavigation } from '@react-navigation/native';

const AppointmentSuccessful = () => {
  const navigation = useNavigation();
  return (
    <>
      <MyHeader headerTitle="Đặt hẹn thành công" />
      <View style={styles.container}>
        <View style={styles.confirmIconContainer}>
          <Image source={icons.confirm} style={styles.confirmIcon} />
        </View>
        <Text style={styles.title}>Đã tiếp nhận thông tin</Text>
        <Text style={styles.description}>
          Chúng tôi sẽ gửi thông báo cho bạn qua Zalo hoặc SMS sau khi xác nhận
          chính thức đặt lịch thành công
        </Text>
        <Text style={styles.noteTitle}>Lưu ý quan trọng khi để lịch khám</Text>
        <View>
          <View style={styles.noteDescriptionContainer}>
            <View style={styles.dot} />
            <Text style={styles.note}>
              Việc đăng ký khám sẽ chưa được xác nhận chính thức nếu chưa thanh
              toán tiền cọc
            </Text>
          </View>
          <View style={styles.noteDescriptionContainer}>
            <View style={styles.dot} />
            <Text style={styles.note}>
              Trong vòng 5 giờ kể từ thời điểm đăng ký, nếu có khách hàng khách
              đặt cùng khung giờ và đã thanh toán cọc, lịch khám của quý khách
              sẽ bị hủy tự động.
            </Text>
          </View>
          <View style={styles.noteDescriptionContainer}>
            <View style={styles.dot} />
            <Text style={styles.note}>
              Sau khi hủy, hệ thống sẽ gửi thông báo đến bạn để cập nhật và chọn
              lại lịch khám khác(nếu cần).
            </Text>
          </View>
        </View>
      </View>
      <MyButton
        onPress={() => navigation.navigate('selectPaymentMethod')}
        label={'Thanh toán'}
        style={styles.buttonContinue}
      />
    </>
  );
};

export default AppointmentSuccessful;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: parseSizeWidth(16),
    gap: parseSizeHeight(16),
  },
  confirmIconContainer: {
    height: parseSizeHeight(88),
    width: parseSizeWidth(88),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999,
    backgroundColor: Colors.success_100,
    marginTop: parseSizeHeight(16),
    marginHorizontal: 'auto',
  },
  confirmIcon: {
    height: parseSizeHeight(44),
    width: parseSizeWidth(44),
    zIndex: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: Sizes.text_subtitle1,
    fontWeight: 600,
    color: Colors.success_600,
    textTransform: 'uppercase',
  },
  description: {
    textAlign: 'center',
    fontSize: Sizes.text_subtitle1,
    marginBottom: parseSizeHeight(16),
  },
  noteTitle: {
    fontStyle: 'italic',
    textAlign: 'center',
    color: Colors.primary_600,
  },
  noteDescriptionContainer: {
    flexDirection: 'row',
    gap: parseSizeWidth(8),
    marginVertical: parseSizeHeight(4),
  },
  note: {
    fontStyle: 'italic',
    textAlign: 'justify',
    color: Colors.primary_600,
  },
  dot: {
    width: parseSizeWidth(6),
    height: parseSizeHeight(6),
    marginTop: parseSizeHeight(4),
    borderRadius: 9999,
    backgroundColor: Colors.primary_600,
  },
  buttonContinue: {
    position: 'absolute',
    bottom: 0,
    left: parseSizeWidth(16),
    right: parseSizeWidth(16),
    height: parseSizeHeight(44),
  },
});
