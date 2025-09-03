import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, parseSizeHeight, parseSizeWidth } from '../theme';

// const data = [
//   { label: string, value: string },
// ];

// checkedItem = { label: string, value: string },

const RadioGroup = ({ data, checkedItem, onPress }) => {
  return (
    <View style={styles.container}>
      {data &&
        data.length > 0 &&
        data.map(item => (
          <View key={item.value} style={styles.radioButton}>
            <TouchableOpacity
              onPress={() => onPress(item)}
              style={[
                styles.circle,
                checkedItem?.value === item?.value && {
                  borderColor: Colors.primary_600,
                },
              ]}
            >
              {checkedItem?.value === item?.value && (
                <View style={styles.dot} />
              )}
            </TouchableOpacity>
            <Text>{item.label}</Text>
          </View>
        ))}
    </View>
  );
};

export default RadioGroup;

const styles = StyleSheet.create({
  container: {
    gap: parseSizeHeight(12),
  },
  radioButton: {
    flexDirection: 'row',
    gap: parseSizeWidth(8),
    alignItems: 'center',
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
    height: parseSizeHeight(12),
    width: parseSizeWidth(12),
  },
});
