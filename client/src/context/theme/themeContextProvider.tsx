import { useState } from "react";
import { ThemeContext, ThemeContextType } from "./themeContext";

interface ThemeContextProviderInterface {
  children: React.ReactNode;
}

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderInterface) => {
  const [showNav, setShowNav] = useState<boolean>(true);
  const [isClose, setIsClose] = useState(localStorage.getItem("isClose"));

  const handleCloseModal = () => {
    setIsClose("true");
    localStorage.setItem("isClose", "true");
  };

  const themeContextValue: ThemeContextType = {
    showNav,
    setShowNav,
    isClose,
    handleCloseModal,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
