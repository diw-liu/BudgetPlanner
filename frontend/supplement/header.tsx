import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { Modal, Portal, Text, Menu, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { API } from 'aws-amplify';

const getTimes = `
  query getTimes{
    getTimes
  }
`

const Header = (props:any) => {
    const [months, setMonths] = useState([])
    const [selectMonth, setSelectMonth] = useState("")

    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    useEffect(() => {
        fetchTimes()
    }, [props.user])

    async function fetchTimes() {
        try {
            console.log(props)
            const timeData : any = await API.graphql({
                query: getTimes, 
                authMode: "AMAZON_COGNITO_USER_POOLS",
                authToken: props.user.accessToken
              })
            setMonths(timeData.data?.getTimes)
            setSelectMonth(timeData.data?.getTimes.at(-1))
            console.log(selectMonth)
        } catch (err) {
            console.log('fetchTimes failed', err);
        }
    }

    const handleSetSelectMonth = (i: number) =>{
        setSelectMonth(months[i]);
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
                                months.map((month,index) =>(
                                    <Menu.Item onPress={() => handleSetSelectMonth(index)} title={month} key={index}/>
                                ))
                            }
                        </ScrollView>
                    </Modal>
                </Portal>
                <TouchableOpacity onPress={showModal}>
                    {
                        selectMonth && <Text>
                                            {selectMonth}
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