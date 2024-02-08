import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

const authController = {
  authJWT: async (req, res) => {
    var jwt = require('jsonwebtoken');
    var decoded = jwt.verify(token, process.env.PRIVATE);
  },
  signup: async (req, res) => {
    const result = bcrypt.compareSync("my password", hash);
    // result == true or result == false
    try {
      var token = jwt.sign({ dbdata: true }, process.env.PRIVATE);
      res.status(200).json(token);
    } catch (error) {
      res.status(404).json({ message: error.message, error: 404 });
    }
  },
  signin: async (req, res) => {
    let userdata = req.body;
    userdata.password = bcrypt.hashSync(userdata.password, bcrypt.genSaltSync(11));
    let new_user = new userModel(userdata);
    try {
      await new_user.save();
      res.status(201).json({
        message: `Inscription finalisé. Bienvenue ${userdata.name} !`,
      });
    } catch (error) {
      res.status(409)
      if (error.keyValue && error.keyValue.email) {
        res.json({ message: `Un compte avec cet email (${error.keyValue.email}) existe déjà.`, error: 409 })
      } else if (error.keyValue && error.keyValue.name) {
        res.json({ message: `Un compte avec ce nom (${error.keyValue.name}) existe déjà.`, error: 409 })
      } else {
        res.json({ message: error.message, error: 409 });
      }
    }
  },
};

export default authController;
