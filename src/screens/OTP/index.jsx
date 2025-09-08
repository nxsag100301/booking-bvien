import React, { useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Colors, parseSizeHeight, parseSizeWidth, Sizes } from '../../theme';
import MyButton from '../../components/Button/MyButton';
import icons from '../../constants/icons';
import { userVerifyOtpAPI } from '../../redux/slice/userSlice';
import { useDispatch } from 'react-redux';

export default function OTP() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { cccd, email, phoneNumber } = route?.params;
  const otpLength = 4;
  const [otp, setOtp] = useState(new Array(otpLength).fill(''));
  const inputsRef = useRef([]);

  const handleChange = (text, index) => {
    // chỉ cho nhập số
    if (!/^\d*$/.test(text)) return;

    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // focus tiếp theo nếu có nhập
    if (text && index < otpLength - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    await dispatch(
      userVerifyOtpAPI({
        cccd: cccd,
        code: otpValue,
        sdt: phoneNumber,
        Email: email,
      }),
    ).then(navigation.navigate('bottomTab'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xác thực tài khoản</Text>
      <Text style={styles.subTitle}>
        Vui lòng nhập OTP đã được gửi về email/zalo ...
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={ref => (inputsRef.current[index] = ref)}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            value={value}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.refreshContainer}>
        <Image source={icons.refresh} style={styles.refreshIcon} />
        <Text style={styles.resendTxt}>Gửi lại mã</Text>
      </TouchableOpacity>

      <MyButton
        onPress={handleVerify}
        label={'Xác nhận'}
        style={styles.button}
        labelStyle={styles.buttonText}
        disabled={otp.join('').length < otpLength} // disable nếu chưa đủ số
      />

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backHomeTxt}>Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: Sizes.text_h6,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.primary_600,
  },
  subTitle: {
    fontSize: Sizes.text_subtitle1,
    color: Colors.gray_neutral_950,
    marginBottom: parseSizeHeight(24),
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: parseSizeWidth(16),
  },
  input: {
    width: 50,
    height: 55,
    marginHorizontal: 5,
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  button: {
    marginVertical: parseSizeHeight(16),
    backgroundColor: Colors.primary_600,
    paddingVertical: parseSizeHeight(12),
    paddingHorizontal: parseSizeWidth(42),
  },
  buttonText: {
    fontSize: Sizes.text_subtitle1,
    fontWeight: '600',
  },
  refreshContainer: {
    flexDirection: 'row',
    gap: parseSizeWidth(8),
    alignItems: 'center',
    width: '100%',
    marginTop: parseSizeHeight(16),
    paddingHorizontal: parseSizeWidth(42),
  },
  refreshIcon: {
    width: parseSizeWidth(18),
    height: parseSizeHeight(18),
    tintColor: Colors.blue_500,
  },
  resendTxt: {
    color: Colors.blue_500,
  },
  backHomeTxt: {
    color: Colors.blue_500,
    fontStyle: 'italic',
  },
  error: {
    color: Colors.error_600,
    marginTop: parseSizeHeight(8),
    fontSize: Sizes.text_tagline1,
  },
});
