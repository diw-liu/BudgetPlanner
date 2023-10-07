import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { Modal, Portal, Text, Menu, Divider } from 'react-native-paper';
import { API } from 'aws-amplify';
import { useAuthenticator } from '@aws-amplify/ui-react-native';

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
        <>
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
                {/* <AntDesign name="calendar" size={24} color="black" /> */}
                {
                    selectMonth && <Text>
                                        {selectMonth}
                                </Text>
                }   
            </TouchableOpacity>
            
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