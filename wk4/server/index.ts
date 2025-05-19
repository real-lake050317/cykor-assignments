import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";

import userRoutes from "./src/routes/user.routes";
import postRoutes from "./src/routes/post.routes";
import utilRoutes from "./src/routes/util.routes";

dotenv.config();

const app: Express = express();

const PORT: number = process.env.PORT
  ? parseInt(process.env.PORT as string)
  : (() => {
      throw new Error("PORT is not given");
    })();
const MONGO: string = process.env.MONGO
  ? process.env.MONGO
  : (() => {
      throw new Error("MONGO access uri is not given");
    })();
const SECRET: string = process.env.SECRET
  ? process.env.SECRET
  : (() => {
      throw new Error("SECRET token is not given");
    })();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/util", utilRoutes);

const connect = async () => {
  try {
    await mongoose.connect(MONGO);
    console.log("[server]: Server is connected To MongoDB");
  } catch (error) {
    throw error;
  }
};

app.get("/", (req: Request, res: Response) => {
  res.send(`[server]: Running on port ${PORT}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("[server]: Server disconnected from MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.log(`[server]: Error occurred; \n Details: ${error}`);
});

mongoose.connection.on("reconnected", () => {
  console.log("[server]: Server reconnected to MongoDB");
});

app.listen(PORT, () => {
  connect();
  console.log(`[server]: Running on port ${PORT}`);
});
