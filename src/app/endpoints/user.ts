import { Router } from "express";
import { GetUserAuthRouter } from "../usecase/user/user-auth";
import { GetUserAuthMiddleware } from "../middlewares/user/user-auth";
import { GetUserIdsRouter } from "../usecase/user/get-users-ids";
import { authenticationMiddleware } from "../middlewares/authentication";
import { GetUserRouter } from "../usecase/user/get-user";

const userRouter = Router();

const getUserAuthRouter = new GetUserAuthRouter();
const getUserAuthMiddleware = new GetUserAuthMiddleware();

userRouter.get(
  "/users/:id",
  getUserAuthMiddleware.middleware,
  getUserAuthRouter.get
);

const getUserIdsRouter = new GetUserIdsRouter();

userRouter.get("/users", getUserIdsRouter.get);

userRouter.get("/user/:id", authenticationMiddleware, GetUserRouter.get);

export { userRouter };
