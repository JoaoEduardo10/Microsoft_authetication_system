import { Request, Response } from "express";
import { CacheLocalGetMicrosoftAuthrepository } from "../repositories/get-microsoft-auth/get-microsoft-auth";
import { GetMicrosoftAuthController } from "../controllers/get-microsoft-auth";

class GetMicrosoftAuthRouter {
  async get(req: Request, res: Response) {
    const cacheLocalGetMicrosoftAuthRepository =
      new CacheLocalGetMicrosoftAuthrepository();
    const cacheLocalGetMicrosoftAuthController = new GetMicrosoftAuthController(
      cacheLocalGetMicrosoftAuthRepository
    );

    const { body, statusCode } =
      await cacheLocalGetMicrosoftAuthController.handle(req);

    res.status(statusCode).json({ token: body });
  }
}

export { GetMicrosoftAuthRouter };
