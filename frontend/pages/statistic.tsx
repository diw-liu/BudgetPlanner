import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Constants from "expo-constants";

const Statistic = (props: any) => {
    const [transactions, setTransactions] = useState([
        {title:"temp1", desc:"desc1", category:"food", price:20},
        {title:"temp1", desc:"desc1", category:"food", price:20},
        {title:"temp1", desc:"desc1", category:"food", price:20},
        {title:"temp1", desc:"desc1", category:"food", price:20},
        {title:"temp1", desc:"desc1", category:"food", price:20},
        {title:"temp1", desc:"desc1", category:"food", price:20}
    ])
      
    // function SignOutButton() {
    //   const { signOut } = useAuthenticator();
    //   return <Button title="Sign Out" onPress={signOut} />;
    // }
    
    return (
          // <SafeAreaView>
          //     <StatusBar style="dark" />
          //     <View style={styles.header}>
          //         <Header user={props.user}/>
          //     </View>
          //     {/* <SignOutButton /> */}
          //     {/* <DataDisplay /> */}
          //     {/* <DataTable /> */}
          // </SafeAreaView>   
          <></>
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

export default Statistic