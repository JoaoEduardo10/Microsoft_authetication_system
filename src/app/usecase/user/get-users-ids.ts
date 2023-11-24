import { Request, Response } from "express";
import { CacheLocalGetAllUserIdsRepository } from "../../repositories/user/get-all-users-id/get-users-id";
import { GetUserIdsController } from "../../controllers/user/get-users-ids";

export class GetUserIdsRouter {
  async get(req: Request, res: Response) {
    const cacheLocalGetUserIdsRepository =
      new CacheLocalGetAllUserIdsRepository();
    const getUserIdsController = new GetUserIdsController(
      cacheLocalGetUserIdsRepository
    );

    const { body, statusCode } = await getUserIdsController.handle(req);

    res.status(statusCode).json({ ids: body });
  }
}
