import { Router } from "express";
import { GetMicrosoftAuthRouter } from "../usecase/microsoft-auth/get-microsoft-auth";
import { GetMicrosoftAuthMiddleware } from "../middlewares/user/get-user-with-id";
import { GetUserIdsRouter } from "../usecase/user/get-users-ids";
import { TokenValidationRouter } from "../usecase/user/user-token-validation";

const userRouter = Router();

const getMicrosoftAuthRouter = new GetMicrosoftAuthRouter();
const getMicrosoftAuthMiddleware = new GetMicrosoftAuthMiddleware();

userRouter.get(
  "/users/:id",
  getMicrosoftAuthMiddleware.middleware,
  getMicrosoftAuthRouter.get
);

const getUserIdsRouter = new GetUserIdsRouter();

userRouter.get("/users", getUserIdsRouter.get);

const tokenvalidationRouter = new TokenValidationRouter();

userRouter.post("/user/token/validation", tokenvalidationRouter.validate);

export { userRouter };
