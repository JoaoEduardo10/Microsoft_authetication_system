import { Request, Response } from "express";
import { GetUserController } from "../../controllers/user/get-user";
import { CacheLocalGetUserRepository } from "../../repositories/user/get-user/get-user";

class GetUserRouter {
  static async get(req: Request, res: Response) {
    const getUserRepository = new CacheLocalGetUserRepository();
    const getUserController = new GetUserController(getUserRepository);

    const { body, statusCode } = await getUserController.handle(req);

    res.status(statusCode).json({ user: body });
  }
}

export { GetUserRouter };
