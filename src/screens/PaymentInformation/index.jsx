import { Image, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
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

const PaymentInformation = () => {
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

  const onShareQr = async () => {
    try {
      const uri = await qrRef.current.capture();
      await Share.open({
        url: uri,
      });
    } catch (err) {
      console.log(err);
    }
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
          onPress={onShareQr}
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
    fontWeight: 600,
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
  },
  qrImage: {
    height: parseSizeHeight(250),
    width: parseSizeWidth(250),
    resizeMode: 'contain',
  },
  button: {
    height: parseSizeHeight(44),
    marginBottom: parseSizeHeight(24),
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
    fontWeight: 500,
  },
});
