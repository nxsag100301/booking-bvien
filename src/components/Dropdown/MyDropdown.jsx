import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {
  Colors,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
  Sizes,
} from '../../theme';

const MyDropdown = ({ data, label, placeholder, value, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        activeColor={Colors.primary_100}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder ? placeholder : label}
        value={value}
        onChange={item => {
          onChange(item);
        }}
        renderLeftIcon={() => ''}
        selectedStyle={styles.selectedStyle}
        containerStyle={styles.dropdownContent}
        itemContainerStyle={styles.itemDropdownContent}
        itemTextStyle={styles.itemTextStyle}
      />
    </View>
  );
};

export default MyDropdown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: Sizes.text_tagline1,
    color: Colors.primary_600,
    marginBottom: parseSizeHeight(4),
  },
  dropdown: {
    height: parseSizeHeight(40),
    backgroundColor: 'transparent',
    borderRadius: 9999,
    paddingHorizontal: parseSizeWidth(16),
    borderWidth: 0.5,
    borderColor: Colors.primary_600,
  },
  placeholderStyle: {
    fontSize: Sizes.text_tagline1,
    color: Colors.primary_600,
  },
  selectedTextStyle: {
    fontSize: Sizes.text_tagline1,
    color: Colors.primary_600,
  },
  iconStyle: {
    width: parseSizeWidth(20),
    height: parseSizeHeight(20),
    tintColor: Colors.primary_600,
    padding: 0,
    right: -6,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: Sizes.text_tagline1,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 9999,
    borderColor: Colors.primary_600,
  },
  dropdownContent: {
    borderRadius: parseSize(12),
    borderWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  itemDropdownContent: {
    borderRadius: parseSize(12),
    margin: parseSize(4),
    padding: 0,
  },
  itemTextStyle: {
    fontSize: Sizes.text_tagline1,
  },
});
