import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import MyTextInput from '../../components/Input/MyTextInput';
import { parseSizeWidth, parseSizeHeight, Colors, Sizes } from '../../theme';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import MyButton from '../../components/Button/MyButton';
import RadioGroup from '../../components/RadioGroup';
import { useNavigation } from '@react-navigation/native';
import { registerApi } from '../../api/auth';
import Toast from 'react-native-toast-message';

const radioData = [
  { label: 'Zalo', value: 1 },
  { label: 'Email', value: 2 },
];

// Schema validation
const registerSchema = z
  .object({
    phone: z.string().refine(val => /^\d{10}$/.test(val), {
      message: 'Số điện thoại không hợp lệ',
    }),
    email: z.string().email('Email không hợp lệ'),
    cccd: z.string().refine(val => /^\d{12}$/.test(val), {
      message: 'Số CCCD không hợp lệ',
    }),
    password: z.string().min(6, 'Mật khẩu phải ít nhất 6 ký tự'),
    confirmPassword: z.string().min(1, 'Mật khẩu nhập lại không được để trống'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Mật khẩu nhập lại không khớp',
    path: ['confirmPassword'],
  });

const Register = () => {
  const navigation = useNavigation();
  const [socialType, setSocialType] = useState(1);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      phone: '',
      email: '',
      cccd: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async data => {
    const variables = {
      DienThoai: data.phone,
      Email: data.email,
      MatKhau: data.password,
      SoCccd: data.cccd,
      xacthuc: socialType,
    };
    const res = await registerApi(variables);
    if (res?.statusCode === 200) {
      navigation.navigate('otp', {
        cccd: data.cccd,
        email: data.email,
        phoneNumber: data.phone,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: res?.message,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.avoid}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Đăng ký tài khoản</Text>
        <Text style={styles.subtitle}>Nhập thông tin để tiếp tục</Text>

        <View style={styles.inputContainer}>
          {/* Phone */}
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <MyTextInput
                label="Số điện thoại"
                value={value}
                onChange={onChange}
                placeholder="Nhập số điện thoại"
                keyboardType="numeric"
                error={errors.phone?.message}
              />
            )}
          />

          {/* Email */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <MyTextInput
                label="Email"
                value={value}
                onChange={onChange}
                placeholder="Nhập email"
                keyboardType="email-address"
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="cccd"
            render={({ field: { onChange, value } }) => (
              <MyTextInput
                label="CCCD"
                value={value}
                onChange={onChange}
                placeholder="Nhập số CCCD"
                error={errors.cccd?.message}
              />
            )}
          />

          {/* Password */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <MyTextInput
                label="Mật khẩu"
                value={value}
                onChange={onChange}
                placeholder="Nhập mật khẩu"
                secureTextEntry
                password
                error={errors.password?.message}
              />
            )}
          />

          {/* Confirm Password */}
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <MyTextInput
                label="Nhập lại mật khẩu"
                value={value}
                onChange={onChange}
                placeholder="Nhập lại mật khẩu"
                secureTextEntry
                password
                error={errors.confirmPassword?.message}
              />
            )}
          />
        </View>

        <RadioGroup
          data={radioData}
          checkedItem={socialType}
          onPress={setSocialType}
        />

        <MyButton
          label="Đăng ký"
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
        />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backHomeTxt}>Quay lại đăng nhập</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  avoid: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: parseSizeWidth(24),
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: Sizes.text_header1 + 4,
    fontWeight: '700',
    marginBottom: parseSizeHeight(6),
    color: Colors.gray_neutral_900,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Sizes.text_body1,
    color: Colors.gray_neutral_600,
    marginBottom: parseSizeHeight(32),
    textAlign: 'center',
  },
  inputContainer: {
    gap: parseSizeHeight(16),
    marginBottom: parseSizeHeight(16),
  },
  button: {
    height: parseSizeHeight(48),
    marginTop: parseSizeHeight(16),
  },
  backHomeTxt: {
    fontSize: Sizes.text_tagline1,
    fontStyle: 'italic',
    color: Colors.blue_500,
    textAlign: 'center',
    marginTop: parseSizeHeight(16),
  },
});
