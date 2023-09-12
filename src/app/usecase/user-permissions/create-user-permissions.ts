import { Request, Response } from "express";
import { MongoCreateUserPermissionRepository } from "../../repositories/user-permissions/create-user-permissions";
import { CreateUserPermissionController } from "../../controllers/user-permissions/create-user-permission";

export class CreateUserPermissionRouter {
  async create(req: Request, res: Response) {
    const mongoCreateUserPermissionRepository =
      new MongoCreateUserPermissionRepository();
    const createUserPermissionController = new CreateUserPermissionController(
      mongoCreateUserPermissionRepository
    );

    const { body, statusCode } = await createUserPermissionController.handle(
      req
    );

    res.status(statusCode).json({ user: body });
  }
}
