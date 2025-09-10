import { ScrollView, StyleSheet, View } from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import HomeHeader from './conponents/HomeHeader';
import { Colors, parseSizeHeight, parseSizeWidth, Sizes } from '../../theme';
import HomeCarousel from './conponents/HomeCarousel';
import MenuButton from './conponents/MenuButton';
import { homeMenu } from '../../constants/data';
import MyButton from '../../components/Button/MyButton';
import BannerCarousel from './conponents/BannerCarousel';
import {
  getCommuneNew,
  getCommuneOld,
  getCountry,
  getDistrictOld,
  getGender,
  getJob,
  getNation,
  getProvinceNew,
  getProvinceOld,
} from '../../api/common';
import { setCommonData } from '../../redux/slice/commonSlice';
import { getListProfileApi } from '../../redux/slice/profileSlice';
import Toast from 'react-native-toast-message';

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(state => state.user.currentUser);
  const listProfile = useSelector(state => state.profile.listProfile);
  console.log('user: ', user);
  const handleBooking = () => {
    if (!user) {
      return navigation.navigate('login');
    }
    if (listProfile?.length < 1) {
      Toast.show({
        type: 'error',
        text1: 'Bạn chưa có hồ sơ',
        text2: 'Tạo hồ sơ để đặt khám',
      });
      return navigation.navigate('bottomTab', {
        screen: 'listProfile',
      });
    }
    navigation.navigate('selectFacility');
  };

  useEffect(() => {
    dispatch(getListProfileApi());
  }, [dispatch]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [
          provinceNew,
          communeNew,
          provinceOld,
          districtOld,
          communeOld,
          gender,
          nation,
          job,
          country,
        ] = await Promise.all([
          getProvinceNew(),
          getCommuneNew(),
          getProvinceOld(),
          getDistrictOld(),
          getCommuneOld(),
          getGender(),
          getNation(),
          getJob(),
          getCountry(),
        ]);
        dispatch(
          setCommonData({
            provinceNew,
            communeNew,
            provinceOld,
            districtOld,
            communeOld,
            gender,
            nation,
            job,
            country,
          }),
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchAll();
  }, [dispatch]);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <HomeHeader />
      <HomeCarousel />
      <BannerCarousel />
      <View style={styles.menu}>
        {homeMenu.map(item => (
          <MenuButton
            key={item.title}
            title={item.title}
            icon={item.icon}
            screen={item.screen}
          />
        ))}
      </View>
      <MyButton
        onPress={handleBooking}
        style={styles.buttonStyle}
        labelStyle={styles.labelButton}
        label="Đặt khám"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: parseSizeHeight(24),
    paddingTop: parseSizeHeight(12),
    backgroundColor: Colors.white,
  },
  menu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: parseSizeWidth(6),
    paddingHorizontal: parseSizeWidth(16),
    marginTop: parseSizeHeight(16),
  },
  buttonStyle: {
    width: parseSizeWidth(200),
    marginHorizontal: 'auto',
    height: parseSizeHeight(44),
    marginTop: parseSizeHeight(6),
  },
  labelButton: {
    fontSize: Sizes.text_subtitle1,
    fontWeight: 500,
  },
});

export default Home;
