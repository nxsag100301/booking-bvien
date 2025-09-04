import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors, parseSize, parseSizeHeight, Sizes } from '../../../theme';
import MyButton from '../../../components/Button/MyButton';
import { useNavigation } from '@react-navigation/native';
import { formatVND } from '../../../utils/formatter';

const PakageCard = ({ pakage, checked, onPress }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, checked && styles.checked]}
    >
      <Text style={styles.title}>{pakage?.tenGoi}</Text>
      <Text style={styles.description}>{pakage?.moTa}</Text>
      <View style={styles.bottomContentContainer}>
        <Text style={styles.price}>{formatVND(pakage?.tongTien)}</Text>
        <MyButton
          variant="outline"
          label="Xem chi tiết"
          labelColor={Colors.primary_600}
          style={styles.button}
          onPress={() =>
            navigation.navigate('detailPakage', {
              pakageInfo: {
                name: pakage?.tenGoi,
                price: formatVND(pakage?.tongTien),
                detail: pakage?.chiTiet,
              },
            })
          }
        />
      </View>
    </TouchableOpacity>
  );
};

export default PakageCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: parseSize(16),
    borderRadius: parseSize(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    gap: parseSizeHeight(8),
  },
  title: {
    color: Colors.primary_600,
    fontWeight: 600,
    fontSize: Sizes.text_subtitle1,
  },
  description: {},
  bottomContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: Sizes.text_subtitle1,
    color: Colors.warning_500,
    fontWeight: 600,
  },
  button: {
    width: '35%',
    height: parseSizeHeight(40),
    borderRadius: 9999,
  },
  checked: {
    borderWidth: 1,
    borderColor: Colors.primary_600,
  },
});
