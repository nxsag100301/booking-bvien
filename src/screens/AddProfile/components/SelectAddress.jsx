import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Colors,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
  Sizes,
} from '../../../theme';
import SearchInput from '../../../components/Input/SearchInput';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';

const SelectAddress = ({ typeAddress, onFinished }) => {
  const [searchValue, setSearchValue] = useState('');
  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [commune, setCommune] = useState(null);
  const [selectType, setSelectType] = useState(1);

  const { provinceNew, communeNew, provinceOld, districtOld, communeOld } =
    useSelector(state => state.common);

  const removeVietnameseTones = str => {
    return str
      .normalize('NFD') // tách dấu
      .replace(/[\u0300-\u036f]/g, '') // xoá dấu
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase();
  };

  // filter theo mode
  const districtFilter =
    typeAddress === 'before'
      ? districtOld.filter(item => item.idtinh === province?.id)
      : [];

  const communeFilter =
    typeAddress === 'before'
      ? communeOld.filter(item => item.idquan === district?.id)
      : communeNew.filter(item => item.idtinh === province?.id);

  const rawData =
    selectType === 1
      ? typeAddress === 'before'
        ? provinceOld
        : provinceNew
      : selectType === 2
      ? districtFilter
      : communeFilter;

  const handleSelect = value => {
    if (selectType === 1) {
      setProvince(value);
      // after thì nhảy thẳng qua chọn xã
      setSelectType(typeAddress === 'before' ? 2 : 3);
      setSearchValue('');
    }
    if (selectType === 2 && typeAddress === 'before') {
      setDistrict(value);
      setCommune(null);
      setSelectType(3);
      setSearchValue('');
    }
    if (selectType === 3) {
      setCommune(value);
      if (selectType === 3) {
        setCommune(value);
        setSearchValue('');
        onFinished(
          `${value?.ten} ${typeAddress === 'before' ? '-' : ''} ${
            typeAddress === 'before' ? district?.ten + ' - ' : '- '
          }${province?.ten}`,
        );
      }
    }
  };

  // filter theo searchValue
  const data = rawData.filter(item => {
    if (!searchValue) return true;
    const itemName = removeVietnameseTones(item.ten);
    const keyword = removeVietnameseTones(searchValue);
    return itemName.includes(keyword);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Chọn địa chỉ (
        {typeAddress === 'before' ? 'Trước sáp nhập' : 'Sau sáp nhập'})
      </Text>

      {/* Province */}
      <TouchableOpacity
        onPress={() => {
          setSelectType(1);
          setDistrict(null);
          setCommune(null);
        }}
        style={[styles.buttonSelect, selectType === 1 && styles.selected]}
      >
        <View style={styles.dotContainer}>
          <View style={styles.dot} />
        </View>
        <Text>{province?.ten || 'Tỉnh/Thành Phố'}</Text>
      </TouchableOpacity>

      {/* District (chỉ có trong before) */}
      {province && typeAddress === 'before' && (
        <TouchableOpacity
          onPress={() => setSelectType(2)}
          style={[styles.buttonSelect, selectType === 2 && styles.selected]}
        >
          <View style={styles.dotContainer}>
            <View style={styles.dot} />
          </View>
          <Text>{district?.ten || 'Quận/Huyện'}</Text>
        </TouchableOpacity>
      )}

      {/* Commune */}
      {(province && typeAddress === 'after') ||
      (district && typeAddress === 'before') ? (
        <TouchableOpacity
          onPress={() => setSelectType(3)}
          style={[styles.buttonSelect, selectType === 3 && styles.selected]}
        >
          <View style={styles.dotContainer}>
            <View style={styles.dot} />
          </View>
          <Text>{commune?.ten || 'Xã/Phường'}</Text>
        </TouchableOpacity>
      ) : null}

      {/* List */}
      <View style={styles.contentContainer}>
        <SearchInput value={searchValue} onChange={setSearchValue} />
        <BottomSheetFlatList
          data={data}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          extraData={{ selectType, province, district, commune, searchValue }}
          contentContainerStyle={styles.flatListContentContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              style={styles.renderItemContainer}
            >
              <Text style={styles.renderItemText}>{item.ten}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default SelectAddress;

const styles = StyleSheet.create({
  container: {
    gap: parseSizeHeight(8),
    flex: 1,
  },
  title: {
    fontSize: Sizes.text_subtitle1,
    fontWeight: 500,
    marginBottom: parseSizeHeight(8),
  },
  buttonSelect: {
    height: parseSizeHeight(48),
    paddingHorizontal: parseSizeWidth(16),
    borderWidth: 1,
    borderRadius: parseSize(8),
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseSizeWidth(8),
    borderColor: Colors.primary_600,
  },
  dotContainer: {
    width: parseSizeWidth(18),
    height: parseSizeHeight(18),
    borderWidth: 2,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.primary_600,
  },
  dot: {
    width: parseSizeWidth(10),
    height: parseSizeHeight(10),
    backgroundColor: Colors.primary_600,
    borderRadius: 9999,
  },
  contentContainer: {
    flex: 1,
  },
  renderItemContainer: {
    marginVertical: parseSizeHeight(8),
    paddingHorizontal: parseSizeWidth(16),
  },
  renderItemText: {
    fontSize: Sizes.text_subtitle1,
  },
  selected: {
    borderColor: Colors.primary_600,
  },
  flatListContentContainer: {
    paddingTop: parseSizeHeight(16),
    paddingBottom: parseSizeHeight(48),
  },
});
