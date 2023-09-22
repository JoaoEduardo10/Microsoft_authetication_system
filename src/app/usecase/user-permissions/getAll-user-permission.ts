import { Request, Response } from "express";
import { MongoGetAllUserPermission } from "../../repositories/user-permissions/getAll-user-permission/getAll-user-permissions";
import { GetAllUserPermissionController } from "../../controllers/user-permissions/getAll-user-permission";

class GetAllUserPermissionRouter {
  async get(req: Request, res: Response) {
    const mongoGetAllUserPermission = new MongoGetAllUserPermission();
    const getAlluserPermissionController = new GetAllUserPermissionController(
      mongoGetAllUserPermission
    );

    const { body, statusCode } = await getAlluserPermissionController.handle(
      req
    );

    res.status(statusCode).json({ users: body });
  }
}

export { GetAllUserPermissionRouter };
