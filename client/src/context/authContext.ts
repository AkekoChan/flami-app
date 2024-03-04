import { createContext } from "react";

export interface AuthContextType {
  signin: () => void;
  signup: () => void;
  signout: () => void;
  currentUser: string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);
