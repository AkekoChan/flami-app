import APIHandler from "../utils/api/api-handler";

const mapServices = {
    getMapInfo: async () => {
        try {
            const response = await APIHandler.getMap("");
            return response;
          } catch (error) {
            console.error(error);
          }
    },
};

export default mapServices;