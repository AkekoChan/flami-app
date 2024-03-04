const API_MAP =  "https://maksance.alwaysdata.net/jo2024/";

const APIMapHandler = {
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
}

export default APIMapHandler;
