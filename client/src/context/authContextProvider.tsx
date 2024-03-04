import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
// import authService from "../../services/auth";
import { AuthContext, AuthContextType } from "./authContext";

interface AuthContextProviderInterface {
  children: React.ReactNode;
}

export const AuthContextProvider = ({
  children,
}: AuthContextProviderInterface) => {
  const [cookies, removeCookie] = useCookies(["jwt"]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const signin = useCallback(() => {});

  const signout = async () => {};

  const signup = async () => {};

  const verifyTokenValidity = useCallback(() => {});

  useEffect(() => {});

  const authContextValue: AuthContextType = {
    signin,
    signout,
    signup,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
