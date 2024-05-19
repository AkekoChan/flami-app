import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import "./config/db.js";
import auth from "./helpers/authMiddleware.js";
import authRoutes from "./routes/auth.routes.js";
import flamiRoutes from "./routes/flami.routes.js";
import miscRoutes from "./routes/misc.routes.js";
import userRoutes from "./routes/user.routes.js";
import usersRoutes from "./routes/users.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/my/flami", auth.require, flamiRoutes);
app.use("/api/my", auth.require, userRoutes);
app.use("/api/user/:name", auth.require, usersRoutes);
app.use("/api/misc", miscRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
