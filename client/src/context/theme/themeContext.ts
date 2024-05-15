import React, { createContext } from "react";

export interface ThemeContextType {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
  isClose: string | null;
  handleCloseModal: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);
