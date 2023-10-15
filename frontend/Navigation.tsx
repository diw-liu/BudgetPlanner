import React, { useEffect, useState } from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { AntDesign, Ionicons } from '@expo/vector-icons'; 
import { Auth } from '@aws-amplify/auth';
import { API } from 'aws-amplify';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './supplement/header';
import MonthContext from './supplement/contexts';
import Statistic from './pages/statistic';
import Setting from './pages/setting';
import Transactions from './pages/transactions';

const Tab = createMaterialBottomTabNavigator();

const getTimes = `
  query getTimes{
    getTimes
  }
`
const Navigation = () => {
  const [months, setMonths] = useState([])
  const [month, setMonth] = useState("")
  const [user, setUser] = useState({})
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      AsyncStorage.clear();
      const jsonValue = await AsyncStorage.getItem('user')
      console.log("jsonvalue"+ jsonValue);
      if(!jsonValue){
        Auth.currentSession()
            .then(async (session) => {
              const idToken = session.getIdToken();
              const accessToken = session.getAccessToken();
              const user = {
                email: idToken.payload['email'],
                username: idToken.payload['cognito:username'],
                userId: idToken.payload['sub'],
                accessToken: accessToken.getJwtToken(),
              };
              setUser(user);
              setIsSignedIn(true);
              await AsyncStorage.multiSet([['user', JSON.stringify(user)],
                                           ['userExpire', JSON.stringify(getNextDay())],
                                           ['accessToken', user.accessToken]]);
              console.log("user end");
              const monthValue = await AsyncStorage.getItem('months')
              // console.log("month" + JSON.parse(monthValue || ""));
              if(!monthValue){
                fetchTimes(user.accessToken);
              }
            })
      }  
    } catch (err) {
      console.log("Login initialization error " + err)
    }
  }
  
  const fetchTimes = async (accessToken: string) => {
    try {
        console.log("begin fetchTimes")
        const timeData : any = await API.graphql({
            query: getTimes, 
            authMode: "AMAZON_COGNITO_USER_POOLS",
            authToken: accessToken
        })       
        setMonths(timeData.data?.getTimes)
        setMonth(timeData.data?.getTimes.at(-1))
        await AsyncStorage.setItem('months',  JSON.stringify(timeData.data?.getTimes));
        console.log("after fetchTimes")
    } catch (err) {
        console.log('fetchTimes failed', err);
    }
  }

  const getNextDay = () => {
    var expiration = new Date();
    expiration.setDate(expiration.getDate() + 1);
    return expiration.getTime();
  }

  return (
    <MonthContext.Provider value={{month, setMonth}}>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#e91e63">
        <Tab.Screen
          name="Statistic"
          options={{
            tabBarLabel: 'Statistic',
            tabBarIcon: () => (
              <Ionicons name="stats-chart" size={20} color="black" />
            ),
          }}
          children={() =>
            <Header months={months}>
              <Statistic/>
            </Header>
          }/>
        <Tab.Screen
          name="Transactions"
          options={{
            tabBarLabel: 'Transactions',
            tabBarIcon: () => (
              <AntDesign name="table" size={24} color="black" />
            ),
          }}
          children={() => 
            <Header months={months}>
              <Transactions/>
            </Header>
          }/>
        <Tab.Screen
          name="Setting"
          options={{
            tabBarLabel: 'Setting',
            tabBarIcon: () => (
              <AntDesign name="setting" size={24} color="black" />
            ),
          }}
          children={() => <Setting/>}/>
      </Tab.Navigator>
    </MonthContext.Provider>
  );
}

export default Navigation;