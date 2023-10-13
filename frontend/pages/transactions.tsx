import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, ScrollView, Keyboard, KeyboardAvoidingView, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Header from '../supplement/header';
import CreateTrans from './createTrans';

const Transactions = (props: any) => {
    const [transaction, setTransaction] = useState({
        title: "",
        catergory: "",
        amount: 0,
        description: "",
    })

    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const handleChanges = (key: string, val: any) => {
        console.log("dasdsadasd")
        console.log(key)
        setTransaction({...transaction, [key]:val.nativeEvent.text})
        console.log(transaction)
    }

    const submitTransaction = () => {
        if(isNaN(+transaction.amount)) alert("Invalid Amount Input. Please enter numeric value only.")
        const payload = {
            ...transaction,
            time: new Date(),
        }
    }

    return(
        <>
            <CreateTrans user={props.user}/>
            {/* <KeyboardAvoidingView>
                <Text style={styles.textHeader}>Create new transaction</Text>
                <ScrollView>
                    <Text style={styles.textPara}>Title</Text>
                    <TextInput 
                        id="title" 
                        style={styles.input} 
                        onBlur={(val) => handleChanges('title', val)}
                        placeholder="Enter your title here!"
                    />
                
                
                    <Text style={styles.textPara}>Catergory</Text>
                    <TextInput 
                        id="catergory" 
                        style={styles.input} 
                        onBlur={(val) => handleChanges('catergory', val)}
                        placeholder="Enter your catergory here!"
                    />
                    
                
                    <Text style={styles.textPara}>Amount</Text>
                    <TextInput 
                        id="amount" 
                        style={styles.input}
                        onBlur={(val) => handleChanges('amount', val)}
                        placeholder="Enter your amount here!"
                        keyboardType={Platform.OS == 'ios' ? 'numbers-and-punctuation' : 'numeric'}
                    />
                
                
                    <Text style={styles.textPara}>Description</Text>
                    <TextInput 
                        id="description"
                        style={styles.input}
                        onBlur={(val) => handleChanges('description', val)}
                        placeholder="Enter your description here!"
                        multiline={true}
                        numberOfLines={4} 
                        maxLength={100}
                        keyboardType="default"
                        returnKeyType="done"
                        blurOnSubmit={true}
                        onSubmitEditing={()=>{Keyboard.dismiss()}}
                    />

                    <Button title="Cancel" onPress={hideModal} />
                    <Button title="Submit" onPress={submitTransaction} />
                </ScrollView>      
            </KeyboardAvoidingView> */}
        </>   
    )
}

const styles = StyleSheet.create({
    textPara:{
        color: 'black',
        fontSize: 15, 
        fontWeight: 'bold',
        padding: 5
    },
    textHeader: {
        color: 'black',
        fontSize: 20, 
        fontWeight: 'bold',
        paddingBottom: 15
    },
    input: {
        height: 40,
        borderWidth: 1,
        margin: 10,
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
    contentContainer: {
        backgroundColor: 'white', 
        padding: 20, 
        margin: '5%',
    },
});

export default Transactions;