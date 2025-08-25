import BottomTab from './BottomTab';
import { createRef } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  AddProfile,
  AppointmentSuccessful,
  BookAPakage,
  Booking,
  BookingInformation,
  ConfirmBookingInfo,
  DetailPakage,
  DetailProfile,
  Login,
  OTP,
  PaymentInformation,
  Register,
  SelectFacility,
  SelectPaymentMethod,
  SelectProfile,
  SelectSchedule,
  SelectTime,
  TestPdf,
} from '../screens';
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
        <Stack.Screen name="bookAPakage" component={BookAPakage} />
        <Stack.Screen name="selectFacility" component={SelectFacility} />
        <Stack.Screen name="selectSchedule" component={SelectSchedule} />
        <Stack.Screen name="selectTime" component={SelectTime} />
        <Stack.Screen name="detailPakage" component={DetailPakage} />
        <Stack.Screen
          name="bookingInformation"
          component={BookingInformation}
        />
        <Stack.Screen
          name="confirmBookingInfo"
          component={ConfirmBookingInfo}
        />
        <Stack.Screen
          name="appointmentSuccessful"
          component={AppointmentSuccessful}
        />
        <Stack.Screen name="selectProfile" component={SelectProfile} />

        {/* Payment */}
        <Stack.Screen
          name="selectPaymentMethod"
          component={SelectPaymentMethod}
        />
        <Stack.Screen
          name="paymentInformation"
          component={PaymentInformation}
        />

        {/* Medical History */}

        {/* Payment History */}

        {/* Pdf */}
        <Stack.Screen name="testPdf" component={TestPdf} />

        {/* Login */}
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />

        {/* Profile */}
        <Stack.Screen name="addProfile" component={AddProfile} />
        <Stack.Screen name="detailProfile" component={DetailProfile} />
        <Stack.Screen name="otp" component={OTP} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
