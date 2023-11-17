// import { Image, Text, View } from "react-native";
import { FlatList, Text, View, Pressable } from 'react-native';
import { Link, Stack, router, useSegments } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BookContext, Book } from '../supplement/contexts';
import { useContext, useEffect, useState } from 'react';

export default function Books() {
  return(
    <>
      <Stack.Screen
        name="books"
        options={{
          headerShown: true,
          title: "Select target month",
          presentation: 'modal',
          headerLeft: () => null,
          headerRight: () => null
        }}
      />
      <BooksScreen />
    </>
  )
}

export function BooksScreen(props:any) {
  // console.log(book)
  // useEffect(() => {
  //   fetchTimes()
  // }, [])

  // const fetchTimes = async () => {
  //   try {
  //     const cache = await AsyncStorage.getItem('months')
  //     if (!cache) {
  //       console.log("begin fetchTimes")
  //       const accessToken = await AsyncStorage.getItem('accessToken') || ""
  //       const payload : any = await API.graphql({
  //         query: getTimes,
  //         authMode: "AMAZON_COGNITO_USER_POOLS",
  //         authToken: accessToken
  //       })
  //       if(payload){
  //         await AsyncStorage.setItem('months', JSON.stringify(payload.data?.getTimes));
  //         setMonth(payload.data?.getTimes.at(-1)['Time'])
  //         console.log("after fetchTimes")
  //       }
  //     }
  //     else {
  //       console.log("getting cache");
  //       const value = JSON.parse(cache);
        
  //       console.log("getting cache" + value?.at(-1)['Time']);
  //       setMonth(value?.at(-1)['Time'])
  //     }
  //   } catch (err) {
  //     console.log('FetchTimes error', err);
  //   }
  // }

  return(
    <>
    </>
  )
}