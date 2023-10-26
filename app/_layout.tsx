import { useState } from 'react';
import { Drawer } from 'expo-router/drawer';
import Header from '../component/supplement/header';
import MonthContext from '../component/supplement/contexts';
import WithLogin from '../component/supplement/withLogin';

export default function Layout() {
  const [month, setMonth] = useState("")
  return (
    <MonthContext.Provider value={{ month, setMonth }}>
      <WithLogin>
        <Drawer
          screenOptions={{
            drawerActiveTintColor: "rgb(29, 155, 240)",
            headerRight: (props) => <Header {...props} />
          }}
        >
          <Drawer.Screen
            name="(main)"
            options={{
              drawerLabel: "Home",
              title: "Home"
            }}
          />
        </Drawer>
      </WithLogin>
    </MonthContext.Provider>
  )
}
