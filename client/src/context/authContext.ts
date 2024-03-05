import { createContext } from "react";
import { SignupBody } from "../interfaces/api-body/signup-body";
import { ErrorResponse } from "../interfaces/api-response/error-response";

export interface AuthContextType {
  signin: () => void;
  signup: (body: SignupBody) => Promise<ErrorResponse | void>;
  signout: () => void;
  token: string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);
