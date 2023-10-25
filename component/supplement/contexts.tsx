import { createContext } from "react"
type MonthContextType = {
    month: string ,
    setMonth: (newValue: string) => void
}

const iMonthContextState = {
   month: "",
   setMonth: () => {}
}

const MonthContext = createContext<MonthContextType>(iMonthContextState)

export default MonthContext