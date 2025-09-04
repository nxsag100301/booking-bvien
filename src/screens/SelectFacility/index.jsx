import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MyHeader from '../../components/Header/MyHeader';
import { parseSizeHeight, parseSizeWidth } from '../../theme';
import { allFacilities } from '../../constants/data';
import FacilityCard from '../../components/FacilityCard/FacilityCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getFacility } from '../../api/facility';

const SelectFacility = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { goBack = false } = route.params || {};

  const [listFacility, setListFacility] = useState([]);

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const res = await getFacility();
        if (res.statusCode === 200) {
          setListFacility(res?.data);
        }
      } catch (error) {
        console.log('get facility err: ', error);
      }
    };
    fetchFacility();
  }, []);

  return (
    <>
      <MyHeader headerTitle="Chọn cơ sở khám" />
      <View style={styles.container}>
        {listFacility.map(item => (
          <FacilityCard
            key={item.id}
            facility={item}
            onPress={() =>
              goBack ? navigation.goBack() : navigation.navigate('bookAPakage')
            }
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
