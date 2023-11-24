import { Request, Response } from "express";
import { CacheLocalGetAllUserIdsRepository } from "../../repositories/user/get-all-users-id/get-users-id";
import { GetAllUserIdsController } from "../../controllers/user/get-all-users-ids";

export class GetUserIdsRouter {
  async get(req: Request, res: Response) {
    const cacheLocalGetUserIdsRepository =
      new CacheLocalGetAllUserIdsRepository();
    const getUserIdsController = new GetAllUserIdsController(
      cacheLocalGetUserIdsRepository
    );

    const { body, statusCode } = await getUserIdsController.handle(req);

    res.status(statusCode).json({ ids: body });
  }
}
