import { DrawerToggleButton } from "@react-navigation/drawer";
import { Stack } from "expo-router";

export default function ChatLayout(){
  return(
    <Stack
      screenOptions={{
        headerLeft: () => <DrawerToggleButton />,
      }}
    >
      <Stack.Screen 
        name="chats"
      />
    </Stack>
  )
}