import { Dimensions, Platform } from 'react-native';
import deviceInfo from '../utils/deviceInfo';

export const platform = Platform.OS;
const deviceName = deviceInfo.deviceName || '';
let iPhoneX = [
  'IPHONE 6',
  'IPHONE 6 PLUS',
  'IPHONE 6S',
  'IPHONE 6S PLUS',
  'IPHONE 7',
  'IPHONE 7 PLUS',
  'IPHONE 8',
  'IPHONE 8 PLUS',
  'IPHONE SE (2016)', // iPhone SE thế hệ đầu tiên
  'IPHONE SE (2020)', // iPhone SE thế hệ thứ 2 (với thiết kế giống iPhone 8)
];

export const isIphoneX =
  platform === 'ios' && iPhoneX.indexOf(deviceName.toUpperCase()) > -1;

export const Width = Dimensions.get('window').width;
export const Height = Dimensions.get('window').height;
const screenAvg = (Width + Height) / 2;

export const parseSize = number => {
  const elemSize = typeof number === 'number' ? number : parseFloat(number);
  const percent = elemSize / screenAvg;
  return screenAvg * percent;
};
export const parseSizeHeight = number => {
  const elemSize = typeof number === 'number' ? number : parseFloat(number);
  const heightBase = 844; // lấy chiều dọc iphone 12 làm chuẩn
  const percent = Height / heightBase;
  return elemSize * percent;
};

export const parseSizeWidth = number => {
  const elemSize = typeof number === 'number' ? number : parseFloat(number);
  const widthBase = 390; // lấy chiều ngang iphone 12 làm chuẩn
  const percent = Width / widthBase;
  return elemSize * percent;
};

export const Colors = {
  background: '#FDFDFD',
  white: '#FFFFFF',
  black: '#181818',

  //Text
  text_50: '#F4F5F7',
  text_100: '#E2E4EB',
  text_200: '#C9CCD8',
  text_300: '#A3A7BD',
  text_400: '#767C9A',
  text_500: '#5A5F80',
  text_600: '#4E516C',
  text_700: '#43455B',
  text_800: '#3C3D4E',
  text_900: '#363743',

  //Primary
  primary_50: '#E8F0FF',
  primary_100: '#C7D7FF',
  primary_200: '#A4BDFF',
  primary_300: '#7F9FFF',
  primary_400: '#5E82FF',
  primary_500: '#3D65FF',
  primary_600: '#004AAD',
  primary_700: '#003B8E',
  primary_800: '#002D67',
  primary_900: '#001F43',
  primary_950: '#00122A',

  //Black
  black_100: '#D2D2D5',
  black_200: '#A5A5AB',
  black_400: '#4A4C56',
  black_500: '#1D1F2C',
  black_900: '#030304',

  //Error
  error_50: '#FEF3F2',
  error_100: '#FFCDC9',
  error_200: '#FDAAA4',
  error_300: '#FEE4E2',
  error_400: '#F97970',
  error_500: '#F04438',
  error_600: '#D92D20',
  error_700: '#B42318',
  error_800: '#912018',
  error_900: '#7A271A',
  error_950: '#50160C',

  //Success
  success_50: '#F6FEF9',
  success_100: '#DCFAE6',
  success_200: '#ABEFC6',
  success_300: '#75E0A7',
  success_400: '#47DC89',
  success_500: '#17B26A',
  success_600: '#079455',
  success_700: '#067647',
  success_800: '#085D3A',
  success_900: '#074D31',
  success_950: '#053321',

  //Warning
  warning_50: '#FFFAEB',
  warning_100: '#FEF0C7',
  warning_200: '#FEDF89',
  warning_300: '#FEC84B',
  warning_400: '#FDB022',
  warning_500: '#F79009',
  warning_600: '#DC6803',
  warning_700: '#B54708',
  warning_800: '#93370D',
  warning_900: '#7A2E0E',
  warning_950: '#4E1D09',

  //Blue
  blue_50: '#EBF2FF',
  blue_100: '#DBE5FF',
  blue_200: '#BED0FF',
  blue_300: '#97AFFF',
  blue_400: '#6E82FF',
  blue_500: '#4C57FF',
  blue_600: '#423FFF',
  blue_700: '#2720E2',
  blue_800: '#201DB6',
  blue_900: '#20218F',
  blue_950: '#141353',

  //Gray neutral
  gray_neutral_50: '#F7F7F7',
  gray_neutral_100: '#E7E7E980',
  gray_neutral_200: '#DDDDE0',
  gray_neutral_300: '#C6C6CA',
  gray_neutral_400: '#A9AAB1',
  gray_neutral_500: '#95949D',
  gray_neutral_600: '#84838D',
  gray_neutral_700: '#78767F',
  gray_neutral_800: '#64636A',
  gray_neutral_900: '#535256',
  gray_neutral_950: '#343437',

  //Green
  green: '#009800',
  green_bg: '#EEFFE2',
};

