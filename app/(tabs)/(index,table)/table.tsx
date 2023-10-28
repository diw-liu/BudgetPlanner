import { Link, Stack, router } from "expo-router";
import Head from "expo-router/head";
import { Text } from "react-native-paper";
import ViewTrans from "../../../component/pages/viewTrans";

export default function Table() {
  return (
    <>
      <Stack.Screen 
        options={{
          title: "Transaction Table",
          headerShown: true,
          headerSearchBarOptions: {
            onChangeText: (event) => {
              // Update the query params to match the search query.
              router.setParams({
                q: event.nativeEvent.text,
              });
            },
          },
        }}
      />
      <Text>Table</Text>
      <ViewTrans />
    </>
  );
}