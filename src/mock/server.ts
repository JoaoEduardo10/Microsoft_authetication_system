import "express-async-errors";
import express from "express";
import { config } from "dotenv";
import { globalsErrors } from "../../src/app/middlewares/globals-errors";
import { userRouter } from "../../src/app/Router/user.";
import { userPermissionsRouter } from "../app/Router/user-permissions";

const server = express();
config();
server.use(express.json());

server.use(userRouter);
server.use(userPermissionsRouter);

server.use(globalsErrors);

export { server };
