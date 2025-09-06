import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, parseSizeHeight, parseSizeWidth } from '../theme';

// const data = [
//   { label: string, value: string },
// ];

// checkedItem = string

const RadioGroup = ({
  data,
  checkedItem,
  onPress,
  flexRow,
  gap = 12,
  style,
}) => {
  return (
    <View
      style={[styles.container, flexRow && styles.flexRow, { gap: gap }, style]}
    >
      {data &&
        data.length > 0 &&
        data.map(item => (
          <View key={item.value} style={styles.radioButton}>
            <TouchableOpacity
              onPress={() => onPress(item.value)}
              style={[
                styles.circle,
                checkedItem === item?.value && {
                  borderColor: Colors.primary_600,
                },
              ]}
            >
              {checkedItem === item?.value && <View style={styles.dot} />}
            </TouchableOpacity>
            <Pressable onPress={() => onPress(item.value)}>
              <Text>{item.label}</Text>
            </Pressable>
          </View>
        ))}
    </View>
  );
};

export default RadioGroup;

const styles = StyleSheet.create({
  container: {},
  radioButton: {
    flexDirection: 'row',
    gap: parseSizeWidth(8),
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseSizeWidth(32),
  },
  circle: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.gray_neutral_400,
    height: parseSizeHeight(20),
    width: parseSizeWidth(20),
    borderRadius: 9999,
  },
  dot: {
    backgroundColor: Colors.primary_600,
    borderRadius: 9999,
    height: parseSizeHeight(10),
    width: parseSizeWidth(10),
  },
});
