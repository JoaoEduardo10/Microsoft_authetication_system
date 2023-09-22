import { Router } from "express";
import { CreateUserPermissionMiddleware } from "../middlewares/user-permission/create-user-permission";
import { CreateUserPermissionRouter } from "../usecase/user-permissions/create-user-permissions";
import { GetAllUserPermissionRouter } from "../usecase/user-permissions/getAll-user-permission";
import { DeleteUserpermissionRouter } from "../usecase/user-permissions/delete-user-permission";
import { authenticationMiddleware } from "../middlewares/authentication-user-permission";

const userPermissionsRouter = Router();

const createUserPermissionMiddleware = new CreateUserPermissionMiddleware();
const createUserPermissionRouter = new CreateUserPermissionRouter();

userPermissionsRouter.post(
  "/users/permissions",
  authenticationMiddleware,
  createUserPermissionMiddleware.middleware,
  createUserPermissionRouter.create
);

const getAllUserPermissionRouter = new GetAllUserPermissionRouter();

userPermissionsRouter.get(
  "/all/users/permissions",
  authenticationMiddleware,
  getAllUserPermissionRouter.get
);

const deleteuserpermissionRouter = new DeleteUserpermissionRouter();

userPermissionsRouter.delete(
  "/delete/users/permission/:userId",
  authenticationMiddleware,
  deleteuserpermissionRouter.delete
);

export { userPermissionsRouter };
