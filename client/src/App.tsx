import { useEffect, useState } from "react";

import User from "./interfaces/userInterface";

import apiService from "./services/api";

const App = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    const users = await apiService.getUsers();
    setUsers(users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h1>User page</h1>

      <ul>
        {users.length === 0
          ? "No users found"
          : users.map((user) => (
              <li key={user._id}>
                {user.name} - {user.email}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default App;
