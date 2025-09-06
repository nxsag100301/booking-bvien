import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import { MyText } from '~components/MyCustom';
import {
  Sizes,
  Colors,
  FontStyles,
  parseSizeHeight,
  parseSizeWidth,
} from '~theme';
import Icon from '~components/icons/IconSVG';
import DatePicker from 'react-native-date-picker';

const Index = ({
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
  const { t } = useTranslation();
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
    <TouchableOpacity
      onPress={() => setModalCalendar(true)}
      style={[styles.container, style]}
    >
      <View style={styles.wrapLabel}>
        <MyText style={[styles.textLabel, styleLabel]}>
          {labelName}
          {required && <MyText style={styles.required}> *</MyText>}
        </MyText>
      </View>
      <View
        style={[
          styles.wrapInput,
          contentError ? { borderColor: 'red', borderWidth: 1 } : {},
          styleContainer,
        ]}
      >
        <MyText style={[styleText, styles.textValue]}>
          {formatDisplayDate()}
        </MyText>
        <View style={styles.Icon}>
          <Icon
            name={'calendar'}
            width={24}
            height={25}
            stroke={Colors.text_700}
          />
        </View>
      </View>
      {contentError && (
        <MyText style={styles.txtError}>
          {'* '}
          {contentError}
        </MyText>
      )}
      <DatePicker
        modal
        open={modalCalendar}
        date={selectedDate || new Date()}
        onConfirm={handleConfirm}
        onCancel={() => setModalCalendar(false)}
        locale="vi"
        mode="date"
        title={t('selectDate')}
        confirmText={t('confirm')}
        cancelText={t('cancel')}
        maximumDate={new Date(maxDate)}
        minimumDate={new Date(minDate)}
      />
    </TouchableOpacity>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  wrapLabel: {
    marginBottom: parseSizeHeight(5),
  },
  textLabel: {
    fontSize: Sizes.textBodyXS,
    fontWeight: '500',
    color: Colors.text_400,
  },
  textValue: {
    fontSize: Sizes.textBodyM,
    fontWeight: '400',
    color: Colors.text_900,
  },
  wrapInput: {
    height: parseSizeHeight(50),
    paddingHorizontal: parseSizeWidth(20),
    backgroundColor: Colors.gray_100,
    borderRadius: parseSizeWidth(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
