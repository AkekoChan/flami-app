import { createContext } from "react";
import { SignupBody } from "../interfaces/api-body/signup-body";

export interface AuthContextType {
  signin: () => void;
  signup: (body: SignupBody) => void;
  signout: () => void;
  currentUser: string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);
