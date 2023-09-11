import { Request, Response } from "express";
import { AddUserAuthController } from "../../controllers/micorsoft-auth/add-user";
import { CacheLocalAddUserAuthRepository } from "../../repositories/micorsoft-auth/add-user-auth";

class AddUserAuthRouter {
  async logged(req: Request, res: Response) {
    const cacheLocalAddUserAuthRepository =
      new CacheLocalAddUserAuthRepository();
    const addUserAuthController = new AddUserAuthController(
      cacheLocalAddUserAuthRepository
    );

    const { body } = await addUserAuthController.handle(req);

    const url_redirect = process.env.URL_REDIRECT_SUCESS || "";

    res.redirect(`${url_redirect}${body}`);
  }
}

export { AddUserAuthRouter };
