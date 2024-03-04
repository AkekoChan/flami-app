const API_URL = "http://localhost:3001/api";
const API_MAP =  "https://maksance.alwaysdata.net/jo2024/";

const APIHandler = {
  get: async (url: string, token: string) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(`${API_URL}${url}`, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  post: async (url: string, data: string = "", token?: string) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(`${API_URL}${url}`, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  patch: async (url: string, data: string = "", token: string) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(`${API_URL}${url}`, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  getMap: async (url: string) => {
    const options = {
      method: "GET",
    };
    try {
      const response = await fetch(`${API_MAP}${url}`, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
};

export default APIHandler;
