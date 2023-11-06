import { Request, Response } from "express";
import { GetUserController } from "../../controllers/user/get-user";
import { CacheLocalGetUserAuthRepository } from "../../repositories/user/user-auth/get-user-auth";

class GetUserRouter {
  static async get(req: Request, res: Response) {
    const getUserRepository = new CacheLocalGetUserAuthRepository();
    const getUserController = new GetUserController(getUserRepository);

    const { body, statusCode } = await getUserController.handle(req);

    res.status(statusCode).json({ user: body });
  }
}

export { GetUserRouter };
