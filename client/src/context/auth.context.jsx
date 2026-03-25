import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const getStroedUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  };

  const [currentUser, setCurrentUser] = useState(getStroedUser);

  const updateUser = (user) => {
    setCurrentUser(user);
  };

  useEffect(() => {
    if (!currentUser) {
      localStorage.removeItem("user");
      return;
    }

    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
