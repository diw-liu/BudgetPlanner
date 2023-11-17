import { Dispatch, SetStateAction, createContext } from "react"

export type Book = {
  BookId: String;
  CreatedTime: String;
  Title: String;
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
