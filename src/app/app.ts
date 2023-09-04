import express from "express";
import { router } from "./router";
import { config } from "dotenv";

const app = express();
config();

app.use(express.json());

app.use("/v1", router);

export { app };
