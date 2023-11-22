import { Link } from "expo-router";
import { useState } from "react";
import { Button, Pressable, View, Text, TouchableHighlight } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';

export default function SearchHeader(props: any) {
  const [text, onChangeText] = useState("")

  const handleConfirm = () => {
    props.handleOnConfirm(text);
  }
  
  const renderSideButton = () => (
      props.caller=="chats" ? <TouchableHighlight>
                                <AntDesign name="plussquareo" size={24} style={{ "color": "rgba(0,122,255,255)" }}/>
                              </TouchableHighlight>
                            : <Link href="/create" > 
                                <AntDesign name="plussquareo" size={24} style={{ "color": "rgba(0,122,255,255)" }}/>
                              </Link>
  )
      

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
                           : renderSideButton()}
            </View>  
          </View>
        )}
      </Pressable>
    </View>
  )
}