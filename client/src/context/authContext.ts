import { createContext } from "react";
import { SignupBody } from "../interfaces/api-body/signup-body";
import { User } from "../interfaces/user.interface";
import { SigninBody } from "../interfaces/api-body/signin-body";

export interface AuthContextType {
  signin: (body: SigninBody) => void;
  signup: (body: SignupBody) => Promise<void>;
  signout: () => void;
  token: string | null;
  user: Omit<User, "created_at"> | undefined;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
