/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Account, Home, ListProfile, ScanQR, Search } from '../../screens';
import icons from '../../constants/icons';
import { Colors, parseSizeHeight, parseSizeWidth } from '../../theme';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const bottomTab = [
  {
    id: 1,
    name: 'home',
    component: Home,
    icon: icons.home,
    label: 'Trang chủ',
  },
  {
    id: 2,
    name: 'search',
    component: Search,
    icon: icons.calendar,
    label: 'Lịch khám',
  },
  {
    id: 3,
    name: 'scanQR',
    component: ScanQR,
    icon: icons.scan,
    isMiddle: true,
    label: 'Quét QR',
  },
  {
    id: 4,
    name: 'notifications',
    component: ListProfile,
    icon: icons.fileOutline,
    label: 'Hồ sơ',
  },
  {
    id: 5,
    name: 'account',
    component: Account,
    icon: icons.person,
    label: 'Tài khoản',
  },
];

const TabIcon = ({ icon, focused, isMiddle, label }) => {
  const navigation = useNavigation();
  if (isMiddle) {
    return (
      <TouchableOpacity
        style={styles.middleButton}
        onPress={() => navigation.navigate('scanQR')}
      >
        <Image
          source={icon}
          style={{
            width: parseSizeWidth(36),
            height: parseSizeHeight(36),
            tintColor: Colors.white,
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.tabIcon}>
      <Image
        source={icon}
        style={{
          width: parseSizeWidth(28),
          height: parseSizeHeight(28),
          tintColor: focused ? Colors.primary_600 : '#8E8E93',
        }}
        resizeMode="contain"
      />
      <Text
        style={{
          color: focused ? Colors.primary_600 : '#8E8E93',
          fontSize: 10,
          marginTop: 4,
          fontWeight: 500,
          textAlign: 'center',
        }}
      >
        {label}
      </Text>
    </View>
  );
};

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      {bottomTab.map(tab => (
        <Tab.Screen
          key={tab.id}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon
                icon={tab.icon}
                focused={focused}
                isMiddle={tab.isMiddle}
                label={tab.label}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: parseSizeHeight(55),
    backgroundColor: Colors.background,
    paddingTop: parseSizeHeight(8),
  },
  tabIcon: {
    height: parseSizeHeight(42),
    width: parseSizeWidth(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleButton: {
    backgroundColor: Colors.primary_600,
    width: parseSizeWidth(60),
    height: parseSizeHeight(60),
    borderRadius: parseSizeWidth(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
});

export default BottomTab;
