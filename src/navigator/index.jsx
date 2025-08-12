import BottomTab from './BottomTab';
import { createRef } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BookAPakage, Booking, SelectFacility, TestPdf } from '../screens';
import { useSelector } from 'react-redux';

export const navigationRef = createRef();

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const Navigation = () => {
  const user = useSelector(state => state.user.currentUser);
  return (
    <NavigationContainer ref={navigationRef} theme={MyTheme}>
      <Stack.Navigator
        initialRouteName={'bottomTab'}
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="bottomTab" component={BottomTab} />

        {/* Booking */}
        <Stack.Screen name="booking" component={Booking} />
        <Stack.Screen name="bookapakage" component={BookAPakage} />
        <Stack.Screen name="selectfacility" component={SelectFacility} />

        {/* Medical History */}

        {/* Payment History */}

        {/* Pdf */}
        <Stack.Screen name="testPdf" component={TestPdf} />

        {/* Login */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
