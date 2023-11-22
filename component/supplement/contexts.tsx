import { Dispatch, SetStateAction, createContext } from "react"

export type Book = {
  BookId: string;
  UserId: string;
  CreatedTime: string;
  Title: string;
}

export type Transaction = {
  TransactionId: string,
  UserId: string,
  Time: string,
  Title: string,
  Amount: number,
  Catergory: string,
  Description: string,
  CreatedTime: string,
  UpdatedTime: string,
  IsApproved: boolean
}

type BookContextType = {
  book: Partial<Book>,
  setBook: Dispatch<SetStateAction<Book>>;
}

const iBookContextState = {
  book: {},
  setBook: () => {}
}

export const BookContext = createContext<BookContextType>(iBookContextState)

type TransactionsContextType = {
  trans: Partial<Transaction[]>,
  setTrans: Dispatch<SetStateAction<Transaction[]>>;
}

const iTransactionsContextState = {
  trans: [],
  setTrans: () => []
}

export const TransactionsContext = createContext<TransactionsContextType>(iTransactionsContextState)
