import { Route, Routes } from "react-router";
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
import ProtectedRoute from "./utils/protected-route/ProtectedRoute";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <main className="p-8 min-h-dvh font-roboto max-w-lg mx-auto grid">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <RootLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<FlamiPage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/sign-in" element={<SigninPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/otp" element={<OtpPage />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
};

export default App;
