import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
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
      enableDynamicSizing={false}
      maxDynamicContentSize={0}
    >
      <View style={styles.contentContainer}>{children}</View>
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
