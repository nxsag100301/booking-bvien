import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import MyHeader from '../../components/Header/MyHeader';
import {
  Colors,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
  Sizes,
} from '../../theme';
import icons from '../../constants/icons';
import MyButton from '../../components/Button/MyButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import SearchInput from '../../components/Input/SearchInput';

const data = [
  { id: '1', name: 'Trần Lê Tiến Hoà' },
  { id: '2', name: 'Trần Lê Tiến Hoà 2' },
  { id: '3', name: 'Trần Lê Tiến Hoà 3' },
];

const ProfileCard = ({ profile, checked, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.profileCardContainer, checked && styles.checked]}
    >
      <Image source={icons.file} style={styles.file} />
      <View style={styles.profileCardInfoContainer}>
        <Text style={styles.title}>{profile.name}</Text>
        <Text>123-123-123</Text>
      </View>
    </TouchableOpacity>
  );
};

const SelectProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { goBack = false } = route.params || {};
  const [checkedItem, setCheckedItem] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const handleContinue = () => {
    if (!checkedItem) {
      return Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Bạn chưa chọn hồ sơ',
      });
    }
    goBack ? navigation.goBack() : navigation.navigate('bookAPakage');
  };
  return (
    <>
      <MyHeader headerTitle="Hồ sơ cá nhân" />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchInput value={searchValue} onChange={setSearchValue} />
        </View>

        <FlatList
          keyExtractor={item => item.id}
          data={data}
          renderItem={({ item }) => (
            <ProfileCard
              profile={item}
              checked={checkedItem?.id === item.id ? true : false}
              onPress={() => setCheckedItem(item)}
            />
          )}
          style={styles.flatListStyle}
        />
      </View>
      <MyButton
        onPress={handleContinue}
        label={'Tiếp tục'}
        style={styles.buttonContinue}
      />
    </>
  );
};

export default SelectProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: parseSizeWidth(16),
  },
  flatListStyle: {
    paddingHorizontal: parseSizeWidth(16),
    paddingTop: parseSizeHeight(8),
  },
  profileCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseSizeWidth(16),
    backgroundColor: Colors.white,
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
  checked: {
    borderWidth: 1,
    borderColor: Colors.primary_600,
  },
  buttonContinue: {
    position: 'absolute',
    bottom: 0,
    left: parseSizeWidth(16),
    right: parseSizeWidth(16),
    height: parseSizeHeight(44),
  },
});
