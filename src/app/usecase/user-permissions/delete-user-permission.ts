import { Request, Response } from "express";
import { MongoDeleteUserRepository } from "../../repositories/user-permissions/delete-user-permissions/delete-user-permissions";
import { DeleteUserPermissionController } from "../../controllers/user-permissions/delete-user-permission";

class DeleteUserpermissionRouter {
  async delete(req: Request, res: Response) {
    const mongoDeleteUserPermissionRepository = new MongoDeleteUserRepository();
    const deleteUserpermissioncontroller = new DeleteUserPermissionController(
      mongoDeleteUserPermissionRepository
    );

    const { statusCode } = await deleteUserpermissioncontroller.handle(req);

    res.sendStatus(statusCode);
  }
}

export { DeleteUserpermissionRouter };
