import { Router } from "express";
import { GetTokenRouter } from "../usecase/user/get-token";
import { GetTokenMiddleware } from "../middlewares/user/user-auth";
import { GetAllUserIdsRouter } from "../usecase/user/get-all-users-ids";
import { authenticationMiddleware } from "../middlewares/authentication";
import { GetUserRouter } from "../usecase/user/get-user";

const userRouter = Router();

const getTokenRouter = new GetTokenRouter();
const getTokenMiddleware = new GetTokenMiddleware();

userRouter.get("/token/:id", getTokenMiddleware.middleware, getTokenRouter.get);

const getAllUserIdsRouter = new GetAllUserIdsRouter();

userRouter.get("/users", getAllUserIdsRouter.get);

userRouter.get("/users/:id", authenticationMiddleware, GetUserRouter.get);

export { userRouter };
