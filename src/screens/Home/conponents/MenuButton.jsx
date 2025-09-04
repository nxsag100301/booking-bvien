import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {
  Colors,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
  Sizes,
} from '../../../theme';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const MenuButton = ({ title, icon, screen }) => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user.currentUser);

  const handleNavigation = screenNavigate => {
    if (!user) {
      return navigation.navigate('login');
    }
    if (screenNavigate) {
      return navigation.navigate(screenNavigate);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => handleNavigation(screen)}
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        <Image source={icon} style={styles.icon} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MenuButton;

const styles = StyleSheet.create({
  container: {
    gap: parseSizeHeight(8),
    alignItems: 'center',
    width: parseSizeWidth(83),
    height: parseSizeHeight(100),
  },
  iconContainer: {
    height: parseSizeHeight(50),
    width: parseSizeWidth(50),
    borderRadius: parseSize(8),
    backgroundColor: Colors.primary_600,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    tintColor: Colors.white,
    height: parseSizeHeight(32),
    width: parseSizeWidth(32),
  },
  title: {
    fontSize: Sizes.text_tagline1,
    textAlign: 'center',
    color: Colors.primary_600,
  },
});
