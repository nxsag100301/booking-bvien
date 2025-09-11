import React from 'react';
import { Modal, StyleSheet, View, Text, FlatList } from 'react-native';
import ProfileCard from './ProfileCard';
import { Colors, parseSizeHeight, parseSizeWidth, Sizes } from '../../../theme';
import MyButton from '../../../components/Button/MyButton';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const SelectProfileModal = ({ isVisible, onClose }) => {
  const navigation = useNavigation();
  const listProfile = useSelector(state => state.profile.listProfile);
  console.log('list: ', listProfile);
  return (
    <Modal visible={isVisible} transparent animationType="fade">
      {/* Lớp phủ tối */}
      <View style={styles.backdrop} />

      {/* Nội dung modal */}
      <View style={styles.centeredContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Chọn hồ sơ</Text>
          <FlatList
            data={listProfile}
            keyExtractor={item => item.idBenhNhan}
            contentContainerStyle={styles.flatListContentContainer}
            renderItem={({ item }) => <ProfileCard profile={item} />}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.textEmpty}>Bạn chưa có hồ sơ</Text>
                <MyButton
                  onPress={() => {
                    navigation.navigate('addProfile');
                    onClose();
                  }}
                  label={'Tạo hồ sơ'}
                />
              </View>
            }
          />
        </View>
      </View>
    </Modal>
  );
};

export default SelectProfileModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  centeredContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    height: '60%',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: parseSizeHeight(16),
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    gap: parseSizeHeight(16),
  },
  title: {
    fontSize: Sizes.text_h6,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.primary_600,
  },
  flatListContentContainer: {
    flex: 1,
    paddingHorizontal: parseSizeWidth(16),
    gap: parseSizeHeight(16),
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    gap: parseSizeHeight(16),
  },
  textEmpty: {
    fontSize: Sizes.text_subtitle1,
  },
});
