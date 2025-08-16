import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {
  Colors,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
  Sizes,
} from '../../../theme';
import icons from '../../../constants/icons';

const TimeCard = ({ timeData, checked, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, checked && styles.itemChecked]}
    >
      <Image source={icons.calendar} style={styles.calendar} />
      <View>
        <Text style={styles.date}>{timeData.date}</Text>
        <Text style={styles.time}>{timeData.time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TimeCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    gap: parseSizeWidth(16),
    marginVertical: parseSizeHeight(8),
    padding: parseSize(16),
    borderRadius: parseSize(12),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  calendar: {
    height: parseSizeHeight(48),
    tintColor: Colors.primary_600,
  },
  date: {
    fontSize: Sizes.text_subtitle1,
    fontWeight: 600,
    color: Colors.primary_600,
    marginBottom: parseSizeHeight(8),
  },
  time: {},
  itemChecked: {
    borderWidth: 1,
    borderColor: Colors.primary_600,
  },
});
