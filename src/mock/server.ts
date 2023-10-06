import "express-async-errors";
import express from "express";
import { config } from "dotenv";
import { globalsErrors } from "../../src/app/middlewares/globals-errors";
import { userRouter } from "../app/endpoints/user";
import { userPermissionsRouter } from "../app/endpoints/user-permission";

const server = express();
config();
server.use(express.json());

server.use(userRouter);
server.use(userPermissionsRouter);

server.use(globalsErrors);

export { server };
