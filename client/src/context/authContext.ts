import { createContext } from "react";

interface AuthContextInterface {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);
