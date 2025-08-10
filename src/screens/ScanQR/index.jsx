import { Camera, useCameraDevice } from 'react-native-vision-camera';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

export default function App() {
  const device = useCameraDevice('back');
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      console.log('status: ', status);
      setHasPermission(status === 'authorized' || status === 'granted');
    })();
  }, []);

  console.log('devices: ', device);

  if (device == null) return <Text>Đang tải camera...</Text>;
  if (!hasPermission) return <Text>Không có quyền camera</Text>;

  return <Camera style={{ flex: 1 }} device={device} isActive={true} />;
}
