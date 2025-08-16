import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import MyHeader from '../../components/Header/MyHeader';
import {
  Colors,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
} from '../../theme';
import MyDropdown from '../../components/Dropdown/MyDropdown';
import PakageCard from './components/PakageCard';
import MyButton from '../../components/Button/MyButton';
import { useNavigation, useRoute } from '@react-navigation/native';

const dataPakage = [
  { label: 'Tất cả gói', value: 'g0' },
  { label: 'Gói 1', value: 'g1' },
  { label: 'Gói 2', value: 'g2' },
  { label: 'Gói 3', value: 'g3' },
];

const dataGender = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Nam', value: 'male' },
  { label: 'Nữ', value: 'female' },
];

const dataAge = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Dưới 10 tuổi', value: 'd10' },
  { label: 'Dưới 20 tuổi', value: 'd20' },
  { label: 'Dưới 40 tuổi', value: 'd40' },
];

const listPakage = [
  { id: '1', checked: false },
  { id: '2', checked: false },
  { id: '3', checked: false },
  { id: '4', checked: false },
  { id: '5', checked: false },
];

const BookAPakage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { goBack = false } = route.params || {};
  const [selectedPakage, setSelectedPakage] = useState(dataPakage[0]);
  const [selectedGender, setSelectedGender] = useState(dataGender[1]);
  const [selectedAge, setSelectedAge] = useState(dataAge[0]);
  const [checkedItem, setCheckedItem] = useState(null);
  return (
    <>
      <MyHeader headerTitle="Chọn gói khám" />
      <View style={styles.container}>
        <View style={styles.dropdownContainer}>
          <MyDropdown
            data={dataPakage}
            value={selectedPakage}
            onChange={setSelectedPakage}
            label="Gói khám"
          />
          <MyDropdown
            data={dataGender}
            value={selectedGender}
            onChange={setSelectedGender}
            label="Giới tính"
          />
          <MyDropdown
            data={dataAge}
            value={selectedAge}
            onChange={setSelectedAge}
            label="Độ tuổi"
          />
        </View>
        <FlatList
          keyExtractor={item => item.id}
          data={listPakage}
          renderItem={({ item }) => (
            <View style={styles.renderItemContainer}>
              <PakageCard
                pakage={item}
                checked={checkedItem?.id === item.id ? true : false}
                onPress={() => setCheckedItem(item)}
              />
            </View>
          )}
          style={styles.listPakageContainer}
          contentContainerStyle={styles.contentContainerStyle}
        />
        <MyButton
          onPress={() =>
            goBack ? navigation.goBack() : navigation.navigate('selectSchedule')
          }
          label={'Tiếp tục'}
          style={styles.buttonContinue}
        />
      </View>
    </>
  );
};

export default BookAPakage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: parseSizeHeight(16),
  },
  dropdownContainer: {
    paddingVertical: parseSizeHeight(16),
    paddingHorizontal: parseSizeWidth(16),
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: parseSizeWidth(8),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  listPakageContainer: {
    paddingHorizontal: parseSizeWidth(16),
    paddingTop: parseSizeHeight(16),
    gap: parseSizeHeight(16),
  },
  contentContainerStyle: {
    paddingBottom: parseSizeHeight(64),
  },
  buttonContinue: {
    position: 'absolute',
    bottom: 0,
    left: parseSizeWidth(16),
    right: parseSizeWidth(16),
    height: parseSizeHeight(44),
  },
  renderItemContainer: {
    marginBottom: parseSizeHeight(16),
  },
});
