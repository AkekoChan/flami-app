import { Route, Routes } from "react-router";
import AuthLayout from "./pages/AuthLayout";
import RootLayout from "./pages/RootLayout";
import ForgetPasswordPage from "./pages/auth/ForgetPasswordPage";
import OtpPage from "./pages/auth/OtpPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import SigninPage from "./pages/auth/SigninPage";
import SignupPage from "./pages/auth/SignupPage";
import WelcomePage from "./pages/auth/WelcomePage";
import FlamiPage from "./pages/flami/FlamiPage";
import MapPage from "./pages/map/MapPage";
import ProfilePage from "./pages/profile/ProfilePage";

const App = () => {
  return (
    <main className="p-8 h-dvh font-roboto max-w-lg mx-auto">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route index element={<WelcomePage />} />
          <Route path="/sign-in" element={<SigninPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/otp" element={<OtpPage />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<FlamiPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </main>
  );
};

export default App;
