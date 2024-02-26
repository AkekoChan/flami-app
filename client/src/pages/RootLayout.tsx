import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <section>
      <Outlet />
    </section>
  );
};

export default RootLayout;
