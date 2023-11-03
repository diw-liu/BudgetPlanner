import { useContext, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from 'aws-amplify';
import { Link } from 'expo-router';
import MonthContext from '../supplement/contexts';

const getTimes = `
  query getTimes{
    getTimes{
      Time
    }
  }
`

const SelectMonth = () => {
  const { month, setMonth } = useContext(MonthContext);

  useEffect(() => {
    fetchTimes()
  }, [])

  const fetchTimes = async () => {
    try {
      const cache = await AsyncStorage.getItem('months')
      if (!cache) {
        console.log("begin fetchTimes")
        const accessToken = await AsyncStorage.getItem('accessToken') || ""
        const payload : any = await API.graphql({
          query: getTimes,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          authToken: accessToken
        })
        if(payload){
          await AsyncStorage.setItem('months', JSON.stringify(payload.data?.getTimes));
          setMonth(payload.data?.getTimes.at(-1)['Time'])
          console.log("after fetchTimes")
        }
      }
      else {
        console.log("getting cache");
        const value = JSON.parse(cache);
        
        console.log("getting cache" + value?.at(-1)['Time']);
        setMonth(value?.at(-1)['Time'])
      }
    } catch (err) {
      console.log('FetchTimes error', err);
    }
  }

  return (
    <>
      <TouchableOpacity>
        {month && <Link href="/months" className="p-1 px-2" style={{ "color": "rgba(0,122,255,255)" }}> {month} </Link>}
      </TouchableOpacity>
    </>

  )
}

export default SelectMonth;