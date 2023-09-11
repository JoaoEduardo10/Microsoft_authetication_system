import { NextFunction, Request, Response } from "express";

class MicrosoftAuthMiddleware {
  middleware(req: Request, res: Response, next: NextFunction) {
    return req.user ? next() : res.sendStatus(401);
  }
}

export { MicrosoftAuthMiddleware };
