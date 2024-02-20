import otpGenerator from "otp-generator";
import OTP from "../models/otp.model.js";

const optController = {
  setOTP: async (req, res) => {
    try {
      const { email } = req.body;

      // const checkUserPresent = await User.findOne({ email });

      // if (checkUserPresent) {
      //   return res.status(401).json({
      //     message: `L'utilisateur existe déja.`,
      //   });
      // }

      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      const result = await OTP.findOne({ otp: otp });

      while (result) {
        otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
        });
      }
      const otpPayload = { email, otp };
      await OTP.create(otpPayload);

      res.status(200).json({
        message: `OTP Sent Successfully`,
        otp,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: error.message });
    }
  },
};

export default optController;
