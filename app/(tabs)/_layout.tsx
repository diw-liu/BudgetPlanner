import Head from "expo-router/head";
import { Tabs } from "expo-router";
import { Text } from "react-native-paper";
import { AntDesign, Ionicons } from '@expo/vector-icons';
// import WithLogin from "../../component/supplement/withLogin";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "rgb(29, 155, 240)",
      }}
    >
      <Tabs.Screen
        name="(index)"
        options={{
          title: "index",
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