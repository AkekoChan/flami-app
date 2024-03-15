import { useState } from "react";
import { ThemeContext, ThemeContextType } from "./themeContext";

interface ThemeContextProviderInterface {
  children: React.ReactNode;
}

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderInterface) => {
  const [showNav, setShowNav] = useState<boolean>(true);

  const themeContextValue: ThemeContextType = {
    showNav,
    setShowNav,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
