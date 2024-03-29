import { useLocation } from "react-router";
import { NavLink } from "../ui";
import { useTheme } from "../../hooks/useTheme";

const Navigation = () => {
  const location = useLocation();
  const { showNav } = useTheme();

  const currentLocation = location.pathname.split("/")[1];
  return (
    <div
      className={`fixed bottom-0 left-1/2 -translate-x-1/2 bg-alabaster-900 z-50 py-4 px-8 shadow-nav rounded-t-xl max-w-lg w-full ${
        showNav ? "block" : "hidden"
      }`}
    >
      <nav>
        <ul className="grid grid-cols-3 mx-auto w-full">
          <li className="inline-flex items-center justify-center">
            <NavLink
              to="/profile"
              aria-label="Page du profil"
              className={`${
                currentLocation === "profile"
                  ? "border-3 border-tree-poppy-500 bg-tree-poppy-500/20 transition-none"
                  : ""
              }`}
            >
              <img src="/assets/img/icons/user.svg" alt="" />
            </NavLink>
          </li>
          <li className="inline-flex items-center justify-center">
            <NavLink
              to="/"
              aria-label="Page du Flami"
              className={`${
                currentLocation === ""
                  ? "border-3 border-tree-poppy-500 bg-tree-poppy-500/20 transition-none"
                  : ""
              }`}
            >
              <img src="/assets/img/icons/flame.svg" alt="" />
            </NavLink>
          </li>
          <li className="inline-flex items-center justify-center">
            <NavLink
              to="/map"
              aria-label="Page du parcours"
              className={`${
                currentLocation === "map"
                  ? "border-3 border-tree-poppy-500 bg-tree-poppy-500/20 transition-none"
                  : ""
              }`}
            >
              <img src="/assets/img/icons/map.svg" alt="" />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
