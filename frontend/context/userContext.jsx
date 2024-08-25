import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!user) {
      axios
        .get("/profile")
        .then((res) => {
          setUser(res.data.data);
          setToken(res.data.token);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
}
