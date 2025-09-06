import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import MyHeader from '../../components/Header/MyHeader';
import { Colors, parseSizeHeight, parseSizeWidth } from '../../theme';
import MyDropdown from '../../components/Dropdown/MyDropdown';
import PakageCard from './components/PakageCard';
import MyButton from '../../components/Button/MyButton';
import { getPakage } from '../../api';
import { useDispatch } from 'react-redux';
import { setBookingData } from '../../redux/slice/bookingSlice';

const dataPakage = [
  { label: 'Tất cả gói', value: 0 },
  { label: 'Gói 1', value: 1 },
  { label: 'Gói 2', value: 2 },
  { label: 'Gói 3', value: 3 },
];

const dataGender = [
  { label: 'Tất cả', value: 1 },
  { label: 'Nam', value: 2 },
  { label: 'Nữ', value: 3 },
];

const dataAge = [
  { label: 'Tất cả', value: 1 },
  { label: 'Dưới 10 tuổi', value: 2 },
  { label: 'Dưới 20 tuổi', value: 3 },
  { label: 'Dưới 40 tuổi', value: 4 },
];

const BookAPakage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const route = useRoute();
  // const { goBack = false } = route.params || {};
  const [selectedPakage, setSelectedPakage] = useState(dataPakage[0]);
  const [selectedGender, setSelectedGender] = useState(dataGender[1]);
  const [selectedAge, setSelectedAge] = useState(dataAge[0]);
  const [checkedItem, setCheckedItem] = useState(null);
  const [listPakage, setListPakage] = useState([]);

  const handleContinue = () => {
    if (!checkedItem) {
      return Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Bạn chưa chọn gói khám',
      });
    }
    dispatch(setBookingData({ idGoi: checkedItem.id }));
    navigation.navigate('selectSchedule');
  };

  useEffect(() => {
    const fetchListPakage = async () => {
      try {
        const res = await getPakage({
          tuoi: selectedAge,
          loaiGoi: selectedPakage,
          idGT: selectedGender,
        });
        if (res?.statusCode === 200) {
          setListPakage(res?.data);
        }
      } catch (error) {
        console.log('get pakage err: ', error);
      }
    };
    fetchListPakage();
  }, [selectedAge, selectedPakage, selectedGender]);

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
          onPress={handleContinue}
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
