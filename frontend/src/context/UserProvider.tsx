import React, { JSX, ReactNode, useState } from "react"
import { UserContext } from "./UserContext";
import { gql, useQuery } from "@apollo/client";

type UserProviderProps = {
  children: ReactNode
}

const getMe = gql(`
  query Query {
    me {
      code
      success
      message
      user {
        id
        username
      }
    }
  } 
`)

const UserProvider: React.FC<UserProviderProps> = ({children}): JSX.Element => {
  const {data, loading} = useQuery(getMe, {
    context: {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }
  })

  console.log(data, loading)
  const [user, setUser] = useState({
    id: 0,
    username: '',
    token: ''
  })

  return (
    <UserContext.Provider value={{user, setUser, loading}}>
      {children}
    </UserContext.Provider>
  )
};

export { UserProvider }