import { Stack } from "expo-router";
import Head from "expo-router/head";
import { Text } from "react-native-paper";

export default function Statistic() {
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Statistic" 
        }} 
        />
      <Text>Statistic</Text>
    </>
  );
}