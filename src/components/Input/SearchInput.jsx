import { Image, StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import icons from '../../constants/icons';
import {
  Colors,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
} from '../../theme';

const SearchInput = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, isFocused && styles.containerFocused]}>
      <Image source={icons.search} style={styles.searchIcon} />
      <TextInput
        value={value}
        onChangeText={onChange}
        style={[styles.input, isFocused && styles.inputFocused]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Tìm kiếm..."
        placeholderTextColor={Colors.gray_neutral_300}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  containerFocused: {},
  input: {
    borderWidth: 0.5,
    height: parseSizeHeight(48),
    paddingHorizontal: parseSizeWidth(32),
    borderRadius: parseSize(8),
    borderColor: Colors.gray_neutral_400,
  },
  inputFocused: {
    borderColor: Colors.primary_600,
  },
  searchIcon: {
    position: 'absolute',
    width: parseSizeWidth(24),
    height: parseSizeHeight(24),
    top: parseSizeHeight(12),
    left: parseSizeWidth(6),
  },
});
