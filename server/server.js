import cors from "cors";
import express from "express";
import dotenv from "dotenv";

import "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import usersRoutes from "./routes/users.routes.js";
import flamiRoutes from "./routes/flami.routes.js";
import miscRoutes from "./routes/misc.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/my/flami", flamiRoutes);
app.use("/api/my", userRoutes);
app.use("/api/:name", usersRoutes);
app.use("/api", miscRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});