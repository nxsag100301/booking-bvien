import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {
  Colors,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
  Sizes,
} from '../../theme';
import icons from '../../constants/icons';

const MyTextInput = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  style,
  inputStyle,
  password,
  multiline = false,
  keyboardType,
  disable = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          inputStyle,
          error && styles.errorStyle,
          disable && styles.inputDisabled,
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        secureTextEntry={password && showPassword}
        multiline={multiline}
        keyboardType={keyboardType}
        placeholderTextColor={Colors.gray_neutral_300}
        editable={!disable}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      {password && (
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeContainer}
        >
          <Image
            source={showPassword ? icons.eyeOff : icons.eyeOpen}
            style={styles.eye}
          />
        </TouchableOpacity>
      )}
      {!password && value && !disable && (
        <TouchableOpacity
          onPress={() => onChange('')}
          style={styles.clearIconContainer}
        >
          <Image source={icons.x} style={styles.clearIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MyTextInput;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  label: {
    fontSize: Sizes.text_tagline1,
  },
  input: {
    borderWidth: 0.5,
    height: parseSizeHeight(48),
    paddingHorizontal: parseSizeWidth(16),
    borderRadius: parseSize(8),
    borderColor: Colors.gray_neutral_600,
    marginVertical: parseSizeHeight(4),
    fontSize: Sizes.text_subtitle1,
  },
  inputFocused: {
    borderColor: Colors.gray_neutral_600,
  },
  error: {
    fontSize: Sizes.text_tagline1,
    color: Colors.error_600,
  },
  eyeContainer: {
    width: parseSizeWidth(20),
    height: parseSizeHeight(20),
    position: 'absolute',
    right: parseSizeWidth(16),
    top: parseSizeHeight(32),
  },
  eye: {
    width: '100%',
    height: '100%',
    tintColor: Colors.gray_neutral_600,
  },
  errorStyle: {
    borderColor: Colors.error_600,
  },
  clearIconContainer: {
    width: parseSizeWidth(17),
    height: parseSizeHeight(17),
    borderWidth: 1,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.gray_neutral_600,
    position: 'absolute',
    right: parseSizeWidth(16),
    top: parseSizeHeight(34),
  },
  clearIcon: {
    width: parseSizeWidth(13),
    height: parseSizeHeight(13),
    tintColor: Colors.gray_neutral_600,
  },
  inputDisabled: {
    backgroundColor: Colors.gray_neutral_100,
    color: Colors.gray_neutral_600,
  },
});
