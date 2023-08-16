import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './header/Header';
import Constants from "expo-constants";
import { StatusBar } from 'expo-status-bar';

const Home = () => {
    const [transactions, setTransactions] = useState([
        {title:"temp1", desc:"desc1", category:"food", price:20},
        {title:"temp1", desc:"desc1", category:"food", price:20},
        {title:"temp1", desc:"desc1", category:"food", price:20},
        {title:"temp1", desc:"desc1", category:"food", price:20},
        {title:"temp1", desc:"desc1", category:"food", price:20},
        {title:"temp1", desc:"desc1", category:"food", price:20}
    ])
      
    return (
        <View>
            <StatusBar style="dark" />
            <View style={styles.header}>
                <Header />
            </View>
        </View>
    )
}

const BORDER_BOTTOM = {
    borderBottomWidth: 1,
    borderBottomColor: "#dbdbdb",
  };
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Constants.statusBarHeight,
    },
    header: {
      ...BORDER_BOTTOM,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      height: 44,
    },
    stories: {
      ...BORDER_BOTTOM,
      height: 104,
      paddingVertical: 10,
      paddingLeft: 8,
      backgroundColor: "#fafafa",
    },
  });

export default Home