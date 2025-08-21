import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, parseSizeHeight, parseSizeWidth, Sizes } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import icons from '../../constants/icons';

const MyHeader = ({ headerTitle, endIcon, onPress, hiddenBack }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {!hiddenBack ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backContainer}
        >
          <View style={styles.backWrapper}>
            <Image
              source={icons.back}
              tintColor="black"
              style={styles.backIcon}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.backContainer} />
      )}

      <Text style={styles.headerTitle}>
        {headerTitle ? headerTitle : 'No header'}
      </Text>
      {endIcon ? (
        <TouchableOpacity style={styles.rightButtonContainer} onPress={onPress}>
          <Image source={endIcon} tintColor="black" style={styles.endIcon} />
        </TouchableOpacity>
      ) : (
        <View style={styles.rightButtonContainer} />
      )}
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
    width: parseSizeWidth(36),
    borderRadius: 9999,
  },
  backWrapper: {
    height: parseSizeHeight(30),
    width: parseSizeWidth(12),
  },
  backIcon: {
    height: '100%',
    width: '100%',
    tintColor: Colors.primary_600,
  },
  headerTitle: {
    fontSize: Sizes.text_h6,
    fontWeight: 600,
    color: Colors.primary_600,
  },
  rightButtonContainer: {
    height: parseSizeHeight(30),
    width: parseSizeWidth(36),
    justifyContent: 'center',
    alignItems: 'center',
  },
  endIcon: {
    width: parseSizeWidth(20),
    height: parseSizeHeight(20),
    tintColor: Colors.primary_600,
  },
});
