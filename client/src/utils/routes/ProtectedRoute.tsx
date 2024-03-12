import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import Navigation from "../../components/navigation/Navigation";

const ProtectedRoute = () => {
  const { token } = useAuth();

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
