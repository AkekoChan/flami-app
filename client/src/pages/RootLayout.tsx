import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <section>
      <Outlet />
    </section>
  );
};

export default AuthLayout;
