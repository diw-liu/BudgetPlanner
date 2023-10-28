import { Stack, router } from "expo-router";
import { DrawerToggleButton } from "@react-navigation/drawer";
import SelectMonth from "../../../component/supplement/selectMonth";

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerLargeTitle: false,
        headerLeft: () => <DrawerToggleButton />,
        headerRight: () => <SelectMonth />
      }}
    >
      <Stack.Screen name="table" />
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
      <Stack.Screen
        name="create"
        options={{
          headerShown: true,
          title: "Create new transaction",
          presentation: 'modal',
          headerRight: () => null
        }} />
    </Stack>
  );
}