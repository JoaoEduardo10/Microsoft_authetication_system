import { Request, Response } from "express";
import { CacheLocalGetUserRepository } from "../../repositories/user/get-user/get-user";
import { GetTokenController } from "../../controllers/user/get-token";

class GetTokenRouter {
  async get(req: Request, res: Response) {
    const cacheLocalGetUserAuthRepository = new CacheLocalGetUserRepository();
    const cacheLocalGetUserAuthController = new GetTokenController(
      cacheLocalGetUserAuthRepository
    );

    const { body, statusCode } = await cacheLocalGetUserAuthController.handle(
      req
    );

    res.status(statusCode).json({ token: body });
  }
}

export { GetTokenRouter };
