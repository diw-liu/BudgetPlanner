import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Authenticator } from '@aws-amplify/ui-react-native';
import { Auth } from '@aws-amplify/auth';
import '../../configureAmplify'

const getNextDay = () => {
  var expiration = new Date();
  expiration.setDate(expiration.getDate() + 1);
  return expiration.getTime();
}

export default function WithLogin(props: any) {
  useEffect(() => {
    fetchUser();
  })
  
  const fetchUser = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken')
      const userExpire = await AsyncStorage.getItem('userExpire')
      if (accessToken && userExpire && new Date().getTime() <= new Date(userExpire).getTime()) {
        Auth.currentSession()
          .then(async (session) => {
            const idToken = session.getIdToken();
            const accessToken = session.getAccessToken();
            await AsyncStorage.multiSet([['email', idToken.payload['email']],
            ['username', idToken.payload['cognito:username']],
            ['userId', idToken.payload['sub']],
            ['accessToken', accessToken.getJwtToken()],
            ['userExpire', JSON.stringify(getNextDay())]]);

            console.log("user end");
          })
      }
    } catch (err) {
      console.log("Login error " + err)
    }
  }

  return (
    <Authenticator.Provider>
      <Authenticator signUpAttributes={[
        "email"
      ]}>
        {props.children}
      </Authenticator>
    </Authenticator.Provider>
  )
}
