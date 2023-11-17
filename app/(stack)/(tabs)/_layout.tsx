import { Tabs } from "expo-router";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { DrawerToggleButton } from "@react-navigation/drawer";
import SelectBook from "../../../component/header/selectBook";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "rgb(29, 155, 240)",
        headerLeft: () => <DrawerToggleButton />,
        headerRight: () => <SelectBook />
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