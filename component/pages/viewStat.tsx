import { useContext, useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Text } from "react-native-paper";
import { BookContext, Transaction, TransactionsContext } from "../supplement/contexts";
import { PieChart } from "react-native-gifted-charts";

export default function ViewStat(){
  const {book} = useContext(BookContext);
  const {trans} = useContext(TransactionsContext);
  const [total, setTotal] = useState({});
  const [pieData, setPieData] = useState([]);
  const [map, setMap] = useState([]);
  const [selectData, setSelectData] = useState({});

  useEffect(() => {
    convertPieDataFormat();
  }, [trans])

  const convertPieDataFormat = () => {
    const map = trans.reduce((map, tran) => {
      const type = tran["Catergory"]
      if(!map[type]) map[type] = [];
      map[type].push(tran);
      return map
    }, {} as {[key:string]:Transaction[]})

    let pieData: any = []
    let total: number = 0
    for (const [key, value] of Object.entries(map)) {
      const subTotal = value.reduce((acc, value) => acc + value["Amount"],0)
      pieData.push({
        value: subTotal,
        text: key,
        color: '#009FFF',
        gradientCenterColor: '#006DFF'
      })
      total += subTotal
    } 
    setPieData(pieData);
    setMap(map);
    const totalObj = {
      value: total,
      text:"Total Expense"
    }
    setTotal(totalObj)
    setSelectData(totalObj)
  }

  const setSelect = (item:any) => {
    console.log("setSelect call");
    console.log("select item"+ item)
    console.log(item)
    console.log("select data"+ total)
    console.log(selectData)
    if(item["text"] == selectData["text"]){
      console.log('dsadasdasdasdasd')
      setSelectData(total);
    }else {
      setSelectData(item)
    }
  }

  return(
      <SafeAreaView>
        <Text>{book["Title"]}</Text>
        <View>
          <PieChart
              data={pieData}
              donut
              showGradient
              sectionAutoFocus
              focusOnPress
              radius={90}
              innerRadius={50}
              innerCircleColor={'#232B5D'}
              onPress={(item:any) => setSelect(item)}
              centerLabelComponent={() => {
                return (
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text
                      style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                      {selectData?.value}
                    </Text>
                    <Text style={{fontSize: 14, color: 'white'}}>{selectData?.text}</Text>
                  </View>
                );
              }}
          />
        </View>
      </SafeAreaView>
  )
}