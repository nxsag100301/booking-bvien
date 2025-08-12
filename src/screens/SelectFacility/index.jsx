import { StyleSheet, View } from 'react-native';
import React from 'react';
import MyHeader from '../../components/Header/MyHeader';
import { parseSizeHeight, parseSizeWidth } from '../../theme';
import { allFacilities } from '../../constants/data';
import FacilityCard from '../../components/FacilityCard/FacilityCard';
import { useNavigation } from '@react-navigation/native';

const SelectFacility = () => {
  const navigation = useNavigation();
  return (
    <>
      <MyHeader headerTitle="Chọn cơ sở khám" />
      <View style={styles.container}>
        {allFacilities.map(item => (
          <FacilityCard
            key={item.name}
            facility={item}
            onPress={() => navigation.navigate('bookapakage')}
          />
        ))}
      </View>
    </>
  );
};

export default SelectFacility;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: parseSizeWidth(16),
    paddingTop: parseSizeHeight(16),
    gap: parseSizeHeight(24),
  },
});
