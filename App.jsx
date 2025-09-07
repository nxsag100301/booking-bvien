import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Index from './src';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { injectStore } from './src/utils/authorizeAxios';

const App = () => {
  injectStore(store);
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.container}>
        <BottomSheetModalProvider>
          <Index />
          <Toast visibilityTime={1500} autoHide />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
