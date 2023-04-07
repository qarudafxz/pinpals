import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { userRouter } from "./routes/users.js";
import { pinsRouter } from "./routes/pins.js";

dotenv.config();

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@pinpals.yhbf8pp.mongodb.net/pinpals?retryWrites=true&w=majority`;
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

app.use("/api/auth", userRouter);
app.use("/api/pins", pinsRouter);

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

const isDbConnected = mongoose.connection;

isDbConnected.once("connected", () =>
	console.log("MongoDb Connection Established")
);

export default app;
