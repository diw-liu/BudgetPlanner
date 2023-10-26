import { Stack } from "expo-router";

export default function DynamicLayout() {

  return (
    <>
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
            headerShown: true,
            title: "Select target month",
            presentation: 'modal'
          }}
        />
        <Stack.Screen
          name="create"
          options={{
            headerShown: true,
            title: "Create new transaction",
            presentation: 'modal'
          }}
        />
      </Stack>
    </>
  );
}