import APIMapHandler from "../utils/api/map-api-handler";

const mapService = {
    getMapInfo: async () => {
        try {
            const response = await APIMapHandler.getMap("");
            return response;
          } catch (error) {
            console.error(error);
          }
    },
    getCurrentStep: async () => {
        try {
            const response = await APIMapHandler.getMap("/where");
            return response;
          } catch (error) {
            console.error(error);
          }
    },
};

export default mapService;