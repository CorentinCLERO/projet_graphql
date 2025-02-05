import { createContext, useContext } from "react"

interface User {
  id: number
  username: string
  token: string
}

type UserContentType = {
  user: User
  setUser:(c: User) => void
  loading: boolean
}

export const UserContext = createContext<UserContentType>({
  user: {
    id: 0,
    username: '',
    token: ''
  },
  setUser: () => {},
  loading: true,
})

export const useUserContext = () => useContext(UserContext)