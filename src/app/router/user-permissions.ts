import { Router } from "express";
import { CreateUserPermissionMiddleware } from "../middlewares/user-permission/create-user-permission";
import { CreateUserPermissionRouter } from "../usecase/user-permissions/create-user-permissions";

const userPermissionsRouter = Router();

const createUserPermissionMiddleware = new CreateUserPermissionMiddleware();
const createUserPermissionRouter = new CreateUserPermissionRouter();

userPermissionsRouter.post(
  "/users/permissions",
  createUserPermissionMiddleware.middleware,
  createUserPermissionRouter.create
);

export { userPermissionsRouter };
