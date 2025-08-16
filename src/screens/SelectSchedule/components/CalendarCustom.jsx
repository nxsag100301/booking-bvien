import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../../theme';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales.vi = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'Th1',
    'Th2',
    'Th3',
    'Th4',
    'Th5',
    'Th6',
    'Th7',
    'Th8',
    'Th9',
    'Th10',
    'Th11',
    'Th12',
  ],
  dayNames: [
    'Chủ nhật',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
  ],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  today: 'Hôm nay',
};

LocaleConfig.defaultLocale = 'vi';

const CalendarCustom = ({ selectedDate, setSelectedDate, style }) => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const [displayedMonth, setDisplayedMonth] = useState({
    month: currentMonth,
    year: currentYear,
  });
  return (
    <Calendar
      onDayPress={day => {
        setSelectedDate(day.dateString);
      }}
      onMonthChange={month => {
        setDisplayedMonth({ month: month.month, year: month.year });
      }}
      minDate={today}
      theme={{
        backgroundColor: Colors.background,
        calendarBackground: Colors.background,
        textSectionTitleColor: Colors.primary_600,
        selectedDayBackgroundColor: Colors.primary_600,
        selectedDayTextColor: Colors.white,
        todayTextColor: Colors.primary_600,
        dayTextColor: Colors.black,
        textDisabledColor: Colors.gray_neutral_300,
        indicatorColor: Colors.primary_600,
        arrowColor: Colors.primary_600,
        disabledArrowColor: Colors.gray_neutral_300,
        monthTextColor: Colors.primary_600,
      }}
      markedDates={{
        [selectedDate]: {
          selected: true,
          disableTouchEvent: true,
          selectedDotColor: 'orange',
        },
      }}
      disableArrowLeft={
        displayedMonth.month === currentMonth &&
        displayedMonth.year === currentYear
      }
      style={[styles.calendarStyle, style]}
    />
  );
};

export default CalendarCustom;

const styles = StyleSheet.create({
  calendarStyle: {},
});
