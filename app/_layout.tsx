import { useState } from 'react';
import { Drawer } from 'expo-router/drawer';
import Header from '../component/supplement/header';
import MonthContext from '../component/supplement/contexts';

export default function Layout() {
  const [month, setMonth] = useState("")
  return (
    <MonthContext.Provider value={{ month, setMonth }}>
      <Drawer
        screenOptions={{
          drawerActiveTintColor: "rgb(29, 155, 240)",
          headerRight: (props) => <Header {...props} />
        }}
      >

        <Drawer.Screen
          name="(main)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
            title: "Home"
          }}
        />
      </Drawer>
    </MonthContext.Provider>
  )
}
