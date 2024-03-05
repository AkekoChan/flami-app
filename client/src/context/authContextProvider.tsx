import { useCallback, useEffect, useState } from "react";
import { AuthContext, AuthContextType } from "./authContext";
import { SignupBody } from "../interfaces/api-body/signup-body";
import { APIHandler } from "../utils/api/api-handler";
import { RegisterResponse } from "../interfaces/api-response/register-reponse";
import { ErrorResponse, useNavigate } from "react-router";

interface AuthContextProviderInterface {
  children: React.ReactNode;
}

export const AuthContextProvider = ({
  children,
}: AuthContextProviderInterface) => {
  const [token, setToken] = useState<string | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const navigate = useNavigate();

  const signin = useCallback(() => {});

  const signout = async () => {};

  const signup = async (body: SignupBody): Promise<ErrorResponse | void> => {
    APIHandler<RegisterResponse>("/auth/signup", token, "post", body)
      .then((response) => {
        console.log(response);
        navigate("/otp");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const verifyTokenValidity = useCallback(() => {});

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(token));
  });

  const authContextValue: AuthContextType = {
    signin,
    signout,
    signup,
    token,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
