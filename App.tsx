import { SafeAreaView, StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import Home from './homeComponent/Home';
import Navigation from './Navigation';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
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
