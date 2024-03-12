import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("La \"BDD\" est connecté gars 🤓☝️");
  })
  .catch((err) => {
    console.error("Ah mec ça craint là.. la \"BDD\" veut pas se connecter 🙂:", err);
  });
