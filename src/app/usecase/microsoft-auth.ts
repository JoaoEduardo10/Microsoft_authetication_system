import { Request, Response } from "express";
import { MicrosoftAuthController } from "../controllers/microsoft-auth";

class MicrosoftAuthRouter {
  async logged(req: Request, res: Response) {
    const microsoftAuthController = new MicrosoftAuthController();

    const { body, statusCode } = await microsoftAuthController.handle(req);

    res.status(statusCode).json({ token: body });
  }
}

export { MicrosoftAuthRouter };
