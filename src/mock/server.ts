import "express-async-errors";
import express from "express";
import { config } from "dotenv";
import { globalsErrors } from "../../src/app/middlewares/globals-errors";
import { userRouter } from "../../src/app/endpoints/user";
import { userPermissionsRouter } from "../../src/app/endpoints/user-permission";

export const server = express();
config();
server.use(express.json());

server.use(userRouter);
server.use(userPermissionsRouter);

server.use(globalsErrors);
