import userModel from "../models/user.model.js";

const userController = {
  getUsers: async (req, res) => {
    try {
      const users = await userModel.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  addUser: async (req, res) => {
    const user = req.body;
    const newUser = new userModel(user);
    try {
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
};

export default userController;
