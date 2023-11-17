import { useLocalSearchParams } from "expo-router/src/hooks";
import { Text } from "react-native-paper";

export default function Transaction(){
  const { detail } = useLocalSearchParams<{detail: string}>(); 

  return(
    <Text>{ detail }</Text>
  )
}