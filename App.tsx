import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { Authenticator } from '@aws-amplify/ui-react-native';
import Navigation from './frontend/Navigation';
import './configureAmplify'

export default function App() {

  return (
    <Authenticator.Provider>
      <Authenticator signUpAttributes={[
          "email"
        ]}>
        <PaperProvider>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </PaperProvider>
      </Authenticator>
    </Authenticator.Provider>
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
