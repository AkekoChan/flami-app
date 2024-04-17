import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { SigninBody } from "../../interfaces/api-body/signin-body";
import { SignupBody } from "../../interfaces/api-body/signup-body";
import { AuthResponse } from "../../interfaces/api-response/auth-reponse";
import { ErrorResponse } from "../../interfaces/api-response/error-response";
import { GenericResponse } from "../../interfaces/api-response/generic-response";
import { RefreshTokenResponse } from "../../interfaces/api-response/refresh-token-response";
import { User } from "../../interfaces/user.interface";
import { APIHandler } from "../../utils/api/api-handler";
import { AuthContext, AuthContextType } from "./authContext";

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

  const signin = useCallback(
    (body: SigninBody) => {
      APIHandler<AuthResponse>("/auth/signin", false, "POST", body)
        .then((res) => {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          toast.success(res.data.message, {
            style: {
              background: "#3D3D3D",
              color: "#FAFAFA",
              borderRadius: "12px",
            },
          });
          navigate("/");
        })
        .catch((data: ErrorResponse) => {
          if (data.error === 403) {
            navigate("/otp");
            setUser({
              name: undefined,
              email: body.email,
            });
          }
        });
    },
    [navigate]
  );

  const signout = () => {
    localStorage.clear();
    setUser(undefined);
    setToken(null);
    navigate("/sign-in");
  };

  const signup = (body: SignupBody) => {
    APIHandler<AuthResponse>("/auth/signup", false, "POST", body)
      .then(() => {
        navigate("/otp");
        APIHandler<GenericResponse>("/auth/send-otp", false, "POST", body).then(
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
          }
        );
      })
      .catch((data: ErrorResponse) => {
        if (data.error) {
          setToken(null);
          localStorage.clear();
          // navigate("/sign-in");
        }
      });
  };

  const refreshToken = useCallback(() => {
    APIHandler<RefreshTokenResponse>(
      "/auth/token",
      false,
      "GET",
      undefined,
      token
    )
      .then((res) => {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
      })
      .catch((data: ErrorResponse) => {
        if (data.error) {
          signout();
        }
      });
  }, [token]);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  });

  const authContextValue: AuthContextType = {
    signin,
    signout,
    signup,
    token,
    user,
    setToken,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
