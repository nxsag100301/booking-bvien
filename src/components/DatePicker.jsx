import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import dayjs from 'dayjs';

import {
  Sizes,
  Colors,
  FontStyles,
  parseSizeHeight,
  parseSizeWidth,
} from '../theme';
import DatePicker from 'react-native-date-picker';

const MyDatePicker = ({
  labelName,
  value = null,
  required = false,
  getValue,
  styleContainer,
  style,
  styleLabel,
  styleText,
  minDate = '1900-01-01',
  maxDate = '2100-01-01',
  isSelected,
  contentError,
}) => {
  const [modalCalendar, setModalCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleConfirm = date => {
    const formattedValue = dayjs(date).format('YYYY-MM-DD');
    getValue(formattedValue);
    setSelectedDate(date);
    setModalCalendar(false);
  };

  const formatDisplayDate = () => {
    if (value) return dayjs(value).format('DD/MM/YYYY');
    if (selectedDate) return dayjs(selectedDate).format('DD/MM/YYYY');
    return '';
  };

  useEffect(() => {
    if (isSelected === '') {
      setSelectedDate(null);
    }
  }, [isSelected]);

  return (
    <View
      onPress={() => setModalCalendar(true)}
      style={[styles.container, style]}
    >
      <View style={styles.wrapLabel}>
        <Text style={[styles.textLabel, styleLabel]}>
          {labelName}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => setModalCalendar(true)}
        style={[
          styles.wrapInput,
          contentError ? { borderColor: 'red', borderWidth: 1 } : {},
          styleContainer,
        ]}
      >
        <Text style={[styleText, styles.textValue]}>{formatDisplayDate()}</Text>
      </TouchableOpacity>
      {contentError && (
        <Text style={styles.txtError}>
          {'* '}
          {contentError}
        </Text>
      )}
      <DatePicker
        modal
        open={modalCalendar}
        date={selectedDate || new Date()}
        onConfirm={handleConfirm}
        onCancel={() => setModalCalendar(false)}
        locale="vi"
        mode="date"
        title={'Chọn ngày'}
        confirmText={'Xác nhận'}
        cancelText={'Huỷ'}
        maximumDate={new Date(maxDate)}
        minimumDate={new Date(minDate)}
      />
    </View>
  );
};

export default MyDatePicker;

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flex: 1,
  },
  wrapLabel: {
    marginBottom: parseSizeHeight(5),
  },
  textLabel: {
    fontSize: Sizes.text_tagline1,
  },
  textValue: {
    fontSize: Sizes.textBodyM,
    fontWeight: '400',
    color: Colors.text_900,
  },
  wrapInput: {
    height: parseSizeHeight(50),
    paddingHorizontal: parseSizeWidth(20),
    borderRadius: parseSizeWidth(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: Colors.gray_neutral_600,
  },
  Icon: {
    position: 'absolute',
    right: parseSizeWidth(20),
  },
  txtError: {
    paddingTop: parseSizeHeight(5),
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.textBodyXS,
    fontWeight: '400',
    color: Colors.error_600,
  },
  required: {
    color: Colors.error_600,
  },
});
