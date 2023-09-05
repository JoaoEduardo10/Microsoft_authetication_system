import { Request, Response } from "express";
import { MicrosoftAuthController } from "../controllers/microsoft-auth";

class MicrosoftAuthRouter {
  async logged(req: Request, res: Response) {
    const microsoftAuthController = new MicrosoftAuthController();

    await microsoftAuthController.handle(req);

    const url_redirect = process.env.URL_REDIRECT_SUCESS || "";

    res.redirect(url_redirect);
  }
}

export { MicrosoftAuthRouter };
