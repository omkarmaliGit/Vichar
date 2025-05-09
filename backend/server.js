import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./config/database.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import vicharRouter from "./routes/vicharRoute.js";

import cors from "cors";

const app = express();
const port = Number(process.env.PORT) || 4000;
connectDB();
connectCloudinary();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true, // if you're using cookies
  })
);

app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/vichar", vicharRouter);

app.get("/home", (req, res) => {
  res.send("server API started");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
