import { useCallback, useEffect, useState } from "react";
import { AuthContext, AuthContextType } from "./authContext";
import { SignupBody } from "../interfaces/api-body/signup-body";
import { APIHandler } from "../utils/api/api-handler";
import { RegisterResponse } from "../interfaces/api-response/register-reponse";
import { useNavigate } from "react-router";

interface AuthContextProviderInterface {
  children: React.ReactNode;
}

export const AuthContextProvider = ({
  children,
}: AuthContextProviderInterface) => {
  const [currentUser, setCurrentUser] = useState<string | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const navigate = useNavigate();

  const signin = useCallback(() => {});

  const signout = async () => {};

  const signup = async (body: SignupBody) => {
    APIHandler<RegisterResponse>(
      "/auth/signup",
      currentUser,
      "post",
      body
    ).then((response) => {
      navigate("/otp");

      console.log(response);
    });
  };

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
