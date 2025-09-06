import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MyHeader from '../../components/Header/MyHeader';
import {
  Colors,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
  Sizes,
} from '../../theme';
import MyButton from '../../components/Button/MyButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import icons from '../../constants/icons';
import { useDispatch } from 'react-redux';
import { setBookingData } from '../../redux/slice/bookingSlice';

const DetailPakage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { pakageInfo } = route?.params;
  const handleSelectPakage = () => {
    dispatch(setBookingData({ idGoi: pakageInfo.id }));
    navigation.navigate('selectSchedule');
  };
  return (
    <View style={styles.container}>
      <MyHeader headerTitle="Thông tin gói khám" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{pakageInfo?.name}</Text>
          <Text style={styles.price}>{pakageInfo?.price}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>Thông tin công việc thực hiện</Text>
          <Text style={styles.subContentTitle}>
            Khám chuyên gia theo yêu cầu
          </Text>
          <Text style={styles.subContentTitle}>
            Khám chuyên gia theo yêu cầu
          </Text>
          <Text style={styles.subContentTitle}>
            Khám chuyên gia theo yêu cầu
          </Text>
          <Text style={styles.subContentTitle}>
            Khám chuyên gia theo yêu cầu
          </Text>
          <Text style={styles.subContentTitle}>
            Khám chuyên gia theo yêu cầu
          </Text>
          <Text style={styles.subContentTitle}>
            Khám chuyên gia theo yêu cầu
          </Text>
          <Text style={styles.subContentTitle}>
            Khám chuyên gia theo yêu cầu
          </Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <MyButton
          variant="outline"
          label="Tôi cần tư vấn"
          labelColor={Colors.primary_600}
          style={styles.buttonStyle}
          startIcon={icons.phone}
        />
        <MyButton
          onPress={handleSelectPakage}
          label="Chọn gói"
          style={styles.buttonStyle}
        />
      </View>
    </View>
  );
};

export default DetailPakage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    gap: parseSizeHeight(24),
    flex: 1,
  },
  headerContainer: {
    marginTop: parseSizeHeight(16),
    padding: parseSize(16),
    gap: parseSizeHeight(8),
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  title: {
    fontSize: Sizes.text_h6,
    fontWeight: 600,
    color: Colors.primary_600,
  },
  price: {
    fontSize: Sizes.text_h6,
    fontWeight: 600,
  },
  contentContainer: {
    padding: parseSize(16),
    gap: parseSizeHeight(16),
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  contentTitle: {
    fontSize: Sizes.text_h6,
    fontWeight: 600,
  },
  subContentTitle: {
    fontSize: Sizes.text_subtitle1,
    paddingLeft: parseSizeWidth(24),
  },
  buttonContainer: {
    paddingHorizontal: parseSizeWidth(16),
    gap: parseSizeHeight(16),
  },
  buttonStyle: {
    height: parseSizeHeight(44),
  },
});
