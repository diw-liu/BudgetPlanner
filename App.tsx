import { SafeAreaView, StyleSheet } from 'react-native';
import Home from './component/Home';

export default function App() {
  return (
    <SafeAreaView>
      <Home />
    </SafeAreaView>
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
