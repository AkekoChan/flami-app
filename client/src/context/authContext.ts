import { createContext } from "react";
import { SignupBody } from "../interfaces/api-body/signup-body";
import { ErrorResponse } from "../interfaces/api-response/error-response";
import { User } from "../interfaces/user.interface";

export interface AuthContextType {
  signin: () => void;
  signup: (body: SignupBody) => Promise<ErrorResponse | void>;
  signout: () => void;
  token: string | null;
  user: Omit<User, "created_at"> | undefined;
}

export const AuthContext = createContext<AuthContextType | null>(null);
