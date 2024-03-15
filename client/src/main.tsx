import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/styles/main.css";
import { AuthContextProvider } from "./context/auth/authContextProvider.tsx";
import { ThemeContextProvider } from "./context/theme/themeContextProvider.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
