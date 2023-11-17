import { Drawer } from 'expo-router/drawer';
import { Authenticator } from '@aws-amplify/ui-react-native';
import Configuration from '../component/supplement/configuration';

const DrawerLayout = () => {
  return (
    <Configuration>
      <Drawer
        screenOptions={{
          headerShown:false
        }}
      >
        <Drawer.Screen
          name="(stack)"
          options={{
            title: "Home"
          }}
        />
        <Drawer.Screen
          name="(chat)"
          options={{
            title: "Chat"
          }}
        />
      </Drawer>
    </Configuration>
  )
}

export default function DrawerLayoutWithAuth(){
  return(
    <Authenticator.Provider>
      <DrawerLayout />
    </Authenticator.Provider>
  )
}