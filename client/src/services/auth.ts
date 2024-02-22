import APIHandler from "../utils/api/api-handler";

const authService = {
  sendOTP: async (email: string) => {
    try {
      const response = await APIHandler.post("/auth/send-otp", email, "");
      return response;
    } catch (error) {
      console.error(error);
    }
  },
};

export default authService;
