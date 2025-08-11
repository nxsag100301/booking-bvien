import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import images from '../../../constants/images';
import { parseSizeHeight, Width } from '../../../theme';

const data = [{ image: images.banner1 }, { image: images.banner2 }];

const HomeCarousel = () => {
  return (
    <View style={styles.container}>
      <Carousel
        loop={true}
        width={Width}
        height={parseSizeHeight(130)}
        snapEnabled={true}
        autoPlayInterval={2000}
        data={data}
        renderItem={({ item }) => (
          <Image source={item.image} style={styles.banner} />
        )}
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
  },
});
