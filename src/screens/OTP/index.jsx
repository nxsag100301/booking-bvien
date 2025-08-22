import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, parseSizeHeight, parseSizeWidth, Sizes } from '../../theme';
import MyButton from '../../components/Button/MyButton';

export default function OTP() {
  const length = 4;
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputsRef = useRef([]);

  const handleChange = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // focus tiếp theo nếu có nhập
    if (text && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    alert('OTP nhập: ' + otp.join(''));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xác thực OTP</Text>
      <Text style={styles.subTitle}>Nhập mã OTP gồm 4 số vừa gửi cho bạn</Text>

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

      <MyButton
        onPress={handleVerify}
        label={'Xác nhận'}
        style={styles.button}
        labelStyle={styles.buttonText}
      />
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subTitle: {
    fontSize: Sizes.text_subtitle1,
    color: '#666',
    marginBottom: parseSizeHeight(24),
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginTop: parseSizeHeight(32),
    backgroundColor: Colors.primary_600,
    paddingVertical: parseSizeHeight(12),
    paddingHorizontal: parseSizeWidth(42),
  },
  buttonText: {
    fontSize: Sizes.text_subtitle1,
    fontWeight: 600,
  },
});
