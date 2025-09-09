import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import MyHeader from '../../components/Header/MyHeader';
import MyTextInput from '../../components/Input/MyTextInput';
import {
  Colors,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
  Sizes,
} from '../../theme';
import RadioGroup from '../../components/RadioGroup';
import MyButton from '../../components/Button/MyButton';
import icons from '../../constants/icons';
import ScanQR from '../../components/ScanQR';
import MyBottomSheetModal from '../../components/MyBottomSheetModal';
import SelectAddress from './components/SelectAddress';
import MyDatePicker from '../../components/DatePicker';
import { getCodeJson, getIdJson } from '../../utils/common';
import { useSelector } from 'react-redux';

const genderRadioData = [
  { label: 'Nam', value: 1 },
  { label: 'Nữ', value: 2 },
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
  addressType: z.enum(['before', 'after']),
  street: z.string().min(1, 'Vui lòng nhập số nhà, tên đường'),
  nationality: z.string().min(1, 'Vui lòng nhập quốc tịch'),
  ethnicity: z.string().min(1, 'Vui lòng nhập dân tộc'),
  occupation: z.string().min(1, 'Vui lòng nhập nghề nghiệp'),
  gender: z.number(),
});

const AddProfile = () => {
  const [scanQr, setScanQr] = useState(false);
  const [isScanned, setIsScanned] = useState(false);
  const [addressValue, setAddressValue] = useState('');
  const [isOpenAddressModal, setIsOpenAddressModal] = useState(false);

  const {
    provinceNew,
    communeNew,
    provinceOld,
    districtOld,
    communeOld,
    gender,
    nation,
    job,
    country,
  } = useSelector(state => state.common);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      birthDate: '',
      cccd: '',
      phone: '',
      email: '',
      addressType: 'before',
      street: '',
      nationality: 'Việt Nam',
      ethnicity: 'Kinh',
      occupation: 'Không xác định',
      gender: 0,
    },
  });

  const addressType = watch('addressType');

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
    // console.log('Dữ liệu form:', data);
    const addressValueArr = addressValue.split('-');
    const commune = addressValueArr[0];
    const district = addressValueArr[1];
    const province = `${
      addressValueArr[3]
        ? addressValueArr[2] + '-' + addressValueArr[3]
        : addressValueArr[2]
    }`;
    const variables = {
      diaChi: data.street,
      dienThoai: data.phone,
      email: data.email,
      id: '17',
      iddt: getIdJson(nation, 'ten', data.ethnicity),
      idgt: getIdJson(gender, 'id', data.gender),
      idnn: getIdJson(job, 'ten', data.occupation),
      idpx: getIdJson(communeOld, 'ten', commune),
      // idhuyen: getIdJson(districtOld, 'ten', district),
      idqg: getIdJson(country, 'ten', data.nationality), // data.nationality
      idtinh: getIdJson(provinceOld, 'ten', province),
      ngaySinh: data.birthDate,
      soCccd: data.cccd,
      tenBn: data.fullName,
    };
    console.log({ variables });
  };

  const handleScan = valueScan => {
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
      setAddressValue(address);
      setValue('street', street);
      setValue(
        'addressType',
        addressRaw.split(',')?.length === 4 ? 'before' : 'after',
      );

      setIsScanned(true);
      setScanQr(false);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể đọc mã CCCD');
    }
  };

  const handleSelectDone = value => {
    setIsOpenAddressModal(false);
    setAddressValue(value);
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
      <MyBottomSheetModal
        isVisible={isOpenAddressModal}
        onClose={() => setIsOpenAddressModal(false)}
        heightPercent="85%"
      >
        <SelectAddress
          typeAddress={addressType}
          onFinished={handleSelectDone}
        />
      </MyBottomSheetModal>

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
                    <MyDatePicker
                      labelName={'Ngày sinh'}
                      value={value}
                      getValue={onChange}
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
                    disable={isScanned}
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
              <View>
                <Text style={styles.inputLabel}>Địa chỉ</Text>
                <TouchableOpacity
                  onPress={() => !isScanned && setIsOpenAddressModal(true)}
                  style={[styles.addressInput, isScanned && styles.disable]}
                >
                  <Text
                    style={[
                      styles.inputValue,
                      isScanned && styles.inputValueDisable,
                    ]}
                  >
                    {addressValue}
                  </Text>
                </TouchableOpacity>
              </View>

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
                    disable={isScanned}
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
    flex: 1,
    paddingHorizontal: parseSizeWidth(16),
    gap: parseSizeHeight(16),
  },
  flex1: {
    flex: 1,
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: parseSizeWidth(20),
  },
  birthdateInput: {
    flex: 1,
  },
  radioGenderStyle: {
    width: '48%',
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
  },
  inputLabel: {
    fontSize: Sizes.text_tagline1,
  },
  addressInput: {
    borderWidth: 0.5,
    height: parseSizeHeight(100),
    paddingHorizontal: parseSizeWidth(16),
    borderRadius: parseSize(8),
    borderColor: Colors.gray_neutral_600,
    marginVertical: parseSizeHeight(4),
    fontSize: Sizes.text_subtitle1,
    padding: parseSize(12),
  },
  inputValue: {
    fontSize: Sizes.text_subtitle1,
  },
  disable: {
    backgroundColor: Colors.gray_neutral_100,
    borderColor: Colors.gray_neutral_400,
  },
  inputValueDisable: {
    color: Colors.gray_neutral_600,
  },
});
