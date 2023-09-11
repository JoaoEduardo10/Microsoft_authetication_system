import { Request, Response } from "express";
import { UserTokenValidationController } from "../../controllers/user/user-token-validatio";
import { UserTokenValidationRepositor } from "../../repositories/user/user-token-validantion/user-token-validation";

export class UserTokenValidationRouter {
  async validate(req: Request, res: Response) {
    const userTokenValidationRepository = new UserTokenValidationRepositor();
    const userTokenValidationController = new UserTokenValidationController(
      userTokenValidationRepository
    );

    const { body, statusCode } = await userTokenValidationController.handle(
      req
    );

    res.status(statusCode).json({ user: body });
  }
}
