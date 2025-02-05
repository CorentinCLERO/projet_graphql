import React, { JSX, ReactNode, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { gql, useQuery } from "@apollo/client";
import { useLocation, useNavigate } from "react-router";

type UserProviderProps = {
  children: ReactNode;
};

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
`);

const UserProvider: React.FC<UserProviderProps> = ({
  children,
}): JSX.Element => {
  const { data, loading } = useQuery(getMe, {
    context: {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    },
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({
    id: 0,
    username: "",
    token: "",
  });

  useEffect(() => {
    console.log(!data?.me?.success, user?.username);
    console.log(location.pathname);
    if ((!data?.me?.success || user?.username) && location.pathname === "/") navigate("/login");
  }, [data, user, navigate, location]);

  console.log(data, loading);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
