import { FlatList, Text, View, Pressable } from 'react-native';
import { Link, router, useSegments } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BookContext, Book } from '../supplement/contexts';
import { useContext, useEffect, useState } from 'react';

export default function BooksModal() {
  const [books, setBooks] = useState({});
  const [month, setMonth] = useState<String>("");
  const [months, setMonths] = useState<ArrayLike<string>>([])

  const { setBook } = useContext(BookContext);

  useEffect(() => {
    _initial()
  }, [])

  const _initial = async () => {
    const data = JSON.parse(await AsyncStorage.getItem("months") || "")
    setMonths(Object.keys(data))
    setBooks(data)
  }
  const handleMonthClick = (month: String) => {
    setMonth(month)
  }

  const handleBookClick = (book: Book) => {
    setBook(book)
    router.back()
    // fetching transaction here
  }

  const renderMonths = ({item}: {item: string}) => {
    return (
        <Pressable onPress={() => handleMonthClick(item)}>
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

  const renderBooks = ({item}: {item: Book}) => {
    return (
        <Pressable onPress={() => handleBookClick(item)}>
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
              <Text>{item["Title"]}</Text>
            </View>
          )}
        </Pressable>
    );
  };

  return (
    <>
       { !month && months && <FlatList
                    scrollToOverflowEnabled
                    style={{ flex: 1 }}
                    data={months}
                    renderItem={renderMonths}
                  />}
       { month && books && <FlatList
                    scrollToOverflowEnabled
                    style={{ flex: 1 }}
                    data={books[month]}
                    renderItem={renderBooks}
                  />}
    </>
  )
}