import { useContext, useEffect, useState } from 'react';
import { Pressable, View, Text, SafeAreaView, SectionList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from 'aws-amplify';
import MonthContext from '../supplement/contexts';
import { ITransaction } from '../type/itransaction';
import ViewTransSearch from '../header/viewTransSearch';

const getTransaction = `
  query getTransaction($bookId: String!){
    getTransaction(bookId: $bookId){
      Time
      CatergoryId
      Title
      Amount
      Description
    }
  }
`

export default function ViewTrans() {
  const { month } = useContext(MonthContext);
  const [sectData, setSectData] = useState([])
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    fetchTransaction();
  }, []);

  const convertSectionDate = (data: ITransaction[], filter: string) => {
    if(filter != ""){
      data = transactions.filter((element) => element.CatergoryId.includes(filter) || element.Title.includes(filter) || element.Description.includes(filter))
    }
    if(data.length == 0 && filter == "") data = transactions
    let mapping = new Map<string, ITransaction[]>();
    data.forEach(x => {
      const date = x['Time'].split("T")[0];
      if(mapping.has(date)){
        mapping.set(date, [...mapping.get(date) as ITransaction[], x]);
      }else {
        mapping.set(date, [x]);
      }
    })
    let result: any = []
    mapping.forEach( (value, key) => {
      result.push({
        "title": key,
        "data": value
      })
    })
    setSectData(result)
  }

  const fetchTransaction = async () => {
    try {
      const cache = await AsyncStorage.getItem("transactions")
      if(!cache){
        console.log(month)
        console.log("okay 21")
        const accessToken = await AsyncStorage.getItem('accessToken') || '';
        const payload : any = await API.graphql({
          query: getTransaction,
          variables: { bookId: month},
          authMode: "AMAZON_COGNITO_USER_POOLS",
          authToken: accessToken
        })
        if(payload){
          await AsyncStorage.setItem('transactions', JSON.stringify(payload.data?.getTransaction));
          setTransactions(payload.data?.getTransaction)
          console.log("after fetchTimes")
          convertSectionDate(payload.data?.getTransaction, "")
        }
      }else {
        console.log("cache" + cache)
        const value = JSON.parse(cache);
        setTransactions(value);
        convertSectionDate(value, "")
      }
      
    } catch (error) {
      console.log('FetchTransaction error', error);
    }
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
            <Box>{item["CatergoryId"]}</Box>
            <Box>{item["Amount"]}</Box>
          </View>
        )}
      </Pressable>
    );
  };
  
  return (
    <>
      <SafeAreaView>
        <ViewTransSearch convertSectionDate={convertSectionDate}/>
      </SafeAreaView>
      { transactions && <SectionList
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