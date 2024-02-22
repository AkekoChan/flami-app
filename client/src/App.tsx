import { Outlet } from "react-router";
import Navigation from "./components/navigation/Navigation";

const App = () => {
  return (
    <main className="main-layout">
      <div className="outlet-section">
        <Outlet></Outlet>
      </div>
      <Navigation />
    </main>
  );
};

export default App;
