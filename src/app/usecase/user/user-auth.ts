import { Request, Response } from "express";
import { CacheLocalGetUserRepository } from "../../repositories/user/get-user/get-user";
import { GetUserAuthController } from "../../controllers/user/user-auth";

class GetUserAuthRouter {
  async get(req: Request, res: Response) {
    const cacheLocalGetUserAuthRepository = new CacheLocalGetUserRepository();
    const cacheLocalGetUserAuthController = new GetUserAuthController(
      cacheLocalGetUserAuthRepository
    );

    const { body, statusCode } = await cacheLocalGetUserAuthController.handle(
      req
    );

    res.status(statusCode).json({ token: body });
  }
}

export { GetUserAuthRouter };
