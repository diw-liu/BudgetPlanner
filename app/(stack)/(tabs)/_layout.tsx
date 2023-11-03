import { Tabs } from "expo-router";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { DrawerToggleButton } from "@react-navigation/drawer";
import SelectMonth from "../../../component/header/selectMonth";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "rgb(29, 155, 240)",
        headerLeft: () => <DrawerToggleButton />,
        headerRight: () => <SelectMonth />
      }}
    >
      <Tabs.Screen
        name="(index)"
        options={{
          title: "Statistic",
          tabBarIcon: () => (
            <Ionicons name="stats-chart" size={20} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="(table)"
        options={{
          title: "Table",
          tabBarIcon: () => (
            <AntDesign name="table" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}