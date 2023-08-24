import { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { Modal, Portal, Text, Menu, Divider } from 'react-native-paper';

const Header = () => {
    const [months, setMonths] = useState([
        {label:"Aug 2023", value: "08/2023"},
        {label:"Aug 2024", value: "08/2024"},
        {label:"Sep 2024", value: "09/2024"},
        {label:"Oct 2024", value: "10/2024"},
        {label:"Aug 2023", value: "08/2023"},
        {label:"Aug 2024", value: "08/2024"},
        {label:"Sep 2024", value: "09/2024"},
        {label:"Oct 2024", value: "10/2024"},
        {label:"Aug 2023", value: "08/2023"},
        {label:"Aug 2024", value: "08/2024"},
        {label:"Sep 2024", value: "09/2024"},
        {label:"Oct 2024", value: "10/2024"},
        {label:"Aug 2023", value: "08/2023"},
        {label:"Aug 2024", value: "08/2024"},
        {label:"Sep 2024", value: "09/2024"},
        {label:"Oct 2024", value: "10/2024"},
        {label:"Aug 2023", value: "08/2023"},
        {label:"Aug 2024", value: "08/2024"},
        {label:"Sep 2024", value: "09/2024"},
        {label:"Oct 2024", value: "10/2024"},
        {label:"Aug 2023", value: "08/2023"},
        {label:"Aug 2024", value: "08/2024"},
        {label:"Sep 2024", value: "09/2024"},
        {label:"Oct 2024", value: "10/2024"},
        
    ])
    const [selectMonth, setSelectMonth] = useState({label:""})
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const handleSetSelectMonth = (i: number) =>{
        setSelectMonth(months[i]);
        setVisible(false);
    }

    return (
        <>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.text}>Select Target Month</Text>
                    <Divider />
                    <ScrollView style={styles.scrollView}>
                        {
                            months.map((month,index) =>(
                                <Menu.Item onPress={() => handleSetSelectMonth(index)} title={month.label} key={index}/>
                            ))
                        }
                    </ScrollView>
                </Modal>
            </Portal>
            <TouchableOpacity onPress={showModal}>
                <AntDesign name="calendar" size={24} color="black" />
            </TouchableOpacity>
            {
                selectMonth && <Text>
                                    {selectMonth.label}
                               </Text>
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
    }
  });

export default Header;