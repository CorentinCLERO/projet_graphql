import React, { JSX, ReactNode, useState } from "react"
import { UserContext } from "./UserContext";

type UserProviderProps = {
  children: ReactNode
}

const UserProvider: React.FC<UserProviderProps> = ({children}): JSX.Element => {
  const [copy, setCopy] = useState('Hello World')
  return (
    <UserContext.Provider value={{copy, setCopy}}>
      {children}
    </UserContext.Provider>
  )
};

export { UserProvider }