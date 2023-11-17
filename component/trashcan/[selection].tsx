import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList, Text, View, Pressable } from 'react-native';
import { Link, router, useSegments } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BookContext, Book } from '../supplement/contexts';
import { useContext, useEffect, useState } from 'react';
import MonthsModal from "../modal/booksModal";

export default function Selection() {
  const { time } = useLocalSearchParams<{ time: string }>();
  // console.log("hello book")
  //return <SelectionScreen time={time!} />;
  // return <Text>Blog post: {time}</Text>;
  return <MonthsModal />
}

// export function SelectionScreen(props:any) {
//   const [months, setMonths] = useState<ArrayLike<string>>([])
//   const [segment] = useSegments()
//   const { setBook } = useContext(BookContext);

//   useEffect(() => {
//     _initial()
//     console.log(segment)
//     console.log(segment)
//   }, [])

//   const _initial = async () => {
//     const data = JSON.parse(await AsyncStorage.getItem("months") || "")
//     // console.log(data.keys())
//     setMonths(Object.keys(data))
//   }
//   const handleClick = (item: String) => {
//     //setBook(item)
//     // router.back()
//     useSegments()
//   }

//   const renderItem = ({item}: {item: string}) => {
//     return (
//       <Link href={`/${segment}/${item}`} asChild>
//         <Pressable >
//           {({ pressed }) => (
//             <View
//               style={[
//                 {
//                   flexDirection: "row",
//                   padding: 16,
//                   gap: 16,
//                   borderBottomColor: "#ccc",
//                   borderBottomWidth: 1,
//                 },
//                 pressed && {
//                   backgroundColor: "#ccc",
//                 },
//               ]}>
//               <Text>{item}</Text>
//             </View>
//           )}
//         </Pressable>
//       </Link>
//     );
//   };

//   return (
//     <>
//        { months && <FlatList
//                     scrollToOverflowEnabled
//                     style={{ flex: 1 }}
//                     data={months}
//                     renderItem={renderItem}
//                   />}
//     </>
//   )
// }