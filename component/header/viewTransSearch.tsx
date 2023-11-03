import { Link } from "expo-router";
import { useState } from "react";
import { Button, Pressable, View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';

export default function ViewTransSearch(props: any) {
  const [text, onChangeText] = useState("")

  const handleConfirm = () => {
    props.convertSectionDate([], text);
  }
  
  return(
    <View>
      <Pressable >
        {({ pressed }) => (
          <View className="flex flex-row h-9 items-center mx-2 my-1">
            <View className={'basis-3/4 text-lg h-7 p-2 rounded bg-white'}>
              <TextInput 
                  placeholder="Search here"
                  onChangeText={onChangeText}
                  value={text}
                />
            </View>

            <View className="basis-1/4 flex flex-row justify-center">
              { text != "" ? <Button title="Confirm" onPress={handleConfirm}/>
                            : <Link href="/create" > 
                                <AntDesign name="plussquareo" size={24} style={{ "color": "rgba(0,122,255,255)" }}/>
                              </Link>}
            </View>  
          </View>
        )}
      </Pressable>
      {/* <View className="flex flex-row items-center space-x-2">
        <Box>Title</Box>
        <Box>Catergory</Box>
        <Box>Amount</Box>
      </View>     */}
    </View>
  )
}