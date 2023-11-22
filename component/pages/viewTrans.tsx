import { useContext, useEffect, useState } from 'react';
import { Pressable, View, Text, SafeAreaView, SectionList } from 'react-native';
import SearchHeader from '../header/searchHeader';
import {Transaction, TransactionsContext} from "../supplement/contexts";

export default function ViewTrans() {
  const attributes = ["Amount", "Title", "Catergory", "Description"]
  const [sectData, setSectData] = useState([])
  const {trans} = useContext(TransactionsContext);

  useEffect(() => {
    convertSectionFormat();
    console.log("render again?")
  }, [trans]);

  const convertSectionFormat = (filter?: string) => {
    let data = trans
    if(filter){
      data = trans.filter((element) => {
        return attributes.some(key => {
          return JSON.stringify(element[key]).includes(filter);
        });
      })
    }
    console.log("the data");
    console.log(data)
    const map = data.reduce((map, tran) => {
      const time = tran["CreatedTime"].slice(0, 7)
      if(!map[time]) map[time] = [];
      map[time].push(tran);
      return map
    }, {} as {[key:string]:Transaction[]})

    let result: any = []
    for (const [key, value] of Object.entries(map)) {
      result.push({
        "title": key,
        "data": value
      })
    }
    setSectData(result)
  }

  const Box = ( { ...props }) => (
    <Text className="flex text-center justify-center items-center rounded basis-1/3" {...props}/>
  )
  
  const renderItem = ({ item }: { item: any }) => {
    return (
      <Pressable>
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
            <Box>{item["Title"]}</Box>
            <Box>{item["Catergory"]}</Box>
            <Box>{item["Amount"]}</Box>
          </View>
        )}
      </Pressable>
    );
  };
  
  return (
    <>
      <SafeAreaView>
        <SearchHeader handleOnConfirm={convertSectionFormat}/>
      </SafeAreaView>
      { trans && <SectionList
                    contentInsetAdjustmentBehavior="automatic"
                    scrollToOverflowEnabled
                    style={{ flex: 1 }}
                    sections={sectData}
                    renderItem={renderItem}
                    renderSectionHeader={({section: {title}}) => (
                      <Text>{title}</Text>
                    )}
                    />}
    </>
  )
};