import React from 'react';
import { useForm, Controller } from "react-hook-form"
import { View, Text, TextInput, Button } from 'react-native';
import { API } from 'aws-amplify';

type Transactions = {
    title: String
    catergory: String
    amount: Number
    description: String
}

const postTransaction = `
    mutation postTransaction($transaction: Transaction!){
        postTransaction(transaction: $transaction)
    }
`

const CreateTrans = (props:any) => {
    const {
        control, 
        handleSubmit, 
        formState: {errors}
    } = useForm({
        defaultValues: {
            title: "",
            catergory: "",
            amount: "",
            description: ""
        },
    })

    const onSubmit = async (data:any) => {
        const json = {
            // AccountId: props.user.
            BookId: "dadsadas",
            Time: new Date().toISOString().split('T')[0],
            CatergoryId: data?.catergory,
            Title: data?.title,
            Amount: Number(data?.amount),
            Description: data?.description,    
        }
        try {
            console.log(json)
            const result: any = await API.graphql({
                query: postTransaction,
                variables: {transaction: {...json}},
                authMode: "AMAZON_COGNITO_USER_POOLS",
                authToken: props.user.accessToken
            })
            console.log(result)
        } catch(err) {
            console.log('submit transaction failed', err);
        }

    }

    return(
        <View>
            <Text>Create new transaction</Text>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                name = "title"
                render={({field: {onChange, onBlur, value}}) => (
                    <TextInput 
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        placeholder="Enter your Title here!"
                    />
                )}
            />
            {errors.title && <Text> Title is required.</Text>}
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                name = "catergory"
                render={({field: {onChange, onBlur, value}}) => (
                    <TextInput 
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        placeholder="Enter your Catergory here!"
                    />
                )}
            />
            {errors.catergory && <Text> Catergory is required.</Text>}
            <Controller
                control={control}
                rules={{
                    required: true,
                    pattern: {
                        value: /^[0-9]*$/,
                        message: 'Please input number only'
                    }
                }}
                name = "amount"
                render={({field: {onChange, onBlur, value}}) => (
                    <TextInput 
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        placeholder="Enter your Amount here!"
                    />
                )}
            />
            {errors.amount && <Text> {errors.amount?.message || 'Amount is required.'} </Text>}
            <Controller
                control={control}  
                name = "description"
                render={({field: {onChange, onBlur, value}}) => (
                    <TextInput 
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        placeholder="Enter your Description here!"
                    />
                )}
            />

            <Button title='Submit' onPress={handleSubmit(onSubmit)}/>
        </View>
    )
}

export default CreateTrans;