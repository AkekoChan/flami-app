import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const AuthRoute = () => {
  const { token } = useAuth();

  return (
    <>
      {token ? (
        <Navigate to="/" />
      ) : (
        <section>
          <Outlet />
        </section>
      )}
    </>
  );
};

export default AuthRoute;
