import { Route, Routes } from "react-router";
import ForgetPasswordPage from "./pages/auth/ForgetPasswordPage";
import OtpPage from "./pages/auth/OtpPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import SigninPage from "./pages/auth/SigninPage";
import SignupPage from "./pages/auth/SignupPage";
import WelcomePage from "./pages/auth/WelcomePage";
import FlamiPage from "./pages/flami/FlamiPage";
import MapPage from "./pages/map/MapPage";
import ProfilePage from "./pages/profile/ProfilePage";
import ProtectedRoute from "./utils/routes/ProtectedRoute";
import { toast, Toaster, useToasterStore } from "react-hot-toast";
import AuthRoute from "./utils/routes/AuthRoute";
import ErrorPage from "./pages/error/ErrorPage";
import { useEffect } from "react";
import AccountPage from "./pages/profile/AccountPage";
import AllBadgesPage from "./pages/profile/AllBadgesPage";
import SharePage from "./pages/flami/SharePage";
import TrainingPage from "./pages/activities/TrainingPage";

const TOAST_LIMIT = 2;

const App = () => {
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  return (
    <main className="p-8 min-h-dvh font-roboto max-w-lg mx-auto grid mb-24">
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<FlamiPage />} />
          <Route path="share" element={<SharePage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="badges" element={<AllBadgesPage />} />
          <Route path="training" element={<TrainingPage />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/sign-in" element={<SigninPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/otp" element={<OtpPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
};

export default App;
