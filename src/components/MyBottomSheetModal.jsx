import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { parseSizeHeight, parseSizeWidth } from '../theme';

const MyBottomSheetModal = ({
  isVisible,
  onClose,
  children,
  heightPercent = '30%',
}) => {
  const bottomSheetModalRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isVisible]);

  const renderBackdrop = props => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      pressBehavior="close"
    />
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={[heightPercent]}
      onDismiss={onClose}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default MyBottomSheetModal;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingVertical: parseSizeHeight(8),
    paddingHorizontal: parseSizeWidth(16),
    height: '100%',
  },
});
