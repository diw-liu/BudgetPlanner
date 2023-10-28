import { useContext, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from 'aws-amplify';
import { Link } from 'expo-router';
import MonthContext from './contexts';

const getTimes = `
  query getTimes{
    getTimes
  }
`

const SelectMonth = () => {
  const { month, setMonth } = useContext(MonthContext);

  useEffect(() => {
    fetchTimes()
  }, [])

  const fetchTimes = async () => {
    try {
      const value = await AsyncStorage.getItem('months')
      if (!value) {
        console.log("begin fetchTimes")
        const accessToken = await AsyncStorage.getItem('accessToken') || ""
        const timeData: any = await API.graphql({
          query: getTimes,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          authToken: accessToken
        })
        console.log("time data" + timeData.data?.getTimes);
        await AsyncStorage.setItem('months', JSON.stringify(timeData.data?.getTimes));
        setMonth(timeData.data?.getTimes.at(-1))
        console.log("after fetchTimes")
      }
      else {
        console.log("getting cache");
        const valueArr = JSON.parse(value);
        console.log("getting cache" + valueArr);
        setMonth(valueArr.at(-1))
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