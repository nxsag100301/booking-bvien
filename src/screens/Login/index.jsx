import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { z } from 'zod';
import { useDispatch } from 'react-redux';

import MyTextInput from '../../components/Input/MyTextInput';
import { parseSizeWidth, parseSizeHeight, Colors, Sizes } from '../../theme';
import MyButton from '../../components/Button/MyButton';
import icons from '../../constants/icons';
import { userLoginAPI } from '../../redux/slice/userSlice';

const loginSchema = z.object({
  username: z.string().min(1, 'Vui lòng nhập tài khoản'),
  password: z.string().min(6, 'Mật khẩu phải ít nhất 6 ký tự'),
});

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async data => {
    try {
      const res = await dispatch(userLoginAPI(data)).unwrap();
      if (res?.thongTinBenhNhan?.statusCode === 200) {
        navigation.goBack();
      }
    } catch (err) {
      console.log('Login failed:', err);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.avoid}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.header}
      >
        <Image source={icons.back} tintColor="black" style={styles.backIcon} />
        <Text style={styles.backTxt}>Trở lại</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Chào mừng trở lại!</Text>
        <Text style={styles.subtitle}>Đăng nhập để tiếp tục</Text>

        <View style={styles.inputContainer}>
          {/* Username */}
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value } }) => (
              <MyTextInput
                label="Tài khoản"
                value={value}
                onChange={onChange}
                placeholder="Nhập tài khoản"
                error={errors.username?.message}
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
                error={errors.password?.message}
                password
              />
            )}
          />
        </View>

        <MyButton
          label="Đăng nhập"
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
        />

        {/* Forgot password */}
        <TouchableOpacity>
          <Text style={styles.forgotText}>Quên mật khẩu?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('register')}>
          <Text style={styles.noAccount}>Chưa có tài khoản?</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  avoid: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: parseSizeWidth(24),
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
    marginTop: parseSizeHeight(-20),
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
  },
  button: {
    height: parseSizeHeight(48),
    marginTop: parseSizeHeight(16),
  },
  buttonText: {
    color: Colors.white,
    fontSize: Sizes.text_subtitle1 + 1,
    fontWeight: '600',
  },
  forgotText: {
    textAlign: 'center',
    marginTop: parseSizeHeight(16),
    color: Colors.primary_500,
    fontSize: Sizes.text_tagline1,
  },
  noAccount: {
    textAlign: 'center',
    marginTop: parseSizeHeight(16),
    color: Colors.gray_neutral_900,
    fontSize: Sizes.text_tagline1,
  },
  backIcon: {
    height: parseSizeHeight(30),
    width: parseSizeWidth(15),
    tintColor: Colors.primary_600,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: parseSizeWidth(8),
    marginTop: parseSizeHeight(16),
  },
  backTxt: {
    fontSize: Sizes.text_subtitle1,
    fontWeight: 600,
    color: Colors.primary_600,
  },
});
