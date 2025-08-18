import {
  Image,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { useEffect, useState, useRef } from 'react';
import ViewShot from 'react-native-view-shot';
import MyHeader from '../../components/Header/MyHeader';
import {
  Colors,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
  Sizes,
} from '../../theme';
import icons from '../../constants/icons';
import MyButton from '../../components/Button/MyButton';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

const PaymentInformation = () => {
  const navigation = useNavigation();
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const qrRef = useRef();

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = seconds => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const onDownloadQr = async () => {
    try {
      const uri = await qrRef.current.capture();
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Quyền truy cập bộ nhớ',
            message: 'Ứng dụng cần quyền để lưu hình ảnh vào thư viện',
            buttonNeutral: 'Hỏi lại sau',
            buttonNegative: 'Hủy',
            buttonPositive: 'Đồng ý',
          },
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Không có quyền lưu ảnh');
          return;
        }
      }

      await CameraRoll.saveAsset(uri, { type: 'photo' });

      Toast.show({
        type: 'success',
        text1: 'Thành công',
        text2: 'Ảnh QR đã được lưu vào thư viện',
      });
    } catch (err) {
      console.log('Lỗi lưu ảnh:', err);
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Không thể lưu ảnh QR',
      });
    }
  };

  const handleConfirm = () => {
    Toast.show({
      type: 'success',
      text1: 'Thành công',
      text2: 'Bạn đã đặt khám thành công',
    });
    navigation.navigate('bottomTab');
  };

  return (
    <>
      <MyHeader headerTitle="Thông tin thanh toán" />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text>Giao dịch sẽ hết hạn sau:</Text>
          <Text style={styles.time}>{formatTime(timeLeft)}</Text>
        </View>
        <Text style={styles.description}>
          Quý khách quét mã qua ứng dụng NGÂN HÀNG hoặc VÍ ĐIỆN TỬ
        </Text>

        <ViewShot
          ref={qrRef}
          options={{ fileName: 'QRcode', format: 'png', quality: 0.9 }}
        >
          <View style={styles.qrContainer}>
            <Image source={icons.qr} style={styles.qrImage} />
          </View>
        </ViewShot>

        <MyButton
          label="Tải mã thanh toán"
          style={styles.button}
          startIcon={icons.download}
          onPress={onDownloadQr}
        />

        <View style={styles.infoLineContainer}>
          <Text style={styles.titleInfo}>Số tiền:</Text>
          <Text style={styles.valueInfo}>2.000.000</Text>
        </View>
        <View style={styles.infoLineContainer}>
          <Text style={styles.titleInfo}>Nội dung giao dịch:</Text>
          <Text style={styles.valueInfo}>abcd</Text>
        </View>
        <View style={styles.infoLineContainer}>
          <Text style={styles.titleInfo}>Chủ tài khoản:</Text>
          <Text style={styles.valueInfo}>Bệnh viện Ung Bướu - Cơ sở 2</Text>
        </View>
      </View>
      <MyButton
        onPress={handleConfirm}
        label={'Xác nhận'}
        style={styles.buttonContinue}
      />
    </>
  );
};

export default PaymentInformation;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: parseSizeWidth(16),
    marginTop: parseSizeHeight(16),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    fontWeight: '600',
    color: Colors.primary_600,
  },
  description: {
    marginTop: parseSizeHeight(32),
    paddingHorizontal: parseSizeWidth(32),
    textAlign: 'center',
  },
  qrContainer: {
    borderWidth: 1,
    borderColor: Colors.primary_600,
    padding: parseSize(16),
    margin: parseSize(16),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  qrImage: {
    height: parseSizeHeight(250),
    width: parseSizeWidth(250),
    resizeMode: 'contain',
  },
  button: {
    height: parseSizeHeight(44),
    marginBottom: parseSizeHeight(16),
  },
  infoLineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: parseSizeHeight(8),
  },
  titleInfo: {
    width: '50%',
  },
  valueInfo: {
    width: '50%',
    fontSize: Sizes.text_subtitle1,
    color: Colors.primary_600,
    fontWeight: '500',
  },
  buttonContinue: {
    position: 'absolute',
    bottom: 0,
    left: parseSizeWidth(16),
    right: parseSizeWidth(16),
    height: parseSizeHeight(44),
  },
});
