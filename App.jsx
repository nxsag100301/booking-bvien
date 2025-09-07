import Index from './src';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { injectStore } from './src/utils/authorizeAxios';
import SplashScreen from 'react-native-splash-screen';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const App = () => {
  injectStore(store);
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <Provider store={store}>
          <Index />
          <Toast visibilityTime={1500} autoHide />
        </Provider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
