import { useCallback, useEffect, useState } from "react";
// import authService from "../../services/auth";
import { AuthContext, AuthContextType } from "./authContext";

interface AuthContextProviderInterface {
  children: React.ReactNode;
}

export const AuthContextProvider = ({
  children,
}: AuthContextProviderInterface) => {
  const [currentUser, setCurrentUser] = useState<string | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const signin = useCallback(() => {});

  const signout = async () => {};

  const signup = async () => {};

  const verifyTokenValidity = useCallback(() => {});

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  });

  const authContextValue: AuthContextType = {
    signin,
    signout,
    signup,
    currentUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
