import { Request, Response } from "express";
import { MicrosoftAuthController } from "../../controllers/microsoft-auth/set-microsoft-auth";
import { CacheLocalCreateMicrosoftAuthRepository } from "../../repositories/micorsoft-auth/set-microsoft-auth/set-microsoft-auth";

class MicrosoftAuthRouter {
  async logged(req: Request, res: Response) {
    const redisMicrosoftAuthRepository =
      new CacheLocalCreateMicrosoftAuthRepository();
    const microsoftAuthController = new MicrosoftAuthController(
      redisMicrosoftAuthRepository
    );

    const { body } = await microsoftAuthController.handle(req);

    const url_redirect = process.env.URL_REDIRECT_SUCESS || "";

    res.redirect(`${url_redirect}${body}`);
  }
}

export { MicrosoftAuthRouter };