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
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { selectProfileAPI } from '../../../redux/slice/userSlice';

const ProfileCard = ({ profile, onPress }) => {
  const dispatch = useDispatch();

  const handleSelectProfile = () => {
    dispatch(selectProfileAPI(profile.idBenhNhan));
  };

  return (
    <TouchableOpacity
      onPress={handleSelectProfile}
      style={styles.profileCardContainer}
    >
      <Image source={icons.file} style={styles.file} />
      <View style={styles.profileCardInfoContainer}>
        <Text style={styles.title}>{profile?.tenBenhNhan}</Text>
        <Text>{dayjs(profile?.ngaySinh).format('DD-MM-YYYY')}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  profileCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseSizeWidth(16),
    backgroundColor: Colors.white,
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
  file: {
    width: parseSizeWidth(64),
    height: parseSizeHeight(60),
    tintColor: Colors.primary_600,
  },
  profileCardInfoContainer: {
    gap: parseSizeHeight(8),
  },
  title: {
    fontSize: Sizes.text_subtitle1,
    fontWeight: 600,
    color: Colors.primary_600,
  },
});
