import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import MyHeader from '../../components/Header/MyHeader';
import MyTextInput from '../../components/Input/MyTextInput';
import { parseSizeHeight, parseSizeWidth, Sizes } from '../../theme';
import RadioGroup from '../../components/RadioGroup';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import MyButton from '../../components/Button/MyButton';
import icons from '../../constants/icons';
import ScanQR from '../../components/ScanQR';
import dayjs from 'dayjs';

const genderRadioData = [
  { label: 'Nam', value: 0 },
  { label: 'Nữ', value: 1 },
];

const addressRadioData = [
  { label: 'Trước sáp nhập', value: 'before' },
  { label: 'Sau sáp nhập', value: 'after' },
];

const profileSchema = z.object({
  fullName: z.string().min(1, 'Vui lòng nhập họ tên'),
  birthDate: z.string().min(1, 'Vui lòng nhập ngày sinh'),
  cccd: z.string().min(9, 'CCCD phải ít nhất 9 số'),
  phone: z.string().regex(/^(0[0-9]{9})$/, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ'),
  address: z.string().min(1, 'Vui lòng nhập địa chỉ'),
  addressType: z.enum(['before', 'after']),
  street: z.string().min(1, 'Vui lòng nhập số nhà, tên đường'),
  nationality: z.string().min(1, 'Vui lòng nhập quốc tịch'),
  ethnicity: z.string().min(1, 'Vui lòng nhập dân tộc'),
  occupation: z.string().min(1, 'Vui lòng nhập nghề nghiệp'),
  gender: z.number(),
});

const AddProfile = () => {
  const [scanQr, setScanQr] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      birthDate: '',
      cccd: '',
      phone: '',
      email: '',
      address: '',
      addressType: 'before',
      street: '',
      nationality: 'Việt Nam',
      ethnicity: 'Kinh',
      occupation: 'Không xác định',
      gender: 0,
    },
  });

  const parseBirthDate = raw => {
    if (!/^\d{8}$/.test(raw)) return raw; // không đúng 8 số thì trả về nguyên

    // tách 2 ký tự đầu (ngày), 2 ký tự tiếp (tháng), 4 ký tự cuối (năm)
    return raw.slice(0, 2) + '-' + raw.slice(2, 4) + '-' + raw.slice(4);
  };

  const parseAddress = raw => {
    if (!raw) return { street: '', address: '' };

    const parts = raw.split(',').map(p => p.trim());
    const street = parts[0] || '';
    const address = parts.slice(1).join(', ').trim();

    return { street, address };
  };

  const onSubmit = data => {
    console.log('✅ Dữ liệu form:', data);
  };

  const handleScan = valueScan => {
    console.log('valueScan: ', valueScan);

    const parts = valueScan.split('|');
    if (parts.length < 7) {
      Alert.alert('Lỗi', 'CCCD không hợp lệ');
      return;
    }

    try {
      const [
        cccd,
        cmnd,
        fullName,
        birthDateRaw,
        genderRaw,
        addressRaw,
        issueDate,
      ] = parts;
      // Format ngày sinh ddMMyyyy -> dd-MM-yyyy
      const birthDate = parseBirthDate(birthDateRaw);
      const { street, address } = parseAddress(addressRaw);
      // Giới tính
      const gender = genderRaw.trim() === 'Nam' ? 0 : 1;

      // Đưa vào form
      setValue('cccd', cccd);
      setValue('fullName', fullName);
      setValue('birthDate', birthDate);
      setValue('gender', gender);
      setValue('address', address);
      setValue('street', street);

      setScanQr(false);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể đọc mã CCCD');
    }
  };

  return (
    <>
      <MyHeader
        headerTitle={'Thêm hồ sơ'}
        endIcon={icons.qr}
        onPress={() => setScanQr(true)}
      />
      <ScanQR
        isActive={scanQr}
        isVisible={scanQr}
        onClose={() => setScanQr(false)}
        onScan={handleScan}
      />
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.flex1}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.contentContainer}>
              {/* Họ tên */}
              <Controller
                control={control}
                name="fullName"
                render={({ field: { value, onChange } }) => (
                  <MyTextInput
                    label="Họ tên"
                    value={value}
                    onChange={onChange}
                    error={errors.fullName?.message}
                  />
                )}
              />

              {/* Ngày sinh + Giới tính */}
              <View style={styles.spaceBetween}>
                <Controller
                  control={control}
                  name="birthDate"
                  render={({ field: { value, onChange } }) => (
                    <MyTextInput
                      label="Ngày sinh"
                      value={value}
                      onChange={onChange}
                      error={errors.birthDate?.message}
                      style={styles.birthdateInput}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="gender"
                  render={({ field: { value, onChange } }) => (
                    <View style={styles.radioGenderStyle}>
                      <Text style={styles.inputGenderLabel}>Giới tính</Text>
                      <RadioGroup
                        data={genderRadioData}
                        checkedItem={value}
                        onPress={onChange}
                        flexRow
                        gap={16}
                      />
                    </View>
                  )}
                />
              </View>

              {/* CCCD */}
              <Controller
                control={control}
                name="cccd"
                render={({ field: { value, onChange } }) => (
                  <MyTextInput
                    label="Số CCCD"
                    value={value}
                    onChange={onChange}
                    error={errors.cccd?.message}
                  />
                )}
              />

              {/* Số điện thoại */}
              <Controller
                control={control}
                name="phone"
                render={({ field: { value, onChange } }) => (
                  <MyTextInput
                    label="Số điện thoại"
                    value={value}
                    onChange={onChange}
                    error={errors.phone?.message}
                  />
                )}
              />

              {/* Email */}
              <Controller
                control={control}
                name="email"
                render={({ field: { value, onChange } }) => (
                  <MyTextInput
                    label="Email"
                    value={value}
                    onChange={onChange}
                    error={errors.email?.message}
                  />
                )}
              />

              {/* Địa chỉ */}
              <Controller
                control={control}
                name="address"
                render={({ field: { value, onChange } }) => (
                  <MyTextInput
                    label="Địa chỉ"
                    value={value}
                    onChange={onChange}
                    error={errors.address?.message}
                    multiline
                    inputStyle={styles.addressInputStyle}
                  />
                )}
              />

              {/* Trước/sau sáp nhập */}
              <Controller
                control={control}
                name="addressType"
                render={({ field: { value, onChange } }) => (
                  <RadioGroup
                    data={addressRadioData}
                    checkedItem={value}
                    onPress={onChange}
                    flexRow
                    gap={16}
                  />
                )}
              />

              {/* Số nhà, tên đường */}
              <Controller
                control={control}
                name="street"
                render={({ field: { value, onChange } }) => (
                  <MyTextInput
                    label="Số nhà, tên đường"
                    value={value}
                    onChange={onChange}
                    error={errors.street?.message}
                  />
                )}
              />

              {/* Quốc tịch */}
              <Controller
                control={control}
                name="nationality"
                render={({ field: { value, onChange } }) => (
                  <MyTextInput
                    label="Quốc tịch"
                    value={value}
                    onChange={onChange}
                    error={errors.nationality?.message}
                  />
                )}
              />

              {/* Dân tộc */}
              <Controller
                control={control}
                name="ethnicity"
                render={({ field: { value, onChange } }) => (
                  <MyTextInput
                    label="Dân tộc"
                    value={value}
                    onChange={onChange}
                    error={errors.ethnicity?.message}
                  />
                )}
              />

              {/* Nghề nghiệp */}
              <Controller
                control={control}
                name="occupation"
                render={({ field: { value, onChange } }) => (
                  <MyTextInput
                    label="Nghề nghiệp"
                    value={value}
                    onChange={onChange}
                    error={errors.occupation?.message}
                  />
                )}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <MyButton
          onPress={handleSubmit(onSubmit)}
          label={'Thêm hồ sơ'}
          style={styles.button}
        />
      </View>
    </>
  );
};

export default AddProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: parseSizeHeight(88),
  },
  contentContainer: {
    paddingHorizontal: parseSizeWidth(16),
    gap: parseSizeHeight(16),
  },
  flex1: {
    flex: 1,
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: parseSizeWidth(16),
  },
  birthdateInput: {
    flex: 1,
  },
  radioGenderStyle: {
    flex: 1,
    gap: parseSizeHeight(16),
  },
  addressInputStyle: {
    height: parseSizeHeight(100),
  },
  button: {
    position: 'absolute',
    bottom: 0,
    left: parseSizeWidth(16),
    right: parseSizeWidth(16),
    height: parseSizeHeight(44),
  },
  inputGenderLabel: {
    fontSize: Sizes.text_tagline1,
    marginTop: parseSizeHeight(-32),
  },
});
