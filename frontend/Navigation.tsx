import React, { useEffect, useState } from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { AntDesign, Ionicons } from '@expo/vector-icons'; 
import { Auth } from '@aws-amplify/auth';
import Header from './supplement/header';
import Statistic from './pages/statistic';
import Setting from './pages/setting';
import Transactions from './pages/transactions';

const Tab = createMaterialBottomTabNavigator();

const Navigation = () => {
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

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#e91e63"
    >
      <Tab.Screen
        name="Statistic"
        options={{
          tabBarLabel: 'Statistic',
          tabBarIcon: () => (
            <Ionicons name="stats-chart" size={20} color="black" />
          ),
        }}
        children={() =>
          <Header user={user}>
            <Statistic user={user}/>
          </Header>
        }
      />
      <Tab.Screen
        name="Transactions"
        options={{
          tabBarLabel: 'Transactions',
          tabBarIcon: () => (
            <AntDesign name="table" size={24} color="black" />
          ),
        }}
        children={() => 
          <Header user={user}>
            <Transactions user={user}/>
          </Header>
        }
      />
      <Tab.Screen
        name="Setting"
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: () => (
            <AntDesign name="setting" size={24} color="black" />
          ),
        }}
        children={() => <Setting user={user}/>}
      />
    </Tab.Navigator>
  );
}

export default Navigation;