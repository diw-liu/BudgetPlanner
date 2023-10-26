import Head from "expo-router/head";
import { Tabs } from "expo-router";
import { AntDesign, Ionicons } from '@expo/vector-icons';
// import WithLogin from "../../component/supplement/withLogin";

export default function RootLayout() {
  return (
    <>
      <Head>

      </Head>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "rgb(29, 155, 240)",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: () => (
              <Ionicons name="stats-chart" size={20} color="black" />
            ),
          }}
        />
        <Tabs.Screen
          name="table"
          options={{
            title: "Table",
            tabBarIcon: () => (
              <AntDesign name="table" size={24} color="black" />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

