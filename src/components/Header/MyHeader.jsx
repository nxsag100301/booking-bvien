import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, parseSizeHeight, parseSizeWidth, Sizes } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import icons from '../../constants/icons';

const MyHeader = ({ headerTitle }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backContainer}
      >
        <Image source={icons.back} tintColor="black" style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>
        {headerTitle ? headerTitle : 'No header'}
      </Text>
      <View style={styles.fakeView} />
    </View>
  );
};

export default MyHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: parseSizeWidth(16),
    paddingVertical: parseSizeHeight(8),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backContainer: {
    height: parseSizeHeight(30),
    width: parseSizeWidth(12),
    borderRadius: 50,
  },
  backIcon: {
    height: '100%',
    width: '100%',
    tintColor: Colors.primary_600,
  },
  headerTitle: {
    fontSize: Sizes.text_h6,
    fontWeight: 500,
    color: Colors.primary_600,
  },
  fakeView: {
    height: parseSizeHeight(30),
    width: parseSizeWidth(12),
  },
});
