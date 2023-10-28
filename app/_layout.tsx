import { useState } from 'react';
import { Drawer } from 'expo-router/drawer';
import Header from '../component/supplement/selectMonth';
import MonthContext from '../component/supplement/contexts';
import WithLogin from '../component/supplement/withLogin';

export default function DrawerLayout() {
  const [month, setMonth] = useState("")
  return (
    <MonthContext.Provider value={{ month, setMonth }}>
      <WithLogin>
        <Drawer
          screenOptions={{
            headerShown:false
          }}
        >
          <Drawer.Screen
            name="(tabs)"
          />
        </Drawer>
      </WithLogin>
    </MonthContext.Provider>
  )
}
