import { Stack } from "expo-router";

export default function StackLayout(){
  return(
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="(tabs)"
      />
      <Stack.Screen
        name="months"
        options={{
          headerShown: true,
          title: "Select target month",
          presentation: 'modal',
          headerLeft: () => null,
          headerRight: () => null
        }}
      />
    </Stack>
  )
}