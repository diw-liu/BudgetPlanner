import { SafeAreaView, StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import Home from './component/Home';

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView>
        <Home />
      </SafeAreaView>
    </PaperProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
