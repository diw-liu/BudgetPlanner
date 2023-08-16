import { Text, View } from 'react-native';
import { PieChart } from "react-native-gifted-charts";

const ExpenseChart = () => {
  const pieData = [
    {value: 70, color: '#177AD5'},
    {value: 30, color: 'lightgray'},
  ];
  return (
    <View>
      <PieChart
        donut
        innerRadius={80}
        data={pieData}
        centerLabelComponent={() => {
          return <Text style={{fontSize: 30}}>70%</Text>;
        }}
      />
    </View>
  );
}

export default ExpenseChart;
