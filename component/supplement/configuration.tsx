import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import { Auth } from '@aws-amplify/auth';
import { API } from "aws-amplify";
import '../../configureAmplify'
import { Book, BookContext } from "./contexts";

const getUser = `
  query getUser{
    getUser{
      Name
      Books{
        BookId
        CreatedTime
        Title
      }
    }
  }
`

const getTransaction = `
  query getTransaction($bookId: String!){
    getTransaction(bookId: $bookId){
      TransactionId
      CatergoryId
      Title
      Amount
      Catergory
      Description
      CreatedTime
      UpdatedTime
    }
  }
`

const getNextDay = () => {
  var expiration = new Date();
  expiration.setDate(expiration.getDate() + 1);
  return expiration.getTime();
}

export default function Configuration(props: any) {
  const [book, setBook] = useState({})
  const { route } = useAuthenticator(context => [context.route]);

  useEffect(() => {
    initialization();
  }, [route])

  const createdMonths = (books: Book[]) => {
    return books.reduce((map, book) => {
      const month = book["CreatedTime"].slice(0, 7)
      if(!map[month]) map[month] = [];
      map[month].push(book);
      return map
    }, {} as {[key:string]:Book[]})
  }

  const initialization = async () => {
    if (route !== 'authenticated') return;
    //await AsyncStorage.clear();
    try {
      var accessToken = await AsyncStorage.getItem('accessToken')
      const userExpire = await AsyncStorage.getItem('userExpire')
      //accessToken && userExpire && new Date().getTime() >= new Date(userExpire).getTime()
      if (true) {
        Auth.currentSession()
          .then(async (session) => {
            accessToken = session.getAccessToken().getJwtToken();
            await AsyncStorage.multiSet([['accessToken', accessToken],
            ['userExpire', JSON.stringify(getNextDay())]])
          })

        const payload: any = await API.graphql({
          query: getUser,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          authToken: accessToken || ""
        })

        if (payload) {
          const books = payload["data"]["getUser"]["Books"]
          console.log(books)
          console.log(JSON.stringify(books));
          setBook(books[books.length - 1])
          await AsyncStorage.setItem("months", JSON.stringify(createdMonths(books)));

          // const transResult: any = await API.graphql({
          //   query: getTransactions,
          //   authMode: "AMAZON_COGNITO_USER_POOLS",
          //   authToken: accessToken
          // })
        }
      } else {
        console.log(await AsyncStorage.getItem('books'))
        const books = await AsyncStorage.getItem('books').then((data) => JSON.parse(data || ''))
        console.log(books)
        if (books) setBook(books[-1])
      }
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
        {props.children}
      </BookContext.Provider>
    </Authenticator>

  )
}
