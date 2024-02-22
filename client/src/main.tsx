import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import "./assets/styles/main.css";
import { AuthContextProvider } from "./context/authContextProvider.tsx";
import SigninPage from "./pages/auth/SigninPage.tsx";
import SignupPage from "./pages/auth/SignupPage.tsx";
import FlamiPage from "./pages/flami/FlamiPage.tsx";
import MapPage from "./pages/map/MapPage.tsx";
import ProfilePage from "./pages/profile/ProfilePage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/signin" element={<SigninPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/" element={<App />}>
            <Route path="/flami" element={<FlamiPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
