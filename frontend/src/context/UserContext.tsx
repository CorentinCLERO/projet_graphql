import { createContext, useContext } from "react"

type UserContentType = {
  copy: string
  setCopy:(c: string) => void
}

export const UserContext = createContext<UserContentType>({
  copy: 'Hello World',
  setCopy: () => {},
})

export const useUserContext = () => useContext(UserContext)