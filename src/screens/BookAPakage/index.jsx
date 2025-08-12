import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MyHeader from '../../components/Header/MyHeader';
import { parseSizeHeight, parseSizeWidth } from '../../theme';

const BookAPakage = () => {
  return (
    <>
      <MyHeader headerTitle="Chọn gói khám" />
      <View style={styles.container}>
        <Text>Chọn gói khám</Text>
      </View>
    </>
  );
};

export default BookAPakage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: parseSizeWidth(16),
    paddingTop: parseSizeHeight(16),
    gap: parseSizeHeight(24),
  },
});
