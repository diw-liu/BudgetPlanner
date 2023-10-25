import { Stack } from "expo-router";
import MonthContext from '../../component/supplement/contexts';
import Header from "../../component/supplement/header";
import { useState } from 'react';

export default function DynamicLayout() {
  const [month, setMonth] = useState("")

  return (
    <MonthContext.Provider value={{ month, setMonth }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen 
          name="(index)"
        />
        <Stack.Screen
          name="modal"
          options={{
            // Set the presentation mode to modal for our modal route.st
            //headerRight: ,
            title: "Select target month",
            presentation: 'modal',
            headerRight: () => null
          }}
        />
      </Stack>
    </MonthContext.Provider>
  );
}