export const Sizes = {
  tab: parseSize(30),
  icon: parseSize(34),
  text: parseSize(12),
  tiny: parseSize(10),
  padding: parseSize(10),
  paddingSmall: parseSize(7),
  margin: parseSize(10),
  radius: parseSize(8),
  border: parseSize(1),

  //new app
  paddingHeight: parseSizeHeight(24),
  paddingWidth: parseSizeWidth(16),
  marginHeight: parseSizeHeight(24),
  marginWidth: parseSizeWidth(16),

  //new text
  text_h1: parseSizeWidth(48),
  text_h2: parseSizeWidth(36),
  text_h3: parseSizeWidth(32),
  text_h4: parseSizeWidth(24),
  text_h5: parseSizeWidth(20),
  text_h6: parseSizeWidth(18),
  text_subtitle1: parseSizeWidth(16),
  text_subtitle2: parseSizeWidth(14),
  text_tagline1: parseSizeWidth(12),
  text_tagline2: parseSizeWidth(10),
  textDefault: parseSizeWidth(14),

  //spacing
  iconSize_Width: parseSizeWidth(24),
  iconSize_Height: parseSizeHeight(24),
  Size_large_Width: parseSizeWidth(30),
  Size_large_Height: parseSizeHeight(30),
  spacing_1_Width: parseSizeWidth(4),
  spacing_1_Height: parseSizeHeight(4),
  spacing_2_Width: parseSizeWidth(8),
  spacing_2_Height: parseSizeHeight(8),
  spacing_3_Width: parseSizeWidth(12),
  spacing_3_Height: parseSizeHeight(12),
  spacing_4_Width: parseSizeWidth(16),
  spacing_4_Height: parseSizeHeight(16),
  spacing_5_Width: parseSizeWidth(24),
  spacing_5_Height: parseSizeHeight(24),
  spacing_6_Width: parseSizeWidth(32),
  spacing_6_Height: parseSizeHeight(32),
  spacing_7_Width: parseSizeWidth(40),
  spacing_7_Height: parseSizeHeight(40),
  spacing_8_Width: parseSizeWidth(48),
  spacing_8_Height: parseSizeHeight(48),
  spacing_9_Width: parseSizeWidth(64),
  spacing_9_Height: parseSizeHeight(64),
  header_logo_Width: parseSizeWidth(84),
  header_logo_Height: parseSizeHeight(49),
  heightLine_Width: parseSizeWidth(2),
  heightLine_Height: parseSizeHeight(2),
  input_Width: parseSizeWidth(361),
  input_Height: parseSizeHeight(48),
  input_radius_Width: parseSizeWidth(12),
  input_radius_Height: parseSizeHeight(12),
};

export const FontStyles = {
  InterLight: 'Inter-Light',
  InterMedium: 'Inter-Medium',
  InterSemiBold: 'Inter-SemiBold',
  InterBold: 'Inter-Bold',
  PenumbraBold: 'UTM-PenumbraBold',
};
