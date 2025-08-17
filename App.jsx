import Index from './src';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { injectStore } from './src/utils/authorizeAxios';
import SplashScreen from 'react-native-splash-screen';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';

const App = () => {
  injectStore(store);
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <Index />
      <Toast visibilityTime={1500} autoHide />
    </Provider>
  );
};

export default App;
