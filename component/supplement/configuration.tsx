import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import { Auth } from '@aws-amplify/auth';
import { API } from "aws-amplify";
import '../../configureAmplify'
import { Book, BookContext, Transaction, TransactionsContext} from "./contexts";

const getUser = `
  query getUser{
    getUser{
      Name
      Books{
        UserId
        BookId
        CreatedTime
        Title
      }
    }
  }
`

const getTransactions = `
  query getTransactions($input: String!){
    getTransactions(input: $input){
      TransactionId
      UserId
      Title
      Amount
      Catergory
      Description
      CreatedTime
      UpdatedTime
      IsApproved
    }
  }
`

const getNextDay = () => {
  var expiration = new Date();
  expiration.setDate(expiration.getDate() + 1);
  return expiration.getTime();
}

export default function Configuration(props: any) {
  const [book, setBook] = useState<Book>({})
  const [trans, setTrans] = useState<Transaction[]>([]);
  const { route } = useAuthenticator(context => [context.route]);

  useEffect(() => {
    fetchUserAll();
  }, [route])

  useEffect(() => {
    fetchTransactions();
  }, [book])

  const createdMonths = (books: Book[]) => {
    return books.reduce((map, book) => {
      const month = book["CreatedTime"].slice(0, 7)
      if(!map[month]) map[month] = [];
      map[month].push(book);
      return map
    }, {} as {[key:string]:Book[]})
  }

  const fetchTransactions = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken') || ""
      console.log(accessToken)
      console.log("bookId" + book["BookId"])
      const payload: any = await API.graphql({
        query: getTransactions,
        variables: { input: book["BookId"] },
        authMode: "AMAZON_COGNITO_USER_POOLS",
        authToken: accessToken
      })
      console.log(payload)
      if (payload) {
        const trans = payload["data"]["getTransactions"]
        setTrans(trans)
        console.log(trans)
      }
    } catch (error) {
      console.log(error)
    }
    
  }

  // make this part better
  const fetchUserAll = async () => {
    if (route !== 'authenticated') return;
    //await AsyncStorage.clear();
    try {
      // const expiration = new Date(await AsyncStorage.getItem('userExpire') || "")
      // const today = new Date()
      // if( today.getTime() >= expiration.getTime()){
      //   console.log('dad sadass')
      // }
      // if (today.getTime() >= expiration.getTime()){
        Auth.currentSession()
          .then(async (session) => {
            const idToken = session.getIdToken();
            const accessToken = session.getAccessToken().getJwtToken();
            await AsyncStorage.multiSet([['userId', idToken.payload['sub']],
                                         ['accessToken', accessToken],
                                         ['userExpire', JSON.stringify(getNextDay())]])
                              .then(async () => {
                                const payload: any = await API.graphql({
                                  query: getUser,
                                  authMode: "AMAZON_COGNITO_USER_POOLS",
                                  authToken: accessToken
                                })
                                console.log(accessToken+"outside")
                                if (payload) {
                                  console.log(payload)
                                  const books = payload["data"]["getUser"]["Books"]
                                  await AsyncStorage.setItem("months", JSON.stringify(createdMonths(books)));
                                  setBook(books[0])
                                }
                              })
          })
      // } else {
      //   const month = today.toISOString().split('T')[0].slice(0, 7)
      //   const book = JSON.parse(await AsyncStorage.getItem("months") || "")[month].pop()
      //   setBook(book)
      // }
    } catch (err) {
      console.log("Login error " + err)
    }
  }

  return (
    <Authenticator signUpAttributes={[
      "email",
      "name"
    ]}>
      <BookContext.Provider value={{ book, setBook }}>
        <TransactionsContext.Provider value={{trans, setTrans}}>
          {props.children}
        </TransactionsContext.Provider>
      </BookContext.Provider>
    </Authenticator>

  )
}
