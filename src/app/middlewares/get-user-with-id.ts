import { NextFunction, Request, Response } from "express";
import { cache } from "../../database/cache";
import { Not_Fould } from "../errors/api-errors";

class GetMicrosoftAuthMiddleware {
  middleware(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const { id } = req.params;

    const user = cache.get(id);

    if (user == "falha") {
      throw new Not_Fould("não autorizado");
    }

    next();
  }
}

export { GetMicrosoftAuthMiddleware };
