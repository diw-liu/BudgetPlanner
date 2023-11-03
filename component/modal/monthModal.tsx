import { FlatList, Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MonthContext from '../supplement/contexts';
import { useContext, useEffect, useState } from 'react';

export default function MonthsModal() {
  const [months, setMonths] = useState([{}])
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
      <Pressable onPress={() => handleClick(item["Time"])}>
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
            <Text>{item["Time"]}</Text>
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <>
       { months && <FlatList
                    scrollToOverflowEnabled
                    style={{ flex: 1 }}
                    data={months}
                    renderItem={renderItem}
                  />}
    </>
  )
}