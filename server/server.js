import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import housesRoute from "./routes/houses.js";
import usersRoute from "./routes/users.js";
import cookieParser from "cookie-parser";
import cluster from "cluster";
import os from "os";
import path from "path"
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

// Middlewares
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/houses", housesRoute);
app.use("/api/users", usersRoute);
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

// Ping middleware
app.use((req, res, next) => {
  console.log("Ping!");
  next();
});

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {

  app.listen(8800, () => {
    connect();
    console.log(`Worker ${process.pid} connected to backend`);
  });
}
