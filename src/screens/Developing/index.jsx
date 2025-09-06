import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Colors, parseSize, parseSizeHeight, Sizes } from '../../theme';
import MyHeader from '../../components/Header/MyHeader';

const Developing = () => {
  const navigation = useNavigation();
  return (
    <>
      <MyHeader headerTitle={'Đang phát triển'} />
      <View style={styles.container}>
        <Text style={styles.text}>Chức năng này đang phát triển</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.subText}>Trở về trang chủ</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Developing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: parseSize(16),
  },
  text: {
    fontSize: Sizes.text_h5,
    fontWeight: '600',
    color: Colors.primary_600,
    textAlign: 'center',
    marginBottom: parseSizeHeight(8),
  },
  subText: {
    fontSize: Sizes.text_subtitle2,
    textAlign: 'center',
  },
});
