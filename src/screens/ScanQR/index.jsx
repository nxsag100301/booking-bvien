import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import { Colors } from '../../theme';

export default function QRScanner() {
  const [hasPermission, setHasPermission] = useState(false);
  const device = useCameraDevice('back');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      console.log('QR codes:', codes);
    },
  });

  useEffect(() => {
    const requestPermission = async () => {
      const status = await Camera.requestCameraPermission();
      if (status === 'granted') {
        setHasPermission(true);
      } else {
        console.warn('Camera permission denied');
      }
    };
    requestPermission();
  }, []);

  if (!hasPermission) {
    return <Text>Chưa cấp quyền sử dụng camera</Text>;
  }

  if (!device) return <Text>Không tìm thấy camera</Text>;

  return (
    <View style={styles.flex1}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />

      {/* Overlay UI */}
      <View style={styles.overlay}>
        <Text style={styles.title}>Quét mã QR</Text>

        <View style={styles.qrFrame} />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Đóng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
  },
  title: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
  qrFrame: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: Colors.primary_600,
    borderRadius: 20,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
