import { FlatList, Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MonthContext from '../../component/supplement/contexts';
import { useContext, useEffect, useState } from 'react';
import Head from 'expo-router/head';

export default function Modal() {
  const [months, setMonths] = useState([])
  const { setMonth } = useContext(MonthContext);

  useEffect(() => {
    _initial()
  }, [])

  const _initial = async () => {
    const data = JSON.parse(await AsyncStorage.getItem("months") || "")
    setMonths(data)
  }
  const handleClick = (item: string) => {
    setMonth(item)
    router.back()
  }

  const renderItem = ({ item }: { item: any }) => {
    return (
      <Pressable onPress={() => handleClick(item)}>
        {({ pressed }) => (
          <View
            style={[
              {
                flexDirection: "row",
                padding: 16,
                gap: 16,
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
              },
              pressed && {
                backgroundColor: "#ccc",
              },
            ]}>
            <Text>{item}</Text>
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      {months && <FlatList
        scrollToOverflowEnabled
        style={{ flex: 1 }}
        data={months}
        renderItem={renderItem}
      />}
    </>
  );
}

