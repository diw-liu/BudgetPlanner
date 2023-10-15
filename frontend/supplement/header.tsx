import { useContext, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { Modal, Portal, Text, Menu, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MonthContext from './contexts';

const Header = (props:any) => {

    const months: string[] = props.months
    const { month, setMonth } = useContext(MonthContext);
    // console.log(months);

    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);


    // useEffect(() => {
    //     fetchTimes()
    // }, [props.user])

   

    const handleSetSelectMonth = (i: number) =>{
        setMonth(months[i]);
        setVisible(false);
    }

    return (
        <SafeAreaView>
            <StatusBar style="dark"/>
            <View style={styles.header}>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.contentContainer}>
                        <Text style={styles.text}>Select Target Month</Text>
                        <Divider />
                        <ScrollView style={styles.scrollView}>
                            {
                                months && months.map((month,index) =>(
                                    <Menu.Item onPress={() => handleSetSelectMonth(index)} title={month} key={index}/>
                                ))
                            }
                        </ScrollView>
                    </Modal>
                </Portal>
                <TouchableOpacity onPress={showModal}>
                    {
                        month && <Text>
                                    {month}
                                </Text>
                    }   
                </TouchableOpacity>
            </View>
            {props.children}
        </SafeAreaView>
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
});

export default Header;