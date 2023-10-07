import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Header from './header/Header';
import Constants from "expo-constants";
import { StatusBar } from 'expo-status-bar';
import DataDisplay from './header/DataDisplay';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { Auth } from '@aws-amplify/auth';

const Home = () => {
    const [user, setUser] = useState<any>(null);
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
      if(!user){
        Auth.currentSession()
            .then((session) => {
              const idToken = session.getIdToken();
              const accessToken = session.getAccessToken();
              const user = {
                email: idToken.payload['email'],
                username: idToken.payload['cognito:username'],
                userId: idToken.payload['sub'],
                accessToken: accessToken.getJwtToken(),
              };
              setIsSignedIn(true);
              setUser(user);
            })
      }
    }, []);

    const [transactions, setTransactions] = useState([
        {title:"temp1", desc:"desc1", category:"food", price:20},
        {title:"temp1", desc:"desc1", category:"food", price:20},
        {title:"temp1", desc:"desc1", category:"food", price:20},
        {title:"temp1", desc:"desc1", category:"food", price:20},
        {title:"temp1", desc:"desc1", category:"food", price:20},
        {title:"temp1", desc:"desc1", category:"food", price:20}
    ])
      
    function SignOutButton() {
      const { signOut } = useAuthenticator();
      return <Button title="Sign Out" onPress={signOut} />;
    }
    
    return (
        <SafeAreaView>
            <StatusBar style="dark" />
            <View style={styles.header}>
                <Header user={user}/>
            </View>
            <SignOutButton />
            <DataDisplay />
        </SafeAreaView>
    )
}

const BORDER_BOTTOM = {
  borderBottomWidth: 1,
  borderBottomColor: "#dbdbdb",
};
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Constants.statusBarHeight,
    },
    header: {
      ...BORDER_BOTTOM,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      height: 44,
    },
    stories: {
      ...BORDER_BOTTOM,
      height: 104,
      paddingVertical: 10,
      paddingLeft: 8,
      backgroundColor: "#fafafa",
    },
  });

export default Home