import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

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
        // tags
        axios
        .get("/tags")
        .then((res) => {
          setTags(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
        // categories
        axios
        .get("/category")
        .then((res) => {
          setCategories(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken, tags, categories }}>
      {children}
    </UserContext.Provider>
  );
}
