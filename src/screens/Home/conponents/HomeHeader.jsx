import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import icons from '../../../constants/icons';
import {
  Colors,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
  Sizes,
} from '../../../theme';

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.welcome}>
          <Text style={styles.welcomeText}>Xin chào,</Text>
          <Text style={styles.welcomeText}>
            Chúc quý khách một ngày tốt lành
          </Text>
        </View>
        <View style={styles.icons}>
          <TouchableOpacity>
            <Image
              source={icons.bell}
              style={styles.icon}
              tintColor={Colors.primary_600}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    gap: parseSizeHeight(16),
    marginHorizontal: parseSizeWidth(16),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcome: {
    gap: parseSizeWidth(4),
    fontSize: Sizes.textDefault,
    color: Colors.primary_600,
  },
  welcomeText: {
    fontWeight: 600,
    color: Colors.primary_600,
  },
  icons: {
    flexDirection: 'row',
    gap: parseSizeWidth(16),
  },
  icon: {
    width: parseSizeWidth(28),
    height: parseSizeHeight(28),
    borderRadius: parseSize(16),
    resizeMode: 'contain',
  },
});
