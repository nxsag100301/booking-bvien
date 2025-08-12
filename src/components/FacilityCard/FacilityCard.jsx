import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {
  Colors,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
  Sizes,
} from '../../theme';
import icons from '../../constants/icons';

const FacilityCard = ({ facility, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.name}>{facility.name}</Text>
      <View style={styles.subContent}>
        <Image source={icons.location} style={styles.icon} />
        <Text>{facility.address}</Text>
      </View>
      <View style={styles.subContent}>
        <Image source={icons.phone} style={styles.icon} />
        <Text>{facility.phone}</Text>
      </View>
      <View style={styles.subContent}>
        <Image source={icons.calendar} style={styles.icon} />
        <Text>{facility.schedule}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FacilityCard;

const styles = StyleSheet.create({
  container: {
    gap: parseSizeHeight(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    backgroundColor: Colors.white,
    paddingHorizontal: parseSizeWidth(24),
    paddingVertical: parseSizeHeight(16),
    borderRadius: parseSize(12),
  },
  subContent: {
    flexDirection: 'row',
    gap: parseSizeWidth(12),
  },
  icon: {
    height: parseSizeHeight(20),
    width: parseSizeWidth(20),
    tintColor: Colors.primary_600,
  },
  name: {
    textAlign: 'center',
    fontSize: Sizes.text_subtitle1,
    fontWeight: 500,
    color: Colors.primary_600,
  },
  text: {},
});
