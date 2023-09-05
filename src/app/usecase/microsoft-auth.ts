import { Request, Response } from "express";
import { MicrosoftAuthController } from "../controllers/microsoft-auth";
import { RedisMicrosoftAuthRepository } from "../repositories/set-microsoft-auth/set-microsoft-auth";

class MicrosoftAuthRouter {
  async logged(req: Request, res: Response) {
    const redisMicrosoftAuthRepository = new RedisMicrosoftAuthRepository();
    const microsoftAuthController = new MicrosoftAuthController(
      redisMicrosoftAuthRepository
    );

    const { body } = await microsoftAuthController.handle(req);

    const url_redirect = process.env.URL_REDIRECT_SUCESS || "";

    res.redirect(`${url_redirect}${body}`);
  }
}

export { MicrosoftAuthRouter };
