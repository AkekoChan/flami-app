import { useCallback, useEffect, useState } from "react";
import { AuthContext, AuthContextType } from "./authContext";
import { SignupBody } from "../interfaces/api-body/signup-body";
import { APIHandler } from "../utils/api/api-handler";
import { RegisterResponse } from "../interfaces/api-response/register-reponse";
import { useNavigate } from "react-router";
import { GenericResponse } from "../interfaces/api-response/generic-response";
import toast from "react-hot-toast";
import { User } from "../interfaces/user.interface";

interface AuthContextProviderInterface {
  children: React.ReactNode;
}

export const AuthContextProvider = ({
  children,
}: AuthContextProviderInterface) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<Omit<User, "created_at">>();

  const navigate = useNavigate();

  const signin = useCallback(() => {});

  const signout = async () => {};

  const signup = async (body: SignupBody) => {
    APIHandler<RegisterResponse>("/auth/signup", false, "post", body).then(
      (res) => {
        setToken(res.data.token);
        APIHandler<GenericResponse>("/auth/send-otp", false, "post", body).then(
          (res) => {
            setUser({
              name: body.name,
              email: body.email,
            });
            toast.success(res.data.message, {
              style: {
                background: "#3D3D3D",
                color: "#FAFAFA",
                borderRadius: "12px",
              },
            });
            navigate("/otp");
          }
        );
      }
    );
  };

  const verifyTokenValidity = useCallback(() => {});

  useEffect(() => {});

  const authContextValue: AuthContextType = {
    signin,
    signout,
    signup,
    setToken,
    token,
    user,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
