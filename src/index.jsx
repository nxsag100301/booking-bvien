import { StatusBar, StyleSheet } from 'react-native';
import Navigation from './navigator';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LoadingScreen from './components/Loading/LoadingScreen';
import { useSelector } from 'react-redux';
import { Colors } from './theme';

const Index = () => {
  const { globalLoading } = useSelector(state => state.loading);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.container}
        edges={['top', 'bottom', 'left', 'right']}
      >
        <StatusBar barStyle={'dark-content'} backgroundColor="white" />
        <Navigation />
      </SafeAreaView>
      <LoadingScreen loading={globalLoading} />
    </SafeAreaProvider>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
