import { Router } from "express";
import { GetUserAuthRouter } from "../usecase/user/user-auth";
import { GetUserAuthMiddleware } from "../middlewares/user/user-auth";
import { GetUserIdsRouter } from "../usecase/user/get-users-ids";
import { UserTokenValidationRouter } from "../usecase/user/user-token-validation";
import { authenticationMiddleware } from "../middlewares/authentication";

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

const userTokenValidationRouter = new UserTokenValidationRouter();

userRouter.post(
  "/user/token/validation",
  authenticationMiddleware,
  userTokenValidationRouter.validate
);

export { userRouter };
