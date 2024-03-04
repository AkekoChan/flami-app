import { Route, RouterProvider, Routes } from "react-router";
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
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <RootLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <FlamiPage />,
        },
        {
          path: "/map",
          element: <MapPage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
      ],
    },
    {
      path: "/welcome",
      element: <WelcomePage />,
    },
    {
      path: "/sign-in",
      element: <SigninPage />,
    },
    {
      path: "/sign-up",
      element: <SignupPage />,
    },
    {
      path: "/reset-password/:token",
      element: <ResetPasswordPage />,
    },
    {
      path: "/forget-password",
      element: <ForgetPasswordPage />,
    },
    {
      path: "/otp",
      element: <OtpPage />,
    },
  ]);

  return (
    <main className="p-8 h-dvh font-roboto max-w-lg mx-auto">
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
