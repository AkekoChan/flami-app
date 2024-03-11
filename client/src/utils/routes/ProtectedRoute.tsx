import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import Navigation from "../../components/navigation/Navigation";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { token, verifyToken } = useAuth();

  useEffect(() => {
    verifyToken(token);
  });

  return (
    <>
      {token ? (
        <>
          <section>
            <Outlet />
          </section>
          <Navigation />
        </>
      ) : (
        <Navigate to="/welcome" />
      )}
    </>
  );
};

export default ProtectedRoute;
