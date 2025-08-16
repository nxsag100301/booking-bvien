import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors, parseSize, parseSizeHeight, Sizes } from '../../../theme';

const SelectItem = ({ title, description, checked, onPress }) => {
  return (
    <TouchableOpacity
      style={checked ? styles.containerChecked : styles.container}
      onPress={onPress}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
};

export default SelectItem;

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    padding: parseSize(16),
    backgroundColor: Colors.white,
    borderRadius: Sizes.radius,
    minHeight: parseSizeHeight(88),
  },
  containerChecked: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    padding: parseSize(16),
    backgroundColor: Colors.white,
    borderRadius: Sizes.radius,
    minHeight: parseSizeHeight(88),
    borderWidth: 1,
    borderColor: Colors.primary_600,
  },
  title: {
    color: Colors.primary_600,
    fontSize: Sizes.text_subtitle1,
    fontWeight: 500,
    marginBottom: parseSizeHeight(4),
  },
});
