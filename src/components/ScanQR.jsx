import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Alert,
  TouchableOpacity,
  View,
  Platform,
  Image,
  Text,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import Svg, { Rect, Defs, Mask } from 'react-native-svg';
import RNQRGenerator from 'rn-qr-generator';
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';

import {
  Width,
  Height,
  parseSizeWidth,
  parseSizeHeight,
  Colors,
} from '../theme';
import icons from '../constants/icons';

const overlayColor = 'rgba(0,0,0,0.65)';
const markerSize = 230;

const ScanQR = ({ isActive, isVisible, onClose, onScan }) => {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const scannedRef = useRef(false);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (scannedRef.current) return;
      scannedRef.current = true;

      const value = codes[0]?.value ?? '';
      if (onScan) {
        onScan(value);
        scannedRef.current = true;
      }
      setTimeout(() => {
        scannedRef.current = false;
      }, 2000);
    },
  });

  const handleUploadImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets) {
        handleScanQRFromImage(response.assets[0].uri);
      }
    });
  };

  const handleScanQRFromImage = async imageUri => {
    RNQRGenerator.detect({
      uri: imageUri,
    })
      .then(response => {
        if (response?.values?.length > 0) {
          const stringCheck = response.values[0];
          if (onScan) {
            onScan(stringCheck);
          }
        } else {
          // showMessage({
          //   duration: 3000,
          //   message: t('QR code không chính xác'),
          //   type: 'danger',
          // });
        }
      })
      .catch(error => {
        // showMessage({
        //   duration: 3000,
        //   message: error?.message,
        //   type: 'danger',
        // });
      });
  };

  useEffect(() => {
    if (isVisible) {
      if (device == null) {
        Alert.alert('Camera', 'Không tìm thấy camera!');
        onClose();
      } else if (!hasPermission) {
        if (Platform.OS === 'android') {
          requestPermission();
        } else {
          requestPermission();
          Toast.show({
            type: 'error',
            props: { message: 'Chưa cấp quyền truy cập camera' },
          });
        }
        onClose();
      }
    }
  }, [isVisible, device, hasPermission, onClose, requestPermission]);

  if (device == null) {
    return null;
  }

  return (
    <Modal style={styles.container} isVisible={isVisible} transparent={false}>
      <View style={styles.flex1}>
        <Camera
          codeScanner={codeScanner}
          style={styles.flex1}
          device={device}
          isActive={isActive}
        />

        {/* Overlay mask */}
        <View style={StyleSheet.absoluteFill}>
          <Svg width="100%" height="100%">
            <Defs>
              <Mask id="mask">
                {/* Toàn màn hình hiển thị */}
                <Rect width="100%" height="100%" fill="white" />
                {/* Ô vuông ở giữa sẽ đục lỗ */}
                <Rect
                  x={(Width - markerSize) / 2}
                  y={(Height - markerSize) / 2 - parseSizeHeight(100)} // nhích lên 100
                  width={markerSize}
                  height={markerSize}
                  rx={16} // bo góc
                  ry={16}
                  fill="black"
                />
              </Mask>
            </Defs>
            {/* Overlay tối có mask */}
            <Rect
              width="100%"
              height="100%"
              fill={overlayColor}
              mask="url(#mask)"
            />
            {/* Viền trắng quanh ô vuông */}
            <Rect
              x={(Width - markerSize) / 2}
              y={(Height - markerSize) / 2 - parseSizeHeight(100)} // nhích lên 100
              width={markerSize}
              height={markerSize}
              rx={16}
              ry={16}
              stroke="white"
              strokeWidth={2}
              fill="transparent"
            />
          </Svg>
        </View>

        {/* Close Button */}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Image
            source={icons.x}
            style={{
              width: parseSizeWidth(24),
              height: parseSizeHeight(24),
            }}
            tintColor={Colors.white}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleUploadImage}
          style={styles.uploadButton}
        >
          <Image
            source={icons.gallery}
            style={{ width: parseSizeWidth(24), height: parseSizeHeight(24) }}
            tintColor={Colors.white}
          />
        </TouchableOpacity>

        <View style={styles.bottomText}>
          <Text style={styles.scanTxt}>Quét mã QR</Text>
        </View>
      </View>
    </Modal>
  );
};

export default ScanQR;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    position: 'relative',
    margin: 0,
  },
  closeButton: {
    position: 'absolute',
    top: parseSizeHeight(60),
    left: parseSizeWidth(24),
    width: parseSizeWidth(32),
    height: parseSizeHeight(32),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999,
  },
  bottomText: {
    position: 'absolute',
    bottom: 128,
    width: '100%',
    alignItems: 'center',
  },
  scanTxt: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  uploadButton: {
    position: 'absolute',
    top: parseSizeHeight(60),
    right: parseSizeWidth(24),
    width: parseSizeWidth(32),
    height: parseSizeHeight(32),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999,
  },
});
