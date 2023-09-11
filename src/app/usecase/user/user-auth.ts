import { Request, Response } from "express";
import { CacheLocalGetUserAuthRepository } from "../../repositories/user/user-auth/get-user-auth";
import { GetUserAuthController } from "../../controllers/user/user-auth";

class GetUserAuthRouter {
  async get(req: Request, res: Response) {
    const cacheLocalGetUserAuthRepository =
      new CacheLocalGetUserAuthRepository();
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
