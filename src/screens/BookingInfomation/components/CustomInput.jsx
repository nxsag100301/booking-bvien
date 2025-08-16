import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
  Sizes,
} from '../../../theme';
import { useNavigation } from '@react-navigation/native';

const CustomInput = ({ label, value, error, screen }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.label}>{label} </Text>
        <Text style={styles.asterisk}>*</Text>
      </View>

      <TouchableOpacity
        onPress={() => screen && navigation.navigate(screen, { goBack: true })}
        style={[styles.inputContainer, error && styles.inputError]}
      >
        <Text style={styles.value}>{value}</Text>
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    gap: parseSizeHeight(6),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseSizeWidth(2),
  },
  asterisk: { color: 'red' },
  label: {
    fontWeight: 500,
  },
  inputContainer: {
    borderWidth: 0.5,
    borderRadius: parseSize(12),
    padding: parseSize(12),
  },
  value: {},
  error: {
    fontSize: Sizes.text_tagline1,
    color: 'red',
  },
  inputError: {
    borderColor: 'red',
  },
});
