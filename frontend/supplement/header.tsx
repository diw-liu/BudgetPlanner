import { useContext, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Button } from 'react-native';
import { Modal, Portal, Text, Menu, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { API } from 'aws-amplify';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import MonthContext from './contexts';

// const getTimes = `
//   query getTimes{
//     getTimes
//   }
// `

const Header = (props:any) => {
    const months: string[] = props.months
    const { month, setMonth } = useContext(MonthContext);
    const [select, setSelect] = useState(month);

    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    // useEffect(() => {
    //     fetchTimes()
    // }, [props.isSignedIn])

    // const fetchTimes = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem('months')
    //         console.log("month come on" + value);
    //         if(!value){
    //             console.log("begin fetchTimes")
    //             const accessToken = await AsyncStorage.getItem('accessToken') || ""
    //             const timeData : any = await API.graphql({
    //                 query: getTimes, 
    //                 authMode: "AMAZON_COGNITO_USER_POOLS",
    //                 authToken: accessToken
    //             })
    //             console.log("time data"+timeData.data?.getTimes);
    //             await AsyncStorage.setItem('months',  JSON.stringify(timeData.data?.getTimes));
    //             setMonths(timeData.data?.getTimes)
    //             setMonth(timeData.data?.getTimes.at(-1))
    //             console.log("after fetchTimes")
    //         } 
    //         else {
    //             console.log("getting cache");
    //             const valueArr = JSON.parse(value);
    //             setMonths(valueArr)
    //             setMonth(valueArr.at(-1))
    //         }
    //     } catch (err) {
    //         console.log('FetchTimes error', err);
    //     }
    // }

    const handleSetSelectMonth = () =>{
        setMonth(select);
        hideModal();
    }

    console.log(months);

    return (
        <>
            <SafeAreaView >
                <StatusBar style="dark"/>
                <View style={styles.header}>
                    <TouchableOpacity onPress={showModal}>
                        { month && <Text> {month} </Text>}   
                    </TouchableOpacity>
                </View>
                {props.children}
            </SafeAreaView>
            {   visible && <View style={styles.container}>
                                <Picker
                                    style={styles.pickerStyles}
                                    selectedValue={select}
                                    onValueChange={(month) => {
                                        setSelect(month);
                                    }}
                                    enabled={false}
                                    mode={'dropdown'}>
                                    {
                                        months.map(month=> <Picker.Item key={month} label={month} value={month}/>)
                                    }
                                </Picker>
                                <Button title="Confirmed" onPress={handleSetSelectMonth}/>
                            </View>
            }
        </>
       
    )
}

const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   paddingTop: StatusBar.currentHeight,
    // },
    scrollView: {
        marginHorizontal: 10,
    },
    text: {
        color: 'black',
        fontSize: 16, 
        fontWeight: 'bold',
        paddingBottom: 15
    },
    contentContainer: {
        backgroundColor: 'white', 
        padding: 20, 
        margin: 60,
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: "#dbdbdb",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        height: 44,
    },
    
        container: {
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        },
        pickerStyles:{
          width:'70%',
          backgroundColor:'white',
          color:'white'
        }

});

export default Header;