import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import images from '../../../constants/images';
import {
  Colors,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
  Width,
} from '../../../theme';
import MyButton from '../../../components/Button/MyButton';

const data = [{ image: images.banner3 }, { image: images.banner4 }];

const BannerCarousel = () => {
  const renderItem = item => {
    return (
      <View style={styles.itemRenderContainer}>
        <Image source={item.image} style={styles.banner} />
        <MyButton
          label="Đăng ký ngay"
          style={styles.button}
          labelStyle={styles.labelButton}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        loop={true}
        width={Width - parseSizeWidth(32)}
        height={parseSizeHeight(150)}
        snapEnabled={true}
        autoPlayInterval={2000}
        data={data}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  );
};

export default BannerCarousel;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: parseSizeWidth(16),
    marginTop: parseSizeHeight(16),
  },
  banner: {
    height: '100%',
    width: '100%',
    borderRadius: parseSize(16),
  },
  itemRenderContainer: {
    position: 'relative',
  },
  button: {
    position: 'absolute',
    left: parseSizeWidth(22),
    bottom: parseSizeHeight(16),
    backgroundColor: Colors.success_300,
  },
  labelButton: {
    color: Colors.primary_500,
    fontWeight: 600,
  },
});
