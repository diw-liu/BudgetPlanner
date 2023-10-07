import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PieChart } from "react-native-gifted-charts";
import { Menu } from 'react-native-paper';

const DataDisplay = () => {
  const pieData = [
    {
      value: 47,
      text: "Food",
      color: '#009FFF',
      gradientCenterColor: '#006DFF'
    },
    {value: 40, text: "Other", color: '#93FCF8', gradientCenterColor: '#3BE9DE'},
    {value: 16, text: "Maybe", color: '#BDB2FA', gradientCenterColor: '#8F80F3'}, 
    {value: 3, text: "Okay", color: '#FFA5BA', gradientCenterColor: '#FF7F97'},
  ];
  
  const [selectData, setSelectData] = useState({value: 47, text: "Food",});
  var tempo = "";

  return (
    // <View>
    //   <PieChart
    //     donut
    //     innerRadius={80}
    //     data={pieData}
    //     centerLabelComponent={() => {
    //       return <Text style={{fontSize: 30}}>70%</Text>;
    //     }}
    //   />
    // </View>
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Total Monthly Expense
      </Text>
      <View style={styles.displayContainer}>
        <View style={styles.chartContainer}>
          <PieChart
            data={pieData}
            donut
            showGradient
            sectionAutoFocus
            focusOnPress
            radius={90}
            innerRadius={50}
            innerCircleColor={'#232B5D'}
            onPress={(item:any, index:any) => setSelectData(item)}
            centerLabelComponent={() => {
              return (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                    {selectData.value}
                  </Text>
                  <Text style={{fontSize: 14, color: 'white'}}>{selectData.text}</Text>
                </View>
              );
            }}
          />
        </View>
        <View>
          {
            pieData.sort((a, b) => (a.value > b.value) ? -1 : 1).map((transaction, index) => (
              <Menu.Item titleStyle={{fontSize: 15, color: 'white', fontWeight: 'bold'}} title={transaction.text+"   "+transaction.value} key={index}/>
            ))
          }
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      padding: 10,
      backgroundColor: '#232B5D',
  },
  headerText: {
      color: 'white', 
      fontSize: 16, 
      fontWeight: 'bold'
  },
  chartContainer: {
      padding: 5,
      marginTop: 10,
  },
  displayContainer: {
      flexDirection: 'row',
  },
  contentContainer: {
      backgroundColor: 'white', 
      padding: 20, 
      margin: 60,
  }
})

export default DataDisplay;
