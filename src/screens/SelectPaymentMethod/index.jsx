import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import MyHeader from '../../components/Header/MyHeader';
import {
  Colors,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
} from '../../theme';
import icons from '../../constants/icons';
import MyButton from '../../components/Button/MyButton';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const data = [
  { label: 'Thanh toán tiền mặt tại cơ sở', icon: icons.cash, value: 'cash' },
  { label: 'Thanh toán bằng QR code', icon: icons.qr, value: 'qr' },
  {
    label: 'Thanh toán bằng thẻ ATM và tài khoản ngân hàng',
    icon: icons.bank,
    value: 'bank',
  },
  {
    label: 'Thanh toán bằng thẻ visa quốc tế',
    icon: icons.visa,
    value: 'visa',
  },
];

const PaymentMethodCard = ({ label, icon, checked, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.paymentMethodCardContainer, checked && styles.checkedItem]}
    >
      <Image source={icon} style={styles.paymentIcon} />
      <Text style={styles.labelPayment}>{label}</Text>
    </TouchableOpacity>
  );
};

const SelectPaymentMethod = () => {
  const navigation = useNavigation();

  const [checkedItem, setCheckedItem] = useState(null);

  const handleConfirm = () => {
    if (!checkedItem) {
      return Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Bạn chưa chọn phương thức thanh toán',
      });
    }
    // navigation.navigate('paymentInformation', {method: checkedItem.value})
    navigation.navigate('paymentInformation');
  };

  return (
    <>
      <MyHeader headerTitle="Phương thức thanh toán" />
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => item.value}
          data={data}
          style={styles.flatListContainer}
          renderItem={({ item }) => (
            <View style={styles.renderItemContainer}>
              <PaymentMethodCard
                label={item.label}
                icon={item.icon}
                checked={checkedItem?.value === item.value ? true : false}
                onPress={() => setCheckedItem(item)}
              />
            </View>
          )}
        />
      </View>
      <MyButton
        onPress={handleConfirm}
        label={'Xác nhận'}
        style={styles.buttonContinue}
      />
    </>
  );
};

export default SelectPaymentMethod;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    paddingHorizontal: parseSizeWidth(16),
  },
  renderItemContainer: {
    marginVertical: parseSizeHeight(12),
  },
  paymentMethodCardContainer: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: parseSize(12),
    paddingHorizontal: parseSizeWidth(8),
    paddingVertical: parseSizeHeight(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  paymentIcon: {
    width: '20%',
    height: parseSizeHeight(44),
    resizeMode: 'contain',
    tintColor: Colors.primary_600,
  },
  labelPayment: {
    width: '80%',
  },
  checkedItem: { borderWidth: 1, borderColor: Colors.primary_600 },
  buttonContinue: {
    position: 'absolute',
    bottom: 0,
    left: parseSizeWidth(16),
    right: parseSizeWidth(16),
    height: parseSizeHeight(44),
  },
});
