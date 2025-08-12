import { ScrollView, StyleSheet, View } from 'react-native';
import HomeHeader from './conponents/HomeHeader';
import { Colors, parseSizeHeight, parseSizeWidth, Sizes } from '../../theme';
import HomeCarousel from './conponents/HomeCarousel';
import MenuButton from './conponents/MenuButton';
import { homeMenu } from '../../constants/data';
import MyButton from '../../components/Button/MyButton';
import BannerCarousel from './conponents/BannerCarousel';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
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
        onPress={() => navigation.navigate('booking')}
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
