import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import images from '../../../constants/images';
import {
  Colors,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
  Sizes,
  Width,
} from '../../../theme';

const data = [
  {
    name: 'Bệnh viện Ung Bướu - Cơ sở 1',
    address: 'Số Nguyễn Huy Lượng, Phường Bình Thạnh, TP. Hồ Chí Minh',
    image: images.banner1,
  },
  {
    name: 'Bệnh viện Ung Bướu - Cơ sở 2',
    address: 'Số 12 Đường 400, Khu phố 3, Thủ Đức, TP. Hồ Chí Minh',
    image: images.banner2,
  },
];

const HomeCarousel = () => {
  const renderItem = item => {
    return (
      <>
        <View style={styles.baseContainer}>
          <Image source={images.logo} style={styles.logoImage} />
          <View style={styles.hospitalInfo}>
            <Text style={styles.hospitalName}>{item.name}</Text>
            <Text style={styles.hospitalAddress}>{item.address}</Text>
          </View>
        </View>
        <View style={styles.itemRenderContainer}>
          <Image source={item.image} style={styles.banner} />
        </View>
      </>
    );
  };
  return (
    <View style={styles.container}>
      <Carousel
        loop={true}
        width={Width}
        height={parseSizeHeight(180)}
        snapEnabled={true}
        autoPlay={true}
        autoPlayInterval={3000}
        data={data}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: -20,
        }}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  );
};

export default HomeCarousel;

const styles = StyleSheet.create({
  container: {
    marginTop: parseSizeHeight(16),
  },
  banner: {
    height: '100%',
    width: '100%',
    borderRadius: parseSize(8),
  },
  baseContainer: {
    flexDirection: 'row',
    gap: parseSizeWidth(16),
    alignItems: 'center',
    paddingHorizontal: parseSizeWidth(16),
    marginBottom: parseSizeHeight(8),
  },
  logoImage: {
    height: parseSizeHeight(40),
    width: parseSizeWidth(45),
    resizeMode: 'contain',
    borderWidth: 1,
    borderRadius: parseSize(4),
    borderColor: Colors.primary_400,
  },
  hospitalInfo: {
    gap: parseSizeHeight(2),
  },
  hospitalName: {
    color: Colors.primary_600,
    fontWeight: 600,
  },
  hospitalAddress: {
    fontSize: Sizes.text_tagline2,
  },
});
