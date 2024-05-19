// REACT
import { Route, Routes } from "react-router";
import { toast, Toaster, useToasterStore } from "react-hot-toast";
import { useEffect } from "react";
import { useTheme } from "./hooks/useTheme";

// PAGES
import ForgetPasswordPage from "./pages/auth/ForgetPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import OtpPage from "./pages/auth/OtpPage";
import SigninPage from "./pages/auth/SigninPage";
import SignupPage from "./pages/auth/SignupPage";
import WelcomePage from "./pages/auth/WelcomePage";
import FlamiPage from "./pages/flami/FlamiPage";
import MapPage from "./pages/map/MapPage";
import ProfilePage from "./pages/profile/ProfilePage";
import ProtectedRoute from "./utils/routes/ProtectedRoute";
import AuthRoute from "./utils/routes/AuthRoute";
import ErrorPage from "./pages/error/ErrorPage";
import AccountPage from "./pages/profile/AccountPage";
import AllBadgesPage from "./pages/profile/AllBadgesPage";
import SharePage from "./pages/flami/SharePage";
import ScanPage from "./pages/flami/ScanPage";
import CosmeticPage from "./pages/flami/CosmeticPage";
import LegalNoticesPage from "./pages/legal/LegalNoticesPage";
import ThanksPage from "./pages/legal/ThanksPage";
import CollectionPage from "./pages/flami/CollectionPage";
import BadgePage from "./pages/profile/BadgePage";
import FlamisMap from "./pages/map/FlamisMap";

// import click1 from "../public/assets/sound/click-1.mp3";
// import click2 from "../public/assets/sound/click-2.mp3";
// import click3 from "../public/assets/sound/click-3.mp3";

const TOAST_LIMIT = 2;

const App = () => {
  const { toasts } = useToasterStore();
  const {showNav} = useTheme()

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  // was supposed to play a pop sound on every button/link click
  // let audios = [new Audio(click1), new Audio(click2), new Audio(click3)];

  return (
    <main className={`${showNav ? "p-8" : ""} min-h-dvh font-roboto max-w-lg mx-auto grid`}>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<FlamiPage />} />
          <Route path="share" element={<SharePage />} />
          <Route path="share/scan" element={<ScanPage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="badges" element={<AllBadgesPage />} />
          <Route path="badge/:badgeId" element={<BadgePage />} />
          <Route path="cosmetics" element={<CosmeticPage />} />
          <Route path="collection" element={<CollectionPage />} />
          <Route path="legal-notices" element={<LegalNoticesPage />} />
          <Route path="thanks" element={<ThanksPage />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/sign-in" element={<SigninPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage/>}
          />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/otp" element={<OtpPage />} />
        </Route>
        <Route path="/flamis-map" element={<FlamisMap />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
};

export default App;
