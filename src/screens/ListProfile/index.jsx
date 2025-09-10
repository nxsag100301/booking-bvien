import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import MyHeader from '../../components/Header/MyHeader';
import {
  Colors,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
  Sizes,
} from '../../theme';
import icons from '../../constants/icons';
import SearchInput from '../../components/Input/SearchInput';
import { useSelector } from 'react-redux';

const ProfileCard = ({ profile, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.profileCardContainer}>
      <Image source={icons.file} style={styles.file} />
      <View style={styles.profileCardInfoContainer}>
        <Text style={styles.title}>{profile.name}</Text>
        <Text>123-123-123</Text>
      </View>
    </TouchableOpacity>
  );
};

const ListProfile = () => {
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState('');
  const listProfile = useSelector(state => state.profile.listProfile);

  return (
    <>
      <MyHeader
        headerTitle="Hồ sơ cá nhân"
        hiddenBack
        endIcon={icons.addFile}
        onPress={() => navigation.navigate('addProfile')}
      />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchInput value={searchValue} onChange={setSearchValue} />
        </View>

        <FlatList
          keyExtractor={item => item.id}
          data={listProfile}
          renderItem={({ item }) => (
            <ProfileCard
              profile={item}
              onPress={() => navigation.navigate('detailProfile')}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text>Chưa có hồ sơ</Text>
            </View>
          }
          style={styles.flatListStyle}
          contentContainerStyle={styles.flex1}
        />
      </View>
    </>
  );
};

export default ListProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
