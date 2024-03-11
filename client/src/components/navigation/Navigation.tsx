import { NavLink } from "../ui";

const Navigation = () => {
  return (
    <div className="fixed bottom-0 left-0 h-16 bg-alabaster-900 z-50 py-6 px-8 shadow-nav rounded-t-xl min-w-lg">
      <nav>
        <ul>
          <li>
            <NavLink to="/profile"></NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
