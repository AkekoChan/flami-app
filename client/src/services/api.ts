import User from "../interfaces/userInterface";

const API_URL = "http://localhost:3001/api";

const apiService = {
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await fetch(`${API_URL}/users`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  createUser: async (user: User): Promise<User> => {
    try {
      const response = await fetch(`${API_URL}/users/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create user");
    }
  },
};

export default apiService;
