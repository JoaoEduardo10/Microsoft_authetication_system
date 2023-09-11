import { Request, Response } from "express";
import { TokenValidationController } from "../controllers/token-validation/token-validatio";
import { TokenValidationRepositor } from "../repositories/token-validantion/token-validation";

export class TokenValidationRouter {
  async validate(req: Request, res: Response) {
    const tokenValidationrepository = new TokenValidationRepositor();
    const tokenValidationController = new TokenValidationController(
      tokenValidationrepository
    );

    const { body, statusCode } = await tokenValidationController.handle(req);

    res.status(statusCode).json({ user: body });
  }
}
